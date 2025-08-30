class TypingApp {
    constructor() {
        this.currentText = '';
        this.currentIndex = 0;
        this.startTime = null;
        this.endTime = null;
        this.isRunning = false;
        this.timeLimit = 60;
        this.timerInterval = null;
        this.remainingTime = this.timeLimit;
        this.correctChars = 0;
        this.totalChars = 0;
        // Replace 'YOUR_API_KEY_HERE' with your actual Gemini API key
        this.apiKey = 'AIzaSyBeJXPLg-dxaiXi9tXLe0NKJMSGewWanikpLjM';

        this.initializeElements();
        this.attachEventListeners();
        this.loadLeaderboard();
    }

    initializeElements() {
        this.elements = {
            timer: document.getElementById('timer'),
            textDisplay: document.getElementById('textDisplay'),
            typingInput: document.getElementById('typingInput'),
            wpmStat: document.getElementById('wpmStat'),
            accuracyStat: document.getElementById('accuracyStat'),
            charactersStat: document.getElementById('charactersStat'),
            timeStat: document.getElementById('timeStat'),
            progressBar: document.getElementById('progressBar'),
            themeSelector: document.getElementById('themeSelector'),
            generateTextBtn: document.getElementById('generateText'),
            resetTestBtn: document.getElementById('resetTest'),
            leaderboardList: document.getElementById('leaderboardList')
        };
    }

    attachEventListeners() {
        // Time selection buttons
        document.querySelectorAll('[data-time]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelector('.btn.active').classList.remove('active');
                e.target.classList.add('active');
                this.timeLimit = parseInt(e.target.dataset.time);
                this.resetTest();
            });
        });

        // Typing input
        this.elements.typingInput.addEventListener('input', (e) => {
            this.handleTyping(e.target.value);
        });

        this.elements.typingInput.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                this.resetTest();
            }
        });

        // Control buttons
        this.elements.generateTextBtn.addEventListener('click', () => {
            this.generateTextWithGemini();
        });

        this.elements.resetTestBtn.addEventListener('click', () => {
            this.resetTest();
        });

        // Prevent input focus until text is loaded
        this.elements.typingInput.addEventListener('focus', (e) => {
            if (!this.currentText) {
                e.target.blur();
                alert('Please generate text first!');
            }
        });
    }

    async generateTextWithGemini() {
        if (!this.apiKey || this.apiKey === 'YOUR_API_KEY_HERE') {
            alert('API key not configured. Please contact the developer to set up the Gemini API key.');
            return;
        }

        const theme = this.elements.themeSelector.value;
        this.elements.textDisplay.innerHTML = '<div class="loading">🤖 Generating AI content...</div>';
        this.elements.generateTextBtn.textContent = 'Generating...';
        this.elements.generateTextBtn.disabled = true;

        try {
            const prompt = this.buildPrompt(theme);
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const generatedText = data.candidates[0].content.parts[0].text;

            // Clean and format the text
            this.currentText = this.cleanText(generatedText);
            this.displayText();
            this.resetTest();

            this.elements.typingInput.disabled = false;
            this.elements.typingInput.focus();

        } catch (error) {
            console.error('Error generating text:', error);
            this.elements.textDisplay.innerHTML = `
                        <div class="error">
                            ❌ Error generating text: ${error.message}
                            <br>Please check your API key and try again.
                        </div>
                    `;
        } finally {
            this.elements.generateTextBtn.textContent = 'Generate New Text';
            this.elements.generateTextBtn.disabled = false;
        }
    }

    buildPrompt(theme) {
        const prompts = {
            motivational: "Generate an inspiring and motivational paragraph (exactly 100-150 words) about overcoming challenges and achieving success. Use simple, clear language without complex punctuation. Make it uplifting and energetic.",
            programming: "Generate a paragraph (exactly 100-150 words) explaining a programming concept or discussing software development practices. Use technical terms but keep it accessible. Avoid complex code examples.",
            science: "Generate an interesting paragraph (exactly 100-150 words) about a scientific discovery, natural phenomenon, or scientific concept. Make it engaging and educational with simple language.",
            literature: "Generate a descriptive paragraph (exactly 100-150 words) in a literary style, perhaps describing a scene, emotion, or philosophical thought. Use beautiful but simple language.",
            technology: "Generate a paragraph (exactly 100-150 words) about recent technology trends, innovations, or their impact on society. Keep it informative and accessible.",
            philosophy: "Generate a thoughtful paragraph (exactly 100-150 words) exploring a philosophical concept, question, or idea about life, existence, or human nature. Use clear, contemplative language.",
            general: "Generate an informative paragraph (exactly 100-150 words) about any interesting topic - history, culture, nature, or general knowledge. Make it engaging and educational."
        };

        return prompts[theme] + " IMPORTANT: Return only the paragraph text without any formatting, quotes, or additional commentary. The text should be suitable for typing practice.";
    }

    cleanText(text) {
        // Remove quotes, extra whitespace, and format for typing
        return text
            .replace(/["'""'']/g, '') // Remove quotes
            .replace(/\s+/g, ' ') // Normalize whitespace
            .replace(/^\s+|\s+$/g, '') // Trim
            .replace(/[^\w\s.,;:!?-]/g, '') // Keep only basic punctuation
            .substring(0, 500); // Limit length
    }

    displayText() {
        const chars = this.currentText.split('');
        this.elements.textDisplay.innerHTML = chars
            .map((char, index) => `<span class="char pending" data-index="${index}">${char}</span>`)
            .join('');
    }

    handleTyping(inputValue) {
        if (!this.currentText) return;

        if (!this.isRunning && inputValue.length > 0) {
            this.startTest();
        }

        this.currentIndex = inputValue.length;
        this.totalChars = this.currentIndex;

        // Update character display
        const chars = document.querySelectorAll('.char');
        this.correctChars = 0;

        chars.forEach((char, index) => {
            char.classList.remove('correct', 'incorrect', 'current');

            if (index < inputValue.length) {
                if (inputValue[index] === this.currentText[index]) {
                    char.classList.add('correct');
                    this.correctChars++;
                } else {
                    char.classList.add('incorrect');
                }
            } else if (index === inputValue.length) {
                char.classList.add('current');
            } else {
                char.classList.add('pending');
            }
        });

        // Update progress bar
        const progress = (inputValue.length / this.currentText.length) * 100;
        this.elements.progressBar.style.width = `${Math.min(progress, 100)}%`;

        // Update stats
        this.updateStats();

        // Check if test is complete
        if (inputValue.length >= this.currentText.length) {
            this.endTest();
        }
    }

    startTest() {
        this.isRunning = true;
        this.startTime = Date.now();
        this.remainingTime = this.timeLimit;
        this.elements.timer.textContent = this.remainingTime;

        this.timerInterval = setInterval(() => {
            this.remainingTime--;
            this.elements.timer.textContent = this.remainingTime;

            if (this.remainingTime <= 0) {
                this.endTest();
            }
        }, 1000);
    }

    endTest() {
        this.isRunning = false;
        this.endTime = Date.now();

        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        this.elements.typingInput.disabled = true;

        // Calculate final stats
        const timeSpent = this.timeLimit - this.remainingTime;
        const wpm = Math.round((this.correctChars / 5) / (timeSpent / 60));
        const accuracy = Math.round((this.correctChars / this.totalChars) * 100);

        // Save to leaderboard
        this.saveScore({
            wpm: wpm,
            accuracy: accuracy,
            time: timeSpent,
            theme: this.elements.themeSelector.options[this.elements.themeSelector.selectedIndex].text,
            date: new Date().toLocaleDateString()
        });

        // Show completion message
        setTimeout(() => {
            alert(`Test Complete!\nWPM: ${wpm}\nAccuracy: ${accuracy}%\nTime: ${timeSpent}s`);
        }, 500);
    }

    updateStats() {
        const timeElapsed = this.isRunning ?
            (this.timeLimit - this.remainingTime) : 0;

        // Calculate WPM (words per minute)
        const minutes = timeElapsed / 60;
        const wpm = minutes > 0 ? Math.round((this.correctChars / 5) / minutes) : 0;

        // Calculate accuracy
        const accuracy = this.totalChars > 0 ?
            Math.round((this.correctChars / this.totalChars) * 100) : 100;

        // Update display
        this.elements.wpmStat.textContent = wpm;
        this.elements.accuracyStat.textContent = `${accuracy}%`;
        this.elements.charactersStat.textContent = this.totalChars;
        this.elements.timeStat.textContent = `${timeElapsed}s`;
    }

    resetTest() {
        this.isRunning = false;
        this.currentIndex = 0;
        this.correctChars = 0;
        this.totalChars = 0;
        this.remainingTime = this.timeLimit;

        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        this.elements.timer.textContent = this.timeLimit;
        this.elements.typingInput.value = '';
        this.elements.typingInput.disabled = !this.currentText;
        this.elements.progressBar.style.width = '0%';

        // Reset character display
        document.querySelectorAll('.char').forEach(char => {
            char.classList.remove('correct', 'incorrect', 'current');
            char.classList.add('pending');
        });

        // Reset stats
        this.elements.wpmStat.textContent = '0';
        this.elements.accuracyStat.textContent = '100%';
        this.elements.charactersStat.textContent = '0';
        this.elements.timeStat.textContent = '0s';

        if (this.currentText) {
            this.elements.typingInput.focus();
        }
    }

    saveScore(score) {
        let scores = JSON.parse(localStorage.getItem('typingScores') || '[]');
        scores.push(score);

        // Keep only top 10 scores
        scores.sort((a, b) => b.wpm - a.wpm);
        scores = scores.slice(0, 10);

        localStorage.setItem('typingScores', JSON.stringify(scores));
        this.loadLeaderboard();
    }

    loadLeaderboard() {
        const scores = JSON.parse(localStorage.getItem('typingScores') || '[]');

        if (scores.length === 0) {
            this.elements.leaderboardList.innerHTML = '<div class="loading">No scores yet. Complete a test to see your results!</div>';
            return;
        }

        this.elements.leaderboardList.innerHTML = scores
            .map((score, index) => `
                        <div class="score-item fade-in" style="animation-delay: ${index * 0.1}s">
                            <span>#${index + 1} - ${score.wpm} WPM</span>
                            <span>${score.accuracy}% | ${score.theme} | ${score.date}</span>
                        </div>
                    `)
            .join('');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TypingApp();
});

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'r':
                e.preventDefault();
                document.getElementById('resetTest').click();
                break;
            case 'g':
                e.preventDefault();
                document.getElementById('generateText').click();
                break;
        }
    }
});

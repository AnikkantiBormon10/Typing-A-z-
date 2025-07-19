# Typing{A-z} 🚀

**AI-Powered Typing Practice with Gemini Integration**

A modern, feature-rich typing practice application that uses Google's Gemini AI to generate dynamic, themed content for an engaging typing experience. Built with vanilla HTML, CSS, and JavaScript for maximum performance and compatibility.

[Visit APP](https://anikkantibormon10.github.io/Typing-A-z-/)



## ✨ Features

### 🎯 Core Functionality
- **Real-time Typing Practice** - Interactive character-by-character feedback
- **WPM & Accuracy Tracking** - Live statistics with Words Per Minute and accuracy percentage
- **Multiple Timer Modes** - Choose from 15s, 30s, or 60s practice sessions
- **Progress Visualization** - Real-time progress bar and character highlighting
- **Smart Reset** - Tab key or button to instantly restart tests

### 🤖 AI Integration
- **Gemini AI Content Generation** - Dynamic text generation using Google's Gemini API
- **7 Themed Categories**:
  - 📈 Motivational Quotes
  - 💻 Programming Concepts
  - 🔬 Science Facts
  - 📚 Literature Excerpts
  - 🚀 Technology News
  - 🧠 Philosophy Thoughts
  - 🌍 General Knowledge

### 🎨 Modern UI/UX
- **Dark Theme Design** - Eye-friendly interface with neon accents
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Engaging visual feedback and transitions
- **Real-time Visual Feedback** - Color-coded character states (correct/incorrect/pending)
- **Glassmorphism Effects** - Modern blur and transparency effects

### 📊 Performance Tracking
- **Local Leaderboard** - Tracks your best 10 scores
- **Detailed Statistics** - WPM, accuracy, time, theme, and date
- **Score Persistence** - Results saved locally in browser storage

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/typemaster-pro.git
   cd typemaster-pro
   ```

2. **Configure API Key**
   Open the HTML file and replace the API key:
   ```javascript
   // In the JavaScript section, find this line:
   this.apiKey = 'YOUR_API_KEY_HERE';
   
   // Replace with your actual Gemini API key:
   this.apiKey = 'your-actual-gemini-api-key-here';
   ```

3. **Launch the App**
   - Simply open `index.html` in your web browser
   - Or serve it using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 🎮 How to Use

### Getting Started
1. **Generate Content** - Click "Generate New Text" to create AI-powered typing content
2. **Select Theme** - Choose from 7 different content themes
3. **Set Timer** - Pick your preferred duration (15s, 30s, or 60s)
4. **Start Typing** - Click in the input field and begin typing
5. **Track Progress** - Watch real-time stats and progress bar

### Keyboard Shortcuts
- `Tab` - Reset current test
- `Ctrl/Cmd + R` - Reset test (alternative)
- `Ctrl/Cmd + G` - Generate new text

### Visual Feedback
- 🟢 **Green** - Correctly typed characters
- 🔴 **Red** - Incorrectly typed characters
- 🟡 **Yellow/Cursor** - Current character to type
- ⚫ **Gray** - Pending characters

## 🛠️ Technical Details

### Built With
- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with custom properties and animations
- **Vanilla JavaScript** - No frameworks, pure performance
- **Google Gemini API** - AI-powered content generation
- **LocalStorage** - Client-side data persistence

### Browser Support
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Performance Features
- **Zero Dependencies** - Loads instantly, no external libraries
- **Optimized Rendering** - Efficient DOM manipulation
- **Responsive Design** - Mobile-first approach
- **Progressive Enhancement** - Works without JavaScript for basic functionality

## 📁 Project Structure

```
typting{A-z}/
├── index.html          # Main application file
├── README.md           # This file
├── style.css    
├── script.js   

```

## ⚙️ Configuration Options

### API Key Setup
Replace the API key in the constructor:
```javascript
class TypingApp {
    constructor() {
        // Replace with your Gemini API key
        this.apiKey = 'your-gemini-api-key-here';
    }
}
```

### Customizable Themes
Modify the theme prompts in the `buildPrompt()` method:
```javascript
const prompts = {
    customTheme: "Your custom prompt here...",
    // Add more themes as needed
};
```

### Timer Options
Add custom timer durations by modifying the HTML:
```html
<button class="btn" data-time="120">120s</button>
```

## 🔒 Security & Privacy

### Data Storage
- **Local Only** - All data stored in browser's localStorage
- **No Server Communication** - Except for Gemini API calls
- **Privacy First** - No user tracking or analytics

### API Key Security
- **Client-Side Implementation** - API key is embedded in code
- **Recommendation** - Use API key restrictions in Google Cloud Console
- **Production Tip** - Consider implementing a backend proxy for public deployment

## 🚀 Deployment Options

### Static Hosting
- **GitHub Pages** - Free hosting with custom domain support
- **Netlify** - Drag-and-drop deployment with HTTPS
- **Vercel** - Git integration and instant deployments
- **Firebase Hosting** - Google's hosting platform

### Local Development
```bash
# Simple Python server
python -m http.server 8000

# Node.js serve
npx serve . -p 8000

# PHP development server
php -S localhost:8000
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Areas for Improvement
- [ ] Add more typing modes (words, quotes, code)
- [ ] Implement user accounts and cloud sync
- [ ] Add sound effects and haptic feedback
- [ ] Create typing lessons and tutorials
- [ ] Add multiplayer/competitive modes
- [ ] Implement typing games and challenges

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** - For powerful text generation capabilities
- **Modern CSS Techniques** - Inspired by contemporary web design trends
- **Monkeytype** - Original inspiration for typing practice interfaces
- **Open Source Community** - For various techniques and best practices

## 📞 Support & Contact

- **Issues** - [GitHub Issues](https://github.com/yourusername/typemaster-pro/issues)
- **Discussions** - [GitHub Discussions](https://github.com/yourusername/typemaster-pro/discussions)
- **Email** - your.email@example.com

## 🌟 Show Your Support

If you found this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📢 Sharing with others

---

**Made with ❤️ for the typing community**

*Happy Typing! 🎯*

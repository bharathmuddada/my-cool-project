# 🐍 Snake Game

A fun, colorful, and interactive Snake game built with vanilla JavaScript and HTML5 Canvas! Perfect for kids and casual gamers.

## 🎮 Play Now!

**[🕹️ PLAY THE GAME HERE!](https://bharathmuddada.github.io/my-cool-project/)**

The game is live and ready to play right now! 🚀

## ✨ Features

✨ **Visual Design**
- Kid-friendly vibrant colors with gradient backgrounds
- Animated score display with pulsing effect
- Round circular snake with expressive eyes
- Glowing apple with shine effects
- Tree obstacles with cross patterns
- Smooth hover animations on the canvas

🎵 **Audio**
- Sound effect when eating apples (upward tone)
- Game over sound (downward tone)
- Built with Web Audio API for dynamic sound generation

🎯 **Gameplay**
- Player name entry at the start
- Real-time score tracking
- Collision detection (walls, self, obstacles)
- 3-segment starting snake that grows with each apple
- Adjustable game speed
- Beautiful game over message with player name and score

## 📦 Files

- **index.html** - Main HTML file with styling and UI elements
- **snake.js** - Game logic and mechanics
- **README.md** - This documentation file

## 🚀 How to Run

### **Online (Recommended)**
Simply visit: **[https://bharathmuddada.github.io/my-cool-project/](https://bharathmuddada.github.io/my-cool-project/)**

The game is already hosted and ready to play!

### **Locally**
1. **Clone or Download the Files**
   ```bash
   git clone https://github.com/bharathmuddada/my-cool-project.git
   cd my-cool-project
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - No server or special installation needed!

3. **Start Playing**
   - Enter your name when prompted
   - Use arrow keys to move the snake
   - Eat the orange apples to grow and earn points
   - Avoid the green trees and walls
   - Try to get the highest score!

## 📋 How to Play

| Control | Action |
|---------|--------|
| ⬆️ Up Arrow | Move Up |
| ⬇️ Down Arrow | Move Down |
| ⬅️ Left Arrow | Move Left |
| ➡️ Right Arrow | Move Right |

**Objective:**
- Eat the 🍎 apples to grow your snake
- Avoid hitting walls, yourself, or the 🌳 tree obstacles
- Get the highest score possible!

## 🎨 Game Elements

- **🐍 Snake (Purple)** - The player character that grows when eating apples
  - Head: Has yellow eyes and black pupils
  - Body: Alternating shades of purple in circles
  
- **🍎 Apple (Orange)** - Eat to gain points and grow longer
  - Has a golden shine on top
  
- **🌳 Obstacles (Green Trees)** - Avoid these! Collision ends the game
  - Dark green background with light green cross pattern

## ⚙️ Customization

### Change Game Speed
Edit `snake.js` line 26:
```javascript
setTimeout(loop, 200);  // milliseconds (higher = slower)
```

### Add More Obstacles
Edit `snake.js` lines 14-18:
```javascript
let obstacles = [
  {x:2,y:2},
  {x:8,y:4},
  {x:6,y:7},
  {x:10,y:10}  // Add more here
];
```

### Change Colors
Edit `snake.js` `draw()` function:
- Snake: `ctx.fillStyle = '#8B00FF'`
- Apple: `ctx.fillStyle = '#FF4500'`
- Obstacles: `ctx.fillStyle = '#228B22'`

### Change Canvas Size
Edit `snakeGame.html`:
```html
<canvas id="game" width="800" height="800"></canvas>
```

## 🎬 Recording a Video

To record your gameplay:

**macOS:**
```bash
# Use QuickTime Player
# Press Cmd+Space, search for QuickTime Player
# File > New Screen Recording
# Record your gameplay
```

**Windows:**
```bash
# Use Xbox Game Bar
# Press Windows+G while playing
# Click Record to start
```

**Any OS:**
- Use OBS Studio (free, open-source)
- Download from obsproject.com
- Set up a source for your browser window
- Click Start Recording

## 🛠️ Technical Stack

- **HTML5** - Page structure and styling
- **CSS3** - Beautiful UI with animations and gradients
- **JavaScript (ES6+)** - Game logic and mechanics
- **Canvas API** - Graphics rendering
- **Web Audio API** - Dynamic sound generation

## 📊 Code Structure

```
snake.js
├── Audio Functions
│   ├── playEatSound()
│   └── playGameOverSound()
├── Game Variables
│   ├── snake
│   ├── apple
│   ├── obstacles
│   └── gameOver
├── Game Loop
│   ├── loop()
│   ├── update()
│   └── draw()
├── Helper Functions
│   └── randomPos()
└── Input Handler
    └── keydown event listener
```

## 🎓 Learning Resources

This game demonstrates:
- Object-oriented game development
- Canvas drawing and animation
- Keyboard event handling
- Collision detection algorithms
- Audio synthesis with Web Audio API
- CSS animations and positioning

## 🐛 Known Issues & Future Features

**Future Enhancements:**
- High score leaderboard
- Difficulty levels
- Power-ups
- Mobile touch controls
- Pause/Resume functionality
- Multiple snake skins

## 📄 License

This project is open source and available for learning purposes.

## 👨‍💻 Made with ❤️

Created as a fun learning project to practice JavaScript, HTML5 Canvas, and Web Audio API!

---

**Enjoy the game and happy coding! 🎮✨**

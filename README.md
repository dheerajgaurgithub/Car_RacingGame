# 🏎️ Neon Racer - High-Speed Racing Game

A thrilling 3D-lane racing game built with React, TypeScript, and HTML5 Canvas. Race through neon-lit highways, avoid obstacles, collect power-ups, and achieve the highest score!

![Game Preview](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=Neon+Racer+Preview)

## 🎮 Game Features

### Core Gameplay
- **3-Lane Racing**: Navigate through left, center, and right lanes
- **Dynamic Obstacles**: Avoid cars, trucks, motorcycles, barriers, roadwork, and oil spills
- **Power-Up System**: Collect speed boosts, extra lives, and shields
- **Progressive Difficulty**: Speed and challenge increase as you progress
- **Luxury Car**: Drive a premium vehicle with realistic physics

### Game Mechanics
- **Boost System**: Activate speed boosts for temporary acceleration
- **Lives System**: Start with 3 lives, gain more through power-ups
- **Scoring**: Earn points by avoiding obstacles and collecting power-ups
- **Achievements**: Unlock achievements for various milestones

### Visual Effects
- **Neon Aesthetics**: Glowing effects and cyberpunk-inspired design
- **Smooth Animations**: 60fps gameplay with fluid car movement
- **Dynamic Road**: Scrolling road surface with lane markings
- **Particle Effects**: Glowing power-ups with animated effects

## 🎯 How to Play

### Controls
- **Desktop**: Use ← → arrow keys or A/D keys to move between lanes
- **Mobile**: Touch the left/right control buttons on screen
- **Pause**: Press Spacebar (desktop) or tap pause button

### Objectives
1. **Avoid Obstacles**: Steer clear of other vehicles and road hazards
2. **Collect Power-ups**: Grab golden power-ups for boosts and bonuses
3. **Survive**: Don't let your lives reach zero
4. **Score High**: Achieve the highest score possible

### Power-Up Types
- **⚡ Speed Boost**: Increases speed and score multiplier temporarily
- **💖 Extra Life**: Adds one life (maximum 3 lives)
- **🛡️ Shield**: Provides temporary protection boost

### Obstacle Types
- **🚗 Cars**: Regular vehicles (10 points to avoid)
- **🚛 Trucks**: Large, slow-moving obstacles (25 points)
- **🏍️ Motorcycles**: Fast, narrow vehicles (15 points)
- **🚧 Barriers**: Construction obstacles (20 points)
- **🔧 Roadwork**: Warning signs (30 points)
- **🛢️ Oil Spills**: Hazardous road conditions (50 points)

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Canvas**: HTML5 Canvas for game rendering
- **Build Tool**: Vite for fast development and building
- **UI Components**: shadcn/ui component library
- **State Management**: React hooks and context
- **Animation**: CSS animations and Canvas-based effects

## 🎨 Design System

The game features a custom design system with:
- **Neon Color Palette**: Racing-inspired colors with cyan, orange, and yellow accents
- **Responsive Layout**: Optimized for both desktop and mobile devices
- **Modern UI**: Clean, gaming-focused interface design
- **Accessibility**: Proper contrast ratios and keyboard navigation

## 📱 Responsive Design

- **Mobile Optimized**: Touch controls and mobile-friendly UI
- **Desktop Enhanced**: Keyboard controls and larger display optimization
- **Tablet Support**: Adaptive layout for medium-sized screens
- **Cross-Browser**: Compatible with modern web browsers

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with HTML5 Canvas support

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd neon-racer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development
```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏆 Achievements System

Unlock achievements by reaching various milestones:

- **🏆 First Thousand**: Score 1,000 points in a single race
- **🔥 Speed Demon**: Score 5,000 points in a single race
- **⭐ Racing Legend**: Score 10,000 points in a single race
- **🌟 Neon Master**: Score 25,000 points in a single race
- **🎯 Persistent Racer**: Play 10 games
- **🏅 Racing Veteran**: Play 50 games
- **🏃 Marathon Runner**: Travel 1,000 meters in a single race
- **💎 Power Collector**: Collect 10 power-ups in a single race

## 📊 Game Statistics

The game tracks comprehensive statistics:
- High score and average score
- Total games played and total distance
- Total play time and best streak
- Achievements unlocked and last played date

*Note: Statistics reset on page refresh for a fresh experience each session.*

## 🎮 Game Modes

### Current Mode: Endless Racing
- Infinite gameplay until all lives are lost
- Progressive difficulty scaling
- Score-based competition

### Future Enhancements
- Time trial mode
- Multiplayer racing
- Custom car selection
- Track variations

## 🔧 Technical Architecture

### Component Structure
```
src/
├── components/
│   ├── RacingGame.tsx      # Main game component
│   ├── GameCanvas.tsx      # Canvas rendering logic
│   ├── GameUI.tsx          # Game interface overlay
│   ├── TouchControls.tsx   # Mobile touch controls
│   ├── StartScreen.tsx     # Game start screen
│   └── GameOverScreen.tsx  # Game over screen
├── hooks/
│   ├── useGameLogic.ts     # Core game logic
│   └── useKeyboardControls.ts # Input handling
└── utils/
    └── gameStats.ts        # Statistics management
```

### Key Features
- **Modular Architecture**: Separate concerns for rendering, logic, and UI
- **Custom Hooks**: Reusable game logic and input handling
- **Canvas Optimization**: Efficient rendering with requestAnimationFrame
- **Responsive Canvas**: Dynamic sizing for different screen sizes

## 🎨 Customization

### Design Tokens
The game uses a comprehensive design system defined in:
- `src/index.css`: CSS custom properties and color definitions
- `tailwind.config.ts`: Tailwind configuration with custom colors and animations

### Game Balance
Adjust game difficulty in `src/hooks/useGameLogic.ts`:
- Obstacle spawn rates
- Speed progression
- Power-up frequency
- Scoring multipliers

## 🌟 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered development platform
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Inspired by classic arcade racing games

---

**Enjoy the race and aim for the high score! 🏁**
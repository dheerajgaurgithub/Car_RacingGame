# 🏎️ Car Racing Game

A modern, responsive car racing game built with Next.js, React, and TypeScript. Features advanced gameplay mechanics, power-ups, weather effects, and detailed analytics.

## 🎮 Game Features

### Core Gameplay
- **4-Lane Racing**: Navigate through 4 responsive lanes
- **Progressive Difficulty**: Speed increases every 5 cars passed
- **Collision Detection**: Advanced collision system with visual feedback
- **Smooth Controls**: Responsive keyboard and touch controls

### Advanced Features
- **Power-ups System**: Shield protection, slow motion, bonus points
- **Weather Effects**: Dynamic rain and night modes
- **Particle System**: Visual feedback for interactions
- **Combo System**: Reward consecutive successful dodges
- **Real-time Analytics**: Track reaction times, perfect dodges, and performance metrics

### Visual Effects
- **Dynamic Backgrounds**: Weather-responsive environments
- **Particle Effects**: Explosion effects for collisions and power-ups
- **Smooth Animations**: Fluid lane switching and car movement
- **Responsive Design**: Optimized for both mobile and desktop

## 🎯 Controls

### Desktop
- **Arrow Keys**: Left/Right to change lanes
- **WASD**: A/D keys for lane switching

### Mobile
- **Swipe Gestures**: Swipe left/right to change lanes
- **Touch Controls**: Intuitive touch-based navigation

## 🚀 Getting Started



### Installation

1. **Clone the repository**
\`\`\`bash
git clone [<repository-url>](https://github.com/dheerajgaurgithub/Car_RacingGame)
cd car-racing-game
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Run the development server**
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. **Open your browser**
Navigate to `http://localhost:3000`

## 🏗️ Project Structure

\`\`\`
car-racing-game/
├── app/
│   ├── page.tsx          # Main game component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # Reusable UI components
│   └── landing-page.tsx  # Game landing page
├── public/               # Static assets
└── README.md
\`\`\`

## 🎨 Technical Highlights

### Performance Optimizations
- **RequestAnimationFrame**: Smooth 60fps gameplay
- **Object Pooling**: Efficient particle and obstacle management
- **Responsive Rendering**: Adaptive to different screen sizes
- **Memory Management**: Automatic cleanup of game objects

### State Management
- **React Hooks**: Advanced state management with useCallback, useRef
- **Local Storage**: Persistent high score tracking
- **Real-time Updates**: Live game statistics and metrics

### Mobile Optimization
- **Touch Events**: Native touch gesture support
- **Responsive Design**: Tailwind CSS responsive utilities
- **Performance**: Optimized for mobile devices

## 📊 Game Statistics

The game tracks detailed analytics including:
- **Total Distance**: Cumulative distance traveled
- **Average Reaction Time**: Response time to obstacles
- **Perfect Dodges**: Close calls successfully avoided
- **Power-ups Collected**: Total power-ups gathered
- **Max Combo**: Highest consecutive score streak
- **FPS Monitoring**: Real-time performance tracking

## 🎮 Power-ups

- **🛡️ Shield**: Temporary protection from collisions (5 seconds)
- **⏰ Slow Motion**: Reduces game speed for easier navigation (3 seconds)
- **💎 Bonus Points**: Instant +5 score boost

## 🌦️ Weather System

- **Clear**: Standard racing conditions
- **Rain**: Reduced visibility with rain effects
- **Night**: Dark mode with blue-tinted environment

## 🏆 Scoring System

- **+1 Point**: For each car successfully passed
- **Combo Multiplier**: Consecutive successful dodges
- **Speed Progression**: Game speed increases every 5 points
- **High Score**: Persistent local storage tracking

## 🛠️ Built With

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern UI component library
- **React Hooks**: Advanced state management

## 📱 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Build
\`\`\`bash
npm run build
npm start
\`\`\`

## 🎯 Performance Metrics

- **Lighthouse Score**: 95+ performance rating
- **Mobile Optimized**: Touch-first design
- **60fps Gameplay**: Smooth animation performance
- **Responsive**: Works on all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Developed by [Dheeraj Gaur](https://dheerajgaurofficial.netlify.app/)**

---

*Built with ❤️ for an amazing gaming experience*

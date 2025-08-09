import React from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play, Zap, Heart, Trophy } from 'lucide-react';
import { GameState } from './RacingGame';

interface GameUIProps {
  score: number;
  speed: number;
  lives: number;
  gameState: GameState;
  boost: number;
  onTogglePause: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({
  score,
  speed,
  lives,
  gameState,
  boost,
  onTogglePause
}) => {
  if (gameState === 'start' || gameState === 'gameOver') return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Enhanced Racing Dashboard - Responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start p-2 sm:p-4 pointer-events-auto gap-2 sm:gap-4">
        {/* Mobile: Top Row with Score and Pause */}
        <div className="flex w-full sm:w-auto justify-between items-center sm:block">
          {/* Left Side - Score with Glow Effect */}
          <div className="bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-neon border border-racing-cyan/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-racing-cyan/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                <Trophy className="text-racing-cyan animate-neon-glow" size={12} />
                <span className="text-racing-cyan text-xs sm:text-sm font-bold tracking-wider">SCORE</span>
              </div>
              <div className="text-lg sm:text-3xl font-black text-foreground animate-neon-glow bg-gradient-neon bg-clip-text text-transparent">
                {score.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Mobile Pause Button */}
          <Button
            onClick={onTogglePause}
            variant="outline"
            size="icon"
            className="bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-md border-2 border-racing-cyan text-racing-cyan hover:bg-racing-cyan hover:text-card shadow-neon rounded-xl sm:rounded-2xl w-10 h-10 sm:w-14 sm:h-14 transition-all duration-300 hover:scale-110 sm:hidden"
          >
            {gameState === 'paused' ? <Play size={16} /> : <Pause size={16} />}
          </Button>
        </div>

        {/* Desktop Center - Enhanced Pause Button */}
        <Button
          onClick={onTogglePause}
          variant="outline"
          size="icon"
          className="bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-md border-2 border-racing-cyan text-racing-cyan hover:bg-racing-cyan hover:text-card shadow-neon rounded-2xl w-14 h-14 transition-all duration-300 hover:scale-110 hidden sm:flex"
        >
          {gameState === 'paused' ? <Play size={24} /> : <Pause size={24} />}
        </Button>

        {/* Right Side - Multi-panel Stats - Responsive */}
        <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-3 w-full sm:w-auto justify-between sm:justify-start">
          {/* Speed Panel */}
          <div className="bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-neon border border-racing-yellow/30 relative overflow-hidden flex-1 sm:flex-none min-w-0 sm:min-w-[120px]">
            <div className="absolute inset-0 bg-gradient-to-r from-racing-yellow/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                <Zap className="text-racing-yellow animate-speed-pulse" size={10} />
                <span className="text-racing-yellow text-xs font-bold tracking-wider">SPEED</span>
              </div>
              <div className="text-sm sm:text-2xl font-black text-foreground animate-speed-pulse truncate">
                {Math.round(speed * 10)} <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">KM/H</span>
              </div>
            </div>
          </div>

          {/* Lives Panel */}
          <div className="bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-neon border border-racing-red/30 relative overflow-hidden flex-1 sm:flex-none">
            <div className="absolute inset-0 bg-gradient-to-r from-racing-red/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                <Heart className="text-racing-red animate-neon-glow" size={10} />
                <span className="text-racing-red text-xs font-bold tracking-wider">LIVES</span>
              </div>
              <div className="flex space-x-1 justify-center sm:justify-start">
                {Array.from({ length: Math.max(lives, 5) }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                      i < lives 
                        ? 'bg-racing-red animate-neon-glow shadow-[0_0_10px_currentColor]' 
                        : 'bg-muted/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Boost Panel */}
          <div className="bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-neon border border-accent/30 relative overflow-hidden flex-1 sm:flex-none">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-1 mb-1">
                <span className="text-accent text-xs font-bold tracking-wider">BOOST</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-1 sm:h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent to-racing-yellow animate-neon-glow transition-all duration-300"
                  style={{ width: `${(boost / 100) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Credit - Responsive */}
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 pointer-events-auto">
        <div className="bg-card/60 backdrop-blur-sm rounded-lg px-2 py-1 sm:px-3 sm:py-2 border border-border/50">
          <div className="text-xs text-muted-foreground">
            <span className="hidden sm:inline">Developed by </span>
            <a 
              href="https://dheerajgaurofficial.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-racing-cyan font-semibold animate-neon-glow hover:underline transition-all duration-300"
            >
              dheerajgaur
            </a>
          </div>
        </div>
      </div>

      {/* Pause Overlay - Responsive */}
      {gameState === 'paused' && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center pointer-events-auto p-4">
          <div className="bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-car border border-racing-cyan/30 text-center relative overflow-hidden max-w-md w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-racing-cyan/5 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-4xl font-black text-racing-cyan mb-2 sm:mb-4 animate-neon-glow">
                PAUSED
              </h2>
              <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-lg">
                <span className="hidden sm:inline">Press SPACE or </span>Tap the pause button to continue
              </p>
              <Button
                onClick={onTogglePause}
                className="bg-gradient-neon text-background hover:scale-110 transform transition-all duration-300 shadow-neon px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg font-bold rounded-xl sm:rounded-2xl w-full sm:w-auto"
              >
                <Play className="mr-2 sm:mr-3" size={16} />
                Resume Race
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
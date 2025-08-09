import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Home, Trophy, Target } from 'lucide-react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  onMainMenu: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  onRestart,
  onMainMenu
}) => {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-20 p-4">
      <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 sm:p-8 max-w-md mx-auto shadow-car border border-border text-center w-full">
        {/* Game Over Title - Responsive */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-destructive mb-2 animate-neon-glow">
            GAME OVER
          </h1>
        </div>

        {/* Score Display - Responsive */}
        <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
          <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Target className="text-racing-cyan" size={16} />
              <span className="text-racing-cyan font-semibold text-sm sm:text-base">YOUR SCORE</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground">
              {score.toLocaleString()}
            </div>
          </div>

          {/* Session Stats */}
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Trophy className="text-racing-yellow" size={14} />
              <span className="text-racing-yellow font-medium text-xs sm:text-sm">SESSION STATS</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="text-center">
                <div className="text-racing-green font-semibold">Distance</div>
                <div className="text-foreground">{Math.round(score / 10)}m</div>
              </div>
              <div className="text-center">
                <div className="text-racing-blue font-semibold">Performance</div>
                <div className="text-foreground">
                  {score < 1000 ? "Rookie" :
                   score < 5000 ? "Good" :
                   score < 10000 ? "Excellent" :
                   "Legendary"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Responsive */}
        <div className="space-y-3">
          <Button
            onClick={onRestart}
            className="w-full bg-gradient-speed text-background hover:scale-105 transform transition-all duration-200 shadow-neon text-sm sm:text-base py-2 sm:py-3"
          >
            <RotateCcw className="mr-2" size={16} />
            RACE AGAIN
          </Button>
          
          <Button
            onClick={onMainMenu}
            variant="outline"
            className="w-full border-racing-cyan text-racing-cyan hover:bg-racing-cyan hover:text-background text-sm sm:text-base py-2 sm:py-3"
          >
            <Home className="mr-2" size={16} />
            MAIN MENU
          </Button>
        </div>

        {/* Encouragement Message - Responsive */}
        <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground px-2">
          {score < 1000 ? "Keep practicing to improve your reflexes!" :
           score < 5000 ? "Great driving! You're getting the hang of it!" :
           score < 10000 ? "Excellent skills! You're a true racer!" :
           "LEGENDARY! You're a neon racing master!"}
        </div>

        {/* Fresh Session Note */}
        <div className="mt-3 text-xs text-muted-foreground opacity-75">
          Stats reset each session for a fresh racing experience
        </div>
      </div>
    </div>
  );
};
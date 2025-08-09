import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Trophy, Gamepad2 } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="absolute inset-0 bg-gradient-sky flex items-center justify-center z-20 p-4">
      <div className="text-center max-w-md mx-auto w-full">
        {/* Game Title - Responsive */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-racing-cyan mb-2 sm:mb-4 animate-neon-glow">
            CYBER
          </h1>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
            RUSH
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-neon mx-auto rounded-full"></div>
        </div>

        {/* Game Description - Responsive */}
        <div className="mb-6 sm:mb-8 text-muted-foreground">
          <p className="mb-4 text-sm sm:text-base">
            Race through the neon highways and avoid obstacles!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center justify-center space-x-2">
              <Gamepad2 size={14} className="text-racing-yellow" />
              <span className="hidden sm:inline">Arrow Keys</span>
              <span className="sm:hidden">Controls</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Trophy size={14} className="text-racing-green" />
              <span>High Score</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-racing-red">❤</span>
              <span>3 Lives</span>
            </div>
          </div>
        </div>

        {/* Controls Info - Responsive */}
        <div className="mb-6 sm:mb-8 bg-card/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-border">
          <h3 className="text-racing-cyan font-semibold mb-2 sm:mb-3 text-sm sm:text-base">CONTROLS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
            <div className="text-center sm:text-left">
              <span className="text-racing-yellow">← →</span> Move Car
            </div>
            <div className="text-center sm:text-left">
              <span className="text-racing-yellow">SPACE</span> Pause
            </div>
            <div className="col-span-1 sm:col-span-2 border-t border-border pt-2 mt-2 text-center sm:text-left">
              <span className="text-racing-cyan">Mobile:</span> Use touch buttons
            </div>
          </div>
        </div>

        {/* Start Button - Responsive */}
        <Button
          onClick={onStart}
          size="lg"
          className="bg-gradient-speed text-background hover:scale-110 transform transition-all duration-300 shadow-car text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
        >
          <Play className="mr-2 sm:mr-3" size={20} />
          START RACE
        </Button>

        {/* Developer Credit */}
        <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground">
          <div className="flex justify-center items-center space-x-2 mb-2">
            <span>Developed by</span>
            <a 
              href="https://dheerajgaurofficial.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-racing-cyan font-semibold animate-neon-glow hover:underline transition-all duration-300"
            >
              dheerajgaur
            </a>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <Trophy size={14} className="text-racing-yellow" />
            <span>Fresh session - Race for your best score!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
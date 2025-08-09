import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GameState } from './RacingGame';

interface TouchControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  gameState: GameState;
}

export const TouchControls: React.FC<TouchControlsProps> = ({
  onMoveLeft,
  onMoveRight,
  gameState
}) => {
  // Only show controls when playing
  if (gameState !== 'playing') return null;

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 sm:hidden">
      <div className="flex space-x-6">
        <Button
          onTouchStart={onMoveLeft}
          onMouseDown={onMoveLeft}
          size="lg"
          className="bg-card/90 backdrop-blur-sm border-2 border-racing-cyan text-racing-cyan hover:bg-racing-cyan hover:text-card shadow-neon w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-all duration-200 active:scale-95"
        >
          <ChevronLeft size={28} className="sm:w-8 sm:h-8" />
        </Button>
        
        <Button
          onTouchStart={onMoveRight}
          onMouseDown={onMoveRight}
          size="lg"
          className="bg-card/90 backdrop-blur-sm border-2 border-racing-cyan text-racing-cyan hover:bg-racing-cyan hover:text-card shadow-neon w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-all duration-200 active:scale-95"
        >
          <ChevronRight size={28} className="sm:w-8 sm:h-8" />
        </Button>
      </div>
      
      <div className="text-center mt-2 text-xs text-muted-foreground">
        Touch to steer
      </div>
    </div>
  );
};
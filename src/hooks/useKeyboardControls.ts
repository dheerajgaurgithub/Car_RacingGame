import { useEffect } from 'react';
import { GameState } from '@/components/RacingGame';

export const useKeyboardControls = (
  moveCarLeft: () => void,
  moveCarRight: () => void,
  togglePause: () => void,
  gameState: GameState
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default behavior for game keys
      if (['ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) {
        event.preventDefault();
      }

      switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
          if (gameState === 'playing') {
            moveCarLeft();
          }
          break;
        case 'ArrowRight':
        case 'KeyD':
          if (gameState === 'playing') {
            moveCarRight();
          }
          break;
        case 'Space':
          if (gameState === 'playing' || gameState === 'paused') {
            togglePause();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveCarLeft, moveCarRight, togglePause, gameState]);
};
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameCanvas } from './GameCanvas';
import { GameUI } from './GameUI';
import { StartScreen } from './StartScreen';
import { GameOverScreen } from './GameOverScreen';
import { TouchControls } from './TouchControls';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';

export type GameState = 'start' | 'playing' | 'paused' | 'gameOver';

export interface Position {
  x: number;
  y: number;
}

export interface Car extends Position {
  id: string;
  color: string;
  width: number;
  height: number;
}

export interface Obstacle extends Position {
  id: string;
  type: 'car' | 'barrier' | 'truck' | 'motorcycle' | 'roadwork' | 'oilspill';
  color: string;
  width: number;
  height: number;
  speed: number;
  points?: number;
}

export interface PowerUp extends Position {
  id: string;
  type: 'speed' | 'life' | 'shield';
  color: string;
  width: number;
  height: number;
  speed: number;
}

export const RacingGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const {
    playerCar,
    obstacles,
    powerUps,
    score,
    speed,
    lives,
    boost,
    gameLoop,
    resetGame,
    moveCarLeft,
    moveCarRight,
    togglePause
  } = useGameLogic(gameCanvasRef, gameState, setGameState);

  useKeyboardControls(moveCarLeft, moveCarRight, togglePause, gameState);

  const handleStartGame = useCallback(() => {
    setGameState('playing');
  }, []);

  const handleRestartGame = useCallback(() => {
    resetGame();
    setGameState('playing');
  }, [resetGame]);

  const handleReturnToMenu = useCallback(() => {
    resetGame();
    setGameState('start');
  }, [resetGame]);

  // Start game loop when playing
  useEffect(() => {
    if (gameState === 'playing') {
      const intervalId = setInterval(gameLoop, 16); // ~60fps
      return () => clearInterval(intervalId);
    }
  }, [gameState, gameLoop]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-sky overflow-hidden select-none flex items-center justify-center">
      <div className="relative w-full h-screen max-w-6xl max-h-screen bg-gradient-sky overflow-hidden">
        {/* Game Canvas */}
        <GameCanvas
          ref={gameCanvasRef}
          playerCar={playerCar}
          obstacles={obstacles}
          powerUps={powerUps}
          speed={speed}
        />

        {/* Game UI Overlay */}
        <GameUI
          score={score}
          speed={speed}
          lives={lives}
          boost={boost}
          gameState={gameState}
          onTogglePause={togglePause}
        />

        {/* Touch Controls for Mobile */}
        <TouchControls
          onMoveLeft={moveCarLeft}
          onMoveRight={moveCarRight}
          gameState={gameState}
        />

        {/* Game State Screens */}
        {gameState === 'start' && <StartScreen onStart={handleStartGame} />}
        
        {gameState === 'gameOver' && (
          <GameOverScreen
            score={score}
            onRestart={handleRestartGame}
            onMainMenu={handleReturnToMenu}
          />
        )}
      </div>
    </div>
  );
};
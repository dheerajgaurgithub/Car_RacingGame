import { useState, useCallback, useRef } from 'react';
import { Car, Obstacle, PowerUp, GameState } from '@/components/RacingGame';

export const useGameLogic = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  gameState: GameState,
  setGameState: (state: GameState) => void
) => {
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(3);
  const [lives, setLives] = useState(3);
  const [boost, setBoost] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [obstaclesAvoided, setObstaclesAvoided] = useState(0);
  const [powerUpsCollected, setPowerUpsCollected] = useState(0);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [playerCar, setPlayerCar] = useState<Car>({
    id: 'player',
    x: 0,
    y: 0,
    color: '#1a1a2e',
    width: 60,
    height: 100
  });

  const obstacleIdCounter = useRef(0);
  const powerUpIdCounter = useRef(0);
  const lastObstacleSpawn = useRef(0);
  const lastPowerUpSpawn = useRef(0);

  // Initialize player car position
  const initializePlayerCar = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const roadWidth = canvas.width * 0.8;
    const roadStart = canvas.width * 0.1;
    const laneWidth = roadWidth / 3;
    
    // Start in center lane, properly centered
    const centerLaneX = roadStart + laneWidth + (laneWidth - playerCar.width) / 2;
    
    setPlayerCar(prev => ({
      ...prev,
      x: centerLaneX,
      y: canvas.height - prev.height - 50
    }));
  }, [canvasRef, playerCar.width]);

  // Move car left/right with proper lane positioning
  const moveCarLeft = useCallback(() => {
    if (!canvasRef.current || gameState !== 'playing') return;
    
    const canvas = canvasRef.current;
    const roadWidth = canvas.width * 0.8;
    const roadStart = canvas.width * 0.1;
    const laneWidth = roadWidth / 3;
    
    // Calculate lane centers
    const leftLaneCenter = roadStart + (laneWidth - playerCar.width) / 2;
    const centerLaneCenter = roadStart + laneWidth + (laneWidth - playerCar.width) / 2;
    const rightLaneCenter = roadStart + laneWidth * 2 + (laneWidth - playerCar.width) / 2;
    
    setPlayerCar(prev => {
      // Determine current lane and move to the left lane
      if (Math.abs(prev.x - rightLaneCenter) < 10) {
        return { ...prev, x: centerLaneCenter };
      } else if (Math.abs(prev.x - centerLaneCenter) < 10) {
        return { ...prev, x: leftLaneCenter };
      }
      return prev; // Already in leftmost lane
    });
  }, [canvasRef, gameState, playerCar.width]);

  const moveCarRight = useCallback(() => {
    if (!canvasRef.current || gameState !== 'playing') return;
    
    const canvas = canvasRef.current;
    const roadWidth = canvas.width * 0.8;
    const roadStart = canvas.width * 0.1;
    const laneWidth = roadWidth / 3;
    
    // Calculate lane centers
    const leftLaneCenter = roadStart + (laneWidth - playerCar.width) / 2;
    const centerLaneCenter = roadStart + laneWidth + (laneWidth - playerCar.width) / 2;
    const rightLaneCenter = roadStart + laneWidth * 2 + (laneWidth - playerCar.width) / 2;
    
    setPlayerCar(prev => {
      // Determine current lane and move to the right lane
      if (Math.abs(prev.x - leftLaneCenter) < 10) {
        return { ...prev, x: centerLaneCenter };
      } else if (Math.abs(prev.x - centerLaneCenter) < 10) {
        return { ...prev, x: rightLaneCenter };
      }
      return prev; // Already in rightmost lane
    });
  }, [canvasRef, gameState, playerCar.width]);

  // Spawn obstacles with variety
  const spawnObstacle = useCallback(() => {
    if (!canvasRef.current) return;
    
    const now = Date.now();
    if (now - lastObstacleSpawn.current < Math.max(1200, 2500 - speed * 80)) return;
    
    const canvas = canvasRef.current;
    const roadWidth = canvas.width * 0.8;
    const roadStart = canvas.width * 0.1;
    const laneWidth = roadWidth / 3;
    
    // Define obstacle types with weights and properties
    const obstacleTypes = [
      { type: 'car', weight: 40, width: 50, height: 80, points: 10 },
      { type: 'truck', weight: 15, width: 65, height: 120, points: 25 },
      { type: 'motorcycle', weight: 20, width: 35, height: 70, points: 15 },
      { type: 'barrier', weight: 15, width: 80, height: 40, points: 20 },
      { type: 'roadwork', weight: 8, width: 70, height: 60, points: 30 },
      { type: 'oilspill', weight: 2, width: 90, height: 30, points: 50 }
    ];
    
    // Weighted random selection
    const totalWeight = obstacleTypes.reduce((sum, obj) => sum + obj.weight, 0);
    let randomWeight = Math.random() * totalWeight;
    let selectedObstacle = obstacleTypes[0];
    
    for (const obstacle of obstacleTypes) {
      randomWeight -= obstacle.weight;
      if (randomWeight <= 0) {
        selectedObstacle = obstacle;
        break;
      }
    }
    
    const lanes = [
      roadStart + (laneWidth - selectedObstacle.width) / 2,
      roadStart + laneWidth + (laneWidth - selectedObstacle.width) / 2,
      roadStart + laneWidth * 2 + (laneWidth - selectedObstacle.width) / 2
    ];
    
    const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
    
    // Color schemes for different obstacles
    const colorSchemes = {
      car: ['#e74c3c', '#9b59b6', '#3498db', '#1abc9c', '#f39c12'],
      truck: ['#34495e', '#2c3e50', '#7f8c8d'],
      motorcycle: ['#e67e22', '#d35400', '#8e44ad'],
      barrier: ['#e67e22'],
      roadwork: ['#f39c12'],
      oilspill: ['#2c3e50']
    };
    
    const colors = colorSchemes[selectedObstacle.type as keyof typeof colorSchemes];
    const obstacleColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newObstacle: Obstacle = {
      id: `obstacle-${obstacleIdCounter.current++}`,
      x: randomLane,
      y: -selectedObstacle.height - 20,
      type: selectedObstacle.type as Obstacle['type'],
      color: obstacleColor,
      width: selectedObstacle.width,
      height: selectedObstacle.height,
      speed: Math.max(1.5, speed * 0.7 + Math.random() * 1.5),
      points: selectedObstacle.points
    };
    
    setObstacles(prev => [...prev, newObstacle]);
    lastObstacleSpawn.current = now;
  }, [canvasRef, speed]);

  // Spawn power-ups
  const spawnPowerUp = useCallback(() => {
    if (!canvasRef.current) return;
    
    const now = Date.now();
    if (now - lastPowerUpSpawn.current < 8000) return; // Spawn every 8 seconds
    
    const canvas = canvasRef.current;
    const roadWidth = canvas.width * 0.8;
    const roadStart = canvas.width * 0.1;
    const laneWidth = roadWidth / 3;
    
    const lanes = [
      roadStart + (laneWidth - 40) / 2,           // Left lane center
      roadStart + laneWidth + (laneWidth - 40) / 2,    // Center lane center
      roadStart + laneWidth * 2 + (laneWidth - 40) / 2 // Right lane center
    ];
    
    const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
    const powerUpTypes: PowerUp['type'][] = ['speed', 'life', 'shield'];
    const randomType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
    
    const colors = {
      speed: '#FFD700',
      life: '#FF69B4',
      shield: '#00CED1'
    };
    
    const newPowerUp: PowerUp = {
      id: `powerup-${powerUpIdCounter.current++}`,
      x: randomLane,
      y: -50,
      type: randomType,
      color: colors[randomType],
      width: 40,
      height: 40,
      speed: Math.max(1.5, speed * 0.6)
    };
    
    setPowerUps(prev => [...prev, newPowerUp]);
    lastPowerUpSpawn.current = now;
  }, [canvasRef, speed]);

  // Update obstacles
  const updateObstacles = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    setObstacles(prev => 
      prev
        .map(obstacle => ({
          ...obstacle,
          y: obstacle.y + obstacle.speed
        }))
        .filter(obstacle => obstacle.y < canvas.height + 100)
    );
  }, [canvasRef]);

  // Update power-ups
  const updatePowerUps = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    setPowerUps(prev => 
      prev
        .map(powerUp => ({
          ...powerUp,
          y: powerUp.y + powerUp.speed
        }))
        .filter(powerUp => powerUp.y < canvas.height + 100)
    );
  }, [canvasRef]);

  // Check power-up collection
  const checkPowerUpCollection = useCallback(() => {
    const collected = powerUps.filter(powerUp => {
      return (
        playerCar.x < powerUp.x + powerUp.width &&
        playerCar.x + playerCar.width > powerUp.x &&
        playerCar.y < powerUp.y + powerUp.height &&
        playerCar.y + playerCar.height > powerUp.y
      );
    });

    if (collected.length > 0) {
      collected.forEach(powerUp => {
        setPowerUpsCollected(prev => prev + 1);
        switch (powerUp.type) {
          case 'speed':
            setBoost(prev => Math.min(100, prev + 40));
            setSpeed(prev => Math.min(20, prev + 1.5));
            break;
          case 'life':
            setLives(prev => Math.min(5, prev + 1));
            break;
          case 'shield':
            setBoost(prev => Math.min(100, prev + 60));
            break;
        }
      });
      
      // Remove collected power-ups
      setPowerUps(prev => 
        prev.filter(powerUp => !collected.some(c => c.id === powerUp.id))
      );
    }
  }, [powerUps, playerCar]);

  // Check collisions and award points for near misses
  const checkCollisions = useCallback(() => {
    const collidedObstacles = obstacles.filter(obstacle => {
      return (
        playerCar.x < obstacle.x + obstacle.width &&
        playerCar.x + playerCar.width > obstacle.x &&
        playerCar.y < obstacle.y + obstacle.height &&
        playerCar.y + playerCar.height > obstacle.y
      );
    });

    if (collidedObstacles.length > 0) {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameState('gameOver');
        }
        return newLives;
      });
      
      // Remove collided obstacles
      setObstacles(prev => 
        prev.filter(obstacle => !collidedObstacles.some(c => c.id === obstacle.id))
      );
    } else {
      // Award bonus points for near misses (obstacles passing the player)
      const nearMissObstacles = obstacles.filter(obstacle => 
        obstacle.y > playerCar.y + playerCar.height + 20 && 
        obstacle.y < playerCar.y + playerCar.height + 50 &&
        Math.abs(obstacle.x - playerCar.x) < 100
      );
      
      if (nearMissObstacles.length > 0) {
        const bonusPoints = nearMissObstacles.reduce((sum, obs) => sum + (obs.points || 10), 0);
        setScore(prev => prev + bonusPoints);
        setObstaclesAvoided(prev => prev + nearMissObstacles.length);
      }
    }
  }, [obstacles, playerCar, setGameState]);

  // Main game loop
  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;
    
    // Initialize car position and game start time if needed
    if (playerCar.x === 0 && playerCar.y === 0) {
      initializePlayerCar();
      if (gameStartTime === 0) {
        setGameStartTime(Date.now());
      }
    }
    
    // Update score with boost multiplier
    const baseScore = boost > 0 ? 2 : 1;
    const scoreMultiplier = boost > 0 ? Math.min(3, 1 + (boost / 50)) : 1;
    setScore(prev => prev + Math.round(baseScore * scoreMultiplier));
    
    // Decrease boost over time (slower decrease)
    setBoost(prev => Math.max(0, prev - 0.3));
    
    // Increase speed gradually and much slower
    setSpeed(prev => Math.min(15, prev + (boost > 0 ? 0.002 : 0.001)));
    
    // Spawn and update obstacles
    spawnObstacle();
    updateObstacles();
    
    // Spawn and update power-ups
    spawnPowerUp();
    updatePowerUps();
    
    // Check collisions and power-up collection
    checkCollisions();
    checkPowerUpCollection();
  }, [gameState, playerCar, speed, boost, initializePlayerCar, spawnObstacle, updateObstacles, spawnPowerUp, updatePowerUps, checkCollisions, checkPowerUpCollection]);

  // Toggle pause
  const togglePause = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('playing');
    }
  }, [gameState, setGameState]);

  // Reset game
  const resetGame = useCallback(() => {
    setScore(0);
    setSpeed(3);
    setLives(3);
    setBoost(0);
    setObstacles([]);
    setPowerUps([]);
    setObstaclesAvoided(0);
    setPowerUpsCollected(0);
    setGameStartTime(0);
    obstacleIdCounter.current = 0;
    powerUpIdCounter.current = 0;
    lastObstacleSpawn.current = 0;
    lastPowerUpSpawn.current = 0;
    
    // Reset player car position to center lane
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const roadWidth = canvas.width * 0.8;
      const roadStart = canvas.width * 0.1;
      const laneWidth = roadWidth / 3;
      
      // Place in center lane, properly centered
      const centerLaneX = roadStart + laneWidth + (laneWidth - 60) / 2; // 60 is car width
      
      setPlayerCar(prev => ({
        ...prev,
        x: centerLaneX,
        y: canvas.height - prev.height - 50
      }));
    }
  }, [canvasRef]);

  return {
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
  };
};
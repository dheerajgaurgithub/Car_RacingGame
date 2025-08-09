import React, { forwardRef, useEffect, useRef } from 'react';
import { Car, Obstacle, PowerUp } from './RacingGame';

interface GameCanvasProps {
  playerCar: Car;
  obstacles: Obstacle[];
  powerUps: PowerUp[];
  speed: number;
}

export const GameCanvas = forwardRef<HTMLCanvasElement, GameCanvasProps>(
  ({ playerCar, obstacles, powerUps, speed }, ref) => {
    const animationRef = useRef<number>();
    const roadOffsetRef = useRef(0);

    useEffect(() => {
      const canvas = ref as React.RefObject<HTMLCanvasElement>;
      if (!canvas?.current) return;

      const ctx = canvas.current.getContext('2d');
      if (!ctx) return;

      const animate = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.current!.width, canvas.current!.height);

        // Update road offset for scrolling effect - scales with speed
        roadOffsetRef.current += speed * 2;
        if (roadOffsetRef.current > 100) roadOffsetRef.current = 0;

        // Draw road
        drawRoad(ctx, canvas.current!.width, canvas.current!.height, roadOffsetRef.current);

        // Draw player car
        drawCar(ctx, playerCar);

        // Draw obstacles
        obstacles.forEach(obstacle => drawObstacle(ctx, obstacle));

        // Draw power-ups
        powerUps.forEach(powerUp => drawPowerUp(ctx, powerUp));

        animationRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [playerCar, obstacles, powerUps, speed, ref]);

    const drawRoad = (ctx: CanvasRenderingContext2D, width: number, height: number, offset: number) => {
      // Sky/background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0f0f23');
      gradient.addColorStop(1, '#1a1a2e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Road surface
      const roadWidth = width * 0.8;
      const roadStart = width * 0.1;
      
      ctx.fillStyle = '#2c2c2c';
      ctx.fillRect(roadStart, 0, roadWidth, height);

      // Road lanes - 3 equal lanes
      const laneWidth = roadWidth / 3;
      
      // Lane markings (white dashed lines)
      ctx.fillStyle = '#ffffff';
      const lineWidth = 4;
      const lineHeight = 50;
      const lineSpacing = 100;

      // Center line (between lane 1 and 2)
      const centerLine1X = roadStart + laneWidth - lineWidth / 2;
      for (let y = -lineHeight + (offset % lineSpacing); y < height; y += lineSpacing) {
        ctx.fillRect(centerLine1X, y, lineWidth, lineHeight);
      }

      // Center line (between lane 2 and 3)  
      const centerLine2X = roadStart + laneWidth * 2 - lineWidth / 2;
      for (let y = -lineHeight + (offset % lineSpacing); y < height; y += lineSpacing) {
        ctx.fillRect(centerLine2X, y, lineWidth, lineHeight);
      }

      // Road edges (yellow solid lines)
      ctx.fillStyle = '#ffff00';
      const edgeWidth = 6;
      ctx.fillRect(roadStart - edgeWidth/2, 0, edgeWidth, height); // Left edge
      ctx.fillRect(roadStart + roadWidth - edgeWidth/2, 0, edgeWidth, height); // Right edge

      // Road shoulder effect
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, roadStart, height); // Left shoulder
      ctx.fillRect(roadStart + roadWidth, 0, width - (roadStart + roadWidth), height); // Right shoulder
    };

    const drawCar = (ctx: CanvasRenderingContext2D, car: Car) => {
      ctx.save();
      
      // Luxury car shadow with depth
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(car.x + 3, car.y + car.height - 1, car.width, 10);
      
      // Main car body - luxury dark color with gradient effect
      const gradient = ctx.createLinearGradient(car.x, car.y, car.x, car.y + car.height);
      gradient.addColorStop(0, '#2c3e50');
      gradient.addColorStop(0.5, '#1a1a2e');
      gradient.addColorStop(1, '#0f0f23');
      ctx.fillStyle = gradient;
      ctx.fillRect(car.x, car.y, car.width, car.height);
      
      // Luxury car roof (glossy effect)
      const roofGradient = ctx.createLinearGradient(car.x, car.y, car.x, car.y + car.height * 0.4);
      roofGradient.addColorStop(0, '#34495e');
      roofGradient.addColorStop(1, '#2c3e50');
      ctx.fillStyle = roofGradient;
      ctx.fillRect(car.x + car.width * 0.1, car.y + car.height * 0.1, car.width * 0.8, car.height * 0.3);
      
      // Chrome accents
      ctx.fillStyle = '#bdc3c7';
      ctx.fillRect(car.x + car.width * 0.05, car.y + car.height * 0.45, car.width * 0.9, 3);
      ctx.fillRect(car.x + car.width * 0.15, car.y + car.height * 0.15, car.width * 0.7, 2);
      
      // Luxury headlights
      ctx.fillStyle = '#f39c12';
      ctx.fillRect(car.x + car.width * 0.1, car.y + car.height * 0.05, car.width * 0.25, car.height * 0.08);
      ctx.fillRect(car.x + car.width * 0.65, car.y + car.height * 0.05, car.width * 0.25, car.height * 0.08);
      
      // Premium wheels with rims
      ctx.fillStyle = '#2c3e50';
      const wheelWidth = car.width * 0.22;
      const wheelHeight = car.height * 0.18;
      
      // Front wheels
      ctx.fillRect(car.x - 2, car.y + car.height * 0.18, wheelWidth, wheelHeight);
      ctx.fillRect(car.x + car.width - wheelWidth + 2, car.y + car.height * 0.18, wheelWidth, wheelHeight);
      
      // Rear wheels  
      ctx.fillRect(car.x - 2, car.y + car.height * 0.62, wheelWidth, wheelHeight);
      ctx.fillRect(car.x + car.width - wheelWidth + 2, car.y + car.height * 0.62, wheelWidth, wheelHeight);
      
      // Chrome wheel rims
      ctx.fillStyle = '#95a5a6';
      const rimSize = wheelWidth * 0.6;
      const rimOffset = (wheelWidth - rimSize) / 2;
      
      ctx.fillRect(car.x - 2 + rimOffset, car.y + car.height * 0.18 + rimOffset, rimSize, rimSize);
      ctx.fillRect(car.x + car.width - wheelWidth + 2 + rimOffset, car.y + car.height * 0.18 + rimOffset, rimSize, rimSize);
      ctx.fillRect(car.x - 2 + rimOffset, car.y + car.height * 0.62 + rimOffset, rimSize, rimSize);
      ctx.fillRect(car.x + car.width - wheelWidth + 2 + rimOffset, car.y + car.height * 0.62 + rimOffset, rimSize, rimSize);

      ctx.restore();
    };

    const drawObstacle = (ctx: CanvasRenderingContext2D, obstacle: Obstacle) => {
      ctx.save();

      // Common shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(obstacle.x + 2, obstacle.y + obstacle.height - 2, obstacle.width, 6);

      switch (obstacle.type) {
        case 'car':
          // Regular car
          ctx.fillStyle = obstacle.color;
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
          ctx.fillStyle = '#222';
          ctx.fillRect(obstacle.x + obstacle.width * 0.1, obstacle.y + obstacle.height * 0.2, obstacle.width * 0.8, obstacle.height * 0.3);
          
          // Wheels
          ctx.fillStyle = '#000';
          const wheelWidth = obstacle.width * 0.2;
          const wheelHeight = obstacle.height * 0.15;
          ctx.fillRect(obstacle.x, obstacle.y + obstacle.height * 0.2, wheelWidth, wheelHeight);
          ctx.fillRect(obstacle.x + obstacle.width - wheelWidth, obstacle.y + obstacle.height * 0.2, wheelWidth, wheelHeight);
          ctx.fillRect(obstacle.x, obstacle.y + obstacle.height * 0.65, wheelWidth, wheelHeight);
          ctx.fillRect(obstacle.x + obstacle.width - wheelWidth, obstacle.y + obstacle.height * 0.65, wheelWidth, wheelHeight);
          break;

        case 'truck':
          // Large truck with trailer
          ctx.fillStyle = obstacle.color;
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
          
          // Truck cab
          ctx.fillStyle = '#2c3e50';
          ctx.fillRect(obstacle.x + obstacle.width * 0.1, obstacle.y + obstacle.height * 0.1, obstacle.width * 0.8, obstacle.height * 0.25);
          
          // Truck wheels (larger)
          ctx.fillStyle = '#000';
          const truckWheelWidth = obstacle.width * 0.25;
          const truckWheelHeight = obstacle.height * 0.12;
          ctx.fillRect(obstacle.x, obstacle.y + obstacle.height * 0.15, truckWheelWidth, truckWheelHeight);
          ctx.fillRect(obstacle.x + obstacle.width - truckWheelWidth, obstacle.y + obstacle.height * 0.15, truckWheelWidth, truckWheelHeight);
          ctx.fillRect(obstacle.x, obstacle.y + obstacle.height * 0.75, truckWheelWidth, truckWheelHeight);
          ctx.fillRect(obstacle.x + obstacle.width - truckWheelWidth, obstacle.y + obstacle.height * 0.75, truckWheelWidth, truckWheelHeight);
          break;

        case 'motorcycle':
          // Motorcycle (narrow)
          ctx.fillStyle = obstacle.color;
          ctx.fillRect(obstacle.x + obstacle.width * 0.2, obstacle.y, obstacle.width * 0.6, obstacle.height);
          
          // Motorcycle wheels (small circles)
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.arc(obstacle.x + obstacle.width * 0.5, obstacle.y + obstacle.height * 0.25, obstacle.width * 0.15, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(obstacle.x + obstacle.width * 0.5, obstacle.y + obstacle.height * 0.75, obstacle.width * 0.15, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'barrier':
          // Construction barrier
          ctx.fillStyle = obstacle.color;
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
          
          // Barrier stripes
          ctx.fillStyle = '#ffff00';
          for (let i = 0; i < obstacle.height; i += 20) {
            ctx.fillRect(obstacle.x, obstacle.y + i, obstacle.width, 10);
          }
          break;

        case 'roadwork':
          // Roadwork sign
          ctx.fillStyle = obstacle.color;
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
          
          // Warning triangle
          ctx.fillStyle = '#ff0000';
          ctx.beginPath();
          ctx.moveTo(obstacle.x + obstacle.width * 0.5, obstacle.y + obstacle.height * 0.2);
          ctx.lineTo(obstacle.x + obstacle.width * 0.2, obstacle.y + obstacle.height * 0.8);
          ctx.lineTo(obstacle.x + obstacle.width * 0.8, obstacle.y + obstacle.height * 0.8);
          ctx.closePath();
          ctx.fill();
          
          // Exclamation mark
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(obstacle.x + obstacle.width * 0.45, obstacle.y + obstacle.height * 0.35, obstacle.width * 0.1, obstacle.height * 0.3);
          ctx.fillRect(obstacle.x + obstacle.width * 0.45, obstacle.y + obstacle.height * 0.7, obstacle.width * 0.1, obstacle.height * 0.05);
          break;

        case 'oilspill':
          // Oil spill (dark puddle)
          ctx.fillStyle = obstacle.color;
          ctx.beginPath();
          ctx.ellipse(obstacle.x + obstacle.width * 0.5, obstacle.y + obstacle.height * 0.5, 
                     obstacle.width * 0.4, obstacle.height * 0.3, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Oil shine effect
          ctx.fillStyle = 'rgba(100, 100, 100, 0.3)';
          ctx.beginPath();
          ctx.ellipse(obstacle.x + obstacle.width * 0.4, obstacle.y + obstacle.height * 0.4, 
                     obstacle.width * 0.15, obstacle.height * 0.1, 0, 0, Math.PI * 2);
          ctx.fill();
          break;
      }

      ctx.restore();
    };

    const drawPowerUp = (ctx: CanvasRenderingContext2D, powerUp: PowerUp) => {
      ctx.save();

      // Glowing effect for power-ups
      const time = Date.now() * 0.005;
      const glow = Math.sin(time) * 0.5 + 0.5;
      
      // Shadow/glow effect
      ctx.shadowColor = powerUp.color;
      ctx.shadowBlur = 20 + glow * 10;
      
      if (powerUp.type === 'speed') {
        // Golden lightning bolt for speed boost
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.moveTo(powerUp.x + powerUp.width * 0.3, powerUp.y);
        ctx.lineTo(powerUp.x + powerUp.width * 0.7, powerUp.y + powerUp.height * 0.4);
        ctx.lineTo(powerUp.x + powerUp.width * 0.5, powerUp.y + powerUp.height * 0.4);
        ctx.lineTo(powerUp.x + powerUp.width * 0.8, powerUp.y + powerUp.height);
        ctx.lineTo(powerUp.x + powerUp.width * 0.4, powerUp.y + powerUp.height * 0.6);
        ctx.lineTo(powerUp.x + powerUp.width * 0.6, powerUp.y + powerUp.height * 0.6);
        ctx.closePath();
        ctx.fill();
        
        // Inner glow
        ctx.fillStyle = '#FFFF99';
        ctx.beginPath();
        ctx.moveTo(powerUp.x + powerUp.width * 0.4, powerUp.y + powerUp.height * 0.2);
        ctx.lineTo(powerUp.x + powerUp.width * 0.6, powerUp.y + powerUp.height * 0.5);
        ctx.lineTo(powerUp.x + powerUp.width * 0.5, powerUp.y + powerUp.height * 0.5);
        ctx.lineTo(powerUp.x + powerUp.width * 0.7, powerUp.y + powerUp.height * 0.8);
        ctx.lineTo(powerUp.x + powerUp.width * 0.5, powerUp.y + powerUp.height * 0.7);
        ctx.lineTo(powerUp.x + powerUp.width * 0.55, powerUp.y + powerUp.height * 0.7);
        ctx.closePath();
        ctx.fill();
      } else if (powerUp.type === 'life') {
        // Heart shape for life
        ctx.fillStyle = '#FF69B4';
        const centerX = powerUp.x + powerUp.width / 2;
        const centerY = powerUp.y + powerUp.height / 2;
        const size = powerUp.width * 0.3;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + size * 0.3);
        ctx.bezierCurveTo(centerX - size * 0.5, centerY - size * 0.3, centerX - size, centerY + size * 0.1, centerX, centerY + size * 0.7);
        ctx.bezierCurveTo(centerX + size, centerY + size * 0.1, centerX + size * 0.5, centerY - size * 0.3, centerX, centerY + size * 0.3);
        ctx.fill();
      } else {
        // Shield for protection
        ctx.fillStyle = '#00CED1';
        ctx.beginPath();
        ctx.moveTo(powerUp.x + powerUp.width * 0.5, powerUp.y);
        ctx.lineTo(powerUp.x + powerUp.width * 0.8, powerUp.y + powerUp.height * 0.3);
        ctx.lineTo(powerUp.x + powerUp.width * 0.8, powerUp.y + powerUp.height * 0.7);
        ctx.lineTo(powerUp.x + powerUp.width * 0.5, powerUp.y + powerUp.height);
        ctx.lineTo(powerUp.x + powerUp.width * 0.2, powerUp.y + powerUp.height * 0.7);
        ctx.lineTo(powerUp.x + powerUp.width * 0.2, powerUp.y + powerUp.height * 0.3);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    };

    // Responsive canvas sizing
    const getCanvasSize = () => {
      const maxWidth = 1200;
      const maxHeight = 800;
      const minWidth = 320;
      const minHeight = 480;
      
      const width = Math.min(maxWidth, Math.max(minWidth, window.innerWidth));
      const height = Math.min(maxHeight, Math.max(minHeight, window.innerHeight));
      
      return { width, height };
    };

    const { width: canvasWidth, height: canvasHeight } = getCanvasSize();

    return (
      <canvas
        ref={ref}
        className="absolute inset-0 w-full h-full object-contain"
        width={canvasWidth}
        height={canvasHeight}
        style={{
          maxWidth: '100vw',
          maxHeight: '100vh',
          margin: 'auto',
          display: 'block'
        }}
      />
    );
  }
);
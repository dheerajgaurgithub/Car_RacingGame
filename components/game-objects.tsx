interface Obstacle {
  id: number
  x: number
  y: number
  speed: number
  passed: boolean
}

interface PowerUp {
  id: number
  x: number
  y: number
  type: "shield" | "slowmo" | "points"
  collected: boolean
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
}

interface GameObjectsProps {
  obstacles: Obstacle[]
  powerUps: PowerUp[]
  particles: Particle[]
  OBSTACLE_WIDTH: number
  OBSTACLE_HEIGHT: number
}

export default function GameObjects({
  obstacles,
  powerUps,
  particles,
  OBSTACLE_WIDTH,
  OBSTACLE_HEIGHT,
}: GameObjectsProps) {
  return (
    <>
      {/* Obstacles */}
      {obstacles.map((obstacle) => (
        <div
          key={obstacle.id}
          className="absolute z-10"
          style={{
            left: obstacle.x,
            top: obstacle.y,
            width: OBSTACLE_WIDTH,
            height: OBSTACLE_HEIGHT,
          }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/png-clipart-car-bird-s-eye-view-top-view-plan-view-black-sport-utility-vehicle-product-design-postscript-removebg-preview-qtkkMEZDEdspLRu5mccNF7CCpDwA0m.png"
            alt="Obstacle car"
            className="w-full h-full object-contain drop-shadow-lg"
            style={{ transform: "rotate(180deg)" }}
          />
        </div>
      ))}

      {/* Power-ups */}
      {powerUps.map((powerUp) => (
        <div
          key={powerUp.id}
          className="absolute z-10 animate-bounce"
          style={{
            left: powerUp.x + OBSTACLE_WIDTH / 2 - 20,
            top: powerUp.y,
            width: 40,
            height: 40,
          }}
        >
          <div
            className={`w-full h-full rounded-full flex items-center justify-center text-2xl font-bold ${
              powerUp.type === "shield" ? "bg-blue-500" : powerUp.type === "slowmo" ? "bg-purple-500" : "bg-yellow-500"
            }`}
          >
            {powerUp.type === "shield" ? "🛡️" : powerUp.type === "slowmo" ? "⏰" : "💎"}
          </div>
        </div>
      ))}

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute z-10 pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: 4,
            height: 4,
            backgroundColor: particle.color,
            opacity: particle.life / particle.maxLife,
            borderRadius: "50%",
          }}
        />
      ))}
    </>
  )
}

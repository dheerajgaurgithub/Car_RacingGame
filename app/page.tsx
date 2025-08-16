"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import LandingPage from "@/components/landing-page"
import GameBackground from "@/components/game-background"
import GameHUD from "@/components/game-hud"
import PlayerCar from "@/components/player-car"
import GameObjects from "@/components/game-objects"
import GameOverModal from "@/components/game-over-modal"

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

interface GameStats {
  totalDistance: number
  averageReactionTime: number
  perfectDodges: number
  powerUpsCollected: number
  maxCombo: number
}

const PLAYER_WIDTH = 110
const PLAYER_HEIGHT = 140
const OBSTACLE_WIDTH = 120
const OBSTACLE_HEIGHT = 150

export default function CarRacingGame() {
  const [gameState, setGameState] = useState<"landing" | "playing" | "gameOver">("landing")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [playerLane, setPlayerLane] = useState(1)
  const [playerX, setPlayerX] = useState(0)
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [gameSpeed, setGameSpeed] = useState(3)
  const [gameWidth, setGameWidth] = useState(400)
  const [gameHeight, setGameHeight] = useState(600)
  const [lanes, setLanes] = useState([80, 160, 240, 320])

  const [powerUps, setPowerUps] = useState<PowerUp[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [weatherEffect, setWeatherEffect] = useState<"clear" | "rain" | "night">("clear")
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [shieldActive, setShieldActive] = useState(false)
  const [slowMotion, setSlowMotion] = useState(false)
  const [gameStats, setGameStats] = useState<GameStats>({
    totalDistance: 0,
    averageReactionTime: 0,
    perfectDodges: 0,
    powerUpsCollected: 0,
    maxCombo: 0,
  })
  const [fps, setFps] = useState(60)
  const [reactionTimes, setReactionTimes] = useState<number[]>([])

  const gameLoopRef = useRef<number>()
  const obstacleIdRef = useRef(0)
  const powerUpIdRef = useRef(0)
  const particleIdRef = useRef(0)
  const lastObstacleRef = useRef(0)
  const lastPowerUpRef = useRef(0)
  const animationRef = useRef<number>()
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const playerY = useRef(0)
  const lastFrameTime = useRef(Date.now())
  const frameCount = useRef(0)
  const lastMoveTime = useRef(Date.now())

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setGameWidth(width)
      setGameHeight(height)
      playerY.current = height - 150

      const laneWidth = width / 4
      const newLanes = [
        laneWidth * 0.5 - PLAYER_WIDTH / 2,
        laneWidth * 1.5 - PLAYER_WIDTH / 2,
        laneWidth * 2.5 - PLAYER_WIDTH / 2,
        laneWidth * 3.5 - PLAYER_WIDTH / 2,
      ]
      setLanes(newLanes)
      setPlayerX(newLanes[1])
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (lanes.length > 0 && gameState === "playing") {
      const targetX = lanes[playerLane]
      const animateMovement = () => {
        setPlayerX((currentX) => {
          const diff = targetX - currentX
          if (Math.abs(diff) < 1) return targetX
          return currentX + diff * (slowMotion ? 0.1 : 0.2)
        })
        animationRef.current = requestAnimationFrame(animateMovement)
      }
      animationRef.current = requestAnimationFrame(animateMovement)
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [playerLane, lanes, gameState, slowMotion])

  useEffect(() => {
    const saved = localStorage.getItem("carRacingHighScore")
    if (saved) setHighScore(Number.parseInt(saved))
  }, [])

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem("carRacingHighScore", score.toString())
    }
  }, [score, highScore])

  const createParticles = useCallback((x: number, y: number, color: string, count = 5) => {
    const newParticles: Particle[] = []
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x: x + Math.random() * 40 - 20,
        y: y + Math.random() * 40 - 20,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 60,
        maxLife: 60,
        color,
      })
    }
    setParticles((prev) => [...prev, ...newParticles])
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (gameState !== "playing") return
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    lastMoveTime.current = Date.now()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (gameState !== "playing" || !touchStartRef.current) return
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y)
    const reactionTime = Date.now() - lastMoveTime.current

    if (Math.abs(deltaX) > 25 && deltaY < 100) {
      setReactionTimes((prev) => [...prev.slice(-9), reactionTime])
      if (deltaX > 0) {
        setPlayerLane((prev) => Math.min(3, prev + 1))
      } else {
        setPlayerLane((prev) => Math.max(0, prev - 1))
      }
    }
    touchStartRef.current = null
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== "playing") return
      const reactionTime = Date.now() - lastMoveTime.current
      lastMoveTime.current = Date.now()

      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault()
          setReactionTimes((prev) => [...prev.slice(-9), reactionTime])
          setPlayerLane((prev) => Math.max(0, prev - 1))
          break
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault()
          setReactionTimes((prev) => [...prev.slice(-9), reactionTime])
          setPlayerLane((prev) => Math.min(3, prev + 1))
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameState])

  const startGame = useCallback(() => {
    setGameState("playing")
  }, [])

  const endGame = useCallback(() => {
    setGameState("gameOver")
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current)
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const checkCollision = useCallback(
    (obstacle: Obstacle) => {
      if (shieldActive) return false

      const playerLeft = playerX + 10
      const playerRight = playerX + PLAYER_WIDTH - 10
      const playerTop = playerY.current + 10
      const playerBottom = playerY.current + PLAYER_HEIGHT - 10

      const obstacleLeft = obstacle.x + 10
      const obstacleRight = obstacle.x + OBSTACLE_WIDTH - 10
      const obstacleTop = obstacle.y + 10
      const obstacleBottom = obstacle.y + OBSTACLE_HEIGHT - 10

      return (
        playerLeft < obstacleRight &&
        playerRight > obstacleLeft &&
        playerTop < obstacleBottom &&
        playerBottom > obstacleTop
      )
    },
    [playerX, shieldActive],
  )

  const checkPowerUpCollision = useCallback(
    (powerUp: PowerUp) => {
      const playerLeft = playerX
      const playerRight = playerX + PLAYER_WIDTH
      const playerTop = playerY.current
      const playerBottom = playerY.current + PLAYER_HEIGHT

      const powerUpLeft = powerUp.x
      const powerUpRight = powerUp.x + 40
      const powerUpTop = powerUp.y
      const powerUpBottom = powerUp.y + 40

      return (
        playerLeft < powerUpRight && playerRight > powerUpLeft && playerTop < powerUpBottom && playerBottom > powerUpTop
      )
    },
    [playerX],
  )

  useEffect(() => {
    if (gameState !== "playing") return

    const gameLoop = () => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastFrameTime.current
      lastFrameTime.current = currentTime

      frameCount.current++
      if (frameCount.current % 60 === 0) {
        setFps(Math.round(1000 / deltaTime))
      }

      if (score > 0 && score % 25 === 0 && Math.random() < 0.1) {
        const effects: ("clear" | "rain" | "night")[] = ["clear", "rain", "night"]
        setWeatherEffect(effects[Math.floor(Math.random() * effects.length)])
      }

      const effectiveSpeed = slowMotion ? gameSpeed * 0.5 : gameSpeed

      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 1,
          }))
          .filter((particle) => particle.life > 0),
      )

      setObstacles((prevObstacles) => {
        const updatedObstacles = prevObstacles
          .map((obstacle) => ({
            ...obstacle,
            y: obstacle.y + obstacle.speed * (slowMotion ? 0.5 : 1),
          }))
          .filter((obstacle) => obstacle.y < gameHeight + 100)

        let perfectDodge = false
        updatedObstacles.forEach((obstacle) => {
          if (!obstacle.passed && obstacle.y > playerY.current + PLAYER_HEIGHT + 20) {
            obstacle.passed = true
            const wasClose = Math.abs(obstacle.x - playerX) < OBSTACLE_WIDTH + 20
            if (wasClose) perfectDodge = true

            setScore((prevScore) => {
              const newScore = prevScore + 1
              setCombo((prev) => {
                const newCombo = prev + 1
                setMaxCombo((current) => Math.max(current, newCombo))
                return newCombo
              })

              if (newScore % 8 === 0) {
                setGameSpeed((prevSpeed) => Math.min(prevSpeed + 0.2, 8))
              }
              return newScore
            })

            createParticles(obstacle.x + OBSTACLE_WIDTH / 2, obstacle.y, "#10b981", 3)
          }
        })

        if (perfectDodge) {
          setGameStats((prev) => ({ ...prev, perfectDodges: prev.perfectDodges + 1 }))
        }

        const spawnInterval = Math.max(1500 - Math.floor(score / 2) * 50, 800)
        if (currentTime - lastObstacleRef.current > spawnInterval) {
          const availableLanes = lanes
            .map((_, index) => {
              const hasNearbyObstacle = updatedObstacles.some(
                (obstacle) =>
                  Math.abs(obstacle.x - lanes[index]) < OBSTACLE_WIDTH / 2 &&
                  obstacle.y > -OBSTACLE_HEIGHT - 400 &&
                  obstacle.y < 200,
              )
              return hasNearbyObstacle ? -1 : index
            })
            .filter((lane) => lane !== -1)

          if (availableLanes.length > 0) {
            const randomLane = availableLanes[Math.floor(Math.random() * availableLanes.length)]
            const newObstacle: Obstacle = {
              id: obstacleIdRef.current++,
              x: lanes[randomLane],
              y: -OBSTACLE_HEIGHT,
              speed: effectiveSpeed + Math.random() * 2,
              passed: false,
            }
            updatedObstacles.push(newObstacle)
            lastObstacleRef.current = currentTime
          }
        }

        const collision = updatedObstacles.some((obstacle) => checkCollision(obstacle))
        if (collision) {
          if (shieldActive) {
            setShieldActive(false)
            createParticles(playerX + PLAYER_WIDTH / 2, playerY.current, "#3b82f6", 8)
          } else {
            setCombo(0)
            endGame()
            return prevObstacles
          }
        }

        return updatedObstacles
      })

      setPowerUps((prev) => {
        const updated = prev
          .map((powerUp) => ({ ...powerUp, y: powerUp.y + effectiveSpeed }))
          .filter((powerUp) => powerUp.y < gameHeight + 50)

        updated.forEach((powerUp) => {
          if (!powerUp.collected && checkPowerUpCollision(powerUp)) {
            powerUp.collected = true
            setGameStats((prev) => ({ ...prev, powerUpsCollected: prev.powerUpsCollected + 1 }))

            switch (powerUp.type) {
              case "shield":
                setShieldActive(true)
                setTimeout(() => setShieldActive(false), 5000)
                createParticles(powerUp.x, powerUp.y, "#3b82f6", 6)
                break
              case "slowmo":
                setSlowMotion(true)
                setTimeout(() => setSlowMotion(false), 3000)
                createParticles(powerUp.x, powerUp.y, "#8b5cf6", 6)
                break
              case "points":
                setScore((prev) => prev + 5)
                createParticles(powerUp.x, powerUp.y, "#f59e0b", 6)
                break
            }
          }
        })

        if (score > 10 && currentTime - lastPowerUpRef.current > 8000 && Math.random() < 0.3) {
          const availableLanes = lanes.filter((_, index) => !updated.some((p) => Math.abs(p.x - lanes[index]) < 60))

          if (availableLanes.length > 0) {
            const randomLane = Math.floor(Math.random() * availableLanes.length)
            const types: PowerUp["type"][] = ["shield", "slowmo", "points"]
            const newPowerUp: PowerUp = {
              id: powerUpIdRef.current++,
              x: availableLanes[randomLane],
              y: -50,
              type: types[Math.floor(Math.random() * types.length)],
              collected: false,
            }
            updated.push(newPowerUp)
            lastPowerUpRef.current = currentTime
          }
        }

        return updated.filter((p) => !p.collected)
      })

      setGameStats((prev) => ({
        ...prev,
        totalDistance: prev.totalDistance + effectiveSpeed,
        averageReactionTime:
          reactionTimes.length > 0 ? reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length : 0,
        maxCombo: Math.max(prev.maxCombo, combo),
      }))

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [
    gameState,
    playerX,
    gameSpeed,
    score,
    endGame,
    lanes,
    gameHeight,
    checkCollision,
    checkPowerUpCollision,
    shieldActive,
    slowMotion,
    combo,
    reactionTimes,
    createParticles,
  ])

  if (gameState === "landing") {
    return <LandingPage onStartGame={startGame} />
  }

  return (
    <div
      className={`fixed inset-0 overflow-hidden transition-all duration-1000 ${
        weatherEffect === "night"
          ? "bg-gradient-to-b from-indigo-900 via-purple-900 to-black"
          : weatherEffect === "rain"
            ? "bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900"
            : "bg-gradient-to-b from-gray-900 via-gray-800 to-black"
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {gameState === "gameOver" && (
        <GameOverModal
          score={score}
          maxCombo={maxCombo}
          gameStats={gameStats}
          highScore={highScore}
          onPlayAgain={() => {
            setScore(0)
            setPlayerLane(1)
            setObstacles([])
            setPowerUps([])
            setParticles([])
            setGameSpeed(3)
            setCombo(0)
            setMaxCombo(0)
            setShieldActive(false)
            setSlowMotion(false)
            setWeatherEffect("clear")
            setReactionTimes([])
            setGameStats({
              totalDistance: 0,
              averageReactionTime: 0,
              perfectDodges: 0,
              powerUpsCollected: 0,
              maxCombo: 0,
            })
            obstacleIdRef.current = 0
            powerUpIdRef.current = 0
            particleIdRef.current = 0
            lastObstacleRef.current = 0
            lastPowerUpRef.current = 0
            if (lanes.length > 0) {
              setPlayerX(lanes[1])
            }
            setGameState("playing")
          }}
          onMainMenu={() => setGameState("landing")}
        />
      )}

      <GameBackground
        weatherEffect={weatherEffect}
        gameWidth={gameWidth}
        gameHeight={gameHeight}
        score={score}
        gameSpeed={gameSpeed}
      />

      {gameState === "playing" && (
        <>
          <GameHUD
            score={score}
            highScore={highScore}
            combo={combo}
            gameSpeed={gameSpeed}
            fps={fps}
            shieldActive={shieldActive}
            slowMotion={slowMotion}
          />

          <PlayerCar
            playerX={playerX}
            playerY={playerY.current}
            shieldActive={shieldActive}
            PLAYER_WIDTH={PLAYER_WIDTH}
            PLAYER_HEIGHT={PLAYER_HEIGHT}
          />

          <GameObjects
            obstacles={obstacles}
            powerUps={powerUps}
            particles={particles}
            OBSTACLE_WIDTH={OBSTACLE_WIDTH}
            OBSTACLE_HEIGHT={OBSTACLE_HEIGHT}
          />

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="text-center mb-4">
              <p className="text-white/90 text-sm font-semibold bg-black/50 px-3 py-1 rounded-full">
                Swipe left or right
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

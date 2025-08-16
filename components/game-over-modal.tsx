"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface GameStats {
  totalDistance: number
  averageReactionTime: number
  perfectDodges: number
  powerUpsCollected: number
  maxCombo: number
}

interface GameOverModalProps {
  score: number
  maxCombo: number
  gameStats: GameStats
  highScore: number
  onPlayAgain: () => void
  onMainMenu: () => void
}

export default function GameOverModal({
  score,
  maxCombo,
  gameStats,
  highScore,
  onPlayAgain,
  onMainMenu,
}: GameOverModalProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50">
      <Card className="p-8 bg-card/95 border-border backdrop-blur-sm max-w-md w-full mx-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-destructive mb-4">Game Over!</h2>
          <div className="space-y-2 mb-6">
            <p className="text-xl text-card-foreground">Cars Passed: {score}</p>
            <p className="text-lg text-muted-foreground">Max Combo: {maxCombo}</p>
            <p className="text-sm text-muted-foreground">Perfect Dodges: {gameStats.perfectDodges}</p>
            <p className="text-sm text-muted-foreground">Power-ups: {gameStats.powerUpsCollected}</p>
            <p className="text-sm text-muted-foreground">Avg Reaction: {Math.round(gameStats.averageReactionTime)}ms</p>
          </div>
          {score === highScore && score > 0 && <p className="text-accent mb-6 text-lg">🎉 New High Score!</p>}
          <div className="space-y-3">
            <Button onClick={onPlayAgain} size="lg" className="bg-primary hover:bg-primary/90 w-full">
              Race Again
            </Button>
            <Button onClick={onMainMenu} variant="outline" size="lg" className="w-full bg-transparent">
              Main Menu
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

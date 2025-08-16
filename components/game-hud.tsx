interface GameHUDProps {
  score: number
  highScore: number
  combo: number
  gameSpeed: number
  fps: number
  shieldActive: boolean
  slowMotion: boolean
}

export default function GameHUD({ score, highScore, combo, gameSpeed, fps, shieldActive, slowMotion }: GameHUDProps) {
  return (
    <>
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="bg-card/90 text-card-foreground px-4 py-2 rounded-lg text-lg font-bold border border-border">
              Score: {score}
            </div>
            {combo > 0 && (
              <div className="bg-accent/90 text-accent-foreground px-3 py-1 rounded-lg text-sm font-bold">
                Combo: {combo}x
              </div>
            )}
          </div>
          <div className="space-y-2 text-right">
            <div className="bg-card/90 text-card-foreground px-4 py-2 rounded-lg text-sm border border-border">
              Best: {highScore}
            </div>
            <div className="bg-card/90 text-card-foreground px-3 py-1 rounded-lg text-xs border border-border">
              Speed: {Math.round(gameSpeed)} | FPS: {fps}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-4 z-10 space-y-2">
        {shieldActive && (
          <div className="bg-blue-500/90 text-white px-3 py-1 rounded-lg text-sm font-bold animate-pulse">
            🛡️ Shield Active
          </div>
        )}
        {slowMotion && (
          <div className="bg-purple-500/90 text-white px-3 py-1 rounded-lg text-sm font-bold animate-pulse">
            ⏰ Slow Motion
          </div>
        )}
      </div>
    </>
  )
}

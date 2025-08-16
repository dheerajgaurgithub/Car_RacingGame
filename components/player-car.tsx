interface PlayerCarProps {
  playerX: number
  playerY: number
  shieldActive: boolean
  PLAYER_WIDTH: number
  PLAYER_HEIGHT: number
}

export default function PlayerCar({ playerX, playerY, shieldActive, PLAYER_WIDTH, PLAYER_HEIGHT }: PlayerCarProps) {
  return (
    <div
      className={`absolute z-10 transition-all duration-200 ${shieldActive ? "animate-pulse" : ""}`}
      style={{
        left: playerX,
        top: playerY,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
      }}
    >
      {shieldActive && (
        <div
          className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping"
          style={{ width: PLAYER_WIDTH + 20, height: PLAYER_HEIGHT + 20, left: -10, top: -10 }}
        />
      )}
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/png-clipart-top-view-plan-view-top-view-plan-view-thumbnail-removebg-preview-3MJ31XPp0Vp5cn2B3u2jmfyxjUzW6g.png"
        alt="Player car"
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
  )
}

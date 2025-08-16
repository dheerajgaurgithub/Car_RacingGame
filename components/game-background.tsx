interface GameBackgroundProps {
  weatherEffect: "clear" | "rain" | "night"
  gameWidth: number
  gameHeight: number
  score: number
  gameSpeed: number
}

export default function GameBackground({
  weatherEffect,
  gameWidth,
  gameHeight,
  score,
  gameSpeed,
}: GameBackgroundProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          weatherEffect === "night"
            ? "bg-gradient-to-b from-indigo-800 to-indigo-900"
            : weatherEffect === "rain"
              ? "bg-gradient-to-b from-gray-600 to-gray-800"
              : "bg-gradient-to-b from-gray-600 to-gray-900"
        }`}
      >
        {/* Lane dividers */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`absolute top-0 bottom-0 w-1 ${weatherEffect === "night" ? "bg-blue-300/60" : "bg-white/80"}`}
            style={{ left: `${(i + 1) * (gameWidth / 4)}px` }}
          />
        ))}

        {/* Road markings */}
        <div className="absolute inset-0 opacity-80">
          {Array.from({ length: Math.ceil(gameHeight / 60) + 3 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-20 rounded-sm ${weatherEffect === "night" ? "bg-blue-300" : "bg-yellow-400"}`}
              style={{
                left: "50%",
                top: `${i * 80 + ((score * (gameSpeed + 2)) % 80) - 80}px`,
                transform: "translateX(-50%)",
              }}
            />
          ))}
        </div>

        {/* Road boundaries */}
        <div
          className={`absolute top-0 bottom-0 w-2 left-0 ${
            weatherEffect === "night" ? "bg-blue-300/60" : "bg-white/60"
          }`}
        />
        <div
          className={`absolute top-0 bottom-0 w-2 right-0 ${
            weatherEffect === "night" ? "bg-blue-300/60" : "bg-white/60"
          }`}
        />
      </div>

      {/* Rain effect */}
      {weatherEffect === "rain" && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-8 bg-blue-300/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${((Date.now() / 10 + i * 50) % (gameHeight + 100)) - 100}px`,
                transform: "rotate(15deg)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

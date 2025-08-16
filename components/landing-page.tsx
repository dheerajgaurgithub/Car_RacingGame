"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Trophy, Zap, Target } from "lucide-react"

interface LandingPageProps {
  onStartGame: () => void
}

export default function LandingPage({ onStartGame }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 racing-gradient opacity-90" />

        {/* Speed lines animation */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-20 bg-accent/30 speed-lines"
              style={{
                left: `${10 + i * 12}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6 tracking-tight">
              LANE
              <span className="text-primary block">RACER</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the ultimate high-speed racing challenge. Dodge obstacles, master the lanes, and push your
              reflexes to the limit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={onStartGame}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-xl font-bold pulse-glow"
              >
                <Play className="mr-2 h-6 w-6" />
                START RACING
              </Button>
            </div>

            <div className="text-center text-muted-foreground">
              <p className="text-sm">
                Developed by{" "}
                <a
                  href="https://dheerajgaurofficial.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors underline"
                >
                  dheerajgaur
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">Game Features</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 text-center bg-card border-border hover:border-accent/50 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Progressive Speed</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience increasing intensity as the game speeds up with every car you pass. Test your reflexes
                against ever-faster challenges.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border-border hover:border-accent/50 transition-colors">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Precision Control</h3>
              <p className="text-muted-foreground leading-relaxed">
                Master smooth lane switching with responsive controls. Perfect for both desktop keyboard and mobile
                touch gameplay.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border-border hover:border-accent/50 transition-colors">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">High Score Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">
                Compete against yourself and track your best performances. Every run is a chance to set a new personal
                record.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-12">How to Play</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Desktop Controls</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-muted px-4 py-2 rounded-lg font-mono text-lg">← →</div>
                  <span className="text-muted-foreground">Arrow Keys</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-muted px-4 py-2 rounded-lg font-mono text-lg">A D</div>
                  <span className="text-muted-foreground">WASD Keys</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Mobile Controls</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-muted px-4 py-2 rounded-lg text-lg">👆</div>
                  <span className="text-muted-foreground">Tap Lane Buttons</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-muted px-4 py-2 rounded-lg text-lg">📱</div>
                  <span className="text-muted-foreground">Touch Lane Areas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

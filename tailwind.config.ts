import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				racing: {
					red: 'hsl(var(--racing-red))',
					blue: 'hsl(var(--racing-blue))',
					yellow: 'hsl(var(--racing-yellow))',
					green: 'hsl(var(--racing-green))',
					cyan: 'hsl(var(--neon-cyan))'
				},
				road: {
					dark: 'hsl(var(--road-dark))',
					line: 'hsl(var(--road-line))'
				}
			},
			backgroundImage: {
				'gradient-road': 'var(--gradient-road)',
				'gradient-sky': 'var(--gradient-sky)',
				'gradient-speed': 'var(--gradient-speed)',
				'gradient-neon': 'var(--gradient-neon)'
			},
			boxShadow: {
				'neon': 'var(--shadow-neon)',
				'car': 'var(--shadow-car)',
				'ui': 'var(--shadow-ui)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'road-scroll': {
					'0%': { transform: 'translateY(-100px)' },
					'100%': { transform: 'translateY(100vh)' }
				},
				'car-move': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'speed-pulse': {
					'0%, 100%': { transform: 'scale(1)', opacity: '1' },
					'50%': { transform: 'scale(1.05)', opacity: '0.8' }
				},
				'obstacle-spawn': {
					'0%': { transform: 'translateY(-100px) scale(0.8)', opacity: '0' },
					'10%': { opacity: '1', transform: 'scale(1)' },
					'100%': { transform: 'translateY(100vh)' }
				},
				'neon-glow': {
					'0%, 100%': { filter: 'drop-shadow(0 0 5px currentColor)' },
					'50%': { filter: 'drop-shadow(0 0 20px currentColor)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'road-scroll': 'road-scroll 2s linear infinite',
				'car-move': 'car-move 0.3s ease-out',
				'speed-pulse': 'speed-pulse 1s ease-in-out infinite',
				'obstacle-spawn': 'obstacle-spawn 3s linear infinite',
				'neon-glow': 'neon-glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				accent: "#2563EB",
				accentSecondary: "#06B6D4",
				neutral: "#94A3B8",
			  
				light: {
				  background: "#F9FAFB",
				  surface: "#FFFFFF",
				  text: {
					primary: "#0F172A",
					secondary: "#475569",
				  },
				},
			  
				dark: {
				  background: "#020617",
				  surface: "#111827",
				  text: {
					primary: "#E5E7EB",
					secondary: "#9CA3AF",
				  },
				},
			},
			  

			screens: {
				// Minimum width breakpoints
				'sm': {'min': '576px'},
				'md': {'min': '768px'},
				'lg': {'min': '992px'},
				'xl': {'min': '1200px'},
			},

			keyframes: {
				slot: {
					// Item 1
					'0%, 15%':   { transform: 'translateY(0%)' },
					// Item 2
					'25%, 40%':  { transform: 'translateY(-20%)' },
					// Item 3
					'50%, 65%':  { transform: 'translateY(-40%)' },
					// Item 4
					'75%, 90%':  { transform: 'translateY(-60%)' },

					// Item 4, duplicate
					'100%':      { transform: 'translateY(-80%)' },
				}
			},

			animation: {
				// Cubic Bezier arguments: (x1, y1, x2, y2) - x values are when the speed changes and y values are how fast the speed changes
				slot: "slot 10s ease-in-out infinite"
			}
		},
	},
	plugins: [],
};


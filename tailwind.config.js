/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        kodium: {
          primary: '#7C3AED', // purple
          secondary: '#6366F1', // indigo
          accent: '#0284C7', // blue
          highlight: '#38BDF8', // cyan
          success: '#10B981', // emerald
          warning: '#F59E0B', // amber
          danger: '#EF4444', // red
        },
      },
      backgroundImage: {
        'kodium-glass': 'radial-gradient(at top left, rgba(124,58,237,0.15), rgba(56,189,248,0.15))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 0 0 rgba(56,189,248,0.4)' },
          '100%': { boxShadow: '0 0 20px 10px rgba(56,189,248,0.8)' },
        },
      },
    },
  },
  plugins: [],
};

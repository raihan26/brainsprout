/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kid: ['"Comic Sans MS"', '"Comic Sans"', '"Chalkboard SE"', 'system-ui', 'sans-serif'],
      },
      colors: {
        sun: '#FFD166',
        sky: '#4CC9F0',
        grass: '#06D6A0',
        berry: '#EF476F',
        plum: '#9D4EDD',
        cream: '#FFF7E6',
      },
      boxShadow: {
        kid: '0 8px 0 rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.10)',
        kidPress: '0 2px 0 rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.10)',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '60%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        sparkle: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'scale(0.8) rotate(360deg)', opacity: '0' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-6px)' },
          '75%': { transform: 'translateX(6px)' },
        },
        drive: {
          '0%': { transform: 'translateX(-30%)' },
          '100%': { transform: 'translateX(130%)' },
        },
        bounceTruck: {
          '0%,100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%': { transform: 'translateY(-3px) rotate(1deg)' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.7' },
          '90%': { opacity: '0.7' },
          '100%': { transform: 'translateY(-110vh) rotate(360deg)', opacity: '0' },
        },
        'bounce-slow': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'confetti-pop': {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.5) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' },
        },
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        pop: 'pop 0.4s ease-out',
        wiggle: 'wiggle 0.6s ease-in-out infinite',
        floaty: 'floaty 2s ease-in-out infinite',
        sparkle: 'sparkle 1.2s ease-out',
        shake: 'shake 0.4s ease-in-out',
        drive: 'drive 14s linear infinite',
        bounceTruck: 'bounceTruck 0.4s ease-in-out infinite',
        'float-up': 'float-up var(--duration, 8s) linear infinite',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
        'confetti-pop': 'confetti-pop 0.8s ease-out forwards',
        'gradient-x': 'gradient-x 3s ease infinite',
      },
    },
  },
  plugins: [],
};

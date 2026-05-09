/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fredoka"', 'system-ui', 'sans-serif'],
        body: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      colors: {
        sun: '#f4a261',
        sunLight: '#fde8cd',
        sky: '#219ebc',
        skyLight: '#d4eef5',
        grass: '#2a9d8f',
        grassLight: '#d0f0ec',
        berry: '#e76f51',
        berryLight: '#fce0d9',
        plum: '#7b2cbf',
        plumLight: '#eddcf8',
        cream: '#fefae0',
        creamDark: '#f5eed6',
        bark: '#3d2c2e',
        slate: '#264653',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        kid: '0 6px 0 rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
        kidPress: '0 2px 0 rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
        kidHover: '0 8px 0 rgba(0,0,0,0.14), 0 6px 24px rgba(0,0,0,0.10)',
        card: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        glow: '0 0 20px rgba(244,162,97,0.3)',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '60%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
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
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-110vh) rotate(360deg)', opacity: '0' },
        },
        'bounce-slow': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
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
        'slide-up': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        pop: 'pop 0.4s ease-out',
        wiggle: 'wiggle 0.5s ease-in-out infinite',
        floaty: 'floaty 2.5s ease-in-out infinite',
        sparkle: 'sparkle 1.2s ease-out',
        shake: 'shake 0.4s ease-in-out',
        drive: 'drive 14s linear infinite',
        bounceTruck: 'bounceTruck 0.4s ease-in-out infinite',
        'float-up': 'float-up var(--duration, 8s) linear infinite',
        'bounce-slow': 'bounce-slow 2.5s ease-in-out infinite',
        'confetti-pop': 'confetti-pop 0.8s ease-out forwards',
        'gradient-x': 'gradient-x 4s ease infinite',
        'slide-up': 'slide-up 0.5s ease-out both',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

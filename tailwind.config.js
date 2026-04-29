/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#F9F8FF',
        surface: '#ffffff',
        surfaceMuted: '#EEF3FF',
        surfaceStrong: '#E4E9FF',
        primary: '#4880FF',
        primarySoft: '#EEF3FF',
        secondary: '#918BFF',
        secondarySoft: '#F0ECFF',
        textMain: '#283351',
        textMuted: '#6F7894',
        outlineSoft: '#E8ECFF'
      },
      borderRadius: {
        card: '16px',
        control: '8px'
      }
    }
  },
  plugins: []
};

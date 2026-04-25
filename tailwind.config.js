/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#faf8ff',
        surface: '#ffffff',
        surfaceMuted: '#eaedff',
        surfaceStrong: '#dae2ff',
        primary: '#0053ce',
        primarySoft: '#dae2ff',
        secondary: '#7146b6',
        secondarySoft: '#ecdcff',
        textMain: '#0f1a37',
        textMuted: '#424654',
        outlineSoft: '#c3c6d7'
      },
      borderRadius: {
        card: '16px',
        control: '8px'
      }
    }
  },
  plugins: []
};

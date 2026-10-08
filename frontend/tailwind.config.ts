import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0B0F17',
        obsidian: '#151C28',
        amber: '#F59E0B',
        paper: '#FFFFFF'
      },
      boxShadow: {
        glow: '0 0 20px rgba(245, 158, 11, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;

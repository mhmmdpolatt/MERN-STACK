module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        typewriter: {
          '0%': { opacity: 1, width: '0' },
          '100%': { opacity: 1, width: '100%' },
        },
        slideIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out forwards',
        'slide-in': 'slideIn 1s ease-in-out forwards',
        'typewriter': 'typewriter 4s steps(30, end) infinite',
      },
    },
  },
  plugins: [],
};

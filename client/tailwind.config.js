// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-transparent': 'var(--color-primary-transparent)',
        secondary: 'var(--color-secondary)',
        'secondary-transparent': 'var(--color-secondary-transparent)',
        background: 'var(--color-background)',
        'background-transparent': 'var(--color-background-transparent)',
        white: 'var(--color-white)',
        'white-transparent': 'var(--color-white-transparent)',
        // Add other colors as needed
        black: '#191b17',
      },
      container: {
        width: {
          lg: 'var(--container-width-lg)',
          md: 'var(--container-width-md)',
          sm: 'var(--container-width-sm)',
          form: 'var(--form-width)',
        },
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--transition)',
      },
    },
  },
  plugins: [],
};

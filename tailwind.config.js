module.exports = {
    content: [
      './templates/**/*.html.twig',
      './assets/controllers/src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {
        backgroundImage: {
          'sidebar-gradient': 'linear-gradient(to bottom, #183B65 0%, #285387 100%)',
        },
      },
    },
    plugins: [],
  };
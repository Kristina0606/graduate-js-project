/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,hbs}"],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "max-content 1fr max-content",
      },
      backgroundImage: {
        workspace:
          'url("https://images.unsplash.com/photo-1512149074996-e923ac45be6a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};

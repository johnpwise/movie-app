/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./root.tsx", // critical if rendering directly from here
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

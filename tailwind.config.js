/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    theme: {
        container:{
            center: true,
        },
        extend: {
            typography: (theme) => ({}),
            colors: {
                'aura-just': "#61ffca",
                'just': "#10b981",
                'just-light': "#34d399",
                'just-lighter': "#6ee7b7",
                'just-dark': "#059669",
                'just-darker': "rgb(4, 120, 87)",
                'codebg': "#f8f8f8",
                'codetext': "#24292e"
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}

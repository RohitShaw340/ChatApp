/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        chatbox: "url('/public/chat_background_4.jpg')",
        chat: "url('/public/background.jpeg')",
      },
    },
  },
  plugins: [],
  "tailwind-class-sorter.classRegex": {
    rescript: [
      'className\\w*?=\\w*("[\\s\\S]+?")|className\\w*?=\\w*?\\{([\\s\\S]+?)\\}',
      '"(.+?)"',
    ],
  },
};

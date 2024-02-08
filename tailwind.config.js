/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];

const AddColors = {
	primary: {
		50: "#ff788e",
		100: "#ff5e7a",
		200: "#ff445f",
		300: "#ff2a45",
		400: "#ff102b",
		// default
		500: "#eb1034",
		600: "#c60e3a",
		700: "#a10d3f",
		800: "#7d0b45",
		900: "#59094b",
	},
	secondary: {
		50: "#4a7c9f",
		100: "#3f7397",
		200: "#356989",
		300: "#2a5f7b",
		400: "#20576d",
		// default
		500: "#1e394f",
		600: "#1c2833",
		700: "#1a1a26",
		800: "#181319",
		900: "#16160c",
	},
};
module.exports = withMT({
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	purgue: {
		enabled: process.env.NODE_ENV === "production",
		content: ["./src/**/*.{js,ts,jsx,tsx}"],
	},
	theme: {
		colors: {
			colors,
			...AddColors,
			'sky': {
				50: '#f0f9ff',
				100: '#e0f2fe',
				200: '#bae6fd',
				300: '#7dd3fc',
				400: '#38bdf8',
				500: '#0ea5e9',
				600: '#0284c7',
				700: '#0369a1',
				800: '#075985',
				900: '#0c4a6e',
				950: '#082f49',
			}
		},
		extend: {
			colors: {
				colors,
				...AddColors,
			},
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
});

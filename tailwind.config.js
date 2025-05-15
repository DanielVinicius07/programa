/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}", "*.{js,jsx}", "*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#009c3b",
        secondary: "#002776",
        accent: "#ffdf00",
        neutral: "#f5f5f5",
        "base-100": "#ffffff",
        "base-200": "#f8f9fa",
        "base-300": "#e9ecef",
        info: "#3abff8",
        success: "#36d399",
        warning: "#fbbd23",
        error: "#f87272",
        destructive: {
          DEFAULT: "#f44336",
          foreground: "#ffffff",
          hover: "#d32f2f",
        },
        muted: {
          DEFAULT: "#f5f5f5",
          foreground: "#666666",
        },
        // success: {
        //   DEFAULT: "#4caf50",
        //   foreground: "#ffffff",
        //   hover: "#43a047",
        // },
        // warning: {
        //   DEFAULT: "#ffdf00",
        //   foreground: "#333333",
        //   hover: "#e6c800",
        // },
        // error: {
        //   DEFAULT: "#f44336",
        //   foreground: "#ffffff",
        //   hover: "#d32f2f",
        // },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#009c3b",
          secondary: "#002776",
          accent: "#ffdf00",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#009c3b",
          secondary: "#002776",
          accent: "#ffdf00",
        },
      },
    ],
  },
}

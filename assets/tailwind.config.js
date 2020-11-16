module.exports = {
  theme: {
    // 👇 this makes Tailwind merge the configuration w/o overriding it.
    extend: {
      height: theme => ({
        "68": "21rem",
        "72": "23rem",
      }),
    },
  },
  variants: { display: ["responsive", "hover", "focus"] },
  plugins: [],
}

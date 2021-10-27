// rollup.config.js
// ...

export default {
    // ...
  plugins: [
    svelte({
      // ...
      preprocess: {
        script: ({ content }) => {
          return require("@babel/core").transform(content, {
            plugins: ["@babel/plugin-proposal-class-properties"],
          });
        },
      },
    }),
    
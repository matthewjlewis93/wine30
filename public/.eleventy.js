module.exports = (config) => {
      config.addPassthroughCopy("./src/index.css/");
      config.addPassthroughCopy("")
  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public",
    },
  };
};

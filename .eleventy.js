module.exports = (config) => {
  config.addPassthroughCopy("./src/index.css/");
  config.addPassthroughCopy("./src/images/");
  config.addPassthroughCopy("./src/home.js/")
  config.addPassthroughCopy("./src/events.js/")
  config.addPassthroughCopy("./src/admin/config.yml");

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

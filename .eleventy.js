module.exports = (config) => {
  config.addPassthroughCopy("./src/index.css/");
  config.addPassthroughCopy("./src/images/");
  config.addPassthroughCopy("./src/home.js/")
  config.addPassthroughCopy("./src/events/events.js/")
  config.addPassthroughCopy("./src/admin/config.yml");
  config.addPassthroughCopy("./src/favicon.ico");

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

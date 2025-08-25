module.exports = (config) => {
  config.addPassthroughCopy("./src/index.css/");
  config.addPassthroughCopy("./src/images/");

  config.addCollection("storehours", collection => {
    return collection.getFilteredByGlob("./src/hours/*.md").sort((a,b) => a.data.order > b.data.order ? 1 : -1 )
  })

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

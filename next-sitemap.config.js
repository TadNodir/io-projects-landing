/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // TODO: update with real domain before launch
  siteUrl: process.env.SITE_URL || "https://io-projects.com",
  generateRobotsTxt: false, // we manage robots.txt manually
  exclude: ["/impressum", "/datenschutz"],
  changefreq: "monthly",
  priority: 0.7,
};

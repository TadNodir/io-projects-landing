/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://proposal.ioprojects.ai",
  generateRobotsTxt: false, // we manage robots.txt manually
  exclude: ["/impressum", "/datenschutz"],
  changefreq: "monthly",
  priority: 0.7,
};

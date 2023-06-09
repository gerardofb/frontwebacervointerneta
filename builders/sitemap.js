import GenerateSitemap from "react-router-sitemap-maker";
import { Switch } from "../src/DefaultRoutes";
const sitemapData = await GenerateSitemap(Switch(), {
	baseUrl: "https://acervo-audiovisual-interneta.org",
	hashrouting: true,
	changeFrequency: "monthly"
});

sitemapData.toFile("./dist/sitemap.xml");
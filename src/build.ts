import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { buildSite } from "./site"

// The site, in `dist/`: what is in `public/`, and the files of the addon. The address it will be at is in SITE_URL, as the logo has to have the whole of it in the manifest
const siteUrl = (process.env.SITE_URL ?? "https://lsoares.github.io/fireplace").replace(/\/$/, "")

rmSync("dist", { recursive: true, force: true })
cpSync("public", "dist", { recursive: true })
// The videos that do not let embed, as `npm run embeds` found them; with no such file, which is what a build on a machine without a browser has, none are left out
const blocked = new Set<string>(existsSync("blocked.json") ? JSON.parse(readFileSync("blocked.json", "utf8")).blocked : [])
for (const { path, body } of buildSite(siteUrl, blocked)) {
  const file = join("dist", path)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, body)
}
// So that GitHub Pages serves the files as they are, with no Jekyll in the way
writeFileSync("dist/.nojekyll", "")
console.log(`Built the site for ${siteUrl}`)

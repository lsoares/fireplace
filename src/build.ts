import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { buildSite } from "./site"

// The site, in `dist/`: what is in `public/`, and the files of the addon. The address it will be at is in SITE_URL, as the logo has to have the whole of it in the manifest
const siteUrl = (process.env.SITE_URL ?? "https://lsoares.github.io/fireplace").replace(/\/$/, "")

rmSync("dist", { recursive: true, force: true })
cpSync("public", "dist", { recursive: true })
for (const { path, body } of buildSite(siteUrl)) {
  const file = join("dist", path)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, body)
}
// So that GitHub Pages serves the files as they are, with no Jekyll in the way
writeFileSync("dist/.nojekyll", "")
console.log(`Built the site for ${siteUrl}`)

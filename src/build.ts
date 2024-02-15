import { $ } from 'bun'

// Build JavaScript and generate .d.ts files
await $`bun build src/index.ts --outfile dist/index.js --minify`
await $`bunx --bun tsc --project tsconfig.build.json`

// Copy README and LICENSE
await $`cp {README.md,LICENSE} dist`

// Copy package.json
const pkg = await Bun.file('package.json').json()

for (const key of ['scripts', 'devDependencies', 'peerDependencies']) {
  delete pkg[key]
}

Bun.write('dist/package.json', JSON.stringify(pkg, null, 2))

// Add exports
const index = await Bun.file('src/index.ts').text()
const e = index.match(/export (type )?{[^}]+}/g)!

await $`echo "${e[0]} from 'index'\n${e[1]} from 'index'" >> dist/index.d.ts`

# NPM Package Comparator

Compare two npm packages side by side and get a recommendation for which one to use.

**Live demo:** https://npm-package-comparator.vercel.app

## Features

- **Search with autocomplete** — find any package on npm as you type (debounced)
- **Side-by-side comparison** — version, description, keywords, license, author, maintainers, last release and more
- **Downloads chart** — download trends for both packages
- **Recommendation** — scores both packages on health, downloads and GitHub stars and highlights the better choice

## Tech stack

React 18 · TypeScript · Vite · Ant Design · Chart.js (`react-chartjs-2`) · Ant Design Charts

**Data sources:** [npms.io API](https://api-docs.npms.io/) (search, suggestions, quality and popularity scores) · [npm registry](https://registry.npmjs.org) · [GitHub API](https://docs.github.com/rest) (stars)

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Project structure

```
src/
  apiService.ts            API calls (npms.io, npm registry, GitHub)
  components/
    searchbar/             Package search with autocomplete
    comparison/            Comparison table
    downloads/             Downloads chart
    better/                Recommendation card
    navbar/, footer/
```

## License

[MIT](LICENSE)

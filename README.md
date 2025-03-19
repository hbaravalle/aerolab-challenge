# 🪁 Aerolab Next.js Starter

## ✨ Features

- 🚀 Next.js 15 & React 19
- 📝 TypeScript - Typed JavaScript
- ⚙️ Tailwind CSS - A utility-first CSS framework
- 🍓 Storybook - UI component explorer for frontend developers
- 📏 ESLint — Pluggable JavaScript linter
- 💖 Prettier - Opinionated Code Formatter
- 🐶 Husky — Use git hooks with ease
- 🚫 lint-staged - Run linters against staged git files
- 🗂 Absolute import - Import folders and files using the @ prefix
- 🤩 Zod - Typesafety for your code
- 🚀 Deploy Preview - Deploy your branch to a unique URL
- 🧐 Analytics - Google Analytics and Google Tag manager
- 🧭 SEO - Meta tags, Sitemap.xml, robots.txt and more

## 🛠 Requirements

- [Node.js](https://nodejs.org/en/) 22.0 or newer
- [pnpm](https://pnpm.io/) 10.3.0 or newer

## 🚀 Getting started

Run the following commands to create a new project with this Starter:

First clone the repo and remove the origin remote:

```bash
git clone https://github.com/Aerolab/next-starter
cd next-starter
git remote rm origin
```

Then add your own repository and push:

```bash
git remote add origin [URL]
git push -u origin develop
```

Install the dependencies:

```bash
pnpm install
```

Finally, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🐳 CI Setup on Dokku

### Config

1. Open `.gitlab/deploy/dokku.yml` file
2. Then rename the value of `REVIEW_APPS_SUBDOMAIN_PREFIX` variable by your project name

### Dokku Key

1. Go to `Settings > CI/CD > Variables` and click the `Add variable` button
2. Then add the `DOKKU_KEY` variable (ask the variable value to your manager or copy from this project settings)

## ⚙️ Remove Tailwind CSS (Optional)

1. Remove dependencies

```
pnpm remove tailwindcss tailwind-variants postcss @tailwindcss/postcss tailwind-merge clsx
```

2.  Remove files

    - `postcss.config.js`
    - `src/app/globals.css`

3.  Remove imports of `src/app/globals.css` in

    - `src/app/layout.tsx`
    - `.storybook/preview.ts`

4.  Done!

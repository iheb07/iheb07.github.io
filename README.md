# Medora (iheb07.github.io)

This repository contains the source for a small static website (personal/project/company site) built with plain HTML, CSS, and JavaScript. The site is intended to be served as a static site — for example, via GitHub Pages.

Contents

- A set of simple HTML pages (index, about, services, products, contact, etc.)
- A global stylesheet: `style.css`
- A small JavaScript file: `script.js`
- An `images/` folder with site assets and a `pdfs/` folder for downloadable documents

Quick start — preview locally

1. Clone the repository (if you haven't already):

   git clone https://github.com/iheb07/iheb07.github.io.git

2. Open `index.html` in your browser. Since this is a static site with no server-side code, you can simply double-click `index.html` or use a lightweight static server for convenience. For example, using Python 3 from the repository root:

   python -m http.server 8000

Then open http://localhost:8000 in your browser.

Windows PowerShell note: if you run the Python server from PowerShell, use:

    python -m http.server 8000

Project structure

Files and directories in this repo:

- `index.html` — Home page
- `about.html` — About page
- `services.html` — Services overview
- `*.html` — Product and other pages (e.g. `pharma-products.html`, `sulfuric-acid-product.html`, etc.)
- `style.css` — Main stylesheet
- `script.js` — Small site script
- `images/` — Image assets (AVIF files included)
- `pdfs/` — PDF files available for download
- `CNAME`, `robots.txt`, `site.webmanifest`, `sitemap.xml` — Static site metadata and config

Deployment

This site is ready to be hosted as a static site. The easiest option is GitHub Pages:

1. Push the repository to a GitHub repository named `iheb07.github.io` (or any repo and enable Pages in settings).
2. In GitHub repository settings > Pages, choose the branch to publish (usually `main`) and the root folder. GitHub will publish the site at `https://iheb07.github.io` or `https://<your-username>.github.io/<repo>` depending on the repo name.

Notes & suggestions

- The site uses AVIF images; include fallbacks (WebP/JPG) for older browsers if broader compatibility is desired.
- Consider adding a build step (e.g., with a simple npm script or static site generator) if you need templating or repetitive content.
- Add a small CONTRIBUTING.md if you want to accept contributions.

Contact / author

Maintained by the repository owner. For issues or updates, open an issue in the repository or contact the owner via their GitHub profile.

License

This repository does not include an explicit license. Add a LICENSE file (for example, MIT) if you want to permit reuse.

Role & Context:
Act as an expert frontend web developer and system architect specializing in Astro, Sveltia CMS, Tailwind CSS (or standard CSS/SCSS), and Cloudflare Pages deployments. Your task is to build a modern, fast, and fully manageable static website for a dermatology practice.
Project Overview:
 • Language: Dutch (all UI elements, navigation, and content must be in Dutch).
 • Tech Stack: Astro (Static Site Generation), Sveltia CMS (for content management), and Cloudflare Pages (for hosting).
 • Goal: Create a production-ready, accessible, and responsive website where the client can easily manage text and images via Sveltia CMS.
Content & Design Requirements:
 • Design Inspiration: Base the visual hierarchy, layout, typography, and professional medical aesthetic on: [https://dermatologielatem.be/](https://dermatologielatem.be/). The design should feel clean, modern, calm, and trustworthy.
 • Content Source: Extract and adapt the text, services, and structural information from: [https://www.dermatodepinte.be/](https://www.dermatodepinte.be/).
 • Assets: There is an existing local folder at /assets containing the logo, brand colors, and initial images. You are allowed to use, expand, or extend this folder as needed to complete the design.
Technical Requirements:
 1. Astro Setup & Structure:
   • Initialize a new Astro project (or use the existing directory).
   • Set up the @astrojs/cloudflare adapter for deploying to Cloudflare Pages.
   • Use Astro Content Collections for managing structured data (e.g., treatments, team members, contact info).
 2. Sveltia CMS Integration:
   • Integrate Sveltia CMS by creating an /admin route in the public folder (e.g., public/admin/index.html and public/admin/config.yml).
   • Configure Sveltia CMS config.yml to work with Cloudflare Pages and GitHub/GitLab as the backend.
   • Map the CMS fields directly to Astro's Content Collections so the site owner can edit page content, upload images (saving to /assets or /public/assets depending on your recommended Astro setup), and manage treatments.
 3. Development Steps to Execute:
Please break down your work into the following steps and ask for my confirmation or just output the code for each:
   • Step 1: Project Setup & Config: Provide the Astro config, Cloudflare adapter setup, and Tailwind/CSS config using the brand colors from /assets.
   • Step 2: Base Layout & UI Components: Create the Header, Footer, and Base Layout inspired by the Latem website. Ensure responsive design.
   • Step 3: Content Architecture & CMS: Write the public/admin/config.yml for Sveltia CMS and the corresponding src/content/config.ts for Astro.
   • Step 4: Page Creation: Create the index.astro, behandelingen.astro (Treatments), praktijk.astro (Practice/Team), and contact.astro pages using the extracted Dutch text from the De Pinte website.
Coding Guidelines:
 • Write clean, semantic HTML5.
 • Ensure high Lighthouse scores for Performance, Accessibility, and SEO.
 • Keep components modular.
 • Add brief comments to complex logic, especially regarding the CMS bindings and Content Collections.
Please start by providing an overview of your proposed folder structure and the astro.config.mjs / config.yml for Sveltia CMS.

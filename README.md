# Ujjwal Verma Portfolio

### Live Website
[https://ujjwal.studio](https://ujjwal.studio)

### GitHub Repository
[https://github.com/ujjwalverma19/portfolio](https://github.com/ujjwalverma19/portfolio)

---

This repository contains the source code for the personal portfolio of Ujjwal Verma, a product-focused engineer and manager. The portfolio is built to showcase products and career milestones through a high-fidelity digital layout. It rejects standard modern dashboard templates in favor of a curated, layout-first editorial style reminiscent of physical magazines and design catalogs.

## Features

- **Project Galleries**: Custom image lightbox gallery for each product showing interactive, high-fidelity mockups with loading spinners, looping controls, keyboard navigation support (Escape to close, arrows to cycle), and cache-first complete checks.
- **Visual Journey Timeline**: An interactive timeline presenting career milestones, key decisions, and product launches with fine-tuned hover states and GSAP entry transitions.
- **Product Thinking & Essays**: Dedicated section presenting structured thinking on product management, systems architecture, and engineering principles.
- **Continuous Learning Log**: A minimal dashboard tracking books read, courses taken, and skills acquired in real-time.
- **Performance-Oriented Layout**: Optimized for mobile and desktop screens using native CSS grid systems, responsive sizing variables, and optimized media assets.
- **Cinematic Interactivity**: Subtle mouse grain-overlays, magnetic interactive elements, custom smooth-scrolling wrapper, and custom mouse cursor coordinate tracker.

## Design Philosophy

The aesthetic identity of the portfolio relies on a combination of **Editorial Brutalism** and the **Swiss Style (International Typographic Style)**.

- **Monochrome & Contrast**: Color is restricted to a strict monochrome palette (`#0A0A0A` base, `#F5F5F5` text, and shades of gray) to let the typography and product imagery serve as the primary visual focus.
- **Museum-Style Mounting**: Product screenshots are mounted inside custom editorial frames using a 1px border and generous matte padding, evoking the feel of physical magazine spreads or luxury design campaigns.
- **Sharp Grid System**: Complete lack of rounded corners, digital drop shadows, neon glow, or standard glassmorphic containers. The visual structure is defined strictly by thin borders, precise spacing units, and sharp corners.
- **Editorial Details**: Fine labels, monospaced metadata text, and custom magazine-style captions integrated directly into the image frames.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Vanilla CSS (Global tokens and scoped layouts)
- **Animations**: GSAP (GreenSock Animation Platform) + `@gsap/react`
- **Typography**: Inter (Display and Body), JetBrains Mono (Metadata and Labels)
- **Smooth Scroll**: Lenis Scroll Engine

## Project Structure

The project separates layout, state, and static data to keep the codebase maintainable:

- **App Router (`src/app`)**: Manages the main page entry, layout configuration, metadata structure, and styling entry points.
- **Components (`src/components`)**: Contains global utility components (`magnetic-button.tsx`, `custom-cursor.tsx`, `smooth-scroll.tsx`) and section-specific layouts.
- **Section Layouts (`src/components/sections`)**: Modular components for each main section of the portfolio (Hero, Journey, Products, ProductThinking, LearningDashboard, Contact, EditorialBackground).
- **Data Model (`src/data/site-data.ts`)**: A single, typed data source containing all copy, timeline milestones, project links, and screenshot assets.

## Folder Structure

```
├── public/                  # Static assets (images, product mockups, resume PDF)
└── src/
    ├── app/                 # Next.js app configuration and global styles
    ├── components/          # Reusable UI elements and layout utilities
    │   └── sections/        # Section-specific components (Hero, Products, etc.)
    └── data/                # Site data files (timeline, projects, copy)
```

## Installation

Ensure you have Node.js 18+ installed on your system.

Clone the repository:
```bash
git clone https://github.com/ujjwalverma19/portfolio.git
cd portfolio
```

Install dependencies:
```bash
npm install
```

## Development

To run the development server locally:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

To build the project for production, generating optimized static bundles:
```bash
npm run build
```

To run the production build locally:
```bash
npm run start
```

## Deployment

### Vercel Deployment

This project is configured to run out-of-the-box on Vercel. 

1. Push your code to your GitHub repository.
2. Go to the Vercel Dashboard, select **New Project**, and connect the repository.
3. Keep default build settings (Next.js preset) and click **Deploy**.

To configure the custom domains `ujjwal.studio` and `www.ujjwal.studio`:
1. In Vercel, navigate to **Project Settings > Domains**.
2. Add your custom domains.
3. Configure the DNS records at your domain registrar as specified in the Vercel console.

## Performance Optimizations

- **Image Caching & Preloading**: Dynamic product screenshots are preloaded into memory when the section becomes visible, allowing instant rendering inside the lightbox without flashing or latency.
- **Optimized Asset Delivery**: All images are sized correctly and optimized. Standard HTML `<img>` tag `.complete` property is leveraged inside a React effect to ensure cached browser hits transition instantly.
- **Code Splitting**: Dynamic imports are used for non-essential client wrappers (such as smooth scroll) to improve the initial page load time and reduce the main bundle size.

## Animations

GSAP handles all animations via target selectors:
- **Hero & Navbar**: Smooth fade-up entry on page load.
- **Grid Lines & Background**: Subtle parallax vertical offsets matching page scroll position.
- **Card Entries**: Scroll-triggered entry animations using ScrollTrigger to slide sections into view on scroll.
- **Interactive Elements**: Magnetic attraction offsets on navbar items and button elements.

## Customization

To customize the content of the portfolio, modify `src/data/site-data.ts`. The schema dictates:
- **Timeline Events**: Modify the `timeline` array to update experience milestones.
- **Projects**: Modify the `products` array to add or remove project galleries, taglines, and feature highlights.
- **Thinking Logs**: Update the essays, reading progress, and skillset items under the learning and contact fields.

## Credits

- Custom typography provided by Google Fonts (Inter & JetBrains Mono).
- Smooth scrolling powered by Lenis.
- Animation utilities by GreenSock.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

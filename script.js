/* ================================================================
   PROMPTVAULT — script.js
   ================================================================ */

/* ================================================================
   CATEGORY SVG ICON PATHS
   ================================================================ */
const CAT_ICONS = {
  all:        `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
  webdev:     `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`,
  uiux:       `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
  content:    `<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>`,
  social:     `<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>`,
  marketing:  `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  business:   `<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>`,
  education:  `<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>`,
  productivity:`<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>`,
  ai:         `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
  html:       `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22"/>`,
  css:        `<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M5.34 17.66l-1.41 1.41M14 12h7M3 12h1M19.07 19.07l-1.41-1.41M5.34 6.34 3.93 4.93M12 19v3M12 2v3"/>`,
  js:         `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>`,
  bootstrap:  `<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h4.5a2.5 2.5 0 0 1 0 5H8z"/><path d="M8 12h5a2.5 2.5 0 0 1 0 5H8z"/>`,
  php:        `<ellipse cx="12" cy="12" rx="10" ry="6"/><path d="M9 9h2l1 6M14 9h2a2 2 0 0 1 0 4h-2"/>`,
  wordpress:  `<circle cx="12" cy="12" r="10"/><path d="M2 12h2M20 12h2M12 2v2M12 20v2"/>`,
  research:   `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>`,
  student:    `<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>`,
};

/** Build an inline SVG string for a given category id */
function catSVG(id, size = 14) {
  const path = CAT_ICONS[id] || CAT_ICONS.all;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

/* ================================================================
   CATEGORIES DATA
   ================================================================ */
const CATS = [
  { id: 'all',         label: 'All' },
  { id: 'webdev',      label: 'Web Development',  color: '#3b82f6' },
  { id: 'uiux',        label: 'UI/UX Design',      color: '#ec4899' },
  { id: 'content',     label: 'Content Writing',   color: '#8b5cf6' },
  { id: 'social',      label: 'Social Media',      color: '#06b6d4' },
  { id: 'marketing',   label: 'Marketing',         color: '#f97316' },
  { id: 'business',    label: 'Business',          color: '#22c55e' },
  { id: 'education',   label: 'Education',         color: '#06b6d4' },
  { id: 'productivity',label: 'Productivity',      color: '#eab308' },
  { id: 'ai',          label: 'AI Tools',          color: '#6c63ff' },
  { id: 'html',        label: 'HTML',              color: '#e34c26' },
  { id: 'css',         label: 'CSS',               color: '#264de4' },
  { id: 'js',          label: 'JavaScript',        color: '#f0db4f' },
  { id: 'bootstrap',   label: 'Bootstrap',         color: '#7952b3' },
  { id: 'php',         label: 'PHP',               color: '#777bb4' },
  { id: 'wordpress',   label: 'WordPress',         color: '#21759b' },
  { id: 'research',    label: 'Research & Thesis', color: '#14b8a6' },
  { id: 'student',     label: 'Student Study',     color: '#f472b6' },
];

/* ================================================================
   PROMPTS DATA  (100 prompts)
   ================================================================ */
const BASE_PROMPTS = [
  // ── WEB DEVELOPMENT ──
  { id:1, cat:'webdev', featured:true, title:'React Component Generator', desc:'Generate clean, reusable React components with TypeScript.', prompt:'Create a reusable React component for [COMPONENT_NAME] with TypeScript, proper prop types, error handling, and accessibility attributes. Include a usage example and JSDoc comments.', example:'Create a reusable React component for ProductCard with TypeScript, showing product image, name, price, and an Add to Cart button.', explain:'Tells AI to write a complete React component with all best practices — saving hours of boilerplate code.' },
  { id:2, cat:'webdev', title:'REST API Design', desc:'Design scalable REST APIs with clear endpoint structure.', prompt:'Design a RESTful API for [FEATURE] including endpoint naming, HTTP methods, request/response schemas, status codes, authentication, and error handling in OpenAPI format.', example:'Design a RESTful API for a blog platform including CRUD for posts, comments, and user authentication endpoints.', explain:'Helps you plan a professional API before writing a single line of code.' },
  { id:3, cat:'webdev', title:'Code Review Assistant', desc:'Get thorough code reviews with actionable feedback.', prompt:'Review the following [LANGUAGE] code. Identify bugs, security vulnerabilities, performance issues, and SOLID principle violations. Provide a corrected version with explanations.', example:'Review the following JavaScript code for a login form. Identify bugs, security vulnerabilities, and suggest improvements.', explain:'Acts as a senior developer who reviews your code and explains every issue clearly.' },
  { id:4, cat:'webdev', title:'Database Schema Designer', desc:'Design efficient, normalized database schemas.', prompt:'Design a database schema for [PROJECT]. Include table definitions, relationships, indexes, constraints, normalization rationale, and SQL CREATE statements.', example:'Design a database schema for an e-commerce website with products, orders, customers, and payment tables.', explain:'Guides you through designing a proper database structure with all relationships and keys explained.' },
  { id:5, cat:'webdev', title:'Performance Optimization Audit', desc:'Identify and fix website performance bottlenecks.', prompt:'Audit [WEBSITE/CODE] for performance issues covering Core Web Vitals, render-blocking resources, image optimization, caching, bundle size, and JavaScript execution. Give a prioritized fix list.', example:'Audit my portfolio website for performance issues and give me a step-by-step optimization guide.', explain:'Acts like a performance expert who finds and ranks every speed problem on your site.' },
  { id:6, cat:'webdev', title:'Responsive Layout Builder', desc:'Build flexible, mobile-first responsive layouts.', prompt:'Create a responsive [LAYOUT TYPE] layout for [PAGE TYPE] using modern CSS (Flexbox/Grid). Include breakpoints for mobile, tablet, and desktop with comments explaining each decision.', example:'Create a responsive 3-column card layout for a blog homepage using CSS Grid with mobile, tablet, and desktop breakpoints.', explain:'Generates a complete responsive layout with explanations of every CSS rule.' },
  { id:7, cat:'webdev', title:'Git Workflow Advisor', desc:'Set up professional Git workflows for teams.', prompt:'Design a Git workflow for a [TEAM SIZE] team working on [PROJECT TYPE]. Include branching strategy, commit message conventions, PR process, and deployment pipeline.', example:'Design a Git workflow for a 5-person team working on a SaaS web application with CI/CD deployment.', explain:'Helps teams avoid merge conflicts and maintain a clean, professional Git history.' },
  // ── HTML ──
  { id:8,  cat:'html', featured:true, title:'Semantic HTML Structure', desc:'Build SEO-friendly, accessible HTML documents.', prompt:'Write a complete semantic HTML5 structure for [PAGE TYPE]. Use proper heading hierarchy, landmark elements, ARIA attributes, meta tags for SEO, and Open Graph tags. Include comments explaining each section.', example:'Write a complete semantic HTML5 structure for a restaurant homepage with navigation, hero, menu, testimonials, and contact section.', explain:'Teaches you to write HTML accessible to screen readers and friendly to search engines.' },
  { id:9,  cat:'html', title:'HTML Form Builder', desc:'Create accessible, validated HTML forms.', prompt:'Build a complete HTML form for [PURPOSE] with proper label associations, input types, required attributes, pattern validation, error messages, and ARIA descriptions. Make it accessible and mobile-friendly.', example:'Build a complete HTML registration form for a student portal with name, email, password, course selection, and terms agreement.', explain:'Shows you how to build forms that validate input correctly and are easy for all users.' },
  { id:10, cat:'html', title:'HTML Email Template', desc:'Create cross-client compatible HTML email templates.', prompt:'Create a responsive HTML email template for [PURPOSE] that works in Gmail, Outlook, and Apple Mail. Use table-based layout, inline CSS, and include plain-text fallback.', example:'Create a responsive HTML email template for a welcome email for a tech startup, with logo, welcome message, and CTA button.', explain:'HTML emails need special rules — this prompt ensures your email displays correctly everywhere.' },
  { id:11, cat:'html', title:'HTML5 Canvas Project', desc:'Build interactive graphics with HTML5 Canvas.', prompt:'Create an HTML5 Canvas project for [VISUALIZATION TYPE]. Include canvas setup, drawing functions, animation loop, mouse/touch interaction, and performance optimization with requestAnimationFrame.', example:'Create an HTML5 Canvas project for an interactive particle animation that responds to mouse movement.', explain:'Canvas is used for games and charts — this prompt teaches you the fundamentals through a real project.' },
  { id:12, cat:'html', title:'HTML Accessibility Audit', desc:'Audit and fix HTML accessibility issues.', prompt:'Audit this HTML: [PASTE HTML] for WCAG 2.1 AA accessibility. Check heading hierarchy, alt texts, form labels, contrast requirements, keyboard navigation, and focus management. Provide fixed HTML.', example:'Audit my navigation menu HTML for all WCAG 2.1 AA requirements and show me the corrected version.', explain:'Finds and fixes accessibility problems so your site works for everyone including disabled users.' },
  // ── CSS ──
  { id:13, cat:'css', featured:true, title:'CSS Animation Studio', desc:'Create smooth, GPU-accelerated CSS animations.', prompt:'Create CSS animations for [ELEMENT/EFFECT]. Use GPU-accelerated properties (transform, opacity), respect prefers-reduced-motion, ensure 60fps performance, and include fallbacks. Explain each keyframe step.', example:'Create CSS animations for a hero section with a fade-in headline, slide-up subtitle, and a bouncing CTA button.', explain:'GPU-accelerated animations run smoothly without draining battery — this shows the right approach.' },
  { id:14, cat:'css', title:'CSS Grid Mastery', desc:'Master complex layouts with CSS Grid.', prompt:'Create a CSS Grid layout for [LAYOUT DESCRIPTION] with named grid areas, responsive columns using minmax(), auto-placement rules, and alignment properties. Include a visual explanation of the grid structure.', example:'Create a CSS Grid layout for a magazine-style article page with a large hero, sidebar, content area, and footer.', explain:'CSS Grid is the most powerful layout tool in CSS — this prompt demonstrates all key features.' },
  { id:15, cat:'css', title:'CSS Variables Design System', desc:'Build a scalable CSS custom properties system.', prompt:'Create a CSS custom properties design system for [PROJECT TYPE]. Include color palette, typography scale, spacing scale, border radii, shadows, and breakpoints. Show how to use them in components.', example:'Create a CSS custom properties design system for a fintech dashboard including dark/light theme variables.', explain:'CSS variables make stylesheets easy to maintain and theme — this is how professional teams work.' },
  { id:16, cat:'css', title:'CSS Glassmorphism UI', desc:'Create modern glassmorphism UI components.', prompt:'Create glassmorphism-style CSS for [UI COMPONENTS] including backdrop-filter blur, semi-transparent backgrounds, border effects, inner shadows, and gradient overlays. Ensure cross-browser compatibility.', example:'Create glassmorphism-style CSS for a card, modal, and navigation bar with dark and light mode support.', explain:'Glassmorphism is the frosted-glass look popular in modern SaaS apps — this shows you exactly how to build it.' },
  { id:17, cat:'css', title:'CSS Flexbox Layout Guide', desc:'Master Flexbox for responsive UI layouts.', prompt:'Explain and demonstrate CSS Flexbox for [LAYOUT SCENARIO]. Show flex-direction, justify-content, align-items, flex-wrap, and gap. Build a responsive [COMPONENT] and explain when to use Flexbox vs Grid.', example:'Explain and demonstrate CSS Flexbox by building a responsive navigation bar with logo, links, and CTA button.', explain:'Flexbox is essential for aligning items — this prompt explains every property with a real example.' },
  // ── JAVASCRIPT ──
  { id:18, cat:'js', featured:true, title:'JavaScript Async Patterns', desc:'Master promises, async/await, and error handling.', prompt:'Explain and implement [ASYNC TASK] in JavaScript using Promises, async/await, and try/catch. Show parallel execution with Promise.all(), timeout handling, and loading states for UI.', example:'Implement fetching user data and their posts simultaneously from a JSON API using async/await with loading and error states.', explain:'Async code can be tricky — this prompt teaches the modern, clean way to handle it.' },
  { id:19, cat:'js', title:'DOM Manipulation Masterclass', desc:'Build dynamic UIs with pure JavaScript.', prompt:'Build [UI COMPONENT] using pure JavaScript DOM manipulation. Use querySelector, addEventListener, createElement, classList, dataset attributes, and event delegation. No frameworks — vanilla JS only.', example:'Build a dynamic to-do list using pure JavaScript DOM manipulation with add, delete, complete, and filter features.', explain:'Understanding DOM manipulation is the foundation of JavaScript — this builds real skills without frameworks.' },
  { id:20, cat:'js', title:'Local Storage Manager', desc:'Save and manage data with localStorage.', prompt:'Create a JavaScript Local Storage manager for [DATA TYPE]. Include save, load, update, delete functions, JSON serialization, storage quota handling, and show how to sync with UI updates.', example:'Create a JavaScript Local Storage manager for a shopping cart that persists across page refreshes.', explain:'localStorage lets you save data in the browser without a server — essential for offline-capable apps.' },
  { id:21, cat:'js', title:'JavaScript Class Design', desc:'Use ES6 classes to organize JavaScript code.', prompt:'Design and implement a JavaScript class for [ENTITY]. Include constructor, getters/setters, methods, static methods, inheritance if needed, and proper encapsulation. Show 3 real usage examples.', example:'Design and implement a JavaScript class for a BankAccount with deposit, withdraw, transfer, and transaction history methods.', explain:'Classes help you organize complex code into reusable objects — a core skill for larger applications.' },
  { id:22, cat:'js', title:'Fetch API Integration', desc:'Connect to REST APIs using the Fetch API.', prompt:'Implement a complete JavaScript Fetch API integration for [API SERVICE]. Include GET, POST, PUT, DELETE requests, headers, authentication tokens, error handling, loading states, and retry logic.', example:'Implement a complete Fetch API integration for a weather app using OpenWeatherMap with loading and error states.', explain:'Almost every web app talks to an API — this teaches you exactly how to do it properly.' },
  { id:23, cat:'js', title:'Form Validation System', desc:'Build robust client-side form validation.', prompt:'Build a complete JavaScript form validation system for [FORM TYPE]. Include real-time validation, custom error messages, regex patterns, password strength meter, and accessible error display.', example:'Build form validation for a job application form with name, email, phone, CV upload, and cover letter.', explain:'Proper form validation prevents bad data from reaching your server and guides users to fix mistakes.' },
  // ── BOOTSTRAP ──
  { id:24, cat:'bootstrap', featured:true, title:'Bootstrap 5 Landing Page', desc:'Build a professional landing page with Bootstrap 5.', prompt:'Create a complete Bootstrap 5 landing page for [PRODUCT/SERVICE]. Include navbar with collapse, hero with gradient, features section, testimonials carousel, pricing cards, and contact form.', example:'Create a complete Bootstrap 5 landing page for an online coding course with hero, features, instructor section, and CTA.', explain:'Bootstrap gets professional pages built fast — this shows how to combine it with custom styles.' },
  { id:25, cat:'bootstrap', title:'Bootstrap Component Library', desc:'Build a reusable Bootstrap component collection.', prompt:'Create a Bootstrap 5 component library for [PROJECT TYPE] including custom navbar, hero section, card variations, modals, alert styles, button variants, and form components.', example:'Create a Bootstrap 5 component library for a healthcare app with a calm blue theme and custom form components.', explain:'A component library speeds up development — build once and reuse everywhere.' },
  { id:26, cat:'bootstrap', title:'Bootstrap Grid Layouts', desc:'Master Bootstrap Grid for complex responsive layouts.', prompt:'Build [PAGE SECTION] using Bootstrap 5 Grid with nested columns, offset classes, order utilities, gap utilities, and all responsive breakpoints (xs, sm, md, lg, xl, xxl). Explain each class.', example:'Build a product listing page using Bootstrap 5 Grid showing 1 column on mobile, 2 on tablet, 4 on desktop.', explain:'Bootstrap Grid is the fastest way to build responsive layouts — understanding it saves lots of time.' },
  { id:27, cat:'bootstrap', title:'Bootstrap Dark Theme', desc:'Implement Bootstrap 5 dark mode properly.', prompt:'Convert a Bootstrap 5 project to support dark mode using data-bs-theme attribute, custom CSS variables, JavaScript toggle, localStorage preference save, and prefers-color-scheme detection.', example:'Convert a Bootstrap 5 blog website to support dark/light mode with system preference detection.', explain:'Dark mode is expected in modern apps — this shows the correct Bootstrap 5 way to implement it.' },
  // ── PHP ──
  { id:28, cat:'php', featured:true, title:'PHP Login System', desc:'Build a secure PHP login and registration system.', prompt:'Build a complete PHP login system for [WEB APP] with registration, email verification, secure password hashing, session management, CSRF protection, and SQL injection prevention using PDO.', example:'Build a complete PHP login system for a student portal with registration, email verification, and role-based access.', explain:'Security is critical in PHP — this covers every vulnerability and teaches you to build it right.' },
  { id:29, cat:'php', title:'PHP CRUD Operations', desc:'Build Create, Read, Update, Delete with PHP and MySQL.', prompt:'Create complete PHP CRUD operations for [DATA ENTITY] using PDO and MySQL. Include database connection class, prepared statements, form handling, validation, and error handling following MVC structure.', example:'Create PHP CRUD operations for a product inventory system with add, list, edit, delete, and search functionality.', explain:'CRUD is the foundation of every web application — this teaches you to build it securely with PDO.' },
  { id:30, cat:'php', title:'PHP REST API Builder', desc:'Build a RESTful API with pure PHP.', prompt:'Build a RESTful API in PHP for [RESOURCE] handling GET, POST, PUT, DELETE requests. Include routing, request validation, JSON responses, HTTP status codes, JWT authentication, and error handling.', example:'Build a RESTful API in PHP for a blog post management system with JWT authentication.', explain:'PHP APIs can power mobile apps and JavaScript frontends — this shows you how to build one properly.' },
  { id:31, cat:'php', title:'PHP File Upload Handler', desc:'Handle file uploads securely in PHP.', prompt:'Create a secure PHP file upload handler for [FILE TYPES]. Include file type validation (whitelist), size limits, rename to prevent overwrites, store outside web root, and return JSON response.', example:'Create a secure PHP file upload handler for profile pictures accepting JPG, PNG, and WebP under 2MB.', explain:'File uploads are a common vulnerability — this teaches you to handle them safely.' },
  // ── WORDPRESS ──
  { id:32, cat:'wordpress', featured:true, title:'WordPress Custom Theme', desc:'Build a WordPress theme from scratch.', prompt:'Create a WordPress custom theme for [WEBSITE TYPE]. Include functions.php setup, header/footer templates, page templates, custom post types, custom fields, responsive CSS, and proper wp_enqueue_scripts usage.', example:'Create a WordPress custom theme for a photography portfolio with fullscreen gallery and custom project post type.', explain:'Custom WordPress themes give you full control — this walks through the entire file structure and setup.' },
  { id:33, cat:'wordpress', title:'WordPress Plugin Developer', desc:'Build a custom WordPress plugin.', prompt:'Create a WordPress plugin for [FUNCTIONALITY]. Include plugin header, activation/deactivation hooks, database table creation, admin settings page, shortcode, and proper security with nonce and capability checks.', example:'Create a WordPress plugin that adds a testimonials section with a custom post type and [testimonials] shortcode.', explain:'Plugins let you add any feature without touching core files — the proper way to extend WordPress.' },
  { id:34, cat:'wordpress', title:'WooCommerce Store Setup', desc:'Set up and customize a WooCommerce store.', prompt:'Guide me through setting up a [TYPE] WooCommerce store. Cover product setup, payment gateways, shipping zones, tax configuration, email customization, and essential plugin recommendations.', example:'Guide me through setting up a digital products WooCommerce store for selling online courses and PDFs.', explain:'WooCommerce powers 25% of online stores — this helps you configure it correctly from the start.' },
  { id:35, cat:'wordpress', title:'WordPress Speed Optimizer', desc:'Optimize WordPress for maximum performance.', prompt:'Provide a complete WordPress performance optimization guide for [SITE TYPE]. Cover caching, image optimization, database cleanup, CDN configuration, CSS/JS minification, and Core Web Vitals fixes.', example:'Provide a complete WordPress performance optimization guide for a news website with high traffic.', explain:'Slow WordPress sites lose visitors and ranking — this gives a complete speed improvement checklist.' },
  // ── UI/UX ──
  { id:36, cat:'uiux', featured:true, title:'Design System Creator', desc:'Build a consistent, scalable design system.', prompt:'Create a design system for [BRAND/APP]. Include color palette with usage rules, typography scale, spacing system, component library overview, iconography guidelines, and WCAG AA accessibility standards.', example:'Create a design system for a fintech mobile app with primary blue, success green, Inter typography, and 8px spacing grid.', explain:'Design systems keep your UI consistent across every page — this is how professional design teams work.' },
  { id:37, cat:'uiux', title:'User Flow Mapper', desc:'Map intuitive user journeys through your product.', prompt:'Map the complete user flow for [FEATURE] in [PRODUCT]. Identify entry points, decision nodes, happy path, error states, edge cases, exit points, and emotional states at each stage.', example:'Map the complete user flow for the checkout process in an e-commerce mobile app including cart, payment, and confirmation.', explain:'User flow mapping helps you find broken journeys before you build them — saving time and improving UX.' },
  { id:38, cat:'uiux', title:'Accessibility Audit', desc:'Audit UI for WCAG 2.1 accessibility compliance.', prompt:'Review [UI COMPONENT/SCREEN] for WCAG 2.1 AA accessibility. Check color contrast ratios, keyboard navigation, screen reader compatibility, focus management, ARIA labels, and semantic HTML.', example:'Review my hero section with a dark overlay on an image background for all WCAG 2.1 AA requirements.', explain:'Accessible design is both ethical and legally required in many countries — this catches every issue.' },
  { id:39, cat:'uiux', title:'Landing Page Wireframe', desc:'Structure high-converting landing pages.', prompt:'Create a detailed wireframe outline for a [PRODUCT TYPE] landing page. Include sections: hero, social proof, features, how it works, pricing, FAQ, and CTA — with content hierarchy and conversion rationale.', example:'Create a detailed wireframe for a SaaS project management tool landing page targeting small business owners.', explain:'Wireframing before designing saves hours of revisions and structures a page for maximum conversions.' },
  // ── CONTENT ──
  { id:40, cat:'content', featured:true, title:'Blog Post Architect', desc:'Structure compelling, SEO-optimized blog posts.', prompt:'Write a complete blog post on "[TOPIC]" for [TARGET AUDIENCE]. Include SEO title, meta description, H1-H3 structure, intro hook, 3-5 main sections with examples, conclusion with CTA, and 5 LSI keywords.', example:'Write a complete blog post on "10 JavaScript Tips Every Beginner Should Know" for new web developers.', explain:'This structures your blog post for both readers and search engines, helping it rank and get clicks.' },
  { id:41, cat:'content', title:'Technical Documentation Writer', desc:'Write clear, comprehensive technical docs.', prompt:'Write technical documentation for [FEATURE/API/LIBRARY]. Cover overview, prerequisites, quick start, detailed usage with code examples, configuration options, troubleshooting, and changelog. Audience: [LEVEL].', example:'Write technical documentation for a custom JavaScript date picker library targeting intermediate developers.', explain:'Good documentation separates professional projects from hobby projects — this does it right.' },
  { id:42, cat:'content', title:'YouTube Script Writer', desc:'Write engaging YouTube video scripts.', prompt:'Write a YouTube script for a [LENGTH] video on "[TOPIC]". Include 15-second hook, intro, 3-5 main sections with b-roll suggestions, audience engagement moments, and strong CTA outro.', example:'Write a YouTube script for a 10-minute video on "How to Build Your First Website" for complete beginners.', explain:'YouTube scripts need hooks in the first 15 seconds or viewers leave — this structures it for retention.' },
  { id:43, cat:'content', title:'Email Newsletter Writer', desc:'Write newsletters that get opened and clicked.', prompt:'Write a [TOPIC] newsletter for [AUDIENCE]. Include subject line (A/B test 2 options), preheader text, opening hook, 3 value-packed sections, one story, CTA, and sign-off. Under 500 words.', example:'Write a weekly newsletter for web developers covering 3 new CSS tricks, one JavaScript tip, and a tool recommendation.', explain:'Email newsletters have the highest ROI of any marketing channel — this helps you write ones people love.' },
  // ── SOCIAL MEDIA ──
  { id:44, cat:'social', featured:true, title:'LinkedIn Content Calendar', desc:'Build a 4-week LinkedIn authority strategy.', prompt:'Create a 4-week LinkedIn content calendar for [PROFESSIONAL/BRAND] in [INDUSTRY]. Include post types (insight, story, list, poll), hooks, body copy, hashtags, and posting times.', example:'Create a 4-week LinkedIn content calendar for a freelance web developer sharing tips, project stories, and client wins.', explain:'Consistent LinkedIn posting builds your professional brand — this calendar keeps you organized and strategic.' },
  { id:45, cat:'social', title:'Twitter Thread Creator', desc:'Write viral Twitter/X threads.', prompt:'Write a Twitter/X thread on "[TOPIC]" for [AUDIENCE]. Start with a scroll-stopping hook tweet, follow with 6-8 value-packed tweets, and end with a CTA. Include numbers, quotes, or contrarian takes.', example:'Write a Twitter thread on "5 CSS tricks that replace JavaScript" for front-end developers.', explain:'Twitter threads go viral when they teach something valuable fast — this structure gets engagement.' },
  { id:46, cat:'social', title:'Instagram Caption Writer', desc:'Write captions that drive engagement.', prompt:'Write 5 Instagram caption variations for [POST TOPIC]. Each should start with a hook, include a micro-story or insight, ask a question for comments, and end with 3-5 relevant hashtags.', example:'Write 5 Instagram captions for a before/after website redesign post targeting design-curious business owners.', explain:'Instagram captions need a hook in line 1 or the algorithm hides them — this prompt gets you those first words.' },
  // ── MARKETING ──
  { id:47, cat:'marketing', featured:true, title:'Go-To-Market Strategy', desc:'Launch your product with a complete GTM strategy.', prompt:'Create a go-to-market strategy for [PRODUCT] targeting [AUDIENCE]. Cover positioning, ICP definition, value proposition, pricing, acquisition channels, content plan, KPIs, and 90-day launch roadmap.', example:'Create a go-to-market strategy for a browser extension that helps developers write better commit messages.', explain:'A GTM strategy prevents the most common startup mistake: building with no plan to reach customers.' },
  { id:48, cat:'marketing', title:'SEO Content Brief', desc:'Create data-driven SEO content briefs.', prompt:'Create an SEO content brief for "[TARGET KEYWORD]". Include search intent, target audience, recommended title, meta description, H1-H3 structure, word count, semantic keywords, and competitor notes.', example:'Create an SEO content brief for the keyword "how to learn web development for free" targeting beginners.', explain:'SEO briefs guide content creation so you rank for the right keywords and satisfy user intent.' },
  { id:49, cat:'marketing', title:'Email Drip Campaign', desc:'Design automated email nurture sequences.', prompt:'Design a 7-email drip campaign for [PRODUCT] for [LEAD SOURCE] leads. For each email: send timing, subject line, preview text, body copy, CTA, and goal. Include re-engagement branch for non-openers.', example:'Design a 7-email drip campaign for a web design course for leads who signed up for a free HTML/CSS guide.', explain:'Drip campaigns automatically build relationships with leads so you close more sales without manual follow-up.' },
  { id:50, cat:'marketing', title:'Conversion Rate Optimizer', desc:'Fix conversion leaks in your funnel.', prompt:'Analyze [LANDING PAGE/FUNNEL STEP] for conversion issues. Review headline clarity, value proposition, trust signals, friction points, CTA strength, form length, and mobile experience. Provide an A/B test roadmap.', example:'Analyze a SaaS trial signup page with a 2% conversion rate and suggest 5 A/B tests to improve it.', explain:'Most landing pages lose 95%+ of visitors — this finds exactly where and why they leave.' },
  // ── BUSINESS ──
  { id:51, cat:'business', featured:true, title:'Business Model Canvas', desc:'Design or refine your business model.', prompt:'Complete a Business Model Canvas for [BUSINESS IDEA]. Cover all 9 blocks: key partners, key activities, key resources, value propositions, customer relationships, channels, customer segments, cost structure, and revenue streams.', example:'Complete a Business Model Canvas for a freelance web design agency targeting local small businesses.', explain:'The BMC forces you to think through every part of your business on one page — essential before building.' },
  { id:52, cat:'business', title:'Investor Pitch Outline', desc:'Structure a compelling startup pitch deck.', prompt:'Create a 12-slide pitch deck outline for [STARTUP] raising [AMOUNT]. Slides: problem, solution, market size, product demo, business model, traction, team, competition, GTM, financials, use of funds, and ask.', example:'Create a pitch deck outline for an EdTech startup raising $200K seed to build an AI-powered coding tutor.', explain:'Investors see hundreds of pitches — this structure covers every question they will ask.' },
  { id:53, cat:'business', title:'OKR Goal Framework', desc:'Set clear, measurable OKRs for your team.', prompt:'Create OKRs for [TEAM] for Q[X] [YEAR]. Define 3 Objectives, each with 3-4 measurable Key Results that are specific, measurable, achievable, relevant, and time-bound. Include a scoring guide.', example:'Create OKRs for a 4-person web development team for Q3 2025 focused on product launch and user acquisition.', explain:'OKRs replace vague goals with specific measurable outcomes — how Google and top startups set targets.' },
  // ── EDUCATION ──
  { id:54, cat:'education', featured:true, title:'Lesson Plan Creator', desc:'Design engaging, outcome-focused lesson plans.', prompt:'Create a [DURATION] lesson plan on "[TOPIC]" for [GRADE/LEVEL]. Include learning objectives, materials, warm-up activity, main instruction with differentiation strategies, hands-on activity, and assessment.', example:'Create a 45-minute lesson plan on "Introduction to HTML" for 9th-grade students with no coding experience.', explain:'Structured lesson plans ensure every student achieves the learning objective, not just the fastest learners.' },
  { id:55, cat:'education', title:'Study Guide Generator', desc:'Create comprehensive study guides for any subject.', prompt:'Create a study guide for [SUBJECT/TOPIC] for [EXAM/COURSE]. Include key concepts summary, vocabulary with definitions, important formulas or frameworks, common misconceptions, and 10 practice questions with answers.', example:'Create a study guide for CSS Flexbox and Grid for a front-end development final exam.', explain:'A good study guide condenses weeks of learning into a focused review, cutting study time in half.' },
  { id:56, cat:'education', title:'Quiz Question Bank', desc:'Generate a diverse question bank on any topic.', prompt:'Generate a 20-question quiz on [TOPIC] for [LEVEL]. Include 5 multiple choice, 5 true/false, 5 short answer, and 5 application/scenario questions. Vary difficulty and provide an answer key with explanations.', example:'Generate a 20-question quiz on JavaScript fundamentals for beginner web developers with answer key.', explain:'Question banks let teachers and students practice and test knowledge across different difficulty levels.' },
  // ── PRODUCTIVITY ──
  { id:57, cat:'productivity', featured:true, title:'Weekly Planning System', desc:'Design a powerful weekly planning ritual.', prompt:'Design a weekly planning system for [ROLE]. Include Sunday review template (wins, lessons), Monday planning ritual, daily time-blocking structure, priority matrix, energy management tips, and Friday shutdown checklist.', example:'Design a weekly planning system for a freelance web developer juggling client projects and self-learning.', explain:'A planning system prevents busy-but-not-productive weeks — this covers your whole week in one structure.' },
  { id:58, cat:'productivity', title:'Meeting Agenda Builder', desc:'Run efficient, purposeful meetings.', prompt:'Create a [DURATION] meeting agenda for [MEETING TYPE] with [NUMBER] attendees. Include pre-meeting prep, objective statement, timed agenda items, decision capture, action items template, and follow-up email.', example:'Create a 60-minute weekly team meeting agenda for a 6-person web development team with sprint review.', explain:'Bad meetings waste time and lower morale — this structure ensures every minute has a purpose.' },
  { id:59, cat:'productivity', title:'Decision Making Framework', desc:'Make better decisions under uncertainty.', prompt:'Help me decide about [DECISION] using the WRAP framework: Widen options (3+ alternatives), Reality-test (steelman each), Attain distance (10-year view), Prepare to be wrong (pre-mortem). Give a final recommendation.', example:'Help me decide whether to take a full-time job offer or continue freelancing as a web developer.', explain:'Most decisions are made emotionally then justified logically — WRAP forces you to think clearly first.' },
  // ── AI TOOLS ──
  { id:60, cat:'ai', featured:true, title:'System Prompt Engineer', desc:'Write powerful AI system prompts for any use case.', prompt:'Write a professional system prompt for an AI assistant that acts as [ROLE] for [USE CASE]. Define persona, expertise, response style, output format, things to always do, and things to never do.', example:'Write a system prompt for an AI assistant that acts as a senior web development mentor for beginner students.', explain:'System prompts control how AI behaves — a well-written one dramatically improves response quality.' },
  { id:61, cat:'ai', title:'ChatGPT Prompt Optimizer', desc:'Transform weak prompts into powerful AI instructions.', prompt:'Take this weak AI prompt: "[ORIGINAL PROMPT]" and rewrite it to be more effective. Add role assignment, context, specific format instructions, examples, constraints, and success criteria. Explain each improvement.', example:'Take the prompt "write me a website" and transform it into a detailed prompt that gets a professional result.', explain:'The difference between a bad and great AI response is usually the prompt quality — this teaches you to improve them.' },
  { id:62, cat:'ai', title:'AI Workflow Automator', desc:'Design AI-powered automation workflows.', prompt:'Design an AI automation workflow for [REPETITIVE TASK] in [BUSINESS CONTEXT]. Include trigger events, AI decision points, tool integrations, error handling, human review checkpoints, and estimated time savings.', example:'Design an AI automation workflow for processing job applications from screening to scheduling interviews.', explain:'AI automation can eliminate hours of repetitive work — this designs the entire system before you build it.' },
  { id:63, cat:'ai', title:'AI Prompt Chain Designer', desc:'Build multi-step AI prompt chains for complex tasks.', prompt:'Design a prompt chain for [COMPLEX TASK]. Break it into 4-6 sequential prompts where output from one feeds the next. Include purpose of each step, input format, output format, and validation criteria.', example:'Design a prompt chain for writing a complete blog post from keyword research to outline to draft to SEO optimization.', explain:'Complex tasks need multiple steps — chaining prompts together gives much better results than one big prompt.' },
  // ── RESEARCH ──
  { id:64, cat:'research', featured:true, title:'Research Paper Outline', desc:'Structure a complete research paper.', prompt:'Create a research paper outline on "[TOPIC]" following [ACADEMIC STYLE]. Include abstract structure, introduction with research gap, literature review sections, methodology, results, discussion, and conclusion.', example:'Create a research paper outline on "The Impact of AI Chatbots on Student Learning" following APA style.', explain:'A strong outline is 80% of a good research paper — this builds the skeleton so you can focus on content.' },
  { id:65, cat:'research', title:'Literature Review Writer', desc:'Write a comprehensive academic literature review.', prompt:'Write a literature review on [TOPIC] covering [NUMBER] studies. Synthesize findings by theme, identify research gaps, note methodological differences, and end with what question your research addresses.', example:'Write a literature review on gamification in online education covering 8 peer-reviewed studies from 2018-2024.', explain:'Literature reviews show you understand existing research — this prompt structures one professionally.' },
  { id:66, cat:'research', title:'Research Methodology Designer', desc:'Design a rigorous research methodology.', prompt:'Design the research methodology for studying [RESEARCH QUESTION]. Include research philosophy, design (quantitative/qualitative/mixed), data collection methods, sampling strategy, validity measures, and ethical considerations.', example:'Design the methodology for studying "How social media affects student academic performance" for an undergraduate thesis.', explain:'Choosing the right methodology makes your research credible — this walks you through every decision.' },
  { id:67, cat:'research', title:'Thesis Statement Crafter', desc:'Write strong, arguable thesis statements.', prompt:"Craft 3 thesis statement options for a [PAPER TYPE] on \"[TOPIC]\" at [ACADEMIC LEVEL]. Each should be arguable, specific, focused, and preview the paper's main argument. Explain strengths of each.", example:'Craft 3 thesis statement options for an argumentative paper on "AI replacing teachers" at undergraduate level.', explain:'A thesis statement is the backbone of your paper — a weak one makes everything else harder to write.' },
  // ── STUDENT ──
  { id:68, cat:'student', featured:true, title:'Assignment Writing Coach', desc:'Get guidance on any academic assignment.', prompt:'Help me write [ASSIGNMENT TYPE] on "[TOPIC]" for [COURSE] at [ACADEMIC LEVEL]. Provide clear structure, key arguments, evidence types to use, citation format, word count distribution, and common mistakes to avoid.', example:'Help me write a 1500-word argumentative essay on "Should AI be used in education?" for a university English course.', explain:'This acts like a personal tutor who guides you through an assignment step by step.' },
  { id:69, cat:'student', title:'Exam Preparation Plan', desc:'Create a personalized exam study plan.', prompt:'Create an exam preparation plan for [EXAM/SUBJECT] with [TIME AVAILABLE]. Include topic priority list, daily study schedule, active recall techniques, practice question types, and last-24-hour review strategy.', example:'Create a 2-week exam preparation plan for a final Computer Science exam covering algorithms, databases, and networking.', explain:'Random studying is inefficient — this creates a structured plan that maximizes what you retain.' },
  { id:70, cat:'student', title:'MCQ Question Generator', desc:'Generate practice MCQs on any topic.', prompt:'Generate [NUMBER] MCQ questions on [TOPIC] for [EXAM/LEVEL]. For each question write the question, 4 options (one correct), mark the answer, and explain why the correct answer is right and why others are wrong.', example:'Generate 20 MCQ questions on JavaScript fundamentals for a web development certification exam.', explain:'Testing yourself with MCQs is one of the best ways to learn — this generates unlimited practice questions.' },
  { id:71, cat:'student', title:'Presentation Slide Planner', desc:'Plan engaging academic presentations.', prompt:'Create a complete presentation plan for [TOPIC] for [AUDIENCE] in [TIME LIMIT]. Include slide-by-slide outline with talking points, visual suggestions, speaker notes, transition ideas, and Q&A preparation.', example:'Create a 10-minute presentation plan on "How Machine Learning Works" for a university Computer Science class.', explain:'A presentation plan ensures you stay on time, cover every point, and know what to say on each slide.' },
  { id:72, cat:'student', title:'Viva Voce Preparation', desc:'Prepare for oral examinations and viva voce.', prompt:'Prepare me for a viva/oral exam on [THESIS/PROJECT TOPIC] in [SUBJECT]. Generate 15 likely examiner questions, model answers, tips on defending methodology, handling tough questions, and opening statement.', example:'Prepare me for a viva on my final year project "Student Result Management System in PHP" for my BSc Computer Science degree.', explain:'Viva exams are intimidating — this predicts the questions and helps you practice confident answers.' },
  { id:73, cat:'student', title:'Study Notes Creator', desc:'Transform lectures into clean study notes.', prompt:'Convert this [LECTURE/CHAPTER CONTENT] into structured study notes. Use clear headings, bullet points for key facts, highlighted definitions, diagram descriptions, memory tricks, and a summary box at the end.', example:'Convert my database normalization lecture into structured study notes with clear examples of 1NF, 2NF, and 3NF.', explain:'Well-structured notes make revision much faster — this organizes information so it is easy to remember.' },
  { id:74, cat:'student', title:'Group Project Coordinator', desc:'Plan and coordinate academic group projects.', prompt:'Create a coordination plan for a group project on "[PROJECT TOPIC]" for [COURSE]. Include role assignments, task breakdown, timeline with milestones, collaboration tools, conflict resolution steps, and final presentation plan.', example:'Create a coordination plan for a 5-person group project to build a hospital management web app for Software Engineering.', explain:'Group projects fail without clear roles and deadlines — this creates the structure your team needs.' },
  { id:75, cat:'student', title:'Scholarship Application Writer', desc:'Write compelling scholarship applications.', prompt:'Write a scholarship application for [SCHOLARSHIP TYPE] for a student in [FIELD/DEGREE]. Include personal statement, academic achievements, financial need statement, future goals, and why this scholarship will help.', example:'Write a scholarship application for a technology merit scholarship for a Computer Science undergraduate from Pakistan.', explain:'Scholarship committees read hundreds of applications — this helps yours stand out with a compelling story.' },
  // ── EXTRA WEB DEV ──
  { id:76, cat:'webdev', title:'API Security Checklist', desc:'Secure your APIs against common vulnerabilities.', prompt:'Create a security checklist for [API TYPE] covering authentication, authorization, input validation, rate limiting, CORS policy, SQL injection prevention, data encryption, and security headers. Provide implementation code.', example:'Create a security checklist for a PHP REST API for a student portal handling personal and academic data.', explain:'Unsecured APIs expose user data — this checklist covers every major vulnerability before your API goes live.' },
  { id:77, cat:'webdev', title:'Progressive Web App Builder', desc:'Convert a website into a PWA.', prompt:'Convert [WEBSITE] into a Progressive Web App. Include service worker with caching strategy, web app manifest, offline fallback page, push notification setup, install prompt, and performance budget.', example:'Convert my portfolio website into a PWA with offline support, installable on Android and iOS home screens.', explain:'PWAs work offline and can be installed like apps — this makes your website feel native on mobile.' },
  // ── EXTRA CSS ──
  { id:78, cat:'css', title:'CSS Dark Mode System', desc:'Build a complete dark/light mode toggle system.', prompt:'Build a complete dark/light mode system using CSS custom properties and JavaScript. Include CSS variable approach, JavaScript toggle with LocalStorage, system preference detection, and smooth transitions.', example:'Build a complete dark/light mode system for a blog website that detects system preference and saves user choice.', explain:'Dark mode done wrong causes a flash of wrong theme — this shows the professional way to implement it.' },
  { id:79, cat:'css', title:'CSS Responsive Typography', desc:'Create a fluid, responsive typography system.', prompt:'Design a fluid typography system for [WEBSITE TYPE] using clamp(), viewport units, and a modular scale. Show font sizes for all heading levels and body text that scale smoothly between mobile and desktop.', example:'Design a fluid typography system for a developer blog that scales from 320px mobile to 1440px desktop.', explain:'Fluid typography eliminates media queries on text — your fonts scale perfectly at every screen size.' },
  // ── EXTRA JS ──
  { id:80, cat:'js', title:'JavaScript Event System', desc:'Build a pub/sub event system in JavaScript.', prompt:'Build a custom event system (pub/sub pattern) in JavaScript for [APPLICATION]. Include on(), off(), emit(), once() methods, error handling, memory leak prevention, and integration examples with UI components.', example:'Build a custom event system for a single-page app to communicate between cart, navbar, and product components.', explain:'Event systems decouple components — changing one part of your app does not break others.' },
  // ── EXTRA AI ──
  { id:81, cat:'ai', title:'AI Code Reviewer', desc:'Use AI to systematically review your codebase.', prompt:'Act as a senior software engineer and review this [LANGUAGE] codebase for code quality, design patterns, security vulnerabilities, performance bottlenecks, test coverage gaps, and documentation quality. Prioritize findings.', example:'Act as a senior engineer and review my PHP login system code for security vulnerabilities and code quality.', explain:'AI code review catches issues a tired developer misses and explains the best practices behind every fix.' },
  { id:82, cat:'ai', title:'AI Content Repurposer', desc:'Repurpose one piece of content into many formats.', prompt:'Take this [ORIGINAL CONTENT] and repurpose it into 3 LinkedIn posts, 1 Twitter thread (8 tweets), 1 email newsletter, 3 Instagram captions, 1 YouTube script intro, and 5 short-form video hooks.', example:'Take my 2000-word blog post on "JavaScript Promises Explained" and repurpose it into all social media formats.', explain:'One piece of content can become 20+ posts — this multiplies your content output without extra writing.' },
  // ── EXTRA STUDENT ──
  { id:83, cat:'student', title:'Concept Simplifier', desc:'Get any complex concept explained simply.', prompt:'Explain [COMPLEX CONCEPT] from [SUBJECT] to a [LEVEL] student using a real-world analogy, step-by-step breakdown, visual description, 3 misconceptions clarified, and 3 practice questions.', example:'Explain database normalization to a 2nd-year Computer Science student using a real-world example.', explain:'This transforms confusing textbook concepts into clear, memorable explanations any student can understand.' },
  { id:84, cat:'student', title:'Project Report Writer', desc:'Structure and write academic project reports.', prompt:'Write a [PAGE COUNT] project report for [PROJECT NAME] in [TECHNOLOGY STACK]. Include abstract, introduction, problem statement, objectives, methodology, system design, implementation, testing, and conclusion.', example:'Write a 30-page project report for "Online Student Portal System" built in PHP and MySQL for a final year BSc project.', explain:'Project reports follow a strict structure — this ensures you include every required section professionally.' },
  // ── EXTRA RESEARCH ──
  { id:85, cat:'research', title:'Abstract Writer', desc:'Write concise, complete academic abstracts.', prompt:'Write an abstract for a [PAPER TYPE] on "[TOPIC]" of [WORD COUNT] words. Include background, research gap, objective, methodology, key findings, and conclusion/implication.', example:'Write a 250-word abstract for a research paper on "AI in Radiology" for a medical journal following APA style.', explain:'Abstracts are the first thing reviewers read — a well-written one determines if your paper gets considered.' },
  { id:86, cat:'research', title:'Data Analysis Interpreter', desc:'Interpret research data and findings.', prompt:'Help me interpret the following research data: [DATA/RESULTS]. Explain what the numbers mean, statistical significance, patterns and trends, how they relate to my hypothesis, and how to write the findings section.', example:'Help me interpret survey data showing 78% of students prefer video tutorials over textbooks for learning web development.', explain:'Raw data is meaningless without interpretation — this transforms numbers into academic findings.' },
  // ── EXTRA BOOTSTRAP ──
  { id:87, cat:'bootstrap', title:'Bootstrap Navbar Variants', desc:'Create professional navbar designs with Bootstrap.', prompt:'Create 3 Bootstrap 5 navbar variants for [PROJECT TYPE]: sticky transparent, solid with dropdown megamenu, and mobile drawer. Include custom CSS for brand colors, active states, and smooth scroll links.', example:'Create 3 Bootstrap 5 navbar designs for a portfolio website — transparent hero, solid scroll, and full-screen mobile menu.', explain:'The navbar is the first UI element users see — this gives you 3 professional options to choose from.' },
  { id:88, cat:'bootstrap', title:'Bootstrap Modal System', desc:'Build a complete Bootstrap modal system.', prompt:'Build a complete Bootstrap 5 modal system for [USE CASE] with standard modal, fullscreen modal, form modal with validation, image lightbox, and confirmation dialog. Include JavaScript for dynamic content loading.', example:'Build a Bootstrap 5 modal system for an admin dashboard with form modals, image preview, and delete confirmation.', explain:'Modals are used everywhere in web apps — this shows you every variant you will ever need.' },
  // ── EXTRA PHP ──
  { id:89, cat:'php', title:'PHP Session Manager', desc:'Build a secure PHP session management system.', prompt:'Build a PHP session management system for [WEB APP TYPE]. Include secure session start configuration, session fixation prevention, session hijacking protection, remember-me functionality, and multi-device logout.', example:'Build a PHP session management system for a bank portal with automatic logout after inactivity.', explain:'PHP sessions are vulnerable to attacks if not configured correctly — this shows the secure approach.' },
  { id:90, cat:'php', title:'PHP Email System', desc:'Send emails reliably from PHP applications.', prompt:'Build a PHP email system for [APPLICATION] using PHPMailer. Include SMTP configuration, HTML email templates, plain text fallback, attachment handling, queue for bulk emails, and bounce handling.', example:'Build a PHP email system for a school management app to send results and notifications to parents.', explain:'PHP built-in mail() is unreliable — PHPMailer is how professional apps send email.' },
  // ── EXTRA WORDPRESS ──
  { id:91, cat:'wordpress', title:'WordPress SEO Setup', desc:'Configure WordPress for maximum search visibility.', prompt:'Provide a complete WordPress SEO setup guide for [WEBSITE TYPE]. Cover Yoast/RankMath configuration, sitemap, robots.txt, schema markup, page speed optimization, and internal linking strategy.', example:'Provide a complete WordPress SEO setup guide for a local restaurant website targeting local customers.', explain:'WordPress out of the box is not SEO-optimized — this ensures search engines can find and rank your content.' },
  { id:92, cat:'wordpress', title:'WordPress Security Hardener', desc:'Lock down your WordPress site against attacks.', prompt:'Provide a WordPress security hardening checklist for [SITE TYPE]. Cover login protection, file permissions, database prefix change, security plugins, firewall rules, backup strategy, malware scanning, and 2FA setup.', example:'Provide a WordPress security hardening guide for a WooCommerce store handling customer payments.', explain:'WordPress powers 40% of the web and is the top target for hackers — this closes every common attack vector.' },
  // ── EXTRA PRODUCTIVITY ──
  { id:93, cat:'productivity', title:'Project Management Planner', desc:'Plan complex projects with full task management.', prompt:'Create a project plan for [PROJECT NAME] to be completed by [DEADLINE]. Include project scope, work breakdown structure, task dependencies, critical path, risk assessment, and weekly milestone check-ins.', example:'Create a project plan for building and launching a freelance portfolio website in 4 weeks while working part-time.', explain:'Projects without plans go over time and budget — this structure keeps you on track from day one.' },
  { id:94, cat:'productivity', title:'Habit System Designer', desc:'Build a scientific habit system for any goal.', prompt:"Design a habit system for achieving [GOAL] using habit stacking, implementation intentions, and the 2-minute rule. Include habit trigger, routine, reward, tracking method, scorecard, and monthly review template.", example:'Design a habit system for learning web development consistently for 1 hour every day despite a busy college schedule.', explain:'Willpower fails — habit systems succeed. This builds automatic behaviors that stick without effort.' },
  // ── EXTRA MARKETING ──
  { id:95, cat:'marketing', title:'Product Launch Campaign', desc:'Plan a complete product launch campaign.', prompt:'Create a full product launch campaign for [PRODUCT] launching on [DATE]. Include 4-week pre-launch teaser strategy, launch day plan, post-launch momentum activities, channel-specific tactics, and success metrics.', example:'Create a full launch campaign for a Bootstrap UI kit template launching on Gumroad targeting web developers.', explain:'A launch without a campaign is a product nobody knows about — this plan builds buzz before, during, and after.' },
  { id:96, cat:'marketing', title:'Brand Voice Guide', desc:"Define your brand's unique voice and tone.", prompt:"Create a brand voice guide for [COMPANY/PRODUCT] targeting [AUDIENCE]. Include brand personality adjectives, voice characteristics, tone variations by context, writing dos and don'ts, and 5 example rewrites.", example:"Create a brand voice guide for a freelance web developer's personal brand targeting startup founders.", explain:'Consistent brand voice builds trust — customers recognize and prefer brands that always sound like themselves.' },
  // ── EXTRA UI/UX ──
  { id:97, cat:'uiux', title:'UX Copy Writer', desc:'Write clear, conversion-focused UX copy.', prompt:'Write UX copy for [INTERFACE ELEMENT] in [PRODUCT]. Create headline, subheadline, CTA button text, empty state message, error messages, and success confirmations. Tone: [TONE]. Optimize for clarity and conversion.', example:'Write UX copy for a file upload interface in a document management SaaS product with a professional tone.', explain:'UX copy guides users through your product — unclear copy is one of the top reasons users abandon apps.' },
  // ── EXTRA BUSINESS ──
  { id:98, cat:'business', title:'Competitive Analysis', desc:'Analyze competitors and find your strategic edge.', prompt:'Conduct a competitive analysis for [COMPANY] vs [COMPETITORS]. Compare product features, pricing, positioning, distribution channels, strengths, weaknesses, customer reviews sentiment, and identify market gaps.', example:'Conduct a competitive analysis for a new web hosting service vs Hostinger, SiteGround, and Bluehost.', explain:'Competitive analysis reveals market gaps and helps you position your product to win.' },
  // ── EXTRA CONTENT ──
  { id:99, cat:'content', title:'Case Study Creator', desc:'Write persuasive case studies that convert prospects.', prompt:'Write a case study for [CLIENT/PROJECT]. Structure: challenge, solution, implementation process, measurable results with specific metrics, client quote, key takeaways, and CTA. Audience: [AUDIENCE].', example:"Write a case study for a web design project that increased a restaurant's online orders by 40% after a redesign.", explain:'Case studies build trust with prospects by showing real proof that your work delivers results.' },
  // ── EXTRA EDUCATION ──
  { id:100, cat:'education', title:'Explainer for Any Concept', desc:'Break down complex topics for any audience.', prompt:'Explain [COMPLEX CONCEPT] to a [AGE/LEVEL] audience. Use 1 simple analogy, step-by-step breakdown with no jargon, a real-world example, a visual description, 3 misconceptions debunked, and 3 follow-up questions.', example:'Explain how CSS Flexbox works to a complete beginner using a real-world analogy and step-by-step breakdown.', explain:'This prompt transforms any complex concept into something anyone can understand — perfect for teaching.' },
];

/* ================================================================
   STATE
   ================================================================ */
let customPrompts = JSON.parse(localStorage.getItem('pv_custom') || '[]');
let ALL_PROMPTS   = [...BASE_PROMPTS, ...customPrompts];

const state = {
  tab:        'all',
  cat:        'all',
  q:          '',
  sort:       'default',
  editId:     null,
  deleteId:   null,
  favs:       new Set(JSON.parse(localStorage.getItem('pv_favs')    || '[]')),
  ratings:    JSON.parse(localStorage.getItem('pv_ratings') || '{}'),
  copiedCount:parseInt(localStorage.getItem('pv_copied')   || '0'),
  recent:     JSON.parse(localStorage.getItem('pv_recent')  || '[]'),
};

/* ================================================================
   PERSISTENCE
   ================================================================ */
function saveAll() {
  localStorage.setItem('pv_favs',    JSON.stringify([...state.favs]));
  localStorage.setItem('pv_ratings', JSON.stringify(state.ratings));
  localStorage.setItem('pv_copied',  state.copiedCount);
  localStorage.setItem('pv_recent',  JSON.stringify(state.recent));
  localStorage.setItem('pv_custom',  JSON.stringify(customPrompts));
}

/* ================================================================
   NOTIFICATIONS
   ================================================================ */
function notify(msg, type = 'info') {
  const icons = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  };
  const c = document.getElementById('notifs');
  const n = document.createElement('div');
  n.className = `notif ${type}`;
  n.innerHTML = `<div class="notif-icon">${icons[type] || icons.info}</div>${msg}`;
  c.appendChild(n);
  requestAnimationFrame(() => n.classList.add('show'));
  setTimeout(() => { n.classList.remove('show'); setTimeout(() => n.remove(), 400); }, 2600);
}

/* ================================================================
   ANIMATED COUNTER
   ================================================================ */
function counter(el, target, dur = 700) {
  const s  = parseInt(el.textContent) || 0;
  const r  = target - s;
  const t0 = performance.now();
  function u(now) {
    const p = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(s + r * e);
    if (p < 1) requestAnimationFrame(u);
  }
  requestAnimationFrame(u);
}

/* ================================================================
   SEARCH HIGHLIGHT
   ================================================================ */
function hl(text, q) {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

/* ================================================================
   CATEGORY HELPERS
   ================================================================ */
function catData(id) {
  return CATS.find(c => c.id === id) || { label: id, color: 'var(--accent)' };
}

/* ================================================================
   STATS
   ================================================================ */
function updateStats() {
  ALL_PROMPTS = [...BASE_PROMPTS, ...customPrompts];
  document.getElementById('heroBadgeCount').textContent = ALL_PROMPTS.length + '+';
  counter(document.getElementById('sTotal'),  ALL_PROMPTS.length);
  counter(document.getElementById('sCats'),   CATS.length - 1);
  counter(document.getElementById('sFavs'),   state.favs.size);
  counter(document.getElementById('sCopied'), state.copiedCount);
  counter(document.getElementById('sCustom'), customPrompts.length);
  counter(document.getElementById('sRated'),  Object.keys(state.ratings).length);
}

/* ================================================================
   FEATURED
   ================================================================ */
function buildFeatured() {
  const sc = document.getElementById('featuredScroll');
  sc.innerHTML = '';
  ALL_PROMPTS.filter(p => p.featured).forEach(p => {
    const cd = catData(p.cat);
    const d  = document.createElement('div');
    d.className = 'featured-card';
    d.innerHTML = `
      <div class="featured-stars">${'★★★★★'.split('').map(s => `<span class="feat-star">${s}</span>`).join('')}</div>
      <div class="featured-title">${p.title}</div>
      <div class="featured-desc" style="color:${cd.color};font-weight:600;font-size:.7rem;margin-bottom:3px;text-transform:uppercase;letter-spacing:.4px">${cd.label}</div>
      <div class="featured-desc">${p.desc}</div>`;
    d.onclick = () => {
      state.cat = p.cat;
      buildCats();
      renderGrid();
      document.getElementById('promptGrid').scrollIntoView({ behavior: 'smooth' });
    };
    sc.appendChild(d);
  });
}

/* ================================================================
   CATEGORIES
   ================================================================ */
function buildCats() {
  const w    = document.getElementById('catsWrap');
  const fcat = document.getElementById('fCat');
  w.innerHTML = '';
  fcat.innerHTML = CATS
    .filter(c => c.id !== 'all')
    .map(c => `<option value="${c.id}">${c.label}</option>`)
    .join('');

  CATS.forEach(cat => {
    const count = cat.id === 'all'
      ? ALL_PROMPTS.length
      : ALL_PROMPTS.filter(p => p.cat === cat.id).length;

    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (state.cat === cat.id ? ' active' : '');
    btn.innerHTML = `${catSVG(cat.id)}<span>${cat.label}</span><span class="cat-count">${count}</span>`;
    btn.onclick = () => { state.cat = cat.id; buildCats(); renderGrid(); };
    w.appendChild(btn);
  });
}

/* ================================================================
   FILTER & SORT
   ================================================================ */
function getFiltered() {
  let list = [...ALL_PROMPTS];
  if (state.tab === 'favorites') list = list.filter(p => state.favs.has(p.id));
  if (state.tab === 'custom')    list = list.filter(p => p.custom);
  if (state.cat !== 'all')       list = list.filter(p => p.cat === state.cat);
  if (state.q) {
    const q = state.q.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)  ||
      p.prompt.toLowerCase().includes(q)||
      (catData(p.cat).label || '').toLowerCase().includes(q)
    );
  }
  if (state.sort === 'az')     list.sort((a, b) => a.title.localeCompare(b.title));
  if (state.sort === 'cat')    list.sort((a, b) => a.cat.localeCompare(b.cat));
  if (state.sort === 'rating') list.sort((a, b) => (state.ratings[b.id] || 0) - (state.ratings[a.id] || 0));
  return list;
}

/* ================================================================
   RENDER GRID
   ================================================================ */
function renderGrid() {
  const grid = document.getElementById('grid');
  const list = getFiltered();
  grid.innerHTML = '';

  if (!list.length) {
    const isFav = state.tab === 'favorites';
    grid.innerHTML = `<div class="empty-state">
      ${isFav
        ? `<svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
        : `<svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`}
      <h3>${isFav ? 'No favorites saved yet' : 'No prompts found'}</h3>
      <p>${isFav ? 'Click the heart icon on any prompt to save it here.' : 'Try a different search term or category.'}</p>
    </div>`;
    return;
  }

  list.forEach(p => {
    const cd     = catData(p.cat);
    const col    = cd.color || 'var(--accent)';
    const isFav  = state.favs.has(p.id);
    const rating = state.ratings[p.id] || 0;
    const q      = state.q;

    const favIconFilled  = `<svg viewBox="0 0 24 24" fill="var(--red)" stroke="var(--red)" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
    const favIconOutline = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
    const copyIcon       = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
    const editIcon       = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
    const deleteIcon     = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`;
    const infoIcon       = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    const bookIcon       = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
    const chevronDownIcon= `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`;

    const card = document.createElement('div');
    card.className = 'p-card';
    card.id = `card-${p.id}`;
    card.innerHTML = `
      ${p.custom ? '<span class="custom-badge">Custom</span>' : ''}
      <div class="p-hdr">
        <div class="p-title">${hl(p.title, q)}</div>
        <div class="p-actions">
          <button class="ic-btn${isFav ? ' fav-on' : ''}" title="${isFav ? 'Remove favorite' : 'Save favorite'}" onclick="toggleFav(${p.id}, this)">${isFav ? favIconFilled : favIconOutline}</button>
          <button class="ic-btn" title="Copy prompt" onclick="copyPrompt(${p.id}, this)">${copyIcon}</button>
          ${p.custom ? `
          <button class="ic-btn" title="Edit prompt" onclick="openEdit(${p.id})">${editIcon}</button>
          <button class="ic-btn del-btn" title="Delete prompt" onclick="confirmDelete(${p.id})">${deleteIcon}</button>` : ''}
        </div>
      </div>
      <span class="p-badge" style="color:${col};border-color:${col}22;background:${col}10">${catSVG(p.cat, 11)} ${cd.label}</span>
      <p class="p-desc">${hl(p.desc, q)}</p>
      <div class="p-box" id="box-${p.id}">${hl(p.prompt, q)}</div>
      <button class="read-more" onclick="toggleBox(${p.id}, this)">${chevronDownIcon} Read More</button>
      <div class="p-rating">
        ${[1, 2, 3, 4, 5].map(s => `<button class="s-btn${s <= rating ? ' lit' : ''}" onclick="rate(${p.id}, ${s}, this.parentElement)">&#9733;</button>`).join('')}
        <span class="rating-label">${rating ? rating + ' / 5' : 'Rate this'}</span>
      </div>
      <div class="det-row">
        ${p.example ? `<button class="det-btn" id="ex-btn-${p.id}" onclick="toggleDetail('ex', ${p.id})">${infoIcon} Example</button>` : ''}
        ${p.explain ? `<button class="det-btn" id="exp-btn-${p.id}" onclick="toggleDetail('exp', ${p.id})">${bookIcon} What This Does</button>` : ''}
      </div>
      ${p.example ? `<div class="p-example" id="ex-${p.id}"><strong>Example Usage</strong>${hl(p.example, q)}</div>` : ''}
      ${p.explain ? `<div class="p-explain" id="exp-${p.id}"><strong>What This Prompt Does</strong>${hl(p.explain, q)}</div>` : ''}
    `;
    grid.appendChild(card);
  });
}

/* ── Read More toggle ── */
function toggleBox(id, btn) {
  const box      = document.getElementById(`box-${id}`);
  const expanded = box.classList.toggle('expanded');
  const upSVG    = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>`;
  const downSVG  = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`;
  btn.innerHTML  = (expanded ? upSVG + ' Show Less' : downSVG + ' Read More');
}

/* ── Example / Explain toggle ── */
function toggleDetail(type, id) {
  const el  = document.getElementById(`${type}-${id}`);
  const btn = document.getElementById(`${type}-btn-${id}`);
  const vis = el.classList.toggle('show');
  btn.classList.toggle('active', vis);
}

/* ================================================================
   ACTIONS: FAVORITE
   ================================================================ */
function toggleFav(id, btn) {
  const favIconFilled  = `<svg viewBox="0 0 24 24" fill="var(--red)" stroke="var(--red)" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  const favIconOutline = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

  if (state.favs.has(id)) {
    state.favs.delete(id);
    btn.classList.remove('fav-on');
    btn.title    = 'Save favorite';
    btn.innerHTML = favIconOutline;
    notify('Removed from favorites', 'error');
  } else {
    state.favs.add(id);
    btn.classList.add('fav-on');
    btn.title    = 'Remove favorite';
    btn.innerHTML = favIconFilled;
    notify('Added to favorites', 'success');
    btn.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.45)' }, { transform: 'scale(1)' }],
      { duration: 320 }
    );
  }
  saveAll();
  updateStats();
  if (state.tab === 'favorites') renderGrid();
}

/* ================================================================
   ACTIONS: COPY
   ================================================================ */
function copyPrompt(id, btn) {
  const p = ALL_PROMPTS.find(x => x.id === id);
  if (!p) return;

  const copyIcon  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
  const checkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`;

  function onCopied() {
    btn.classList.add('copy-ok');
    btn.innerHTML = checkIcon;
    notify('Prompt copied to clipboard', 'success');
    state.copiedCount++;
    state.recent = [p.title, ...state.recent.filter(t => t !== p.title)].slice(0, 6);
    saveAll();
    updateStats();
    renderRecent();
    setTimeout(() => {
      btn.classList.remove('copy-ok');
      btn.innerHTML = copyIcon;
    }, 1600);
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(p.prompt).then(onCopied).catch(() => fallbackCopy(p.prompt, onCopied));
  } else {
    fallbackCopy(p.prompt, onCopied);
  }
}

function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  try   { document.execCommand('copy'); cb(); }
  catch { notify('Copy failed — please select and copy manually', 'error'); }
  document.body.removeChild(ta);
}

/* ================================================================
   ACTIONS: RATING
   ================================================================ */
function rate(id, val, container) {
  state.ratings[id] = val;
  saveAll();
  updateStats();
  container.querySelectorAll('.s-btn').forEach((s, i) => s.classList.toggle('lit', i < val));
  container.querySelector('.rating-label').textContent = val + ' / 5';
  notify(`Rated ${val} out of 5`, 'success');
}

/* ================================================================
   RECENTLY COPIED
   ================================================================ */
function renderRecent() {
  const sec  = document.getElementById('recentSec');
  const tags = document.getElementById('recentTags');
  const copySmall = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;

  if (!state.recent.length) { sec.style.display = 'none'; return; }
  sec.style.display = 'block';
  tags.innerHTML = state.recent
    .map(t => `<span class="r-tag">${copySmall}${t}</span>`)
    .join('');
  tags.querySelectorAll('.r-tag').forEach((tag, i) => {
    tag.onclick = () => copyByTitle(state.recent[i]);
  });
}

function copyByTitle(title) {
  const p    = ALL_PROMPTS.find(x => x.title === title);
  if (!p) return;
  const card = document.getElementById(`card-${p.id}`);
  const btn  = card ? card.querySelectorAll('.ic-btn')[1] : null;
  copyPrompt(p.id, btn || document.createElement('button'));
}

/* ================================================================
   TAB SWITCH
   ================================================================ */
function switchTab(tab) {
  state.tab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  renderGrid();
}

/* ================================================================
   SEARCH & SORT
   ================================================================ */
let searchTimer;
document.getElementById('searchInput').addEventListener('input', e => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => { state.q = e.target.value.trim(); renderGrid(); }, 110);
});

document.getElementById('sortSel').addEventListener('change', e => {
  state.sort = e.target.value;
  renderGrid();
});

/* ================================================================
   ADD / EDIT / DELETE MODALS
   ================================================================ */
function openAddModal() {
  state.editId = null;
  const addSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
  document.getElementById('modalTitle').innerHTML = `${addSVG} Add New Prompt`;
  ['fTitle', 'fDesc', 'fPrompt', 'fExample', 'fExplain'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('addModal').classList.add('open');
}

function openEdit(id) {
  const p = ALL_PROMPTS.find(x => x.id === id);
  if (!p) return;
  state.editId = id;
  const editSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
  document.getElementById('modalTitle').innerHTML = `${editSVG} Edit Prompt`;
  document.getElementById('fTitle').value   = p.title;
  document.getElementById('fCat').value     = p.cat;
  document.getElementById('fDesc').value    = p.desc;
  document.getElementById('fPrompt').value  = p.prompt;
  document.getElementById('fExample').value = p.example || '';
  document.getElementById('fExplain').value = p.explain || '';
  document.getElementById('addModal').classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function savePrompt() {
  const title   = document.getElementById('fTitle').value.trim();
  const cat     = document.getElementById('fCat').value;
  const desc    = document.getElementById('fDesc').value.trim();
  const prompt  = document.getElementById('fPrompt').value.trim();
  const example = document.getElementById('fExample').value.trim();
  const explain = document.getElementById('fExplain').value.trim();

  if (!title || !desc || !prompt) {
    notify('Please fill in Title, Description, and Prompt', 'error');
    return;
  }

  if (state.editId) {
    const idx = customPrompts.findIndex(p => p.id === state.editId);
    if (idx > -1) customPrompts[idx] = { ...customPrompts[idx], title, cat, desc, prompt, example, explain };
  } else {
    customPrompts.push({ id: Date.now(), cat, title, desc, prompt, example, explain, custom: true });
  }

  saveAll();
  ALL_PROMPTS = [...BASE_PROMPTS, ...customPrompts];
  buildCats();
  buildFeatured();
  renderGrid();
  updateStats();
  closeModal('addModal');
  notify(state.editId ? 'Prompt updated successfully' : 'Prompt added to library', 'success');
}

function confirmDelete(id) {
  state.deleteId = id;
  document.getElementById('confirmModal').classList.add('open');
  document.getElementById('confirmDeleteBtn').onclick = () => {
    customPrompts = customPrompts.filter(p => p.id !== state.deleteId);
    state.favs.delete(state.deleteId);
    delete state.ratings[state.deleteId];
    saveAll();
    ALL_PROMPTS = [...BASE_PROMPTS, ...customPrompts];
    buildCats();
    buildFeatured();
    renderGrid();
    updateStats();
    closeModal('confirmModal');
    notify('Prompt deleted', 'error');
  };
}

/* ================================================================
   EXPORT FAVORITES
   ================================================================ */
document.getElementById('exportBtn').addEventListener('click', () => {
  const favs = ALL_PROMPTS.filter(p => state.favs.has(p.id));
  if (!favs.length) { notify('No favorites to export', 'error'); return; }

  const txt = favs.map((p, i) => [
    `${i + 1}. ${p.title}`,
    `Category: ${catData(p.cat).label}`,
    '',
    'Prompt:',
    p.prompt,
    p.example ? `\nExample:\n${p.example}` : '',
    '',
    '─'.repeat(50),
  ].join('\n')).join('\n\n');

  const a = document.createElement('a');
  a.href     = URL.createObjectURL(new Blob([txt], { type: 'text/plain' }));
  a.download = 'PromptVault-Favorites.txt';
  a.click();
  notify('Favorites exported as TXT', 'success');
});

/* ================================================================
   THEME TOGGLE
   ================================================================ */
let dark = localStorage.getItem('pv_theme') !== 'light';

function applyTheme() {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  document.getElementById('themeIcon').innerHTML = dark
    ? `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`
    : `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
  localStorage.setItem('pv_theme', dark ? 'dark' : 'light');
}

document.getElementById('themeBtn').addEventListener('click', () => { dark = !dark; applyTheme(); });
applyTheme();

/* ================================================================
   SCROLL TO TOP
   ================================================================ */
window.addEventListener('scroll', () =>
  document.getElementById('scrollTop').classList.toggle('vis', window.scrollY > 400)
);

/* ================================================================
   KEYBOARD SHORTCUTS
   / → focus search
   F → toggle favorites tab
   A → open add modal
   Esc → close modal / blur input
   ================================================================ */
document.addEventListener('keydown', e => {
  const inp    = document.getElementById('searchInput');
  const typing = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA';

  if (e.key === '/' && !typing)                     { e.preventDefault(); inp.focus(); }
  if ((e.key === 'f' || e.key === 'F') && !typing)  switchTab(state.tab === 'favorites' ? 'all' : 'favorites');
  if ((e.key === 'a' || e.key === 'A') && !typing)  openAddModal();
  if (e.key === 'Escape') {
    closeModal('addModal');
    closeModal('confirmModal');
    inp.blur();
  }
});

/* Close modals by clicking the backdrop */
document.querySelectorAll('.modal-bg').forEach(m =>
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); })
);

/* ================================================================
   INIT
   ================================================================ */
function init() {
  buildCats();
  buildFeatured();
  renderGrid();
  renderRecent();
  updateStats();
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 750);
}

init();

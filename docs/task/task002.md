XK Website — Task 002
Brand Design System Implementation
Project

Xplore Kaleidoscope

Repository: xk-website

Branch: feature/website-brand-design-system

Previous Task: Task 001 — Repository Bootstrap

Objective

Implement a reusable, production-ready XK Brand Design System.

The goal is to establish consistent visual foundations before developing the complete homepage.

Do not rebuild or reinitialize the existing Next.js project.

1. Inspect Existing Implementation

Before making changes:

Read AGENTS.md.
Read docs/implementation-notes.md.
Inspect src/app/globals.css.
Inspect src/app/layout.tsx.
Inspect existing components.
Review package.json and components.json.

Preserve the existing Next.js architecture.

2. Confirmed Brand Identity

Brand: Xplore Kaleidoscope

Abbreviation: XK

Slogan: Explore Possibilities. Create Digital Value.

Tagline: Building Digital Solutions with Web, Java & AI.

Design direction:

Geometric Kaleidoscope
XK Letterform
Geometric Symmetry
Modern Technology
Professional
International
Clean Corporate Design

The final logo has not been approved.

All logo implementations must be marked provisional.

3. Color System

Use the confirmed tokens:

Primary: #101A33 Secondary: #3157D5 Accent: #19B8D5 Background: #FFFFFF Surface: #F5F7FB Foreground: #172033 Muted: #667085 Border: #E4E8F0

Requirements:

Use CSS custom properties.
Follow Tailwind CSS 4 conventions.
Keep semantic tokens separate from component styling.
Maintain accessible text contrast.
Support future dark-mode extension without implementing dark mode now. 4. Typography

Use existing configured fonts:

Inter
Noto Sans TC

Define consistent typography roles:

Display
H1
H2
H3
Body Large
Body
Body Small
Caption
Button

Requirements:

Responsive font sizes.
Appropriate line heights.
Consistent heading weights.
Good Traditional Chinese typography.
Avoid excessive letter spacing in Chinese text. 5. Design Tokens

Define:

Color tokens
Typography tokens
Spacing scale
Border radius
Shadows
Container widths
Breakpoints where appropriate
Motion duration and easing

Keep tokens centralized.

Avoid arbitrary values repeated throughout components.

6. Shared Components

Implement or refine:

src/components/ ├── ui/ │ ├── button.tsx │ └── card.tsx ├── layout/ │ ├── container.tsx │ └── section.tsx └── brand/ └── xk-logo.tsx

Component requirements:

XK Logo
Create a reusable geometric XK logo.
Use inline SVG or CSS geometry.
Support different sizes.
Support light and dark backgrounds.
Include accessible labeling.
Clearly document that the design is provisional.

Do not use an unlicensed external logo.

Button

Support:

Primary
Secondary
Outline
Ghost
Different sizes
Accessible focus states
Card

Support:

Default
Interactive
Optional icon
Consistent padding and radius
Container

Provide consistent responsive horizontal padding and maximum width.

Section

Provide reusable vertical spacing and optional background variants.

7. Visual Elements

Develop reusable visual treatments for:

Geometric grid backgrounds
Subtle kaleidoscope-inspired patterns
Gradient accents
Decorative geometric shapes

Use restrained visual effects.

Do not make the website visually noisy.

Avoid excessive gradients, animation and glassmorphism.

Respect prefers-reduced-motion.

8. Demo / Showcase

Create a development-only design system showcase if useful.

It should demonstrate:

Brand colors
Typography
Buttons
Cards
Logo variations
Responsive containers

Do not expose an unfinished design-system test page as a public production route.

9. Quality Requirements
   Strict TypeScript.
   Reusable components.
   Accessible semantic markup.
   Responsive layout.
   Consistent tokens.
   No unnecessary dependencies.
   No fake business content.
   No backend implementation.

Run:

npm run lint npx tsc --noEmit npm run build

Review at:

320px
375px
768px
1440px
1920px 10. Git Workflow

Create branch:

feature/website-brand-design-system

Do not push directly to main.

Do not automatically merge.

11. Final Report

Report:

Files created.
Files modified.
Design tokens implemented.
Components implemented.
Logo design description.
Accessibility results.
Responsive results.
TypeScript results.
ESLint results.
Production build results.
Screenshots if available.
Remaining work.
Definition of Done

The XK website has a reusable visual design foundation that can support the next homepage implementation task.

Do not implement the full homepage in this task.

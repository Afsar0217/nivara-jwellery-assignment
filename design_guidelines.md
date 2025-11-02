# Design Guidelines for Nivara Luxe - Premium Lab-Grown Diamond E-Commerce

## Design Approach

**Reference-Based Luxury E-Commerce**: Drawing inspiration from Nivara.diamonds, combining minimalist elegance with immersive product showcases. This approach emphasizes:
- Clean, spacious layouts that let products breathe
- High-quality imagery as the primary visual driver
- Subtle, refined animations that enhance without distracting
- Premium typography hierarchy establishing trust and sophistication

## Typography System

**Font Families**:
- **Headings**: Playfair Display (400, 700) - serif elegance for headlines, product names, section titles
- **Body**: Inter (variable 100-900) - clean sans-serif for readability, UI elements, descriptions

**Hierarchy**:
- H1: 4xl-8xl (responsive), Playfair Display 700, tracking-tight
- H2: 3xl-6xl (responsive), Playfair Display 700
- H3: 2xl-4xl (responsive), Playfair Display 400
- H4/H5: xl-2xl, Inter 600
- Body Large: lg (18px), Inter 400, leading-relaxed
- Body: base (16px), Inter 400, leading-normal
- Small/Caption: sm (14px), Inter 400
- Labels/Buttons: sm-base, Inter 600, uppercase tracking-wide

## Layout & Spacing System

**Tailwind Units**: Use consistent spacing scale of 2, 4, 6, 8, 12, 16, 20, 24, 32 for margins, padding, gaps

**Container Strategy**:
- Max-width: 7xl (1280px) for main content
- Full-width for hero sections and image showcases
- Max-width: prose for long-form text content
- Horizontal padding: px-4 (mobile), px-8 (tablet), px-12 (desktop)

**Vertical Rhythm**:
- Section spacing: py-16 (mobile), py-24 (tablet), py-32 (desktop)
- Component spacing: space-y-8 to space-y-12
- Card internal padding: p-6 to p-8

**Grid Systems**:
- Product grids: 1 column (mobile), 2 columns (tablet), 3-4 columns (desktop)
- Feature sections: 1-2-3 column responsive grids with gap-8 to gap-12
- Masonry layout for collection pages using CSS Grid with auto-fit

## Component Library

### Navigation
- **Sticky header**: Transparent over hero, solid on scroll with subtle shadow
- Height: 16-20 units
- Logo: Left-aligned, 32-40 units height
- Main nav: Centered or right-aligned links with hover underline
- Icons: Search, wishlist, cart (with badge counter), user account
- Mobile: Hamburger menu with full-screen overlay drawer

### Buttons & CTAs
- **Primary**: Full solid with hover brightness increase, py-3 px-8, rounded-full or rounded-lg
- **Secondary**: Border with transparent background, hover fill transition
- **Ghost**: Transparent with underline on hover
- **Icon buttons**: Square/circle with hover background
- All buttons: Transition duration-300, cursor-pointer, disabled states with opacity-50

### Cards (Product)
- Aspect ratio: 4:5 for product images
- Hover: Subtle lift (translate-y-1), shadow increase, secondary image crossfade
- Structure: Image container → Badge overlays (new/sale) → Product name → Price → Quick actions
- Spacing: p-4 internal, rounded-lg borders

### Forms & Inputs
- Input fields: Border with focus ring, py-3 px-4, rounded-lg
- Labels: Above input, text-sm font-medium, mb-2
- Validation: Red border for errors, green for success, helper text below
- Dropdowns: Custom styled with chevron icon
- Checkboxes/Radio: Custom designs with ring states

### Modals & Drawers
- **Backdrop**: bg-black/50 with backdrop-blur-sm
- **Modal**: Centered, max-width-2xl, rounded-xl, shadow-2xl, p-8
- **Drawer**: Slide from right (cart) or left (filters), full height, w-96-full
- **Close**: X icon top-right, keyboard ESC support

### Price Calculator Widget
- Prominent placement: Sticky sidebar on desktop, expandable section on mobile
- Real-time preview: Large price display with animated transitions
- Sliders: Custom styled with labels and value tooltips
- Dropdowns: Metal selection with visual swatches
- Add-ons: Checkbox list with price increments shown
- Calculate button: Large, primary style with loading state

### Swatches (Metal/Color)
- Circular or rounded square chips: 12-16 units diameter
- Active state: Ring-2 with offset, scale-110
- Visual representation: Gradient fills matching metal types (yellow/rose/white gold)
- Horizontal scroll on mobile, wrapped grid on desktop
- Tooltip on hover showing metal name

## Image Strategy

### Homepage
- **Hero Section**: Full-viewport (min-h-screen) high-quality lifestyle image showing diamond jewelry on model, subtle parallax scroll effect
  - Image description: Elegant close-up of hands wearing multiple diamond rings, soft natural lighting, neutral background
  - Text overlay: Large headline + subheadline with blurred background buttons

- **Featured Products**: High-resolution product shots on pure white backgrounds, aspect ratio 4:5
  - Each image shows single piece from slight angle with professional studio lighting
  
- **Sustainability Module**: Icon illustrations or simple photographs representing eco-consciousness
  - Image descriptions: Green leaves, earth, heart symbols in minimalist style

- **Testimonial Section**: Customer portrait photos, circular crops, 80-100 units diameter

### Collection Page
- Product grid images: Consistent white backgrounds, 1:1 or 4:5 aspect ratio
- Hover state: Secondary lifestyle image showing product worn
- All images: Lazy loaded, WebP/AVIF format, responsive sizes

### Product Details Page
- **Hero Gallery**: Large primary image (aspect 4:5), multiple angles in thumbnail rail
- 360° view: Interactive rotation indicator, play/pause controls
- Zoom capability: Click to expand, pinch-zoom on mobile
- Lifestyle context shots: Model wearing piece in real-world settings

### About Page
- Founder portrait: Professional headshot or candid working photo
- Timeline images: Historical milestones, product evolution, certification photos
- Sustainability infographics: Visual data representations, before/after comparisons

## Animations & Interactions

**Micro-interactions** (Framer Motion):
- Card hover: Transform scale-105, shadow expansion, duration-300
- Button press: Scale-95 on active
- Cart badge: Bounce animation on item add
- Price updates: Fade transition with number counter
- Add to cart: Confetti burst on success

**Scroll Animations** (GSAP ScrollTrigger - use sparingly):
- Hero parallax: Background image moves slower than foreground (0.5x speed)
- Fade-in on scroll: Products/sections with stagger-100 between items
- Counter animations: Numbers incrementing on view (sustainability stats)
- Timeline: Progressive reveal as user scrolls

**Page Transitions**:
- Route changes: Fade with 200ms duration
- Modal open/close: Scale from/to 95% with fade
- Drawer slide: Transform-x with ease-out

**Loading States**:
- Skeleton screens: Animated pulse for product cards, text blocks
- Spinner: Minimal rotating circle for buttons
- Progress indicators: Subtle top-bar for page loads

## Page-Specific Guidelines

### Homepage
1. Hero: Full-viewport image with centered headline, dual CTA buttons with blur backdrop
2. Featured carousel: 6+ products, auto-play 4s, navigation dots + arrows
3. Three-column sustainability grid: Icons + headlines + descriptions, animated counters
4. Testimonials: Slider with fade effect, 5-star ratings, customer photos
5. Newsletter: Single input + submit, centered, generous padding
6. Footer: Four-column layout (links, contact, social, legal), back-to-top button

### Collection Page
1. Sticky filter sidebar (desktop) or drawer (mobile): Price slider, multi-select checkboxes, sort dropdown
2. Masonry product grid: 3-4 columns desktop, 2 tablet, 1 mobile
3. Infinite scroll with loading spinner at threshold
4. Active filter chips: Dismissible tags showing current selections
5. Result count: "Showing X of Y products" with live updates

### Product Details
1. Two-column layout: 60% gallery, 40% details (stack on mobile)
2. Gallery with thumbnail navigation, zoom modal, 360° rotation button
3. Price calculator: Collapsible widget with sliders, real-time total
4. Metal swatches: Horizontal scroll, instant image update
5. Expandable accordions: Description, specifications, certifications, returns
6. Related products: 3-card horizontal scroll at bottom
7. Sticky add-to-cart bar on mobile scroll

### Cart & Checkout
1. Cart drawer (mobile) or dedicated page (desktop)
2. Item list: Image thumbnail + details + quantity controls + remove
3. Promo code input: Inline validation, success/error states
4. Checkout wizard: Three-step progress indicator (shipping → payment → review)
5. Order summary: Sticky sidebar on desktop, collapsible on mobile

### About & Contact
1. About: Vertical timeline with images, founder story with portrait, sustainability deep-dive with infographics
2. Contact: Two-column (form + map/info), validated inputs, WhatsApp button, success toast

## Accessibility Requirements

- Maintain 4.5:1 contrast ratios minimum
- Focus indicators: Ring-2 with offset on all interactive elements
- ARIA labels: All icons, complex widgets, dynamic content
- Keyboard navigation: Tab order, Enter/Space for actions, ESC for modals
- Screen reader: Live regions for price updates, cart changes, form validation
- Alt text: Descriptive for all images, decorative images marked

This design system creates a sophisticated, premium jewelry shopping experience that balances luxury aesthetics with usability and performance.
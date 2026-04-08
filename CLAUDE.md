# Cascade HVAC — Website + AI Chatbot Project — CLAUDE.md

## Developer
- **Name:** Mauricio Rosas — MR Web Solutions (mrwebsolutions.ca)
- **Location:** Calgary, Alberta
- **Client:** Cascade HVAC Ltd (cascadehvac.ca) — Airdrie, Alberta

## Client Business Info
- **Company:** Cascade HVAC Ltd
- **Established:** 2006
- **Specialty:** Commercial, industrial, and residential HVAC — fabrication, installation, service & maintenance
- **Tagline:** "A quote is a quote, there are never surprising extras"
- **Address:** 1022, 93 Gateway Drive NE, Airdrie, AB T4B 0J6
- **Hours:** Monday–Friday, 7am–5pm
- **Phone:** 403.264.4622 | Toll Free: 877.413.3665
- **Financing:** FinanceIt (up to $100,000)
- **Certifications:** Sheet Metal Contractors Association of Alberta, Alberta Construction Safety Association, COR certified

### Key Contacts
| Name | Role | Email | Phone |
|------|------|-------|-------|
| Justin Arnold | General Manager / Estimating | justin@cascadehvac.ca | 403.973.4113 |
| Rachel Arnold | Office Manager / Accounting | rachel@cascadehvac.ca | 403.615.4113 |
| Mike Anderson | Service Repairs & Maintenance | mike@cascadehvac.ca | 403.588.5550 |
| AJ Enns | Project Manager | aj@cascadehvac.ca | 403.703.7467 |
| Brett Jones | Project Coordinator | brett@cascadehvac.ca | 403.880.4584 |
| Health & Safety | — | safety@cascadehvac.ca | — |

### Services
**HVAC Installation & Replacement:** Roof Top Units (RTU), Make Up Air (MUA), exhaust fans, high-efficiency furnaces, garage/warehouse unit heaters, infrared tube heating, HRV/ERV ventilation, fan coils, hot water tanks

**Ductwork & Fabrication:** Galvanized/aluminum/stainless steel/satin coat ducting, electric & gas duct heaters, black iron grease ducting, sheet metal fabrication

**Climate Control:** Humidification systems, heat exchangers, thermostats, air balancing, control systems, hydronic reheat coils

**Air Quality & Ventilation:** Air filtration, gas detection, air curtains, ceiling fans, dust collection, lab fume hoods, medical exhaust systems

**Building Infrastructure:** Boiler systems, insulation & cladding, garbage/laundry chutes, motorized dampers, louvers, access doors, vehicle exhaust hose reels

**Professional Services:** Design-build, engineering, installation, fabrication, project management, maintenance, service, permits, safe work procedures

### Brand Colors
- **Primary Blue/Teal:** #0098D4 (Cascade blue from logo)
- **Dark:** #1A1A2E (dark backgrounds)
- **White:** #FFFFFF
- **Light Gray:** #F4F4F4 (section backgrounds)
- **Accent:** #00B4D8 (lighter cyan for highlights)

## Tech Stack
- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Fonts:** Space Grotesk (headings) + Outfit (body) — load via next/font
- **Deployment:** Vercel (auto-deploy from GitHub)
- **Domain/DNS:** Vercel Domains or existing DNS pointed to Vercel
- **Forms:** FormSubmit.co or Vercel serverless API routes
- **Images:** next/image with WebP, lazy loading, proper alt text
- **Analytics:** Vercel Analytics + Speed Insights
- **AI SDK:** Vercel AI SDK (latest) — `ai` + `@ai-sdk/anthropic`
- **LLM Provider:** Anthropic (Claude Sonnet) for chatbot
- **Database:** Supabase (Postgres + pgvector for RAG if needed)
- **Version Control:** GitHub (Mauricio354)

## Architecture
```
Website:     Next.js App Router → Pages (Home, Services, Gallery, Contact, About)
Chatbot:     User Message → API Route → AI SDK streamText → System Prompt (Cascade HVAC context) → Tool calls (quote request, service lookup, hours) → Streaming response
```

## Design Standards
- Clean professional look — NOT dark theme (HVAC industry = trustworthy, blue-collar)
- Brand palette: Cascade Blue #0098D4, Dark #1A1A2E, White, Light Gray #F4F4F4
- Mobile-first responsive design — test at 375px, 768px, 1024px, 1440px
- All pages must score 90+ Lighthouse (Performance, Accessibility, SEO, Best Practices)
- Semantic HTML (header, nav, main, section, footer)
- Smooth scroll, subtle entrance animations (Framer Motion)
- Every image needs descriptive alt text

## SEO Baseline (Every Page)
- Unique `<title>` and `<meta name="description">` per page
- Open Graph + Twitter Card meta tags
- Canonical URLs
- JSON-LD structured data (LocalBusiness schema)
- Sitemap.xml and robots.txt
- Fast LCP (<2.5s), low CLS (<0.1), fast FID (<100ms)

## Chatbot Conventions
- Always stream responses — never block UI
- System prompts in `lib/prompts/` directory
- Tool definitions in `lib/tools/` — one file per tool
- Never expose API keys client-side
- Rate limit API routes
- Handle errors gracefully with friendly fallback messages
- Chatbot knows: services, hours, contact info, financing, service area
- Fallback to human contact (phone/email) when bot can't help

## Skills to Use
| When | Skill |
|------|-------|
| Starting any new feature | `/superpowers:brainstorming` |
| Building UI components/pages | `/frontend-design` |
| Before writing implementation | `/superpowers:writing-plans` |
| Executing multi-step plans | `/superpowers:executing-plans` |
| Parallel independent tasks | `/superpowers:dispatching-parallel-agents` |
| AI SDK code | `/vercel:ai-sdk` |
| Chat UI building | `/ai-chatbot-builder` |
| Supabase schema | Use Supabase MCP tools |
| Environment variables | `/vercel:env` |
| Debugging | `/superpowers:systematic-debugging` |
| Before claiming done | `/superpowers:verification-before-completion` |
| Code review | `/superpowers:requesting-code-review` |
| Testing chatbot | `/webapp-testing` |
| Deploying | `/vercel:deploy` |
| Component styling | `/ui-styling` |
| UX review | `/ui-ux-design` |
| Accessibility audit | `/web-design-guidelines` |

## Conventions
- kebab-case for file names, PascalCase for components
- One responsibility per component file
- Commit messages: lowercase, imperative mood
- Never commit .env files
- Test on Chrome, Safari, Firefox, and mobile before production

## Workflow
1. Brainstorm/plan before coding
2. Build mobile-first, then scale up
3. Verify Lighthouse scores before PR
4. Deploy preview to Vercel, test preview URL
5. Merge to main for production deploy

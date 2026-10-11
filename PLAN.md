# The Achievers — Website Build Plan

Source: `The Achievers — Website Research, PRD & TRD.md` (Oct 10, 2026).
Build location (this draft): `achievers-web/` — static HTML/CSS/JS, no build step.

## 1. Goal
Rebuild the public marketing + conversion site for The Achievers Institute of Learning:
NEB Class 11/12 (Science + Management), CEE, IOE/CSIT. Mobile-first, fast on low bandwidth,
with free entry points (demo, mock, counselling) converting to enrolment.

## 2. Scope (from PRD sitemap)
| # | Page | File | Key content | Status |
|---|------|------|-------------|--------|
| 1 | Home | `index.html` | hero, stats, subjects, catalog, 4 steps, why-us, mentors preview, testimonials, FAQ x5, app CTA, bottom CTA | built |
| 2 | All Courses | `courses.html` | full catalog + group/subject filters | built |
| 3 | Free Mock Tests | `mock-test.html` | 3-step CBT flow + sample quiz | built |
| 4 | Syllabus & Tracks | `syllabus.html` | per-track chapters + weightage tabs | built |
| 5 | Teachers | `teachers.html` | 11 faculty, featured badges, profile modal | built |
| 6 | About | `about.html` | mission, 6 USPs, 4 programs, stats | built |
| 7 | Counselling | `counselling.html` | booking form, 24h promise | built |
| 8 | Demo | `demo.html` | 2 YouTube embeds + mock CTA | built |
| 9 | Contact | `contact.html` | form, phones, WhatsApp, map | built |
| 10 | FAQs | `faqs.html` | expanded FAQ | built |
| 11 | Login / Register | `login.html`, `register.html` | auth (front-end demo) | built |
| 12 | Legal | `privacy.html`, `terms.html`, `cookies.html` | placeholders | built |

## 3. Phases
- **Phase 0 — Assets (done):** 11 teacher photos + logo copied to `images/`.
- **Phase 1 — Shell + Home (now):** `css/style.css`, `js/app.js`, `index.html` with all homepage sections + 5 modals.
- **Phase 2 — Conversion pages:** courses, mock-test, counselling, demo, contact, login/register.
- **Phase 3 — Content pages:** syllabus, teachers, about, faqs, legal.
- **Phase 4 — Verify:** open each page, test filters/quiz/forms/modals, mobile check, fix alt text + links.

## 4. Tech decisions (static draft)
- Plain HTML + `css/style.css` + `js/app.js`, Fraunces/DM Sans via Google Fonts. No build step so it runs by double-click.
- Production recommendation per TRD: Next.js with SSR/SSG for `/courses` + `/syllabus` (SEO), custom CBT engine, `/api/uploads` media, Cloudflare CDN, eSewa/Khalti/Fonepay checkout, Zoom for counselling.
- Canonical links/data: phones 981-0686665 / 976-9884993, WhatsApp `wa.me/9779810686665`, Play `id=com.theachievers.learning`, YouTube `@TheAchieversAcademy-edu`, TikTok `@achievers.academy10`, FB `id=61579416387457`, demos `F5O0jsU6FJE` + `_WXO4T1bXhM`, address Puspalal Chowk, Mahendranagar.

## 5. PRD gaps to confirm (TRD Section 10 — must fix before sign-off)
1. Counselling hours 7AM–6PM vs 10AM–6PM — confirm one.
2. Phone mismatch (981-0686665/976-9884993 vs 9747968501/2) — confirm canonical.
3. Kailash Bhatt teaches Class 8–10, outside 11–12 scope — clarify offering.
4. Mock page says IOE/CSIT-modelled; main product is NEB — label tracks separately.
5. Email hidden by Cloudflare — expose plain address (draft uses `info.theachiever@gmail.com`).
6. "AI Powered" tagline has no matching feature — implement or reword.
7. iOS app "coming soon" — needs date or removal.
8. No public pricing — add fees or keep "contact for fees".

## 6. Acceptance checklist
- [ ] All 12+ pages open with no 404s, images load, no console errors
- [ ] Course group + subject filters work; mentor modal books correctly
- [ ] Quiz scores + retake work; forms show success messages
- [ ] Nav highlights current page; footer links correct on every page
- [ ] Mobile 360px: no horizontal scroll, menu opens, tap targets OK

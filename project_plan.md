# WORI - Wadi-Kaja Organization for Refugee and Immigrant Services

## 1. Project Description
WORI is a Canadian registered charity (CRN: 748873338RR0001) providing settlement, wellbeing, and empowerment services to refugees and immigrants. The rebuilt portal must adopt a prestigious, high-end "VVIP" visual identity blending organic warmth with institutional authority. Target users include vulnerable newcomers seeking services, high-net-worth donors, volunteers, and WORI executive staff.

## 2. Page Structure
- `/` - Home (Hero, impact stats, program preview, donation CTA, testimonials)
- `/about` - About WORI (interactive timeline, mission/vision/values)
- `/about/executive-director` - Executive Director Desk
- `/about/board` - Board & Management
- `/about/annual-reports` - Annual Reports & Financials
- `/services/settlement` - Immigrant Settlement Services
- `/services/ircc` - IRCC Resource Center
- `/services/language-mentorship` - Newcomer Language Mentorship
- `/services/private-sponsorship` - Private Sponsorship Desk
- `/services/language-services` - Language Services
- `/services/mental-health` - Mental Health & Wellbeing Support
- `/services/employment` - Employment Support Desk
- `/services/housing` - Housing Support Services
- `/services/women-empowerment` - Women's Empowerment Programs
- `/services/seniors` - Seniors' Recreational Program
- `/services/food-security` - Food Security Initiative
- `/crisis-center` - Crisis Center
- `/news` - News & Community Updates
- `/partners` - Partner & Funder Spotlights
- `/donate` - Donation Page
- `/volunteer` - Volunteer Application
- `/contact` - Contact & Client Consultation

## 3. Core Features
- [ ] Multi-lingual i18n (English, Arabic, Amharic, Somali, French, Tigrinya)
- [ ] Prestige navigation with glassmorphic mega-menu (4 directories)
- [ ] Hero section with cinemagraphic background
- [ ] Donation engine with tier selection ($50, $150, $500, Custom)
- [ ] Volunteer application form with multi-step validation
- [ ] Client consultation scheduler
- [ ] Interactive lightbox gallery
- [ ] Program directory cards with hover effects
- [ ] Accessibility compliance (AODA & WCAG 2.1 AA)
- [ ] SEO with Open Graph, structured data, geotags
- [ ] Newsletter subscription
- [ ] Social media footer with feeds

## 4. Data Model Design

### Table: volunteer_applications
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| full_name | text | Applicant name |
| email | text | Contact email |
| phone | text | Phone number |
| program_interest | text[] | Selected programs |
| availability | text | Time availability |
| experience | text | Relevant experience |
| created_at | timestamptz | Submission timestamp |

### Table: consultations
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| full_name | text | Client name |
| email | text | Contact email |
| phone | text | Phone number |
| service_type | text | Service requested |
| preferred_date | date | Preferred appointment |
| language | text | Preferred language |
| notes | text | Additional notes |
| created_at | timestamptz | Submission timestamp |

### Table: newsletter_subscribers
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| email | text | Subscriber email |
| language | text | Preferred language |
| created_at | timestamptz | Subscription timestamp |

## 5. Backend / Third-party Integration Plan
- **Supabase**: Database for volunteer applications, consultations, newsletter subscribers. Storage for media gallery.
- **Stripe**: Global donation processing (credit cards, Apple Pay, Google Pay)
- **PayPal**: Express checkout for donations
- **CanadaHelps**: Canadian tax-receipt donation integration
- **Cloudinary/Supabase Storage**: Headless media vault for event photos

## 6. Development Phase Plan

### Phase 1: Foundation & Theme
- Goal: Establish the prestige visual identity and core infrastructure
- Deliverable: Tailwind theme with WORI palette, i18n setup for 6 languages, glassmorphic navbar with mega-menu and language toggle, footer, hero section, homepage skeleton

### Phase 2: About & Governance
- Goal: Build trust-establishing institutional pages
- Deliverable: About page with timeline, Mission/Vision/Values, Executive Director, Board & Management, Annual Reports pages

### Phase 3: Settlement & Resource Directory
- Goal: Complete newcomer lifeline service pages
- Deliverable: IRCC Resource Center, Language Mentorship, Private Sponsorship, Language Services, Settlement Services pages

### Phase 4: Wellbeing & Empowerment Directory
- Goal: Build dignity and empowerment program pages
- Deliverable: Mental Health, Employment, Housing, Women Empowerment, Seniors, Food Security pages

### Phase 5: News, Crisis & Partnerships
- Goal: Complete information and community hub
- Deliverable: Crisis Center, News & Updates, Partners & Funders pages

### Phase 6: Forms, Donations & Backend
- Goal: Enable action-taking functionality
- Deliverable: Volunteer application form, consultation scheduler, donation page with tiers, Supabase integration, email notifications

### Phase 7: Polish, Accessibility & SEO
- Goal: Ensure production-ready quality
- Deliverable: WCAG 2.1 AA audit, AODA compliance, OG tags, structured data, performance optimization
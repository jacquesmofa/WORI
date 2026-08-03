import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";

// ── Lazy-loaded page imports (code-split each route) ──
const Home = lazy(() => import("../pages/home/page"));
const AdminPage = lazy(() => import("../pages/admin/page"));

// About & Governance
const AboutPage = lazy(() => import("../pages/about/page"));
const MissionPage = lazy(() => import("../pages/about/mission/page"));
const ExecutiveDirectorPage = lazy(() => import("../pages/about/executive-director/page"));
const BoardPage = lazy(() => import("../pages/about/board/page"));
const AnnualReportsPage = lazy(() => import("../pages/about/annual-reports/page"));

// Settlement & Resources
const SettlementPage = lazy(() => import("../pages/services/settlement/page"));
const IrccPage = lazy(() => import("../pages/services/ircc/page"));
const LanguageMentorshipPage = lazy(() => import("../pages/services/language-mentorship/page"));
const PrivateSponsorshipPage = lazy(() => import("../pages/services/private-sponsorship/page"));
const LanguageServicesPage = lazy(() => import("../pages/services/language-services/page"));

// Wellbeing & Empowerment
const MentalHealthPage = lazy(() => import("../pages/services/mental-health/page"));
const EmploymentPage = lazy(() => import("../pages/services/employment/page"));
const HousingPage = lazy(() => import("../pages/services/housing/page"));
const WomenEmpowermentPage = lazy(() => import("../pages/services/women-empowerment/page"));
const SeniorsPage = lazy(() => import("../pages/services/seniors/page"));
const FoodSecurityPage = lazy(() => import("../pages/services/food-security/page"));
const YouthPage = lazy(() => import("../pages/services/youth/page"));
const CommunityEngagementPage = lazy(() => import("../pages/services/community-engagement/page"));

// Action & Information
const DonatePage = lazy(() => import("../pages/donate/page"));
const CrisisCenterPage = lazy(() => import("../pages/crisis-center/page"));
const NewsPage = lazy(() => import("../pages/news/page"));
const NewsDetailPage = lazy(() => import("../pages/news/detail/page"));
const PartnersPage = lazy(() => import("../pages/partners/page"));
const ContactPage = lazy(() => import("../pages/contact/page"));
const VolunteerPage = lazy(() => import("../pages/volunteer/page"));
const EventsPage = lazy(() => import("../pages/events/page"));
const ProgramsServicesPage = lazy(() => import("../pages/services/page"));
const BookingPage = lazy(() => import("../pages/booking/page"));

// Legal
const PrivacyPage = lazy(() => import("../pages/privacy/page"));
const TermsPage = lazy(() => import("../pages/terms/page"));
const AccessibilityPage = lazy(() => import("../pages/accessibility/page"));

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/admin", element: <AdminPage /> },

  // About & Governance
  { path: "/about", element: <AboutPage /> },
  { path: "/about/mission", element: <MissionPage /> },
  { path: "/about/executive-director", element: <ExecutiveDirectorPage /> },
  { path: "/about/board", element: <BoardPage /> },
  { path: "/about/annual-reports", element: <AnnualReportsPage /> },

  // Settlement & Resources
  { path: "/services/settlement", element: <SettlementPage /> },
  { path: "/services/ircc", element: <IrccPage /> },
  { path: "/services/language-mentorship", element: <LanguageMentorshipPage /> },
  { path: "/services/private-sponsorship", element: <PrivateSponsorshipPage /> },
  { path: "/services/language-services", element: <LanguageServicesPage /> },

  // Wellbeing & Empowerment
  { path: "/services/mental-health", element: <MentalHealthPage /> },
  { path: "/services/employment", element: <EmploymentPage /> },
  { path: "/services/housing", element: <HousingPage /> },
  { path: "/services/women-empowerment", element: <WomenEmpowermentPage /> },
  { path: "/services/seniors", element: <SeniorsPage /> },
  { path: "/services/food-security", element: <FoodSecurityPage /> },
  { path: "/services/youth", element: <YouthPage /> },
  { path: "/services/community-engagement", element: <CommunityEngagementPage /> },

  // Action & Information
  { path: "/donate", element: <DonatePage /> },
  { path: "/crisis-center", element: <CrisisCenterPage /> },
  { path: "/news", element: <NewsPage /> },
  { path: "/news/:id", element: <NewsDetailPage /> },
  { path: "/events", element: <EventsPage /> },
  { path: "/partners", element: <PartnersPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/volunteer", element: <VolunteerPage /> },
  { path: "/booking", element: <BookingPage /> },
  { path: "/services", element: <ProgramsServicesPage /> },

  // Legal
  { path: "/privacy", element: <PrivacyPage /> },
  { path: "/terms", element: <TermsPage /> },
  { path: "/accessibility", element: <AccessibilityPage /> },

  { path: "*", element: <NotFound /> },
];

export default routes;
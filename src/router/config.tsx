import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import AdminPage from "../pages/admin/page";

// About & Governance
import AboutPage from "../pages/about/page";
import MissionPage from "../pages/about/mission/page";
import ExecutiveDirectorPage from "../pages/about/executive-director/page";
import BoardPage from "../pages/about/board/page";
import AnnualReportsPage from "../pages/about/annual-reports/page";

// Settlement & Resources
import SettlementPage from "../pages/services/settlement/page";
import IrccPage from "../pages/services/ircc/page";
import LanguageMentorshipPage from "../pages/services/language-mentorship/page";
import PrivateSponsorshipPage from "../pages/services/private-sponsorship/page";
import LanguageServicesPage from "../pages/services/language-services/page";

// Wellbeing & Empowerment
import MentalHealthPage from "../pages/services/mental-health/page";
import EmploymentPage from "../pages/services/employment/page";
import HousingPage from "../pages/services/housing/page";
import WomenEmpowermentPage from "../pages/services/women-empowerment/page";
import SeniorsPage from "../pages/services/seniors/page";
import FoodSecurityPage from "../pages/services/food-security/page";

// Action & Information
import DonatePage from "../pages/donate/page";
import CrisisCenterPage from "../pages/crisis-center/page";
import NewsPage from "../pages/news/page";
import PartnersPage from "../pages/partners/page";
import ContactPage from "../pages/contact/page";
import VolunteerPage from "../pages/volunteer/page";
import EventsPage from "../pages/events/page";
import ProgramsServicesPage from "../pages/services/page";
import BookingPage from "../pages/booking/page";

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

  // Action & Information
  { path: "/donate", element: <DonatePage /> },
  { path: "/crisis-center", element: <CrisisCenterPage /> },
  { path: "/news", element: <NewsPage /> },
  { path: "/events", element: <EventsPage /> },
  { path: "/partners", element: <PartnersPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/volunteer", element: <VolunteerPage /> },
  { path: "/booking", element: <BookingPage /> },
  { path: "/services", element: <ProgramsServicesPage /> },

  { path: "*", element: <NotFound /> },
];

export default routes;
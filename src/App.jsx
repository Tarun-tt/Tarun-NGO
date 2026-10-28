import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Causes from './pages/Causes';
import CauseDetail from './pages/CauseDetail';
import DonatePage from './pages/DonatePage';
import DonationSuccess from './pages/DonationSuccess';
import DonationFailed from './pages/DonationFailed';
import ImpactPage from './pages/ImpactPage';
import StoriesPage from './pages/StoriesPage';
import GalleryPage from './pages/GalleryPage';
import VolunteerPage from './pages/VolunteerPage';
import ContactPage from './pages/ContactPage';
import ReceiptLookupPage from './pages/ReceiptLookupPage';

// Legal & Policies
import PrivacyPolicy from './pages/policies/PrivacyPolicy';
import TermsPage from './pages/policies/TermsPage';
import RefundPolicy from './pages/policies/RefundPolicy';
import DonationFaq from './pages/policies/DonationFaq';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminCampaigns from './pages/admin/AdminCampaigns';
import AdminDonations from './pages/admin/AdminDonations';
import AdminVolunteers from './pages/admin/AdminVolunteers';
import AdminStories from './pages/admin/AdminStories';
import AdminGallery from './pages/admin/AdminGallery';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  return (
    <Routes>
      {/* Public Pages with Standard Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="causes" element={<Causes />} />
        <Route path="causes/:slug" element={<CauseDetail />} />
        <Route path="donate" element={<DonatePage />} />
        <Route path="donation/success" element={<DonationSuccess />} />
        <Route path="donation/failed" element={<DonationFailed />} />
        <Route path="impact" element={<ImpactPage />} />
        <Route path="stories" element={<StoriesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="volunteer" element={<VolunteerPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="lookup-receipt" element={<ReceiptLookupPage />} />

        {/* Legal Disclosures */}
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="refund-policy" element={<RefundPolicy />} />
        <Route path="donation-faq" element={<DonationFaq />} />
      </Route>

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Console */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="campaigns" element={<AdminCampaigns />} />
        <Route path="donations" element={<AdminDonations />} />
        <Route path="volunteers" element={<AdminVolunteers />} />
        <Route path="stories" element={<AdminStories />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// src/pages/AboutPage.tsx
import React from 'react';
import JobContentSection from '../components/JobContentSection';
import WagesAndTargetSection from '../components/WagesAndTargetSection';
import SupportSystemSection from '../components/SupportSystemSection';
import DreamSupportSection from '../components/DreamSupportSection';
import OfficeEnvironmentSection from '../components/OfficeEnvironmentSection';
import AccessSection from '../components/AccessSection';

const AboutPage: React.FC = () => {
  return (
    <section id="about" className="page-section active-page about-section">
      <JobContentSection />
      <WagesAndTargetSection />
      <SupportSystemSection />
      <DreamSupportSection />
      <OfficeEnvironmentSection />
      <AccessSection />

    </section>
  );
};

export default AboutPage;
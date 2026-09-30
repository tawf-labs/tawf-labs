import React from 'react';
import Layout from './components/Layout';
import HeroSection from './components/landing/HeroSection';
import MissionSection from './components/landing/MissionSection';
import ProductsSection from './components/landing/ProductsSection';
import HowItWorksSection from './components/landing/HowItWorksSection';
import CtaSection from './components/landing/CtaSection';

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <MissionSection />
      <ProductsSection />
      <HowItWorksSection />
      <CtaSection />
    </Layout>
  );
}

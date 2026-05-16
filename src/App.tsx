import { LanguageProvider } from './context/LanguageContext';
import StarfieldCanvas from './components/background/StarfieldCanvas';
import Navbar from './components/nav/Navbar';
import PlanetNavigator from './components/navigation/PlanetNavigator';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import CertificationsSection from './components/sections/CertificationsSection';
import TechStackSection from './components/sections/TechStackSection';
import WorkWithMeSection from './components/sections/WorkWithMeSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer';

function Portfolio() {
  return (
    // التعديل تم هنا: تغيير bg-space-dark إلى bg-black
    <div className="min-h-screen bg-transparent text-space-ice relative">
      {/* Skip to content */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-space-cyan focus:text-space-dark focus:font-orbitron focus:text-sm focus:rounded focus:font-bold"
      >
        Skip to content
      </a>

      <StarfieldCanvas />
      <Navbar />
      <PlanetNavigator />

      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <CertificationsSection />
        <TechStackSection />
        <WorkWithMeSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  );
}
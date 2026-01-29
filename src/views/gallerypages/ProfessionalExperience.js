import React from 'react';
import { useEffect } from 'react';
import './ProfessionalExperience.css';
import Header from '../Header';
import Footer from '../../components/Footer';
import FloatingContactButton from '../../components/FloatingContactButton';
import petitsDebrouillardsLogo from '../../assets/images/Logo_PetitsDebrouillards-CVL_HD-png.png';
import laposteLogo from '../../assets/images/Logo_La_Poste_updated.png';

const ProfessionalExperience = () => {

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const experienceEntries = document.querySelectorAll('.experience-entry');
    experienceEntries.forEach(entry => observer.observe(entry));

    return () => {
      experienceEntries.forEach(entry => observer.unobserve(entry));
    };
  }, []);

  const experiences = [
    {
      id: 1,
      title: 'Animator for Les Petits Débrouillard',
      dateRange: 'july - august 2025',
      description: 'Led hands-on, mobile science workshops for children with Les Petits Débrouillards, delivering engaging experiments across priority neighbourhoods to spark curiosity, teamwork, and a practical understanding of scientific concepts. ',
      logo: petitsDebrouillardsLogo,
      logoLink: 'https://www.lespetitsdebrouillards-cvl.org'
    },
    {
      id: 2,
      title: 'Polyvalent Operator at La Poste',
      dateRange: 'january - february 2024',
      description: 'Handled logistics and mail-sorting operations at La Poste, managing incoming and outgoing flows, ensuring accurate processing, and maintaining efficient daily distribution.',
      logo: laposteLogo,
      logoLink: 'https://www.laposte.fr'
    },
    {
      id: 3,
      title: 'Intern at Doctor IT',
      dateRange: 'march - march 2020',
      description: 'Provided customer-facing support at Doctor IT, welcoming clients, assessing their technical issues, explaining repair options clearly, and delivering precise diagnostics and high-quality device repairs with a focus on trust and service excellence.'
    }
  ];

  return (
    <div className="professional-experience-page">
      <Header />
      <section className="professional-experience-section">
        <div className="professional-experience-container">
          <div className="professional-experience-left">
            <h1 className="professional-experience-title">Professional experience</h1>
          </div>
          <div className="professional-experience-right">
            <div className="professional-experience-content">
              {experiences.map((experience, index) => (
                <div key={experience.id} className="experience-entry" data-index={index}>
                  <div className="experience-date-column">
                    <p className="experience-date">{experience.dateRange}</p>
                    {experience.logo && (
                        <a href={experience.logoLink} target="_blank" rel="noopener noreferrer">
                          <img className="experience-logo" src={experience.logo} alt="Les Petits Débrouillards Logo"  />
                        </a>
                      )}
                  </div>
                  <div className="experience-content-column">
                    <h2 className="experience-title">{experience.title}</h2>
                    <p className="experience-description">{experience.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default ProfessionalExperience;


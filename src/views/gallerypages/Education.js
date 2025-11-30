import React from 'react';
import { useEffect } from 'react';
import './Education.css';
import Header from '../Header';
import Footer from '../../components/Footer';
import FloatingContactButton from '../../components/FloatingContactButton';
import UTBM_logo from '../../assets/images/utbm_logo-png.png';
import UPB_logo from '../../assets/images/UPB_logo-png.png';
import LCP_logo from '../../assets/images/LCP_logo-png.png';

const Education = () => {

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const experiences = [
    {
      id: 1,
      title: 'University of Technology of Belfort-Montbéliard (France)',
      dateRange: '2023-2028',
      description: '3rd year of the Engineering cycle in Computer Science, after 2 years of common core. Involved in the boxing organisation of the sport association of the University.',
      logo: UTBM_logo,
      logoLink: 'https://www.utbm.fr'
    },
    {
      id: 2,
      title: 'Universitatea POLITEHNICA din București (Romania)',
      dateRange: 'February - June 2025',
      description: 'Erasmus semester at the Faculty of Science in ForeignLanguages (FILS). Courses were entirely in English, covering various subjects such as web design and development , data structures and algorithm, cybersecurity, atomic level microscope, communication and expression, applied math. Developed technical, analytical and social skills in an international academic environment.',
      logo: UPB_logo ,
      logoLink: 'https://upb.ro/en/' 
    },
    {
      id: 3,
      title: 'General Baccalaureate with honors Lycée Charles Péguy (Orléans, France)',
      dateRange: '2020 - 2023',
      description: 'Specialization in Mathematics, Physics-Chemistry, and Computer Science European English Section',
      logo: LCP_logo,
      logoLink: 'https://lyceepeguyorleans.fr'
    }
  ];

  return (
    <div className="education-experience-page">
      <Header />
      <section className="education-experience-section">
        <div className="education-experience-container">
          <div className="education-experience-left">
            <div className="education-experience-content">
                {experiences.map((experience) => (
                    <div key={experience.id} className="experience-entry">
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
          <div className="education-experience-right">
            <h1 className="education-experience-title">Education</h1>           
          </div>
        </div>
      </section>
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Education;


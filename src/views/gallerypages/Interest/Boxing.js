import React, { useEffect, useState } from "react";
import "./Boxing.css";
import Header from "../../Header";
import Footer from "../../../components/Footer";
import FloatingContactButton from "../../../components/FloatingContactButton";
import aliImage from "../../../assets/images/Ali_image.jpg";

const Boxing = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "THE GREATEST OF ALL TIME";

  useEffect(() => {
    window.scrollTo(0, 0);

    // Typewriter effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false); // Hide cursor when done
      }
    }, 100); // 100ms per character

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="boxing-page">
      <Header />

      <section className="boxing-section">
        <div className="boxing-container">
          {/* Vintage Newspaper Masthead */}
          <div className="newspaper-masthead">
            <div className="masthead-top-line">
              Est. 1884 • The Premier Source for Pugilistic Excellence • Vol.
              CXLII
            </div>
            <div className="masthead-ornament">⚜</div>
            <h1 className="newspaper-title">THE BOXING CHRONICLE</h1>
            <div className="masthead-subtitle">
              WORLD PUGILISM • FIGHT REPORTS • TRAINING CHRONICLES
            </div>
            <div className="masthead-divider"></div>
          </div>

          {/* Hero Section - Muhammad Ali */}
          <div className="hero-section">
            <div className="hero-headline">
              <h2 className="main-headline typewriter">
                {displayedText}
                {isTyping && <span className="cursor">|</span>}
              </h2>
              <div className="headline-underline"></div>
              <p className="hero-subheadline">
                Muhammad Ali Stands Triumphant Over Fallen Opponent
              </p>
            </div>

            <div className="hero-image-container">
              <div className="image-frame">
                <img
                  src={aliImage}
                  alt="Muhammad Ali standing over fallen opponent"
                  className="ali-photo fade-in"
                />
                <div className="photo-caption">
                  <p className="caption-text">
                    <span className="caption-location">LEWISTON, MAINE</span> —
                    Muhammad Ali, "The Greatest," stands victorious after
                    delivering a devastating knockout blow. The champion's
                    progress in the ring remains unmatched, cementing his legacy
                    as the most formidable pugilist of our era.
                  </p>
                  <p className="photo-credit">
                    Photograph courtesy of Associated Press Archives
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Newspaper Layout */}
          <div className="newspaper-content">
            {/* Left Column - Main Article */}
            <div className="content-column main-article">
              <h3 className="article-headline">
                MY PERSONAL JOURNEY INTO BOXING 
              </h3>
              <div className="article-byline">By CHUMONT Jean-Luc </div>
              <div className="article-divider"></div>

              <p className="article-text">
                <span className="drop-cap">I</span>started boxing at the age of 16 after
                years of other sports like swimming and basketball. But i have always been 
                interested in martial arts and fighting sports. I started with Judo and Karate
                but i soon realized that i wanted to challenge myself in a more physical way.
                So i started with Muay Thai because i likes the use of legs and the energy around 
                Muay Thai which is for me "War". Then in college i started Boxing because it was
                seen as the "Noble Art" of fighting sports.
                
              </p>

              {/* Naoya Inoue Section with Image and Record */}
              <div className="fighter-profile">
                <div className="fighter-image-section">
                  <div className="fighter-image-frame">
                    <img
                      src={require('../../../assets/images/Naoya_inoue.jpg')}
                      alt="Naoya Inoue with championship belts"
                      className="fighter-photo"
                    />
                    <p className="fighter-caption-text">
                        Undefeated record: 31-0 (27 KOs)
                      </p>
                  </div>
                </div>

                <div className="fighter-text-section">
                  <p className="article-text">
                    The boxer i really admire is Naoya "The Monster" Inoue, the current 
                    Super Bantamweight 4-division world champion. He is at this moment 
                    ranked #1 pound for pound fighter in the world. His style is unique 
                    and can be seen as surgical due to the precision and power of his strikes.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Fight Record & Stats */}
            <div className="content-column sidebar">
              {/* Fight Record Box */}
              <div className="stats-box">
                <h4 className="box-headline">BOXING RECORD</h4>
                <div className="stats-divider"></div>

                <div className="stat-row">
                  <span className="stat-label">Years Active:</span>
                  <span className="stat-value">2+</span>
                </div>

                <div className="stat-row">
                  <span className="stat-label">Boxe Type:</span>
                  <span className="stat-value">Muay Thai and Boxing</span>
                </div>

                <div className="stat-row">
                  <span className="stat-label">Muay Thai Club:</span>
                  <span className="stat-value">Escale Thai Boxing</span>
                </div>

                <div className="stat-row">
                  <span className="stat-label">Boxing Club:</span>
                  <span className="stat-value">BDS UTBM</span>
                </div>

                <div className="stat-row">
                  <span className="stat-label">Weight Class:</span>
                  <span className="stat-value">Middleweight</span>
                </div>

                <div className="stat-row">
                  <span className="stat-label">Favorite Boxer:</span>
                  <span className="stat-value">Naoya Inoue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Boxing;

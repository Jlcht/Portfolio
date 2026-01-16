import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Travel.css';
import Header from '../../Header';
import Footer from '../../../components/Footer';
import FloatingContactButton from '../../../components/FloatingContactButton';

// Import travel images
import bucharestImg from '../../../assets/images/bucharest_travel.png';
import mountainsImg from '../../../assets/images/romania_mountains.png';
import parisImg from '../../../assets/images/paris_travel.png';
import beachImg from '../../../assets/images/beach_travel.png';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Travel = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Travel locations data
  const travelLocations = [
    {
      id: 1,
      name: 'Bucharest, Romania',
      country: 'Romania',
      coordinates: [44.4268, 26.1025],
      date: 'Feb - Jun 2025',
      description: 'Erasmus semester at POLITEHNICA University. Explored the vibrant streets, historic architecture, and rich culture of Romania\'s capital.',
      image: bucharestImg,
      highlights: ['Old Town', 'Palace of Parliament', 'Herastrau Park']
    },
    {
      id: 2,
      name: 'Carpathian Mountains, Romania',
      country: 'Romania',
      coordinates: [45.5, 25.5],
      date: 'Spring 2025',
      description: 'Breathtaking hiking adventures in the Carpathian Mountains. Discovered stunning peaks, pristine nature, and traditional mountain villages.',
      image: mountainsImg,
      highlights: ['Hiking trails', 'Mountain peaks', 'Wildlife']
    },
    {
      id: 3,
      name: 'Paris, France',
      country: 'France',
      coordinates: [48.8566, 2.3522],
      date: 'Multiple visits',
      description: 'The city of lights and romance. Captured countless moments of Parisian charm, from the Eiffel Tower to hidden cobblestone streets.',
      image: parisImg,
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Montmartre']
    },
    {
      id: 4,
      name: 'Mediterranean Coast',
      country: 'Spain',
      coordinates: [41.3851, 2.1734],
      date: 'Summer 2024',
      description: 'Sun-soaked beaches and crystal-clear waters. Perfect blend of relaxation and adventure along the stunning Mediterranean coastline.',
      image: beachImg,
      highlights: ['Beach life', 'Coastal towns', 'Mediterranean cuisine']
    },
    {
      id: 5,
      name: 'Belfort, France',
      country: 'France',
      coordinates: [47.6333, 6.8667],
      date: '2023 - Present',
      description: 'Home base during my studies at UTBM. A charming city with rich history and the iconic Lion of Belfort.',
      image: null,
      highlights: ['UTBM', 'Lion of Belfort', 'Old Town']
    },
    {
      id: 6,
      name: 'Orléans, France',
      country: 'France',
      coordinates: [47.9029, 1.9093],
      date: 'Hometown',
      description: 'My hometown where it all began. The historic city of Joan of Arc holds countless memories and shaped who I am today.',
      image: null,
      highlights: ['Joan of Arc', 'Loire Valley', 'Historic center']
    }
  ];

  // Create flight paths between locations
  const flightPaths = [
    [travelLocations[5].coordinates, travelLocations[4].coordinates], // Orléans to Belfort
    [travelLocations[4].coordinates, travelLocations[0].coordinates], // Belfort to Bucharest
    [travelLocations[0].coordinates, travelLocations[1].coordinates], // Bucharest to Mountains
    [travelLocations[4].coordinates, travelLocations[2].coordinates], // Belfort to Paris
    [travelLocations[2].coordinates, travelLocations[3].coordinates], // Paris to Mediterranean
  ];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="travel-page">
      <Header />
      <section className="travel-section">
        <div className="travel-container">
          <div className="travel-page-header">
            <h1 className="travel-main-title">✈️ Travel Adventures</h1>
            <p className="travel-subtitle">Exploring the world, one destination at a time</p>
          </div>

          {/* TRAVEL SECTION - Interactive Map */}
          <div className="travel-map-section">
            <div className="travel-header">
              <h2 className="travel-title">My Journey Around the World</h2>
              <p className="travel-subtitle">Explore the places I've been and the memories I've made</p>
              
              <div className="travel-stats">
                <div className="travel-stat-card">
                  <div className="stat-icon">🌍</div>
                  <div className="stat-number">{new Set(travelLocations.map(loc => loc.country)).size}</div>
                  <div className="stat-label">Countries</div>
                </div>
                <div className="travel-stat-card">
                  <div className="stat-icon">📍</div>
                  <div className="stat-number">{travelLocations.length}</div>
                  <div className="stat-label">Cities</div>
                </div>
                <div className="travel-stat-card">
                  <div className="stat-icon">✈️</div>
                  <div className="stat-number">{flightPaths.length}</div>
                  <div className="stat-label">Journeys</div>
                </div>
                <div className="travel-stat-card">
                  <div className="stat-icon">📷</div>
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Photos</div>
                </div>
              </div>
            </div>

            <div className="map-container-wrapper">
              <MapContainer 
                center={[47.0, 10.0]} 
                zoom={5} 
                className="travel-map"
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Flight paths */}
                {flightPaths.map((path, index) => (
                  <Polyline
                    key={index}
                    positions={path}
                    pathOptions={{
                      color: '#3498db',
                      weight: 2,
                      opacity: 0.6,
                      dashArray: '10, 10'
                    }}
                  />
                ))}

                {/* Location markers */}
                {travelLocations.map((location) => (
                  <Marker 
                    key={location.id} 
                    position={location.coordinates}
                    eventHandlers={{
                      click: () => setSelectedLocation(location)
                    }}
                  >
                    <Popup className="custom-popup">
                      <div className="popup-content">
                        <h3>{location.name}</h3>
                        <p className="popup-date">{location.date}</p>
                        {location.image && (
                          <img 
                            src={location.image} 
                            alt={location.name}
                            className="popup-image"
                          />
                        )}
                        <p className="popup-description">{location.description}</p>
                        <div className="popup-highlights">
                          {location.highlights.map((highlight, idx) => (
                            <span key={idx} className="highlight-tag">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Location cards below map */}
            <div className="location-cards-grid">
              {travelLocations.filter(loc => loc.image).map((location) => (
                <div 
                  key={location.id} 
                  className="location-card"
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="location-card-image">
                    <img src={location.image} alt={location.name} />
                    <div className="location-overlay">
                      <span className="location-name">{location.name}</span>
                    </div>
                  </div>
                  <div className="location-card-content">
                    <div className="location-date">{location.date}</div>
                    <p className="location-description">{location.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="travel-quote">
              <p>"Travel is the only thing you buy that makes you richer."</p>
              <span className="quote-author">- Anonymous</span>
            </div>
          </div>

        </div>
      </section>
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Travel;

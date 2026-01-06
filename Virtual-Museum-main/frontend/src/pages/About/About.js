import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* 1. HERO IMAGE SECTION */}
      <div className="about-hero">
        <img 
            //src="https://images.unsplash.com/photo-1565058774392-1256df2e6ce4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            src="https://upload.wikimedia.org/wikipedia/commons/6/66/Louvre_Museum_Wikimedia_Commons.jpg"
            alt="Museum Hall" 
          className="about-image"
        />
        <div className="hero-overlay">
          <h1>Preserving History, One Pixel at a Time</h1>
        </div>
      </div>

      {/* 2. CONTENT SECTION */}
      <div className="about-content">
        <div className="content-block">
          <h2>Who We Are</h2>
          <p>
            Welcome to the <strong>Virtual Museum</strong>. We are a team of passionate computer science students 
            dedicated to bridging the gap between ancient history and modern technology. 
          </p>
          <p>
            What started as a simple university project quickly grew into a mission: 
            <em> "How can we make the world's greatest treasures accessible to anyone, anywhere?"</em> 
            This platform is the result of countless late-night coding sessions, extensive research, 
            and a shared love for digital preservation.
          </p>
        </div>

        <div className="content-block alt-bg">
          <h2>Our Mission</h2>
          <p>
            History shouldn't be confined behind glass walls or limited by geography. 
            We believe that knowledge belongs to everyone. By digitizing artifacts and creating 
            interactive galleries, we hope to inspire a new generation of historians, artists, and explorers.
          </p>
        </div>

        <div className="content-block join-us">
          <h2>Join Our Journey</h2>
          <p>
            We are just getting started! Whether you are a fellow student, a history buff, 
            or a developer looking to contribute, we'd love to have you exploring with us.
          </p>
          <button className="contact-btn" onClick={() => window.location.href='/contact'}>
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
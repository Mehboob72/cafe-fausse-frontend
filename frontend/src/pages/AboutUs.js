import React from 'react';
import { FaAward, FaHeart, FaLeaf } from 'react-icons/fa';
import '../styles/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Header Section */}
      <section className="about-header">
        <div className="container">
          <h1 className="page-title">About Café Fausse</h1>
          <p className="page-subtitle">
            A story of passion, excellence, and culinary innovation
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <h2 className="section-title">Our Story</h2>
            <p className="story-text">
              Café Fausse was born from a dream to create an unparalleled dining experience 
              that combines the timeless elegance of French cuisine with bold, contemporary 
              innovation. Since opening our doors in 2010, we have been dedicated to providing 
              our guests with not just a meal, but a journey through flavors, textures, and 
              culinary artistry.
            </p>
            <p className="story-text">
              Every dish that leaves our kitchen is a testament to our commitment to excellence. 
              We source the finest seasonal ingredients from local farmers and trusted suppliers 
              around the world, ensuring that each component of your meal meets our exacting 
              standards. Our menu evolves with the seasons, always seeking to surprise and 
              delight even the most discerning palates.
            </p>
            <p className="story-text">
              What sets Café Fausse apart is our unwavering attention to detail. From the 
              moment you step through our doors to the final bite of dessert, every element 
              of your experience has been carefully considered and crafted to create lasting 
              memories.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="founders-section">
        <div className="container">
          <h2 className="section-title">Meet Our Founders</h2>
          <div className="founders-grid">
            <div className="founder-card">
              <div className="founder-image-placeholder">
                <div className="placeholder-icon">JP</div>
              </div>
              <h3 className="founder-name">Chef Jean-Pierre Dubois</h3>
              <p className="founder-title">Executive Chef & Co-Founder</p>
              <p className="founder-bio">
                With over 25 years of culinary experience, Chef Jean-Pierre trained under 
                legendary Michelin-starred chefs in Lyon and Paris before bringing his vision 
                to life at Café Fausse. His innovative approach to French cuisine has earned 
                him international acclaim and numerous awards, including three consecutive 
                Michelin stars.
              </p>
              <p className="founder-bio">
                Chef Jean-Pierre believes that cooking is an art form that requires not only 
                technical mastery but also soul and creativity. His philosophy centers on 
                respecting ingredients, honoring traditions, and never stopping the pursuit 
                of culinary excellence.
              </p>
            </div>

            <div className="founder-card">
              <div className="founder-image-placeholder">
                <div className="placeholder-icon">MC</div>
              </div>
              <h3 className="founder-name">Marie-Claire Dubois</h3>
              <p className="founder-title">General Manager & Co-Founder</p>
              <p className="founder-bio">
                Marie-Claire brings 20 years of luxury hospitality experience to Café Fausse. 
                A graduate of the renowned École hôtelière de Lausanne, she has managed some 
                of Europe's most prestigious dining establishments. Her expertise in creating 
                exceptional guest experiences ensures that every visit to Café Fausse is 
                memorable.
              </p>
              <p className="founder-bio">
                Marie-Claire oversees all aspects of the restaurant's operations with a keen 
                eye for perfection. Her warm hospitality and dedication to service excellence 
                have made Café Fausse not just a restaurant, but a destination where guests 
                feel truly valued and cared for.
              </p>
            </div>

            <div className="founder-card">
              <div className="founder-image-placeholder">
                <div className="placeholder-icon">AL</div>
              </div>
              <h3 className="founder-name">Antoine Laurent</h3>
              <p className="founder-title">Head Sommelier & Wine Director</p>
              <p className="founder-bio">
                Antoine is a master sommelier with an encyclopedic knowledge of wines from 
                around the world. Having spent a decade managing wine programs at three-star 
                Michelin restaurants, he curated our award-winning wine cellar with over 
                1,200 selections. His expertise ensures perfect pairings that elevate every 
                dining experience.
              </p>
              <p className="founder-bio">
                His passion for wine education and his approachable demeanor make wine 
                selection an enjoyable journey for both novices and connoisseurs alike. 
                Antoine's wine pairing menus have been featured in Wine Spectator and have 
                earned Café Fausse its prestigious Wine Spectator Award of Excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <FaAward className="value-icon" />
              <h3>Excellence</h3>
              <p>
                We are committed to delivering excellence in every aspect of our service, 
                from the quality of our ingredients to the presentation of each dish.
              </p>
            </div>
            <div className="value-card">
              <FaLeaf className="value-icon" />
              <h3>Sustainability</h3>
              <p>
                We partner with local farmers and sustainable suppliers, minimizing our 
                environmental impact while supporting our community.
              </p>
            </div>
            <div className="value-card">
              <FaHeart className="value-icon" />
              <h3>Passion</h3>
              <p>
                Our team is driven by a genuine passion for food, wine, and hospitality. 
                This passion is evident in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p className="team-intro">
            Behind every exceptional dining experience is a team of dedicated professionals 
            who take pride in their craft. Our culinary team includes award-winning chefs, 
            skilled pastry artisans, and expert sommeliers. Our front-of-house staff is 
            trained in the art of hospitality, ensuring your comfort and satisfaction 
            throughout your visit.
          </p>
          <p className="team-intro">
            Together, we work in harmony to create magical moments that turn first-time 
            visitors into lifelong patrons. We invite you to experience the passion and 
            dedication that define Café Fausse.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Experience Café Fausse</h2>
            <p>Join us for an evening of exceptional cuisine and impeccable service</p>
            <a href="/reservations" className="btn btn-primary btn-large">
              Reserve Your Table
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

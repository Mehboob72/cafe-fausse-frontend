import React, { useState } from 'react';
import '../styles/Menu.css';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('appetizers');

  const menuData = {
    appetizers: [
      {
        name: 'Foie Gras Torchon',
        description: 'Sauternes gelée, brioche, seasonal fruit compote',
        price: '$28'
      },
      {
        name: 'Oysters on the Half Shell',
        description: 'Six fresh oysters, mignonette, lemon',
        price: '$24'
      },
      {
        name: 'Tuna Tartare',
        description: 'Yellowfin tuna, avocado, crispy shallots, sesame',
        price: '$22'
      },
      {
        name: 'Burrata & Heirloom Tomatoes',
        description: 'Fresh burrata, basil oil, aged balsamic',
        price: '$19'
      },
      {
        name: 'Escargots de Bourgogne',
        description: 'Burgundy snails, garlic-herb butter, parsley',
        price: '$21'
      }
    ],
    mains: [
      {
        name: 'Filet Mignon',
        description: '8oz prime beef, truffle potato purée, seasonal vegetables, red wine reduction',
        price: '$58'
      },
      {
        name: 'Pan-Seared Scallops',
        description: 'Diver scallops, cauliflower purée, brown butter, capers',
        price: '$46'
      },
      {
        name: 'Duck Confit',
        description: 'Crispy duck leg, wild mushroom ragout, cherry gastrique',
        price: '$42'
      },
      {
        name: 'Chilean Sea Bass',
        description: 'Miso-glazed sea bass, bok choy, ginger-soy reduction',
        price: '$52'
      },
      {
        name: 'Lamb Rack',
        description: 'Herb-crusted lamb, ratatouille, rosemary jus',
        price: '$54'
      },
      {
        name: 'Lobster Thermidor',
        description: 'Whole lobster, cognac cream sauce, gruyère gratinée',
        price: '$65'
      },
      {
        name: 'Vegetarian Wellington',
        description: 'Wild mushrooms, roasted vegetables, puff pastry, red wine sauce',
        price: '$38'
      }
    ],
    desserts: [
      {
        name: 'Chocolate Soufflé',
        description: 'Dark chocolate soufflé, vanilla ice cream, raspberry coulis',
        price: '$16'
      },
      {
        name: 'Crème Brûlée',
        description: 'Classic vanilla bean custard, caramelized sugar',
        price: '$14'
      },
      {
        name: 'Tarte Tatin',
        description: 'Caramelized apple tart, crème fraîche',
        price: '$15'
      },
      {
        name: 'Lemon Meringue',
        description: 'Lemon curd, Italian meringue, shortbread',
        price: '$13'
      },
      {
        name: 'Seasonal Fruit Sorbet',
        description: 'Selection of house-made sorbets',
        price: '$12'
      }
    ],
    beverages: [
      {
        name: 'House Wine Selection',
        description: 'Ask your server for tonight\'s selection',
        price: '$12-$18/glass'
      },
      {
        name: 'Premium Wine List',
        description: 'Curated collection from around the world',
        price: '$45-$500/bottle'
      },
      {
        name: 'Craft Cocktails',
        description: 'Signature cocktails crafted by our mixologists',
        price: '$16-$22'
      },
      {
        name: 'Coffee & Espresso',
        description: 'Premium imported beans, expertly prepared',
        price: '$5-$8'
      },
      {
        name: 'Tea Selection',
        description: 'Fine teas from specialty suppliers',
        price: '$6'
      }
    ]
  };

  const categories = [
    { id: 'appetizers', label: 'Appetizers' },
    { id: 'mains', label: 'Main Courses' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'beverages', label: 'Beverages' }
  ];

  return (
    <div className="menu-page">
      {/* Menu Header */}
      <section className="menu-header">
        <div className="container">
          <h1 className="page-title">Our Menu</h1>
          <p className="page-subtitle">
            A carefully curated selection of dishes that celebrate the finest ingredients 
            and culinary traditions
          </p>
        </div>
      </section>

      {/* Menu Navigation */}
      <div className="menu-navigation">
        <div className="container">
          <div className="menu-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`menu-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <section className="menu-content">
        <div className="container">
          <div className="menu-items">
            {menuData[activeCategory].map((item, index) => (
              <div key={index} className="menu-item">
                <div className="menu-item-header">
                  <h3 className="menu-item-name">{item.name}</h3>
                  <span className="menu-item-price">{item.price}</span>
                </div>
                <p className="menu-item-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Notice */}
      <section className="menu-notice">
        <div className="container">
          <div className="notice-content">
            <p>
              <strong>Chef's Tasting Menu:</strong> Experience our multi-course tasting menu 
              for $125 per person (wine pairing available for additional $65)
            </p>
            <p>
              <strong>Dietary Requirements:</strong> Please inform your server of any allergies 
              or dietary restrictions. We're happy to accommodate your needs.
            </p>
            <p className="menu-note">
              *Menu items and prices subject to change based on seasonal availability
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;

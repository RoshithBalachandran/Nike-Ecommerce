import React from 'react';
import './DiscriptionBox.css';

const DiscriptionBox = () => {
  return (
    <div className='discriptionbox'>
      <div className="discriptionbox-navigator">
        <div className="discriptionbox-navbox">Description</div>
        <div className="discriptionbox-navbox fade">Reviews (122)</div>
      </div>
      <div className="discriptionbox-description">
        <p>
          Nike is a world-renowned sportswear brand known for its high-quality footwear, apparel, and accessories. 
          Designed for athletes and everyday wear, Nike products combine cutting-edge technology with stylish designs.
        </p>
        <ul>
          <li>✔ Innovative Technology – Features like Air Max cushioning, React foam, and Flyknit fabric provide maximum comfort and support.</li>
          <li>✔ Stylish & Versatile – Modern designs suitable for sports, workouts, and casual wear.</li>
          <li>✔ Premium Quality – Made with high-quality materials to ensure long-lasting durability.</li>
          <li>✔ Trusted by Athletes – Worn by top athletes around the world.</li>
        </ul>
      </div>
    </div>
  );
}

export default DiscriptionBox;


import React from 'react';
import Hero from '../Hero/Hero';
import Popular from '../Popular/Popular';
import Offers from '../Offers/Offers';



import NewCollection from '../NewCollection/NewCollection';
import Newletter from '../NewsLetter/Newletter';

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
     <NewCollection />
     <Newletter />
    </div>
  );
};

export default Shop;

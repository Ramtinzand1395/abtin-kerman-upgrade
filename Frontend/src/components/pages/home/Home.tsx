import React from "react";
import Hero from "./hero/Hero";
import ThreeBoxes from "./ThreeBoxes";
import MostSell from "./MostSell";
import SpesialOffers from "./specialOffers/SpesialOffers";
import NewestَAccountGame from "./NewestَAccountGame";
import NewestَProductsSlider from "./slider/NewestَProductsSlider";
import Blog from "./Blog";
import Baner3 from "./Baner3";
import GamingAccessories from "./GamingAccessories";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <div className="md:mx-10 mx-2">
        <ThreeBoxes />
        <MostSell />
        <SpesialOffers />
        <NewestَProductsSlider />
        <Baner3 />
        <NewestَAccountGame />
        <GamingAccessories />
        <Blog />
      </div>
    </>
  );
};

export default Home;

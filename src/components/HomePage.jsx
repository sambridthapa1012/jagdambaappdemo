 import {useEffect} from "react";
import Hero from "./Hero";
import Bestselling from "./BestSelling";
import FeaturedCategories from "./FeaturedCategories";
import BestDealsProduct from "./BestDealsProduct";
import FeaturedProducts from "./FeaturedProducts";

 
 function HomePage() {
  return (    
      useEffect(() => {
         window.scrollTo({
           top: 0,
           behavior: "smooth",
         });
       }, []),
  <>
                  <Hero />
                  <Bestselling />
                  <FeaturedCategories />
                  <BestDealsProduct />
                  <FeaturedProducts />
                </>
  );
}

export default HomePage;
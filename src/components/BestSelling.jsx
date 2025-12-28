import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BarbedWire from '../assets/Barbed-Wire.jpeg';
import BindingWire from '../assets/Binding-Wire.jpeg';
import CheckerPlate from '../assets/Checker-Plate.jpeg';
import DeckingSheets from '../assets/Decking-Sheets.webp';
import Concertina from '../assets/Concertina-Wire.jpg';
import FiberSheet from '../assets/fiber-sheet.jpg';
import GateChannel from '../assets/Gate-Channel.jpeg';
import { useNavigate } from "react-router-dom";


const products = [
  {
    id: 1,
    name: "Barbed Wire",
    price: "Rs. 950",
    image:
      BarbedWire
  },
  {
    id: 2,
    name: "Binding wires",
    price: "Rs. 1200",
    image:
      BindingWire,
  },
  {
    id: 3,
    name: "Checker plate",
    price: "Rs. 1800",
    image:
      CheckerPlate,
  },
  {
    id: 4,
    name: "Decking Sheets",
    price: "Rs. 3500",
    image:
      DeckingSheets,
  },
    {
    id: 5,
    name: "Concertina Wire",
    price: "Rs. 3500",
    image:
      Concertina,
  },
    {
    id: 6,
    name: "Fiber Sheet",
    price: "Rs. 3500",
    image:
      FiberSheet,
  },
    {
    id: 7,
    name: "Gate Channel",
    price: "Rs. 3500",
    image:
      GateChannel,
  },
];

function Bestselling() {
  const [index, setIndex] = useState(0);
  const visibleItems = 3;

  const next = () => {
    if (index < products.length - visibleItems) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Best Selling Products
      </h2>

      {/* Slider Wrapper */}
      <div className="relative">

        {/* Previous Button */}
        {index > 0 && (
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                       bg-white/80 backdrop-blur p-3 rounded-full shadow-lg 
                       hover:bg-orange-600 hover:text-white transition"
          >
            <ChevronLeft size={26} />
          </button>
        )}

        {/* Next Button */}
        {index < products.length - visibleItems && (
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                       bg-white/80 backdrop-blur p-3 rounded-full shadow-lg 
                       hover:bg-orange-600 hover:text-white transition"
          >
            <ChevronRight size={26} />
          </button>
        )}

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{
              transform: `translateX(-${index * 320}px)`,
            }}
          >
            {products.map((product) => (
          <div
  key={product.id}
  className="group min-w-[300px] bg-white rounded-lg shadow 
             hover:shadow-2xl transition-all duration-300 relative"
>
  {/* IMAGE WRAPPER */}
  <div className="relative overflow-hidden rounded-t-lg">
    <img
      src={product.image}
      alt={product.name}
      className="h-48 w-full object-cover 
                 transform group-hover:scale-110 
                 transition-transform duration-500"
    />

    {/* POPUP OVERLAY */}
    
   
  </div>

  {/* CONTENT */}
  <div className="p-4">
    <h3 className="font-semibold text-lg">{product.name}</h3>
    <p className="text-orange-600 font-bold mt-2">
      {product.price}
    </p>

    <button
      onClick={() => navigate(`/products/${product.id}`)}
      className="mt-4 w-full bg-orange-600 text-white py-2 rounded
                 hover:bg-orange-700 transition"
    >
      View Product
    </button>
  </div>
</div>

            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Bestselling;

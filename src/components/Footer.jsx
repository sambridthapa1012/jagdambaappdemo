import { FaTiktok } from "react-icons/fa";

import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,

} from "lucide-react";
import logo_j from "../assets/jagadambap_logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6 space-x-3">
  <div
    className="cursor-pointer"
    onClick={() => navigate("/")}
  >
    <img
      src={logo_j}
      alt="Jagadamba Logo"
      className="w-14 h-14 object-contain rounded-lg border border-gray-600 p-1 bg-white"
    />
  </div>

  <div>
    <h1 className="text-lg font-bold text-white">
      Jagadamba Hardware
    </h1>
    <p className="text-xs text-gray-400">
      जगदम्बा हार्डवेयर स्टोर
    </p>
  </div>
</div>
            <p className="text-sm text-gray-300 mb-4">
              Your trusted partner for quality construction materials and tools.
              Serving Nepal with excellence for over 15 years.
            </p>
            
           <div className="flex space-x-3">
  <a
    href="https://www.facebook.com/JGH825"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors" />
  </a>

  <a
    href="https://www.instagram.com/jagadamba_global"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-400 transition-colors" />
  </a>

  <a
    href="https://www.tiktok.com/@jagadambaglobal"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="TikTok"
  >
    <FaTiktok className="h-5 w-5 text-gray-400 hover:text-black transition-colors" />
  </a>
</div>


            </div>
         

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Bulk Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Delivery Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Cement & Construction
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Paints & Colors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Tools & Hardware
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Plumbing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Electrical
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Tiles & Flooring
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
             <div className="flex items-start">
  <MapPin className="h-4 w-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
  <a
    href="https://maps.app.goo.gl/kSX6nS5tJpBzz6vGA"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-orange-400 transition-colors"
  >
    Dhapakhel, Lalitpur
    <br />
    Chapagaun Dobato, Lalitpur
    <br />
    Nepal
  </a>
</div>

          <div className="flex items-center">
  <Phone className="h-4 w-4 text-orange-400 mr-2" />
  <a
    href="tel:01515825"
    className="hover:text-orange-400 transition-colors"
  >
    01-515825
  </a>
</div>

<div className="flex items-center">
  <Phone className="h-4 w-4 text-orange-400 mr-2" />
  <a
    href="tel:+9779851079391"
    className="hover:text-orange-400 transition-colors"
  >
    9851079391 (Mobile)
  </a>
</div>

<div className="flex items-center">
  <Mail className="h-4 w-4 text-orange-400 mr-2" />
  <a
    href="mailto:Jagdambaghpl@gmail.com"
    className="hover:text-orange-400 transition-colors"
  >
    Jagdambaghpl@gmail.com
  </a>
</div>


              <div className="flex items-start">
                <Clock className="h-4 w-4 text-orange-400 mr-2 mt-1" />
                <div>
                  <p>Sunday - Friday: 7AM - 7PM</p>
                  <p>Saturday: 7AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="border-t border-gray-700 mt-8 pt-8">
        
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
           
            <div>
                            <h4 className="font-medium text-white mb-2">Services</h4>

               <ul className="space-y-1 text-gray-400">
                <li>Free Delivery (Rs. 5000+)</li>
                <li>Technical Support</li>
                <li>Bulk Discounts</li>
                <li>Installation Guide</li>
              </ul>
              
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Payment Methods</h4>
              <ul className="space-y-1 text-gray-400">
                <li>Cash on Delivery</li>
                <li>Khalti</li>
                <li>eSewa</li>
                <li>Bank Transfer</li>
              </ul>
            </div>
           
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <a href="https://www.amplify.com.np/" className="text-gray-400">
            © 2024 Jagadamba Hardware Store. All rights reserved. | Made with ❤️ by Amplify Digital
            
          </a>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


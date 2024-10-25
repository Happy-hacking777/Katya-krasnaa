'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Step 1: Define a type for Artwork
type Artwork = {
  id: number;
  src: string;
  title: string;
  description: string;
  price: string;
}

const artist = {
  name: "Katya Krasnaya",
  photo: "/images/Portret.png",
  bio: "Modern Artist | Based in Portugal | Creating Worldwide",
  email: "hellokrasnaya@gmail.com",
  phone: "+351 913 210 271",
}

const artworks: Artwork[] = [
  { id: 1, src: "/images/Girl with an earring.jpg", title: "Girl with an earring", description: "Oil on canvas, 2023, Saint-Petersburg, Russia", price: "SOLD" },
  { id: 2, src: "/images/F+D.jpg", title: "F+D", description: "Oil on canvas, 90x80, 2022, Moscow, Russia", price: "SOLD" },
  { id: 3, src: "/images/Kusama.jpg", title: "Kusama", description: "Oil on canvas, 120x100, Saint-Petersburg, Russia", price: "€3600" },
  { id: 4, src: "/images/D+D.jpg", title: "D+D", description: "Oil on canvas , 100x100, 2024, Lisbon, Portugal", price: "€2400" },
  { id: 5, src: "/images/Flower.jpg", title: "Flower", description: "Oil on canvas. 120x100, oil on canvas, Saint-Petersburg, Russia", price: "€2600" },
  { id: 6, src: "/images/Sara Lucas.jpg", title: "Sara Lucas", description: "Oil on canvas. 120x100, 2022, Saint-Petersburg, Russia", price: "SOLD" },
  { id: 7, src: "/images/F+M.jpg", title: "F+M", description: "Oil on canvas, 120x100, 2021, Saint-Petersburg", price: "SOLD" },
  { id: 8, src: "/images/H+W.jpg", title: "H+W", description: "Oil on canvas, 120x100, 2024 Lisbon, Portugal", price: "€2400" },
  { id: 9, src: "/images/V+L.jpg", title: "V+L", description: "Oil on canvas, 130x100, 2024 Lisbon, Portugal", price: "€2400" },
  { id: 10, src: "/images/D+M.jpg", title: "D+M", description: "Oil on canvas, 120x100, 2024, Lisbon, Portugal", price: "€2400" },
  { id: 11, src: "/images/I+S.jpg", title: "I+S", description: "Oil on canvas, 170x100, 2024, Lisbon, Portugal", price: "SOLD" },
  { id: 12, src: "/images/Boy and Bear.jpg", title: "Boy and bear", description: "Oil on canvas, 120x100, 2024 , Lisbon, Portugal", price: "€1670" },
  { id: 13, src: "/images/Kids horse.jpg", title: "Kid's horse", description: "Oil on canvas, 120x100, 2024, Lisbon, Portugal", price: "€1890" },
  { id: 14, src: "/images/Brother and sister.jpg", title: "Brother and sister", description: "Oil on canvas, 120x100, 2024, Lisbon, Portugal", price: "€1890" },
  { id: 15, src: "/images/Clementina in blue garden.jpg", title: "Clementina in blue garden", description: "Oil on canvas, 120x100, Moscow, Russia", price: "SOLD" },
  { id: 16, src: "/images/Meats.jpg", title: "Meats", description: "Oil on canvas,150x150, Moscow, Russia", price: "SOLD" },
  { id: 17, src: "/images/Ballon dog.jpg", title: "Ballon dog", description: "Oil on canvas, 120x100,2019, Moscow, Russia", price: "SOLD" },
  { id: 18, src: "/images/F+K.jpg", title: "F+K", description: "Oil on canvas, 100x90,2019, Moscow, Russia", price: "SOLD" },
  { id: 19, src: "/images/C+B.jpg", title: "C+B", description: "Oil on canvas, 140x100, 2020, Saint-Petersburg, Russia", price: "SOLD" },
  { id: 20, src: "/images/Drank face Venera.jpg", title: "Drank face Venera", description: "Oil on canvas, 190x110, 2019, Moscow, Russia", price: "SOLD" },
  { id: 21, src: "/images/David in the garden.jpg", title: "David in the garden", description: "Oil on canvas, 180x110, 2019, Moscow, Russia", price: "SOLD" }


]


export default function SimplifiedArtistPortfolioComponent() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [showFirework, setShowFirework] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [zoomScale, setZoomScale] = useState(1); // State for zoom scale

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Show firework after a short delay
    const showTimer = setTimeout(() => {
      setShowFirework(true);
    }, 100);

    // Auto-hide firework after 5 seconds
    const hideTimer = setTimeout(() => {
      setShowFirework(false);
    }, 5100);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Zoom In and Out Functionality
  const handleZoomIn = () => {
    setZoomScale((prevScale) => Math.min(prevScale + 0.1, 5)); // Max zoom scale 5x
  };

  const handleZoomOut = () => {
    setZoomScale((prevScale) => Math.max(prevScale - 0.1, 1)); // Min zoom scale 1x (100%)
  };

  return (
    <div className="min-h-screen bg-white p-8 overflow-hidden">
     <AnimatePresence>
        {showFirework && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            {artworks.slice(0, 6).map((artwork, index) => {
              const isMobile = windowSize.width <= 768;
              const radius = isMobile ? 100 : 200;
              const imgSize = isMobile ? "w-20 h-20" : "w-40 h-40";
              return (
                <motion.img
                  key={artwork.id}
                  src={artwork.src}
                  alt={artwork.title}
                  className={`absolute ${imgSize} object-cover rounded-full`}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    rotate: 0,
                  }}
                  animate={{
                    x: Math.cos(index * (Math.PI * 2 / 6)) * radius,
                    y: Math.sin(index * (Math.PI * 2 / 6)) * radius,
                    scale: 1,
                    rotate: 360,
                    transition: {
                      duration: 2,
                      delay: index * 0.2,
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    scale: 0,
                    transition: { duration: 0.5 },
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoomable Artwork Modal - Desktop Only */}
      {selectedArtwork && windowSize.width > 768 && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center" onClick={() => setSelectedArtwork(null)}>
          <div className="relative">
            <motion.img
              src={selectedArtwork.src}
              alt={selectedArtwork.title}
              style={{ transform: `scale(${zoomScale})` }} // Apply zoom
              className="max-w-full max-h-screen object-contain"
            />
            {/* Zoom controls */}
            {/* <div className="absolute bottom-4 right-4 flex space-x-2">
              <button onClick={handleZoomIn} className="bg-white p-2 rounded shadow-lg text-xl">+</button> {/* "+" button */}
              {/* <button onClick={handleZoomOut} className="bg-white p-2 rounded shadow-lg text-xl">-</button> {/* "-" button */}
            {/* </div> }}*/} 
          </div>
        </div>
      )}

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 5 }}
        className="max-w-4xl mx-auto mb-12 text-center"
      >
        <Image
          src={artist.photo}
          alt={artist.name}
          width={160}
          height={160}
          className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
        />
        <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
        <p className="text-xl text-gray-600">{artist.bio}</p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 5.5 }}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-16"
      >
        {artworks.map((artwork, index) => (
          <motion.div
            key={artwork.id}
            layoutId={`artwork-${artwork.id}`}
            onClick={() => setSelectedArtwork(artwork)}
            className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 5.5 + index * 0.1 },
            }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={artwork.src}
              alt={artwork.title}
              width={400}
              height={300}
              className="w-full h-auto"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{artwork.title}</h3>
              <p className="text-gray-600 mb-2">{artwork.description}</p>
              <p className="text-primary font-semibold">{artwork.price}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <footer className="mt-16 bg-gray-100 p-8 rounded-lg text-center">
  <h2 className="text-2xl font-bold mb-4">Contact the Artist</h2>
  
  <p className="text-lg text-gray-700">
    Email: <a href={`mailto:${artist.email}`} className="text-primary hover:underline">{artist.email}</a>
  </p>
  
  <p className="text-lg text-gray-700">
    Phone: <a href={`tel:${artist.phone}`} className="text-primary hover:underline">{artist.phone}</a>
  </p>
  
  {/* Instagram Link */}
  <div className="flex items-center justify-center mt-4 space-x-4">
  <a
      href="https://www.instagram.com/katyakrasnaya"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2"
    >
      {/* Instagram Icon */}
      <Image
        src="/images/instagram-icon.png" // Ensure the correct path for the Instagram icon
        alt="Instagram"
        width={24}
        height={24}
        className="hover:scale-110 transition-transform"
      />
    </a>
  </div>
</footer>
    </div>
  )
}
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
  { id: 1, src: "/images/Kusama.jpg", title: "Kusama", description: "Oil on canvas, 120x100, Saint-Petersburg, Russia", price: "€3600" },
  { id: 2, src: "/images/F+D.jpg", title: "F+D", description: "Oil on canvas, 90x80, 2022, Moscow, Russia", price: "SOLD" },
  { id: 3, src: "/images/Girl with an earring.jpg", title: "Girl with an earring", description: "Oil on canvas, 2023, Saint-Petersburg, Russi", price: "SOLD" },
  { id: 4, src: "/images/D+D.jpg", title: "D+D", description: "Oil on canvas , 100x100, 2024 Lisbon, Portugal", price: "€2400" },
  { id: 5, src: "/images/Flower.jpg", title: "Flower", description: "Oil on canvas. 120x100, oil on canvas, Saint-Petersburg, Russia", price: "€2600" },
  { id: 6, src: "/images/Sara Lucas.jpg", title: "Sara Lucas", description: "Oil on canvas. 120x100, 2022, Saint-Petersburg, Russia", price: "€3700" },
  { id: 7, src: "/images/F+M.jpg", title: "F+M", description: "Oil on canvas, 120x100, 2021, Saint-Petersburg", price: "SOLD" },
  { id: 8, src: "/images/H+W.jpg", title: "H+W", description: "Oil on canvas, 120x100, 2024 Lisbon, Portugal", price: "€2400" },
  { id: 9, src: "/images/V+L.jpg", title: "V+L", description: "Oil on canvas, 130x100, 2024 Lisbon, Portugal", price: "€2400" },
  { id: 10, src: "/images/D+M.jpg", title: "D+M", description: "Oil on canvas, 120x100, 2024, Lisbon, Portugal", price: "€2400" },
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
      </footer>
    </div>
  )
}
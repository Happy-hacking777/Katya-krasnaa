'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
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
  email: "katya.krasnaya@email.com",
  phone: "+351 123 456 789",
}

const artworks: Artwork[] = [
  { id: 1, src: "/images/Picture1.png", title: "Double Portrait", description: "Oil on canvas", price: "€500" },
  { id: 2, src: "/images/Picture7.png", title: "Reinventing Kusama", description: "Oil on canvas", price: "€800" },
  { id: 3, src: "/images/Picture2.png", title: "Abstract", description: "Oil on canvas", price: "€800" },
  { id: 4, src: "/images/Picture3.png", title: "Portrait 2", description: "Oil on canvas", price: "€700" },
  { id: 5, src: "/images/Picture4.png", title: "My Dog", description: "Oil on canvas", price: "€300" },
  { id: 6, src: "/images/Picture5.png", title: "David in Leaves", description: "Oil on canvas", price: "€600" },
  { id: 7, src: "/images/Picture6.png", title: "Venera in Leaves", description: "Oil on canvas", price: "€600" },
]

export default function SimplifiedArtistPortfolioComponent() {
  // Step 2: Correct the state to handle Artwork or null
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [showFirework, setShowFirework] = useState(true);
  const [zoom, setZoom] = useState(1); // Track zoom level
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Track position of the image when dragging
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

  // Auto-hide the firework animation after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirework(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Function to handle zoom in and out with mouse wheel
  const handleZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDirection = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prevZoom) => Math.max(1, prevZoom + zoomDirection)); // Ensure zoom doesn't go below 1
  }

  // Start dragging the image
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartDrag({ x: e.clientX - position.x, y: e.clientY - position.y });
  }

  // Move the image while dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startDrag.x,
        y: e.clientY - startDrag.y,
      });
    }
  }

  // Stop dragging the image
  const handleMouseUp = () => {
    setIsDragging(false);
  }

  return (
    <div className="min-h-screen bg-white p-8 overflow-hidden">
      {/* Firework animation */}
      <AnimatePresence>
        {showFirework && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            {artworks.map((artwork, index) => (
              <motion.img
                key={artwork.id}
                src={artwork.src}
                alt={artwork.title}
                className="absolute rounded-full object-cover w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  x: Math.cos(index * (Math.PI * 2 / artworks.length)) * (window.innerWidth < 640 ? 100 : 200),
                  y: Math.sin(index * (Math.PI * 2 / artworks.length)) * (window.innerWidth < 640 ? 100 : 200),
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
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Artist Info */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: showFirework ? 5 : 0 }}
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

      {/* Artwork Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: showFirework ? 5.5 : 0.5 }}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-16"
      >
        {artworks.map((artwork, index) => (
          <motion.div
            key={artwork.id}
            layoutId={`artwork-${artwork.id}`}
            onClick={() => {
              setSelectedArtwork(artwork); // Now it works correctly with types
              setZoom(1); // Reset zoom level when new artwork is opened
              setPosition({ x: 0, y: 0 }); // Reset position
            }}
            className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: (showFirework ? 5.5 : 0.5) + index * 0.1 },
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

      {/* Contact Section */}
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
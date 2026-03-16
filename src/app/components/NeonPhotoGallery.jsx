"use client"

import { useState, useEffect, useRef } from "react";
import { Heart, Mail, Play, X, ChevronLeft, ChevronRight, Music, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

// Dynamically import all images from public/images
const importAll = (r) => r.keys().map((key) => ({
  src: `/images/${key.replace('./', '')}`,
  caption: key.replace('./', '').replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ').replace(/\d+/g, '').trim() || "Our Memory"
}));

const photos = importAll(require.context('../../../public/images', false, /\.(jpe?g|png|webp|gif)$/));

// Romantic love notes in Hindi
const loveNotes = [
  "💖 You’re not just my girlfriend, you’re my calm in chaos and my motivation in struggle.",
"✨ Every time I think of you, my goals feel lighter and my dreams feel closer.",
"❤️ You’re the softest part of my heart and the strongest reason behind my hard work.",
"😊 Even on my busiest days, your thoughts keep me smiling like a secret only I know.",

"💻 Loving you feels like coding the perfect program—no errors, just endless possibilities.",

"🌍 You’re not only in my heart, you’re in every plan I make for my future.",

"📱 Your voice is my favorite notification, and your smile is my favorite update.",

"🎉 With you, every ordinary day feels like a personal festival."
];

// Spotify favorite songs
const favoriteSongs = [
  { title: "Tum Hi Ho", artist: "Arijit Singh", album: "Aashiqui 2", duration: "4:22" },
  { title: "Pehla Pyaar", artist: "Armaan Malik", album: "Kabir Singh", duration: "3:32" },
  { title: "Raataan Lambiyan", artist: "Tanishk Bagchi", album: "Shershaah", duration: "3:50" },
  { title: "Kesariya", artist: "Arijit Singh", album: "Brahmastra", duration: "4:28" },
  { title: "Mere Yaara", artist: "Arijit Singh", album: "Sooryavanshi", duration: "4:09" }
];

export default function NeonPhotoGallery() {
  const [tab, setTab] = useState("gallery");
  const [zoomedImage, setZoomedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Dynamically import all images from public/images
  const importAll = (r) => r.keys().map((key) => ({
    src: `/images/${key.replace('./', '')}`,
    caption: key.replace('./', '').replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ').replace(/\d+/g, '').trim() || "Our Memory"
  }));

  const photos = importAll(require.context('../../../public/images', false, /\.(jpe?g|png|webp|gif)$/));

  // Romantic love notes in Hindi
  const loveNotes = [
    "💖 You’re not just my girlfriend, you’re my calm in chaos and my motivation in struggle.",
    "✨ Every time I think of you, my goals feel lighter and my dreams feel closer.",
    "❤️ You’re the softest part of my heart and the strongest reason behind my hard work.",
    "😊 Even on my busiest days, your thoughts keep me smiling like a secret only I know.",
    "💻 Loving you feels like coding the perfect program—no errors, just endless possibilities.",
    "🌍 You’re not only in my heart, you’re in every plan I make for my future.",
    "📱 Your voice is my favorite notification, and your smile is my favorite update.",
    "🎉 With you, every ordinary day feels like a personal festival."
  ];

  const handleImageClick = (index) => {
    setZoomedImage(index);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  const nextImage = () => {
    setZoomedImage((prev) => (prev + 1) % photos.length);
  };

  const prevImage = () => {
    setZoomedImage((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (!isAutoPlaying) {
      setCurrentSlide(0);
    }
  };

  // Auto play functionality
  useEffect(() => {
    let autoPlayRef = null;
    if (tab === "autoplay" && isAutoPlaying) {
      autoPlayRef = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % photos.length);
      }, 1000);
    } else if (autoPlayRef) {
      clearInterval(autoPlayRef);
    }

    return () => {
      if (autoPlayRef) clearInterval(autoPlayRef);
    };
  }, [tab, isAutoPlaying, photos.length]);

  return (
    <div className="min-h-screen flex bg-black relative">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start py-10 px-4 relative">
        {/* Love Notes Full Screen */}
        {tab === "notes" ? (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 z-50 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-[0_0_15px_pink]">
                Love Notes 💌
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loveNotes.map((note, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border-2 border-pink-400/40 hover:border-pink-500/60 transition-all duration-300 cursor-pointer relative overflow-hidden"
                    whileHover={{ scale: 1.03, y: -5, rotate: 1 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 50, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                  >
                    {/* Background decorative image */}
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                      <img
                        src={photos[index % photos.length].src}
                        alt=""
                        className="w-full h-full object-cover rounded-3xl"
                      />
                    </div>
                    
                    {/* Heart decoration */}
                    <motion.div
                      className="absolute top-4 right-4 text-pink-400"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                    >
                      <Heart className="w-8 h-8 fill-pink-400/30" />
                    </motion.div>
                    
                    <div className="relative z-10">
                      <div className="text-white text-lg leading-relaxed font-cursive text-center mb-4 drop-shadow-[0_0_4px_pink]">
                        {note}
                      </div>
                      <div className="text-pink-300 text-sm text-center font-semibold">
                        Message {index + 1}
                      </div>
                    </div>
                    
                    {/* Floating particles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 8 }, (_, i) => (
                        <motion.div
                          key={i}
                          className="absolute text-pink-400 text-xl"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0, 1, 0],
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 3 + Math.random() * 2,
                            delay: i * 0.5,
                            repeat: Infinity,
                          }}
                        >
                          ❤️
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                onClick={() => setTab("gallery")}
                className="fixed top-8 right-8 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        ) : null}
        {/* Header */}
        <div className="w-full max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 drop-shadow-[0_0_20px_purple]">
            Gallery of Us <Heart className="inline w-10 h-10 text-pink-300 ml-2" />
          </h1>
          <div className="text-xl text-white/80 mb-6 tracking-wide">
            Every photo tells our story
          </div>
          
          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setTab("gallery")}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-white shadow-lg transition-all duration-200
                ${tab === "gallery"
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 scale-105"
                  : "bg-pink-900/40 hover:scale-105"
                }`}
            >
              <ImageIcon className="w-5 h-5" /> Gallery
            </button>
            <button
              onClick={() => setTab("notes")}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-white shadow-lg transition-all duration-200
                ${tab === "notes"
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 scale-105"
                  : "bg-pink-900/40 hover:scale-105"
                }`}
            >
              <Mail className="w-5 h-5" /> Love Notes
            </button>
            <button
              onClick={() => {
                setTab("autoplay");
                setIsAutoPlaying(true);
              }}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-white shadow-lg transition-all duration-200
                ${tab === "autoplay"
                  ? "bg-gradient-to-r from-blue-500 to-green-400 scale-105"
                  : "bg-blue-900/40 hover:scale-105"
                }`}
            >
              <Play className="w-5 h-5" /> Autoplay
            </button>
            <button
              onClick={() => setTab("music")}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-white shadow-lg transition-all duration-200
                ${tab === "music"
                  ? "bg-gradient-to-r from-green-500 to-emerald-400 scale-105"
                  : "bg-green-900/40 hover:scale-105"
                }`}
            >
              <Music className="w-5 h-5" /> Music
            </button>
          </div>
        </div>

        {/* Gallery Content */}
        {tab === "gallery" && (
          <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-2">
            {photos.map((photo, idx) => (
              <motion.div
                key={idx}
                className="rounded-3xl overflow-hidden relative shadow-2xl border-4 border-pink-400/40 bg-gradient-to-br from-purple-900/80 via-pink-900/60 to-blue-900/80
                  transition-all duration-300 hover:scale-105 hover:shadow-pink-500/40 cursor-pointer"
                onClick={() => handleImageClick(idx)}
                whileHover={{ rotateY: 5, z: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-56 object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                  {/* 3D shadow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-lg font-cursive text-white text-center drop-shadow-[0_0_8px_pink]">
                    {photo.caption}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Autoplay Carousel */}
        {tab === "autoplay" && (
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-400/40">
              <img
                src={photos[currentSlide].src}
                alt={photos[currentSlide].caption}
                className="w-full h-96 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/90 to-transparent">
                <div className="text-xl font-cursive text-white text-center drop-shadow-[0_0_8px_blue]">
                  {photos[currentSlide].caption}
                </div>
                <div className="text-blue-300 text-sm text-center mt-2">
                  {currentSlide + 1} / {photos.length}
                </div>
                <div className="flex justify-center mt-3">
                  <button
                    onClick={toggleAutoPlay}
                    className={`px-4 py-2 rounded-full font-semibold text-white ${
                      isAutoPlaying 
                        ? "bg-gradient-to-r from-red-500 to-orange-400" 
                        : "bg-gradient-to-r from-green-500 to-emerald-400"
                    }`}
                  >
                    {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % photos.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Music Player */}
        {tab === "music" && (
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-green-900/80 to-emerald-900/60 rounded-3xl p-8 border-2 border-green-400/40">
              <h2 className="text-2xl font-bold text-white text-center mb-6 drop-shadow-[0_0_8px_green]">
                Our Favorite Songs 🎵
              </h2>
              
              <div className="bg-black/30 rounded-2xl p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-xl font-semibold text-white drop-shadow-[0_0_4px_green]">
                    {favoriteSongs[currentSong].title}
                  </div>
                  <div className="text-green-300 text-sm">
                    {favoriteSongs[currentSong].artist}
                  </div>
                  <div className="text-green-400 text-xs">
                    {favoriteSongs[currentSong].album} • {favoriteSongs[currentSong].duration}
                  </div>
                </div>

                <div className="flex justify-center items-center gap-4 mb-4">
                  <button
                    onClick={playPreviousSong}
                    className="bg-green-800/50 text-white p-2 rounded-full hover:bg-green-700/70 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                    className="bg-gradient-to-r from-green-500 to-emerald-400 text-white p-3 rounded-full text-lg font-semibold hover:scale-105 transition-all"
                  >
                    {isMusicPlaying ? "⏸️" : "▶️"}
                  </button>
                  <button
                    onClick={playNextSong}
                    className="bg-green-800/50 text-white p-2 rounded-full hover:bg-green-700/70 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-green-800/30 rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full transition-all duration-100"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {favoriteSongs.map((song, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      index === currentSong
                        ? 'bg-green-700/50 border border-green-400/50'
                        : 'bg-green-900/30 hover:bg-green-800/40'
                    }`}
                    onClick={() => setCurrentSong(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center">
                        <Music className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-white text-sm font-medium">{song.title}</div>
                        <div className="text-green-300 text-xs">{song.artist}</div>
                      </div>
                    </div>
                    <div className="text-green-400 text-xs">{song.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Zoom Modal */}
        {zoomedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <img
                src={photos[zoomedImage].src}
                alt={photos[zoomedImage].caption}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <div className="absolute top-4 right-4">
                <button
                  onClick={closeZoom}
                  className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-4 rounded-lg">
                <div className="text-lg font-semibold text-center">
                  {photos[zoomedImage].caption}
                </div>
              </div>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Optional: Add a neon border glow effect */}
        <div className="pointer-events-none fixed inset-0 z-[-1]">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 blur-2xl" />
        </div>
      </div>
    </div>
  );
}

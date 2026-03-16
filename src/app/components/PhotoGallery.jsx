"use client"

import { motion } from "motion/react"
import { Camera, ArrowRight, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from 'react'

export default function PhotoGallery({ 
  onNext, 
  musicStarted, 
  isMusicPlaying, 
  setIsMusicPlaying, 
  currentSong, 
  setCurrentSong, 
  songs 
}) {

    const [hearts, setHearts] = useState([])
    const [clickHearts, setClickHearts] = useState([])
    const [showLoveMessage, setShowLoveMessage] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isSwiping, setIsSwiping] = useState(false)

    useEffect(() => {
        const generateHearts = () => {
            const newHearts = Array.from({ length: 25 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 3,
                duration: 2 + Math.random() * 3,
                size: 10 + Math.random() * 20,
                opacity: 0.3 + Math.random() * 0.4
            }))
            setHearts(newHearts)
        }

        generateHearts()

        // Show love message every 15 seconds
        const messageInterval = setInterval(() => {
            setShowLoveMessage(true)
            setTimeout(() => setShowLoveMessage(false), 3000)
        }, 15000)

        return () => clearInterval(messageInterval)
    }, [])

    const createHeartExplosion = (x, y) => {
        const newHearts = Array.from({ length: 12 }, (_, i) => ({
            id: Date.now() + i,
            x: x,
            y: y,
            size: 15 + Math.random() * 25,
            opacity: 1,
            duration: 0.8 + Math.random() * 0.7,
            delay: i * 0.1,
            angle: Math.random() * Math.PI * 2,
            distance: 50 + Math.random() * 100
        }))
        setClickHearts(prev => [...prev, ...newHearts])
        
        // Remove hearts after animation
        setTimeout(() => {
            setClickHearts(prev => prev.filter(h => h.id < Date.now()))
        }, 2000)
    }

    const allPhotos = [
  { id: 1, src: "/images/1.jpeg", caption: " Perfect Together💓" },
  { id: 2, src: "/images/2.jpeg", caption: "Every Moment With You Is Magic ✨" },
  { id: 3, src: "/images/3.jpeg", caption: "You Complete My World 🌟" },
  { id: 4, src: "/images/4.jpeg", caption: "Forever Yours, Always 💕" },
  { id: 5, src: "/images/5.jpeg", caption: "My Love For You Grows Daily 🌹" },
  { id: 6, src: "/images/6.jpeg", caption: "You're My Dream Come True 💫" },
  { id: 7, src: "/images/7.jpeg", caption: "Together Forever, My Love 💞" },
  { id: 8, src: "/images/8.jpeg", caption: "My Heart Found Its Home 🏡" },
  { id: 9, src: "/images/10.jpeg", caption: "You Make My World Beautiful 🌈" },
 
  { id: 11, src: "/images/15.jpeg", caption: "Love You More Each Day 💖" },
  { id: 12, src: "/images/16.jpeg", caption: "You're My Sunshine ☀️" },
  { id: 13, src: "/images/18.jpeg", caption: "My Heart Belongs To You 🫶" },
  { id: 14, src: "/images/19.jpeg", caption: "My Heart Beats Only For You💑" }
];
    const totalPhotos = allPhotos.length;

    const nextPhoto = () => {
        setIsSwiping(true)
        setCurrentIndex((prev) => (prev + 1) % totalPhotos)
        setTimeout(() => setIsSwiping(false), 300)
    }

    const prevPhoto = () => {
        setIsSwiping(true)
        setCurrentIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos)
        setTimeout(() => setIsSwiping(false), 300)
    }

    const getVisiblePhotos = () => {
        const prevIndex = (currentIndex - 1 + totalPhotos) % totalPhotos
        const nextIndex = (currentIndex + 1) % totalPhotos
        return [prevIndex, currentIndex, nextIndex]
    }

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50"
            style={{ backgroundImage: 'linear-gradient(to bottom right, #fce4ec, #e1bee7, #bbdefb)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
        >
            {/* Floating Hearts Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="absolute text-pink-400"
                        style={{
                            left: `${heart.left}%`,
                            top: '110%',
                            fontSize: `${heart.size}px`,
                            opacity: heart.opacity
                        }}
                        animate={{
                            y: [-30, -window.innerHeight - 100],
                            opacity: [0, heart.opacity, 0],
                            rotate: [0, Math.random() * 720],
                            scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                            duration: heart.duration,
                            delay: heart.delay,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        ❤️
                    </motion.div>
                ))}
                
                {/* Click Heart Explosions */}
                {clickHearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="absolute text-red-400 pointer-events-none"
                        style={{
                            left: `${heart.x}px`,
                            top: `${heart.y}px`,
                            fontSize: `${heart.size}px`,
                            opacity: heart.opacity,
                            transformOrigin: 'center'
                        }}
                        initial={{
                            x: 0,
                            y: 0,
                            opacity: 1,
                            scale: 0
                        }}
                        animate={{
                            x: Math.cos(heart.angle) * heart.distance,
                            y: Math.sin(heart.angle) * heart.distance - 50,
                            opacity: [1, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: heart.duration,
                            delay: heart.delay,
                            ease: "easeOut"
                        }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="text-center mb-8 z-10"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <motion.div
                    className="mb-8"
                    animate={{
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                    <Camera className="w-16 h-16 text-pink-500 mx-auto drop-shadow-lg" />
                </motion.div>

                <h1 className="text-4xl md:text-6xl py-1 md:py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-6 drop-shadow-lg">
                    Our Romantic Journey 💕
                </h1>
                <p className="text-xl text-purple-800 font-semibold">Beautiful moments with My Love 📸</p>
            </motion.div>

            {/* Custom 3D Carousel */}
            <div className="w-full max-w-2xl mx-auto z-10 relative">
                <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
                    {getVisiblePhotos().map((photoIndex, position) => {
                        const photo = allPhotos[photoIndex]
                        const isCenter = position === 1
                        const isLeft = position === 0
                        const isRight = position === 2
                        
                        return (
                            <motion.div
                                key={photo.id}
                                className={`absolute w-64 md:w-80 h-96 md:h-[450px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-300 ${
                                    isCenter 
                                        ? 'z-30 scale-100' 
                                        : isLeft 
                                            ? 'z-20 -translate-x-48 md:-translate-x-60 scale-90 opacity-70' 
                                            : 'z-20 translate-x-48 md:translate-x-60 scale-90 opacity-70'
                                }`}
                                initial={{ 
                                    x: isLeft ? -200 : isRight ? 200 : 0,
                                    opacity: isCenter ? 1 : 0.7,
                                    scale: isCenter ? 1 : 0.9
                                }}
                                animate={{ 
                                    x: isLeft ? -120 : isRight ? 120 : 0,
                                    opacity: isCenter ? 1 : 0.7,
                                    scale: isCenter ? 1 : 0.9
                                }}
                                transition={{ duration: 0.3 }}
                                onClick={(e) => {
                                    const rect = e.target.getBoundingClientRect()
                                    createHeartExplosion(
                                        rect.left + rect.width / 2,
                                        rect.top + rect.height / 2
                                    )
                                }}
                            >
                                {/* White transparent overlay for side photos */}
                                {!isCenter && (
                                    <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl z-10" />
                                )}
                                
                                <img
                                    src={photo.src}
                                    alt={`Romantic Memory ${photoIndex + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                
                                {/* Heart icon on center photo */}
                                {isCenter && (
                                    <motion.div
                                        className="absolute top-4 right-4"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.5, type: "spring" }}
                                    >
                                        <Heart className="w-8 h-8 text-red-500 fill-red-500 drop-shadow-lg" />
                                    </motion.div>
                                )}
                                
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-3xl">
                                    <p className="text-white text-lg font-semibold text-center">
                                        {photo.caption}
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}
                    
                    {/* Navigation Arrows */}
                    <button
                        onClick={prevPhoto}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-3 rounded-full shadow-lg z-40 transition-all duration-200 hover:scale-110"
                        disabled={isSwiping}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <button
                        onClick={nextPhoto}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-3 rounded-full shadow-lg z-40 transition-all duration-200 hover:scale-110"
                        disabled={isSwiping}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    
                    {/* Photo Counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                        {currentIndex + 1} / {totalPhotos}
                    </div>
                </div>
            </div>

            <motion.div
                className="mt-12 z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <button
                    onClick={onNext}
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 text-white text-lg px-8 py-4 rounded-full shadow-2xl border-2 border-white/30 transition-all duration-300 hover:scale-110 hover:shadow-3xl group relative overflow-hidden"
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    
                    <motion.div 
                        className="flex items-center space-x-2 relative z-10"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="font-semibold">Continue Our Journey</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </motion.div>
                </button>
            </motion.div>

            {/* Romantic Love Message Overlay */}
            {showLoveMessage && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-pink-300/30 shadow-2xl">
                        <motion.div
                            className="text-center"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                            <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                                I Love You Forever! 💖
                            </h2>
                            <p className="text-pink-100 mt-2 text-lg">
                                You mean everything to me
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            )}

            {/* Romantic decorative elements */}
            <div className="absolute top-4 right-4 text-pink-400 opacity-40">
                <Heart className="w-8 h-8" />
            </div>
            <div className="absolute bottom-4 left-4 text-purple-400 opacity-40">
                <Heart className="w-8 h-8" />
            </div>
        </motion.div>
    )
}

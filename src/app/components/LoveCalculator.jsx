import React, { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';

// Custom CSS for 3D effects
const threeDStyles = `
  .perspective-1000 { perspective: 1000px; }
  .preserve-3d { transform-style: preserve-3d; }
  .transform-gpu { transform: translateZ(0); }
  .rotate-x-12 { transform: rotateX(12deg); }
  .rotate-y-6 { transform: rotateY(6deg); }
  .rotate-x-6 { transform: rotateX(6deg); }
  .rotate-y-12 { transform: rotateY(12deg); }
  .rotate-y-0 { transform: rotateY(0deg); }
  .translate-z-4 { transform: translateZ(4px); }
  .translate-z-8 { transform: translateZ(8px); }
  .translate-z-12 { transform: translateZ(12px); }
  .translate-z-16 { transform: translateZ(16px); }
  .shadow-3xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotateY(0deg); }
    50% { transform: translateY(-20px) rotateY(180deg); }
  }
`;

const LoveCalculator = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [yourName, setYourName] = useState('');
  const [crushName, setCrushName] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleCalculate = () => {
    if (yourName && crushName) {
      setShowResult(true);
      setTimeout(() => {
        setCurrentScreen(3);
      }, 2000);
    }
  };

  const resetApp = () => {
    setCurrentScreen(1);
    setYourName('');
    setCrushName('');
    setShowResult(false);
  };

  const goToBirthdayWish = () => {
    setCurrentScreen(4);
  };

  const showGiftAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setCurrentScreen(5); // Photo collage animation page
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 flex items-center justify-center p-4">
      {/* Inject 3D CSS */}
      <style dangerouslySetInnerHTML={{ __html: threeDStyles }} />
      
      <div className="w-full max-w-md">
        {/* Screen 1 - Initial Message */}
        {currentScreen === 1 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center space-y-6">
              <div className="flex justify-center space-x-2 mb-6">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                  😉
                </div>
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Tere Liye Kuch Hai...
              </h1>
              
              <p className="text-gray-600 text-lg mb-2">
                Par batana risky hai... dekhoge to manoge nahi na? 😘
              </p>
              
              <div className="bg-gray-100 rounded-2xl p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">😊</span>
                  <Heart className="w-5 h-5 text-pink-500" fill="currentColor" />
                </div>
                <p className="text-gray-700">
                  Waise toh bohot kuch kehna tha... par suruaat karte hain yaha se 😍
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Bas dekhe jao... aur pyaar krte jao 😘
                </p>
              </div>
              
              <button 
                onClick={() => setCurrentScreen(2)}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Shuru Kare😊 ! 💕
              </button>
            </div>
          </div>
        )}

        {/* Screen 2 - Options */}
        {currentScreen === 2 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="text-center space-y-6">
              <div className="flex justify-center space-x-2 mb-6">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-pulse">
                  😉
                </div>
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Tere Liye Kuch Hai...
              </h1>
              
              <p className="text-gray-600 mb-6">
                Par batana risky hai... dekhoge to manoge nahi na? 😘
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setCurrentScreen(3)}
                  className="w-full bg-white border-2 border-pink-300 text-pink-600 py-4 px-6 rounded-2xl font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span className="text-xl">🤔</span>
                  <span>Dekhoge toh manoge nahi?</span>
                </button>
                
                <button 
                  onClick={() => setCurrentScreen(3)}
                  className="w-full bg-white border-2 border-pink-300 text-pink-600 py-4 px-6 rounded-2xl font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span className="text-xl">😅</span>
                  <span>Rehne do, darr lagta hai!</span>
                </button>
              </div>
              
              <div className="flex justify-center space-x-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center">
                    {i === 0 ? '😍' : i === 1 ? '🥰' : i === 2 ? '😘' : i === 3 ? '🤩' : '😋'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Screen 3 - Love Calculator */}
        {currentScreen === 3 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                <h1 className="text-2xl font-bold text-gray-800">Love Calculator</h1>
                <span className="text-2xl">📊</span>
              </div>
              
              <p className="text-sm text-gray-500 mb-6">
                Warning: Results may cause excessive giggling 😊
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-left text-gray-700 font-medium mb-2">
                    Your Name:
                  </label>
                  <input 
                    type="text"

                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    placeholder="Shee"
                    autoFocus
                    autoComplete="off"
                    spellCheck={false}
                    className="w-full p-4 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-200/50 text-lg font-medium transition-all duration-300"

                  />
                </div>
                
                <div>
                  <label className="block text-left text-gray-700 font-medium mb-2">
                    Mujhe Name:
                  </label>
                  <input 
                    type="text"
                    value={crushName}
                    onChange={(e) => setCrushName(e.target.value)}
                    placeholder="Shubha"
                    className="w-full p-4 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>
              
              <button 
                onClick={handleCalculate}
                disabled={!(yourName && crushName)}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                💕 Calculate Love
              </button>
              
              {showResult && (
                <div className="mt-6 space-y-4">
                  {/* Love Percentage Display */}
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-8 rounded-3xl shadow-2xl transform animate-bounce">
                    <div className="text-center">
                      <div className="text-6xl font-bold mb-2 animate-pulse">
                        98%
                      </div>
                      <p className="text-xl font-semibold mb-2">
                        💕 PERFECT MATCH! 💕
                      </p>
                      <div className="flex justify-center space-x-1 text-2xl">
                        ❤️💖💕💗💝
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="bg-white p-4 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 font-medium">Love Meter</span>
                      <span className="text-pink-500 font-bold">98%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-gradient-to-r from-pink-400 to-red-500 h-4 rounded-full animate-pulse" style={{width: '98%'}}></div>
                    </div>
                  </div>
                  

                  
                  <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300" onClick={goToBirthdayWish}>
                    <p className="font-semibold">
                      Proceed to Confession Chamber 🎭
                    </p>
                  </div>
                </div>
              )}
              
              <button 
                onClick={resetApp}
                className="text-pink-500 hover:text-pink-600 font-medium mt-4 transition-colors duration-300"
              >
                ← Back to Start
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart 
            key={i}
            className={`absolute text-pink-300 opacity-20 animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
            fill="currentColor"
          />
        ))}
      </div>
    </div>
  );
};

export default LoveCalculator;

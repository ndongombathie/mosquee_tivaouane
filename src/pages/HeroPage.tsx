import React from 'react';
import { Language } from '../App';
import { useNavigate } from 'react-router-dom';
import video from '../video/WhatsApp Vidéo 2025-09-01 à 09.03.37_6fcfbcf2.mp4'

interface Props {
  currentLanguage: Language;
}

const videoSrc = "/videos/mosque.mp4"; // Placez votre vidéo dans public/videos/mosque.mp4

const HeroPage: React.FC<Props> = ({ currentLanguage }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover blur-sm brightness-75"
        src={video}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/70 via-emerald-900/40 to-black/60">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg text-center animate-fade-in">
          {currentLanguage === 'fr' && "Bienvenue à la Grande Mosquée"}
          {currentLanguage === 'ar' && "مرحبا بكم في المسجد الكبير"}
          {currentLanguage === 'wo' && "Jàmm ci Mosquée bu Mag"}
          {currentLanguage === 'en' && "Welcome to the Grand Mosque"}
        </h1>
        <p className="text-white text-lg md:text-2xl mb-8 drop-shadow-lg text-center animate-fade-in delay-200">
          {currentLanguage === 'fr' && "Découvrez la spiritualité et l'architecture"}
          {currentLanguage === 'ar' && "اكتشف الروحانية والهندسة المعمارية"}
          {currentLanguage === 'wo' && "Xamle xel ak tabax"}
          {currentLanguage === 'en' && "Discover spirituality and architecture"}
        </p>
        <button
          className="px-8 py-4 bg-emerald-500 text-white rounded-full text-lg md:text-xl font-semibold shadow-xl hover:bg-emerald-600 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 animate-bounce"
          onClick={() => navigate('/virtual-tour')}
        >
          {currentLanguage === 'fr' && "Commence la visite"}
          {currentLanguage === 'ar' && "ابدأ الجولة"}
          {currentLanguage === 'wo' && "Tambali tur wi"}
          {currentLanguage === 'en' && "Start the tour"}
        </button>
      </div>
      {/* Animations CSS */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 1s ease forwards;
            opacity: 0;
          }
          .animate-fade-in.delay-200 {
            animation-delay: 0.2s;
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default HeroPage;

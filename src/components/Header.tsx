import React from 'react';
import { MapPin, Globe, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language } from '../App';

interface HeaderProps {
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
}

const translations = {
  fr: {
    home: 'Accueil',
    virtualTour: 'Visite Virtuelle',
    map: 'Carte',
    events: 'Événements',
    premium: 'Premium',
    title: 'Grande Mosquée de Tivaouane'
  },
  ar: {
    home: 'الرئيسية',
    virtualTour: 'جولة افتراضية',
    map: 'الخريطة',
    events: 'الأحداث',
    premium: 'بريميوم',
    title: 'المسجد الكبير بتيفاوان'
  },
  wo: {
    home: 'Kër',
    virtualTour: 'Yëngal bu njëkk',
    map: 'Karte',
    events: 'Taasu yi',
    premium: 'Premium',
    title: 'Juumaa bu mag bu Tivaouane'
  },
  en: {
    home: 'Home',
    virtualTour: 'Virtual Tour',
    map: 'Map',
    events: 'Events',
    premium: 'Premium',
    title: 'Great Mosque of Tivaouane'
  }
};

const Header: React.FC<HeaderProps> = ({ currentLanguage, setCurrentLanguage }) => {
  const t = translations[currentLanguage];
  
  const languages = [
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' },
    { code: 'wo' as Language, name: 'Wolof', flag: '🇸🇳' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-emerald-800" dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
                {t.title}
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              {t.home}
            </Link>
            <Link to="/virtual-tour" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              {t.virtualTour}
            </Link>
            <Link to="/map" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              {t.map}
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              {t.events}
            </Link>
            <Link to="/premium" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              {t.premium}
            </Link>
          </nav>

          {/* Language Selector */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">
                  {languages.find(lang => lang.code === currentLanguage)?.flag}
                </span>
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-emerald-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      currentLanguage === lang.code ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { Play, Star, Users, Globe } from 'lucide-react';
import { Language } from '../App';

interface HeroProps {
  currentLanguage: Language;
}

const translations = {
  fr: {
    title: 'Découvrez la Grande Mosquée de Tivaouane',
    subtitle: 'Un voyage spirituel et culturel à travers le patrimoine islamique du Sénégal',
    description: 'Explorez l\'histoire, l\'architecture et la spiritualité de ce lieu sacré grâce à notre plateforme interactive multilingue.',
    startTour: 'Commencer la visite',
    watchVideo: 'Voir la vidéo',
    stats: {
      visitors: 'Visiteurs virtuels',
      languages: 'Langues supportées',
      rating: 'Note moyenne'
    }
  },
  ar: {
    title: 'اكتشف المسجد الكبير بتيفاوان',
    subtitle: 'رحلة روحية وثقافية عبر التراث الإسلامي في السنغال',
    description: 'استكشف تاريخ وعمارة وروحانية هذا المكان المقدس من خلال منصتنا التفاعلية متعددة اللغات.',
    startTour: 'ابدأ الجولة',
    watchVideo: 'شاهد الفيديو',
    stats: {
      visitors: 'الزوار الافتراضيون',
      languages: 'اللغات المدعومة',
      rating: 'التقييم المتوسط'
    }
  },
  wo: {
    title: 'Gis Juumaa bu mag bu Tivaouane',
    subtitle: 'Yoon bu ruux ak bu aada ci diine Islam ci Senegaal',
    description: 'Xam-xam taariix, jëfandikoo ak ruuxa boole bii ak plateforme bu njëkk yi ñuy def.',
    startTour: 'Tampak yëngal',
    watchVideo: 'Xool widéo bi',
    stats: {
      visitors: 'Yëngalekat yu njëkk',
      languages: 'Làkk yu njëkk',
      rating: 'Nota bu njëkk'
    }
  },
  en: {
    title: 'Discover the Great Mosque of Tivaouane',
    subtitle: 'A spiritual and cultural journey through Senegal\'s Islamic heritage',
    description: 'Explore the history, architecture and spirituality of this sacred place through our interactive multilingual platform.',
    startTour: 'Start Tour',
    watchVideo: 'Watch Video',
    stats: {
      visitors: 'Virtual visitors',
      languages: 'Languages supported',
      rating: 'Average rating'
    }
  }
};

const Hero: React.FC<HeroProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === 'ar';

  return (
    <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 ${isRTL ? 'text-right' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  {t.title}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {t.subtitle}
              </p>
              
              <p className="text-lg text-gray-500 leading-relaxed">
                {t.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <span className="flex items-center justify-center space-x-3">
                  <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span>{t.startTour}</span>
                </span>
              </button>
              
              <button className="group border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <span className="flex items-center justify-center space-x-3">
                  <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span>{t.watchVideo}</span>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">15K+</div>
                <div className="text-sm text-gray-600">{t.stats.visitors}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
                <div className="text-sm text-gray-600">{t.stats.languages}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <span className="text-3xl font-bold text-amber-500">4.9</span>
                  <Star className="w-6 h-6 text-amber-400 fill-current" />
                </div>
                <div className="text-sm text-gray-600">{t.stats.rating}</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg"
                alt="Grande Mosquée de Tivaouane"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="group bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-6 hover:bg-white/30 transition-all duration-300">
                  <Play className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-semibold text-gray-700">2,847 en ligne</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold text-white">Accessible mondialement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
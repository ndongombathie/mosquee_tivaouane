import React, { useState, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import { Camera, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import hall from '../images/hall.jpg'
import centre from '../images/centre.jpg'
import { Language } from '../App';

// Images pour chaque zone (remplacez par vos propres images locales si besoin)
const zoneImages = [
  hall, // Salle de prière principale
  centre,       // Minaret
  "https://images.unsplash.com/photo-1464983953574-0892a716854b",       // Cour intérieure
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",       // Mihrab
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",       // Bibliothèque
];

const translations = {
  fr: {
    title: 'Visite Virtuelle 360°',
    subtitle: 'Explorez chaque recoin de la Grande Mosquée',
    zones: [
      { name: 'Salle de prière principale', desc: "Lieu central pour les prières collectives." },
      { name: 'Minaret', desc: "Tour emblématique pour l'appel à la prière." },
      { name: 'Cour intérieure', desc: "Espace ouvert pour la communauté." },
      { name: 'Mihrab', desc: "Niche indiquant la direction de la Mecque." },
      { name: 'Bibliothèque', desc: "Lieu de savoir et d'étude." }
    ],
    explore: "Explorer",
    info: "Informations sur le lieu"
  },
  ar: {
    title: 'جولة افتراضية 360°',
    subtitle: 'استكشف كل زاوية من المسجد الكبير',
    zones: [
      { name: 'قاعة الصلاة الرئيسية', desc: "المكان المركزي للصلاة الجماعية." },
      { name: 'المئذنة', desc: "برج مميز للأذان." },
      { name: 'الفناء الداخلي', desc: "مساحة مفتوحة للمجتمع." },
      { name: 'المحراب', desc: "مكان يحدد اتجاه مكة." },
      { name: 'المكتبة', desc: "مكان للعلم والدراسة." }
    ],
    explore: "استكشاف",
    info: "معلومات عن المكان"
  },
  wo: {
    title: 'Yëngal 360°',
    subtitle: 'Gis bépp kaw ci Juumaa bi',
    zones: [
      { name: 'Kër jumma bu mag', desc: "Fenn bu mag ngir jëmm." },
      { name: 'Minare', desc: "Tur bu mag ngir woy." },
      { name: 'Kaw bu ca biir', desc: "Kaw bu leer ngir askan wi." },
      { name: 'Mihrab', desc: "Niche ngir jëmm ci Maka." },
      { name: 'Biiblioteek', desc: "Fenn bu xam-xam ak jàng." }
    ],
    explore: "Wone",
    info: "Xibaar ci fenn bi"
  },
  en: {
    title: 'Virtual Tour 360°',
    subtitle: 'Explore every corner of the Great Mosque',
    zones: [
      { name: 'Main prayer hall', desc: "Central place for collective prayers." },
      { name: 'Minaret', desc: "Iconic tower for the call to prayer." },
      { name: 'Inner courtyard', desc: "Open space for the community." },
      { name: 'Mihrab', desc: "Niche indicating the direction of Mecca." },
      { name: 'Library', desc: "Place of knowledge and study." }
    ],
    explore: "Explore",
    info: "Place information"
  }
};

function PanoramaSphere({ textureUrl }: { textureUrl: string }) {
  const texture = useTexture(textureUrl);
  return (
    <Sphere args={[2, 64, 64]} scale={2}>
      <meshBasicMaterial map={texture} side={2} />
    </Sphere>
  );
}

const VirtualTour: React.FC<{ currentLanguage: Language }> = ({ currentLanguage }) => {
  const [selectedZone, setSelectedZone] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === 'ar';

  // Ref pour le scroll horizontal
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fonction de scroll
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="virtual-tour" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-blue-50 min-h-screen mt-8">
      <div className="max-w-7xl mx-auto">
        {/* Titre et sous-titre */}
        <div className="text-center mb-12" dir={isRTL ? 'rtl' : 'ltr'}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-900 mb-3 tracking-tight">
            {t.subtitle}
          </h2>
          
        </div>

         {/* Vue panoramique du lieu sélectionné avec react-three-fiber */}
        <div className="relative  bg-gray-900 rounded-2xl overflow-hidden shadow-2xl max-w-full mx-auto" style={{ height: 600 }}>
          <Suspense fallback={<div className="flex items-center justify-center h-full text-white">Chargement...</div>}>
            <Canvas camera={{ position: [0, 0, 0.1], fov: 100 }}>
              <ambientLight intensity={0.7} />
              <PanoramaSphere textureUrl={zoneImages[selectedZone]} />
              <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} />
            </Canvas>
          </Suspense>
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md rounded-lg p-4">
            <h4 className="text-white font-semibold text-lg" dir={isRTL ? 'rtl' : 'ltr'}>
              {t.zones[selectedZone].name}
            </h4>
          </div>
          {/* Bouton info */}
          <button
            className="absolute top-6 right-6 bg-emerald-500/80 text-white p-3 rounded-full shadow-lg hover:bg-emerald-600 transition"
            onClick={() => setShowInfo(!showInfo)}
            title={t.info}
          >
            <Info className="w-5 h-5" />
          </button>
          {/* Panneau d'information */}
          {showInfo && (
            <div className="absolute top-24 right-6 bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-xl max-w-xs z-10">
              <h5 className="font-semibold text-emerald-800 mb-3" dir={isRTL ? 'rtl' : 'ltr'}>
                {t.zones[selectedZone].name}
              </h5>
              <p className="text-gray-700 text-sm leading-relaxed" dir={isRTL ? 'rtl' : 'ltr'}>
                {t.zones[selectedZone].desc}
              </p>
            </div>
          )}
        </div>

        {/* Liste horizontale scrollable des lieux */}
        <div className="relative mt-8">
          {/* Flèche gauche */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-emerald-100 border border-emerald-300 rounded-full p-2 shadow transition disabled:opacity-40"
            style={{ display: t.zones.length > 1 ? 'block' : 'none' }}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-emerald-700" />
          </button>
          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-2 px-10 scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {t.zones.map((zone, index) => (
              <div
              onClick={() => { setSelectedZone(index); setShowInfo(false); }}
                key={index}
                className={`min-w-[220px] max-w-xs group bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                  selectedZone === index ? 'border-emerald-500 scale-105' : 'border-transparent hover:scale-105 hover:border-emerald-300'
                }`}
              >
                <div className="relative h-40 w-full">
                  <img
                    src={zoneImages[index]}
                    alt={zone.name}
                    className="w-full h-full object-cover transition duration-300 group-hover:brightness-90"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-500/80 rounded-full p-2 shadow-lg">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-2 h-20">
                  <h4 className="text-base font-bold text-emerald-800">{zone.name}</h4>
                  <p className="text-gray-600 text-xs">{zone.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Flèche droite */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-emerald-100 border border-emerald-300 rounded-full p-2 shadow transition disabled:opacity-40"
            style={{ display: t.zones.length > 1 ? 'block' : 'none' }}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-emerald-700" />
          </button>
        </div>

       
      </div>
    </section>
  );
};

export default VirtualTour;
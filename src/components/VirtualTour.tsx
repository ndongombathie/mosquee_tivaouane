import React, { useRef } from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import hall from '../images/hall.jpg'
import centre from '../images/centre.jpg'
import { Language } from '../App';

// Nouvelle structure par catégorie
export const  categories = [
  {
    key: 'priere',
    fr: 'Espaces de prière',
    ar: 'أماكن الصلاة',
    wo: 'Fenn yu jëmm',
    en: 'Prayer spaces',
    lieux: [
      {id:"01crfr-vregtge564-verg84fr-wer2frfr-15rfafefqw-vwefwf897-efqwfeff84f9wf-fewfwfewf898-dzgwefwdc4dcSff-safcr3fr-fcvsffewfsdcdcf", name: { fr: 'Salle de prière principale', ar: 'قاعة الصلاة الرئيسية', wo: 'Kër jumma bu mag', en: 'Main prayer hall' }, desc: { fr: "Lieu central pour les prières collectives.", ar: "المكان المركزي للصلاة الجماعية.", wo: "Fenn bu mag ngir jëmm.", en: "Central place for collective prayers." }, img: hall }
    ]
  },
  {
    key: 'architecture',
    fr: 'Architecture',
    ar: 'الهندسة المعمارية',
    wo: 'Arkitektuur',
    en: 'Architecture',
    lieux: [
      {id:"0casf515-sfrefreferrf54651-vre889qeqwewfwe-csdfrttr78f-dvfb1684-dvfv654fqewf-vrf51vwefq", name: { fr: 'Minaret', ar: 'المئذنة', wo: 'Minare', en: 'Minaret' }, desc: { fr: "Tour emblématique pour l'appel à la prière.", ar: "برج مميز للأذان.", wo: "Tur bu mag ngir woy.", en: "Iconic tower for the call to prayer." }, img: centre },
      {id:"1f4azfefrvbgrt-sdfvstrrbfv-ver554cwf-sefrfsdf1654-aefrqwerwfwewfr-avaf16wedq-Qwerer5641-wewed51", name: { fr: 'Mihrab', ar: 'المحراب', wo: 'Mihrab', en: 'Mihrab' }, desc: { fr: "Niche indiquant la direction de la Mecque.", ar: "مكان يحدد اتجاه مكة.", wo: "Niche ngir jëmm ci Maka.", en: "Niche indicating the direction of Mecca." }, img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429" }
    ]
  },
  {
    key: 'espaces',
    fr: 'Espaces communs',
    ar: 'المساحات المشتركة',
    wo: 'Kaw yu askan wi',
    en: 'Community spaces',
    lieux: [
      {id:"0vgr18ogbkjopojp5-fr8vsfr6d5fv5edf-wefqwerrf61514e-xcvoiloiòp-vdfvf2e2bfdf54vf-fwefr6yfbfbjgbf-65132ddgertfgfhgf-dsffr86ef498grg-ffregfdv2dv8-sdfe6", name: { fr: 'Cour intérieure', ar: 'الفناء الداخلي', wo: 'Kaw bu ca biir', en: 'Inner courtyard' }, desc: { fr: "Espace ouvert pour la communauté.", ar: "مساحة مفتوحة للمجتمع.", wo: "Kaw bu leer ngir askan wi.", en: "Open space for the community." }, img: "https://images.unsplash.com/photo-1464983953574-0892a716854b" }
    ]
  },
  {
    key: 'savoir',
    fr: 'Savoir & étude',
    ar: 'العلم والدراسة',
    wo: 'Xam-xam ak jàng',
    en: 'Knowledge & study',
    lieux: [
      {id:"0vfe65kmpsw-ewtg156wf43frefq-fwef1wf6qwf18fvxdscdsvfeg1-qrds12vv1f3cvcfr-wqrwer1ds1ffr5wqew-f5f1w89wffew-rf5fwr98/w4", name: { fr: 'Bibliothèque', ar: 'المكتبة', wo: 'Biiblioteek', en: 'Library' }, desc: { fr: "Lieu de savoir et d'étude.", ar: "مكان للعلم والدراسة.", wo: "Fenn bu xam-xam ak jàng.", en: "Place of knowledge and study." }, img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca" }
    ]
  }
];

const VirtualTour: React.FC<{ currentLanguage: Language }> = ({ currentLanguage }) => {
  const navigate = useNavigate();
  const isRTL = currentLanguage === 'ar';

  // Scroll horizontal par catégorie
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scroll = (catKey: string, direction: 'left' | 'right') => {
    const ref = scrollRefs.current[catKey];
    if (ref) {
      const scrollAmount = 300;
      ref.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="virtual-tour" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-blue-50 min-h-screen mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12" dir={isRTL ? 'rtl' : 'ltr'}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-900 mb-3 tracking-tight">
            {/* ...titre selon langue... */}
            {currentLanguage === 'fr' && 'Visite Virtuelle 360°'}
            {currentLanguage === 'ar' && 'جولة افتراضية 360°'}
            {currentLanguage === 'wo' && 'Yëngal 360°'}
            {currentLanguage === 'en' && 'Virtual Tour 360°'}
          </h2>
          <p className="text-lg text-emerald-700">
            {/* ...sous-titre selon langue... */}
            {currentLanguage === 'fr' && 'Explorez chaque recoin de la Grande Mosquée'}
            {currentLanguage === 'ar' && 'استكشف كل زاوية من المسجد الكبير'}
            {currentLanguage === 'wo' && 'Gis bépp kaw ci Juumaa bi'}
            {currentLanguage === 'en' && 'Explore every corner of the Great Mosque'}
          </p>
        </div>

        {/* Catégories */}
        {categories.map(cat => (
          <div key={cat.key} className="mb-12">
            <h3 className="text-2xl font-bold text-emerald-800 mb-4" dir={isRTL ? 'rtl' : 'ltr'}>
              {cat[currentLanguage]}
            </h3>
            <div className="relative">
              {/* Flèche gauche */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-emerald-100 border border-emerald-300 rounded-full p-2 shadow transition disabled:opacity-40"
                style={{ display: cat.lieux.length > 1 ? 'block' : 'none' }}
                onClick={() => scroll(cat.key, 'left')}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-emerald-700" />
              </button>
              {/* Scroll container */}
              <div
                ref={el => (scrollRefs.current[cat.key] = el)}
                className="flex gap-6 overflow-x-auto pb-2 px-10 scroll-smooth"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {cat.lieux.map((lieu) => (
                  <div
                    key={lieu.id}
                    onClick={() => navigate(`/lieu/${cat.key}/${lieu.id}`)}
                    className="min-w-[220px] max-w-xs group bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 hover:scale-105 hover:border-emerald-300 cursor-pointer"
                  >
                    <div className="relative h-40 w-full">
                      <img
                        src={lieu.img}
                        alt={lieu.name[currentLanguage]}
                        className="w-full h-full object-cover transition duration-300 group-hover:brightness-90"
                      />
                      <div className="absolute top-3 left-3 bg-emerald-500/80 rounded-full p-2 shadow-lg">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="p-4 flex flex-col gap-2 h-20">
                      <h4 className="text-base font-bold text-emerald-800">{lieu.name[currentLanguage]}</h4>
                      <p className="text-gray-600 text-xs">{lieu.desc[currentLanguage]}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Flèche droite */}
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-emerald-100 border border-emerald-300 rounded-full p-2 shadow transition disabled:opacity-40"
                style={{ display: cat.lieux.length > 1 ? 'block' : 'none' }}
                onClick={() => scroll(cat.key, 'right')}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 text-emerald-700" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VirtualTour;
import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, ZoomIn, ZoomOut } from 'lucide-react';
import { Language } from '../App';

interface InteractiveMapProps {
  currentLanguage: Language;
}

const translations = {
  fr: {
    title: 'Carte Interactive de Tivaouane',
    subtitle: 'Localisez les mosquées et mausolées de la région',
    getDirections: 'Obtenir l\'itinéraire',
    openHours: 'Horaires d\'ouverture',
    contact: 'Contact',
    viewDetails: 'Voir les détails'
  },
  ar: {
    title: 'خريطة تيفاوان التفاعلية',
    subtitle: 'حدد موقع المساجد والأضرحة في المنطقة',
    getDirections: 'الحصول على الاتجاهات',
    openHours: 'ساعات العمل',
    contact: 'اتصال',
    viewDetails: 'عرض التفاصيل'
  },
  wo: {
    title: 'Karte bu njëkk bu Tivaouane',
    subtitle: 'Gis juumaa yi ak mausolée yi ci kaw bi',
    getDirections: 'Am yoon',
    openHours: 'Waxtu ubbi',
    contact: 'Jokkoo',
    viewDetails: 'Gis li ci biir'
  },
  en: {
    title: 'Interactive Map of Tivaouane',
    subtitle: 'Locate mosques and mausoleums in the region',
    getDirections: 'Get directions',
    openHours: 'Opening hours',
    contact: 'Contact',
    viewDetails: 'View details'
  }
};

const mosques = [
  {
    id: 1,
    name: 'Grande Mosquée de Tivaouane',
    lat: 14.9497,
    lng: -16.8267,
    type: 'mosque',
    description: 'Mosquée principale et centre spirituel de Tivaouane'
  },
  {
    id: 2,
    name: 'Mausolée de Serigne Abdou Aziz Sy',
    lat: 14.9480,
    lng: -16.8250,
    type: 'mausoleum',
    description: 'Lieu de recueillement et de pèlerinage'
  },
  {
    id: 3,
    name: 'Mosquée Serigne Babacar Sy',
    lat: 14.9510,
    lng: -16.8290,
    type: 'mosque',
    description: 'Mosquée historique du quartier'
  }
];

const InteractiveMap: React.FC<InteractiveMapProps> = ({ currentLanguage }) => {
  const [selectedMosque, setSelectedMosque] = useState<number | null>(null);
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === 'ar';

  return (
    <section id="map" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" dir={isRTL ? 'rtl' : 'ltr'}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
              {/* Map Placeholder with interactive elements */}
              <div className="relative h-[500px] bg-gradient-to-br from-emerald-100 to-blue-100">
                <img
                  src="https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg"
                  alt="Carte de Tivaouane"
                  className="w-full h-full object-cover opacity-80"
                />
                
                {/* Map Pins */}
                {mosques.map((mosque, index) => (
                  <button
                    key={mosque.id}
                    onClick={() => setSelectedMosque(mosque.id)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      selectedMosque === mosque.id ? 'scale-125' : 'hover:scale-110'
                    }`}
                    style={{
                      left: `${30 + index * 25}%`,
                      top: `${40 + index * 15}%`
                    }}
                  >
                    <div className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center ${
                      mosque.type === 'mosque' 
                        ? 'bg-emerald-600 hover:bg-emerald-700' 
                        : 'bg-amber-600 hover:bg-amber-700'
                    }`}>
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </button>
                ))}

                {/* Map Controls */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <button className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md hover:bg-white transition-colors">
                    <Navigation className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md hover:bg-white transition-colors">
                    <ZoomIn className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md hover:bg-white transition-colors">
                    <ZoomOut className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {mosques.map((mosque) => (
                <div
                  key={mosque.id}
                  className={`bg-white rounded-xl p-6 shadow-lg transition-all duration-300 cursor-pointer ${
                    selectedMosque === mosque.id 
                      ? 'ring-2 ring-emerald-500 shadow-xl' 
                      : 'hover:shadow-xl hover:-translate-y-1'
                  }`}
                  onClick={() => setSelectedMosque(mosque.id)}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      mosque.type === 'mosque' ? 'bg-emerald-100' : 'bg-amber-100'
                    }`}>
                      <MapPin className={`w-6 h-6 ${
                        mosque.type === 'mosque' ? 'text-emerald-600' : 'text-amber-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {mosque.name}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4">
                        {mosque.description}
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{t.openHours}: 5h00 - 22h00</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Phone className="w-4 h-4" />
                          <span>{t.contact}: +221 33 955 10 10</span>
                        </div>
                      </div>

                      <div className="flex space-x-3 mt-4">
                        <button className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                          {t.getDirections}
                        </button>
                        <button className="flex-1 border border-emerald-600 text-emerald-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors">
                          {t.viewDetails}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
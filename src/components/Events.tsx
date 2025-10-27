import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Users, Filter } from 'lucide-react';
import { Language } from '../App';
import axios from '../utils/axios';
import { log } from 'three/tsl';

interface EventsProps {
  currentLanguage: Language;
}

const translations = {
  fr: {
    title: 'Événements et Conférences',
    subtitle: 'Suivez les activités spirituelles et culturelles',
    upcoming: 'À venir',
    past: 'Passés',
    all: 'Tous',
    register: 'S\'inscrire',
    watchReplay: 'Voir le replay',
    filterBy: 'Filtrer par',
    date: 'Date',
    participants: 'participants'
  },
  ar: {
    title: 'الأحداث والمؤتمرات',
    subtitle: 'تابع الأنشطة الروحية والثقافية',
    upcoming: 'القادمة',
    past: 'الماضية',
    all: 'الكل',
    register: 'التسجيل',
    watchReplay: 'مشاهدة الإعادة',
    filterBy: 'فلترة حسب',
    date: 'التاريخ',
    participants: 'المشاركون'
  },
  wo: {
    title: 'Taasu yi ak Konferans yi',
    subtitle: 'Topp ligeey ruux ak aada yi',
    upcoming: 'Ñuy ñëw',
    past: 'Ñu dem',
    all: 'Lépp',
    register: 'Bind',
    watchReplay: 'Xool replay',
    filterBy: 'Fexe ak',
    date: 'Bès',
    participants: 'jëfandikukat'
  },
  en: {
    title: 'Events and Conferences',
    subtitle: 'Follow spiritual and cultural activities',
    upcoming: 'Upcoming',
    past: 'Past',
    all: 'All',
    register: 'Register',
    watchReplay: 'Watch replay',
    filterBy: 'Filter by',
    date: 'Date',
    participants: 'participants'
  }
};



const InteractiveMap: React.FC<any> = ({ currentLanguage }) => {
  const [filter, setFilter] = useState('all');
  const t = translations[currentLanguage];
  const [loading, setLoading] = useState<boolean>(true)
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => {
    axios.get('/evenements').then(response => {
      setEvents(response.data.data);
      setLoading(false);
    });
  }, []);
  console.log(events);
  
  const isRTL = currentLanguage === 'ar';

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.status === filter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(currentLanguage === 'ar' ? 'ar-SA' : 'fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" dir={isRTL ? 'rtl' : 'ltr'}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-xl p-2 inline-flex">
            {['all', 'upcoming', 'past'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  filter === filterType
                    ? 'bg-white text-emerald-600 shadow-md'
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                {t[filterType as keyof typeof t] as string}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {loading &&(
          <div className=" text-center h-full text-black">Chargement...</div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Event Image */}
              <div className="relative h-48 bg-gradient-to-br from-emerald-600 to-blue-600">
                <img
                  src={`/storage/images/${event.image}`}
                  alt={event.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Status Badge */}
                <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.status === 'upcoming'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {event.status === 'upcoming' ? t.upcoming : t.past}
                  </span>
                </div>

                {/* Event Type */}
                <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                    {event.type}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-amber-600" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                {/* Action Button */}
                
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Voir plus d'événements
          </button>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
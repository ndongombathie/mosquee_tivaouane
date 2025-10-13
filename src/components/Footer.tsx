import React from 'react';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Language } from '../App';

interface FooterProps {
  currentLanguage: Language;
}

const translations = {
  fr: {
    title: 'Grande Mosquée de Tivaouane',
    description: 'Centre spirituel et culturel au service de la communauté islamique',
    quickLinks: 'Liens rapides',
    contact: 'Contact',
    followUs: 'Suivez-nous',
    address: 'Tivaouane, Région de Thiès, Sénégal',
    email: 'contact@mosquee-tivaouane.sn',
    phone: '+221 33 955 10 10',
    copyright: '© 2025 Grande Mosquée de Tivaouane. Tous droits réservés.',
    links: {
      about: 'À propos',
      history: 'Histoire',
      events: 'Événements',
      donate: 'Faire un don',
      privacy: 'Confidentialité',
      terms: 'Conditions'
    }
  },
  ar: {
    title: 'المسجد الكبير بتيفاوان',
    description: 'مركز روحي وثقافي في خدمة المجتمع الإسلامي',
    quickLinks: 'روابط سريعة',
    contact: 'اتصال',
    followUs: 'تابعنا',
    address: 'تيفاوان، منطقة تييس، السنغال',
    email: 'contact@mosquee-tivaouane.sn',
    phone: '+221 33 955 10 10',
    copyright: '© 2025 المسجد الكبير بتيفاوان. جميع الحقوق محفوظة.',
    links: {
      about: 'حول',
      history: 'التاريخ',
      events: 'الأحداث',
      donate: 'تبرع',
      privacy: 'الخصوصية',
      terms: 'الشروط'
    }
  },
  wo: {
    title: 'Juumaa bu mag bu Tivaouane',
    description: 'Kër yallal ruux ak aada ci mbooloo Muslim',
    quickLinks: 'Lëkkaloo yu gaaw',
    contact: 'Jokkoo',
    followUs: 'Topp nu',
    address: 'Tivaouane, Région Thiès, Senegaal',
    email: 'contact@mosquee-tivaouane.sn',
    phone: '+221 33 955 10 10',
    copyright: '© 2025 Juumaa bu mag bu Tivaouane. Lépp droit na ko am.',
    links: {
      about: 'Ci biir',
      history: 'Taariix',
      events: 'Taasu yi',
      donate: 'Jox',
      privacy: 'Sutura',
      terms: 'Sarax yi'
    }
  },
  en: {
    title: 'Great Mosque of Tivaouane',
    description: 'Spiritual and cultural center serving the Islamic community',
    quickLinks: 'Quick links',
    contact: 'Contact',
    followUs: 'Follow us',
    address: 'Tivaouane, Thiès Region, Senegal',
    email: 'contact@mosquee-tivaouane.sn',
    phone: '+221 33 955 10 10',
    copyright: '© 2025 Great Mosque of Tivaouane. All rights reserved.',
    links: {
      about: 'About',
      history: 'History',
      events: 'Events',
      donate: 'Donate',
      privacy: 'Privacy',
      terms: 'Terms'
    }
  }
};

const Footer: React.FC<FooterProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === 'ar';

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold">{t.title}</h3>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              {t.description}
            </p>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">{t.followUs}</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div dir={isRTL ? 'rtl' : 'ltr'}>
            <h4 className="font-semibold mb-6">{t.quickLinks}</h4>
            <ul className="space-y-3">
              {Object.entries(t.links).map(([key, value]) => (
                <li key={key}>
                  <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div dir={isRTL ? 'rtl' : 'ltr'}>
            <h4 className="font-semibold mb-6">{t.contact}</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{t.address}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a href={`mailto:${t.email}`} className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  {t.email}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${t.phone}`} className="text-gray-300 hover:text-emerald-400 transition-colors text-sm">
                  {t.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm" dir={isRTL ? 'rtl' : 'ltr'}>
            {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
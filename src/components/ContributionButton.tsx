import React, { useState } from 'react';
import { Heart, X, CreditCard, Smartphone } from 'lucide-react';
import { Language } from '../App';

interface ContributionButtonProps {
  currentLanguage: Language;
}

const translations = {
  fr: {
    contribute: 'Contribuer',
    title: 'Soutenez la Grande Mosquée',
    subtitle: 'Votre contribution aide à préserver et développer ce patrimoine spirituel',
    amounts: ['10€', '25€', '50€', '100€'],
    custom: 'Montant personnalisé',
    methods: {
      card: 'Carte bancaire',
      mobile: 'Mobile Money'
    },
    donate: 'Faire un don',
    close: 'Fermer',
    impact: 'Votre don permettra de financer l\'entretien, les événements et le développement numérique de la mosquée.'
  },
  ar: {
    contribute: 'المساهمة',
    title: 'ادعم المسجد الكبير',
    subtitle: 'مساهمتك تساعد في الحفاظ على هذا التراث الروحي وتطويره',
    amounts: ['10€', '25€', '50€', '100€'],
    custom: 'مبلغ مخصص',
    methods: {
      card: 'بطاقة مصرفية',
      mobile: 'المال المحمول'
    },
    donate: 'تبرع',
    close: 'إغلاق',
    impact: 'سيساعد تبرعك في تمويل الصيانة والأحداث والتطوير الرقمي للمسجد.'
  },
  wo: {
    contribute: 'Joxe',
    title: 'Joxal Juumaa bi',
    subtitle: 'Sa joxe dafa mën a walllu ak yeneeni patrimoine ruux boobu',
    amounts: ['10€', '25€', '50€', '100€'],
    custom: 'Xaalis bu la bëgg',
    methods: {
      card: 'Carte bancaire',
      mobile: 'Mobile Money'
    },
    donate: 'Jox',
    close: 'Tëj',
    impact: 'Sa joxe dafa mën a jëfandikoo ci mettit, taasu yi ak yeneeni bu njëkk bu juumaa bi.'
  },
  en: {
    contribute: 'Contribute',
    title: 'Support the Great Mosque',
    subtitle: 'Your contribution helps preserve and develop this spiritual heritage',
    amounts: ['10€', '25€', '50€', '100€'],
    custom: 'Custom amount',
    methods: {
      card: 'Credit card',
      mobile: 'Mobile Money'
    },
    donate: 'Donate',
    close: 'Close',
    impact: 'Your donation will help fund maintenance, events and digital development of the mosque.'
  }
};

const ContributionButton: React.FC<ContributionButtonProps> = ({ currentLanguage }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const t = translations[currentLanguage];
  const isRTL = currentLanguage === 'ar';

  return (
    <>
      {/* Floating Contribution Button */}
      <button
        onClick={() => setShowModal(true)}
        className={`fixed bottom-6 ${isRTL ? 'right-6' : 'left-6'} z-50  bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}
      >
        <div className="flex items-center space-x-3">
          <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="font-semibold">{t.contribute}</span>
        </div>
      </button>

      {/* Contribution Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className=" bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center" dir={isRTL ? 'rtl' : 'ltr'}>
                <Heart className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{t.title}</h3>
                <p className="opacity-90">{t.subtitle}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
              {/* Amount Selection */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Montant</h4>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {t.amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`p-4 rounded-xl border-2 font-semibold transition-all duration-300 ${
                        selectedAmount === amount
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50'
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
                
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount('');
                  }}
                  placeholder={t.custom}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Méthode de paiement</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                      paymentMethod === 'card'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-emerald-600" />
                    <span className="font-medium text-gray-800">{t.methods.card}</span>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('mobile')}
                    className={`w-full flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                      paymentMethod === 'mobile'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <Smartphone className="w-6 h-6 text-emerald-600" />
                    <span className="font-medium text-gray-800">{t.methods.mobile}</span>
                  </button>
                </div>
              </div>

              {/* Impact Message */}
              <div className="bg-emerald-50 rounded-xl p-4">
                <p className="text-sm text-emerald-700 leading-relaxed">
                  {t.impact}
                </p>
              </div>

              {/* Donate Button */}
              <button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                {t.donate} {selectedAmount || customAmount}€
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContributionButton;
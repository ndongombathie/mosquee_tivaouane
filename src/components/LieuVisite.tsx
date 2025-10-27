import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';
import { Language } from '../App';

// ...importez les mêmes catégories que dans VirtualTour...
import axios from '../utils/axios';

function PanoramaSphere({ textureUrl, initialRotationY = Math.PI / 1.5 }: { textureUrl: string, initialRotationY: number }) { 
  console.log("textureUrl", textureUrl);
  
  const texture = useTexture(textureUrl);
  return (
    <Sphere args={[0.2, 64, 64]} scale={2} rotation={[0, initialRotationY, 0]}>
      <meshBasicMaterial map={texture} side={2} />
    </Sphere>
  );
}

const LieuVisite: React.FC<{ currentLanguage: Language }> = ({ currentLanguage }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { catKey, lieuid } = useParams();
  const navigate = useNavigate();
  const [lieu, setLieu] = useState<any>({});
  useEffect(() => {
  axios.get(`/lieus/${lieuid}`).then(response => {
    setLieu(response.data.data);
    setLoading(false)
    
  });
}, []);
console.log("les ides passe en parametre",catKey, lieuid);

console.log(lieu);
  
  const isRTL = currentLanguage === 'ar';

  // Trouver le lieu
  

  if (!lieu) return <div>Lieu introuvable</div>;

  return (
    <div
      className="fixed inset-0  z-[60] bg-black flex flex-col"
      style={{ minHeight: '100vh', minWidth: '100vw' }}
    >
      <button
        className="absolute top-2 left-6 flex items-center gap-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-full px-4 py-2 shadow-lg"
        onClick={() => navigate(-1)}
        style={{ zIndex: 10 }}
      >
        <ChevronLeft /> {currentLanguage === 'fr' ? 'Retour' : currentLanguage === 'ar' ? 'رجوع' : currentLanguage === 'wo' ? 'Delloo' : 'Back'}
      </button>
      <button
        className="absolute top-2 right-6 text-white bg-emerald-600 hover:bg-emerald-700 rounded-full p-2 shadow-lg"
        onClick={() => navigate(-1)}
        title="Fermer"
        style={{ zIndex: 10 }}
      >
        <X className="w-6 h-6" />
      </button>
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-white mb-3 mt-2" dir={isRTL ? 'rtl' : 'ltr'}>
          {lieu.name}
        </h2>
        <div className="w-full h-full flex items-center justify-center" style={{ minHeight: 0 }}>
          
          
         <Suspense fallback={loading && <div className="flex items-center justify-center h-full text-white">Chargement...</div>}>
            <Canvas
              camera={{ position: [0, 0, 0.1], fov: 100 }}
              style={{ width: '100vw', height: '100vh', background: 'black' }}
            >
              <ambientLight intensity={0.7} />
              <PanoramaSphere textureUrl={`/storage/images/${'hall2.jpg'}`} initialRotationY={Math.PI / 1.5} /> 
              <OrbitControls
                enableZoom={true}
                enablePan={true}
                autoRotate={false}
                minDistance={0.1} // distance minimale (empêche de sortir de la sphère)
                maxDistance={2.5} // distance maximale (évite de voir l'extérieur)
              />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default LieuVisite;

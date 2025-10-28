import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, X, RotateCcw, Maximize2, Info } from 'lucide-react';
import axios from '../utils/axios';

interface Language {
  code: string;
}

interface Lieu {
  id: string;
  name: string;
  image: string;
  description?: string;
}

function PanoramaSphere({ textureUrl, initialRotationY = Math.PI / 1.5 }: { textureUrl: string, initialRotationY: number }) { 
  const texture = useTexture(textureUrl);
  
  // Optimisation de la texture
  useEffect(() => {
    if (texture) {
      texture.needsUpdate = true;
    }
  }, [texture]);
  
  return (
    <Sphere args={[500, 64, 64]} scale={[-1, 1, 1]} rotation={[0, initialRotationY, 0]}>
      <meshBasicMaterial map={texture} side={2} toneMapped={false} />
    </Sphere>
  );
}

function CameraController({ onZoomChange }: { onZoomChange: (fov: number) => void }) {
  const { camera } = useThree();
  
  useEffect(() => {
    const handleWheel = () => {
      onZoomChange(camera.fov);
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [camera, onZoomChange]);
  
  return null;
}

const LieuVisite: React.FC<{ currentLanguage: Language }> = ({ currentLanguage }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { catKey, lieuid } = useParams();
  const navigate = useNavigate();
  const [lieu, setLieu] = useState<Lieu | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(75);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const controlsRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchLieu = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`/lieus/${lieuid}`);
        
        if (response.data && response.data.data) {
          setLieu(response.data.data);
        } else if (response.data) {
          setLieu(response.data);
        } else {
          throw new Error('Format de réponse invalide');
        }
        
      } catch (err: any) {
        console.error('Erreur détaillée:', err);
        
        let errorMessage = 'Erreur lors du chargement du lieu';
        
        if (err.response) {
          errorMessage = `Erreur ${err.response.status}: ${err.response.statusText}`;
        } else if (err.request) {
          errorMessage = 'Aucune réponse du serveur';
        } else {
          errorMessage = err.message;
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (lieuid) {
      fetchLieu();
    }
  }, [lieuid]);

  const handleZoom = (direction: 'in' | 'out') => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      const newFov = direction === 'in' 
        ? Math.max(30, camera.fov - 10) 
        : Math.min(100, camera.fov + 10);
      
      camera.fov = newFov;
      camera.updateProjectionMatrix();
      setZoomLevel(newFov);
    }
  };

  const handleReset = () => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      camera.fov = 95;
      camera.position.set(0, 0, 50);
      camera.updateProjectionMatrix();
      controlsRef.current.reset();
      setZoomLevel(75);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const isRTL = currentLanguage === 'ar';

  const getText = (key: string) => {
    const texts: any = {
      back: { fr: 'Retour', ar: 'رجوع', wo: 'Delloo', en: 'Back' },
      close: { fr: 'Fermer', ar: 'إغلاق', wo: 'Tëj', en: 'Close' },
      loading: { fr: 'Chargement du lieu...', ar: 'جاري التحميل...', wo: 'Dajale...', en: 'Loading...' },
      loadingTexture: { fr: 'Chargement de la texture...', ar: 'جاري تحميل الصورة...', wo: 'Dajale nataal...', en: 'Loading texture...' },
      notFound: { fr: 'Lieu introuvable', ar: 'المكان غير موجود', wo: 'Bees bi amul', en: 'Place not found' },
      zoomIn: { fr: 'Zoomer', ar: 'تكبير', wo: 'Gëna', en: 'Zoom in' },
      zoomOut: { fr: 'Dézoomer', ar: 'تصغير', wo: 'Wàññi', en: 'Zoom out' },
      reset: { fr: 'Réinitialiser', ar: 'إعادة تعيين', wo: 'Delloowaat', en: 'Reset' },
      info: { fr: 'Informations', ar: 'معلومات', wo: 'Xibaar', en: 'Information' },
      fullscreen: { fr: 'Plein écran', ar: 'ملء الشاشة', wo: 'Bëri lépp', en: 'Fullscreen' },
      pinchZoom: { fr: 'Pincez pour zoomer', ar: 'اضغط للتكبير', wo: 'Pinch ngir gëna', en: 'Pinch to zoom' },
      wheelZoom: { fr: 'Molette pour zoomer', ar: 'العجلة للتكبير', wo: 'Molette ngir gëna', en: 'Wheel to zoom' },
    };
    return texts[key]?.[currentLanguage] || texts[key]?.['fr'] || key;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-white text-xl">{getText('loading')}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center gap-4">
        <div className="text-white text-xl">❌ {error}</div>
        <button
          className="text-white bg-emerald-600 hover:bg-emerald-700 rounded-full px-6 py-3 transition-colors"
          onClick={() => navigate(-1)}
        >
          {getText('back')}
        </button>
      </div>
    );
  }

  if (!lieu) {
    return (
      <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center gap-4">
        <div className="text-white text-xl">{getText('notFound')}</div>
        <button
          className="text-white bg-emerald-600 hover:bg-emerald-700 rounded-full px-6 py-3 transition-colors"
          onClick={() => navigate(-1)}
        >
          {getText('back')}
        </button>
      </div>
    );
  }

  const imageUrl = `${import.meta.env.VITE_API_URL || ''}/storage/images/${lieu.image}`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[60] bg-black flex flex-col"
      style={{ minHeight: '100vh', minWidth: '100vw' }}
    >
      {/* Header avec titre */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            className="flex items-center gap-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-full px-4 py-2 shadow-lg transition-colors"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="w-5 h-5" /> 
            <span className="font-medium">{getText('back')}</span>
          </button>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center flex-1 mx-4" dir={isRTL ? 'rtl' : 'ltr'}>
            {lieu.name}
          </h2>
          
          <button
            className="text-white bg-emerald-600 hover:bg-emerald-700 rounded-full p-2 shadow-lg transition-colors"
            onClick={() => navigate(-1)}
            title={getText('close')}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Contrôles de navigation (sans zoom manuel) */}
      <div className="absolute right-[48%] top-[95%] -translate-y-1/2 flex flex-row gap-2 z-10">
        <button
          onClick={handleReset}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-colors"
          title={getText('reset')}
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        
        <button
          onClick={toggleFullscreen}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-colors"
          title={getText('fullscreen')}
        >
          <Maximize2 className="w-6 h-6" />
        </button>
        
        
      </div>

      

      {/* Canvas 3D */}
      <div className="w-full h-full flex items-center justify-center">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-white text-xl">{getText('loadingTexture')}</div>
          </div>
        }>
          <Canvas
            camera={{ position: [0, 0, 0.01], fov: 95 }}
            style={{ width: '100%', height: '100%', background: 'black' }}
            gl={{ 
              antialias: true, 
              alpha: false,
              powerPreference: 'high-performance'
            }}
          >
            <ambientLight intensity={1} />
            <PanoramaSphere textureUrl={imageUrl} initialRotationY={Math.PI / 0.7} /> 
            <OrbitControls
              ref={controlsRef}
              enableZoom={true}
              enablePan={false}
              autoRotate={false}
              rotateSpeed={-0.5}
              zoomSpeed={1.2}
              minDistance={50}
              maxDistance={100}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
              enableDamping={true}
              dampingFactor={0.05}
            />
            <CameraController onZoomChange={setZoomLevel} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
};

export default LieuVisite;
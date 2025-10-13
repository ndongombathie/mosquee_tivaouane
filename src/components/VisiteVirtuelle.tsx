import React, { useEffect, useRef, useState } from "react";
import "pannellum/build/pannellum.css";
import "pannellum/build/pannellum.js";

declare global {
  interface Window {
    pannellum: { 
      viewer(container: string | HTMLElement, initialConfig: unknown): unknown; 
    };
  }
}

const VisiteVirtuelle = ({image="/src/images/centre.jpg"}) => {
  console.log("Image reçue dans VisiteVirtuelle:", image);
  
  const viewerRef = useRef<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Définir les points d'intérêt avec leurs positions
  const pointsInteret = [
    { 
      id: "entree", 
      pitch: -10, 
      yaw: 0, 
      text: "Entrée principale",
      targetPitch: -5,
      targetYaw: 0,
      targetHfov: 140
    },
    { 
      id: "à gauche", 
      pitch: 0, 
      yaw: 90, 
      text: "à gauche",
      targetPitch: 0,
      targetYaw: 90,
      targetHfov: 140
    },
    { 
      id: "à droite", 
      pitch: 5, 
      yaw: 180, 
      text: "à droite",
      targetPitch: 0,
      targetYaw: 180,
      targetHfov: 140
    },
    { 
      id: "en haut", 
      pitch: -5, 
      yaw: 270, 
      text: "en haut",
      targetPitch: -10,
      targetYaw: 270,
      targetHfov: 140
    },
    { 
      id: "en bas", 
      pitch: 20, 
      yaw: 45, 
      text: "en bas",
      targetPitch: 15,
      targetYaw: 45,
      targetHfov: 140
    }
  ];

  // Fonction pour créer une transition fluide et rapide
  const naviguerVers = (targetYaw: number, targetPitch: number, targetHfov: number = 120, duree: number = 800) => {
    if (viewerRef.current) {
      viewerRef.current.lookAt(targetPitch, targetYaw, targetHfov, duree);
    }
  };

  // Fonction pour détruire le viewer existant
  const destroyViewer = () => {
    if (viewerRef.current) {
      try {
        viewerRef.current.destroy();
        viewerRef.current = null;
      } catch (error) {
        console.log("Erreur lors de la destruction du viewer:", error);
        viewerRef.current = null;
      }
    }
  };

  // Fonction pour initialiser le viewer
  const initializeViewer = () => {
    if (!image || !window.pannellum) return;

    setIsLoading(true);
    
    // Nettoyer le conteneur
    const container = document.getElementById("panorama");
    if (container) {
      container.innerHTML = '';
    }

    try {
      viewerRef.current = window.pannellum.viewer("panorama", {
        type: "equirectangular",
        panorama: image,
        autoLoad: true,
        autoRotate: 0,
        compass: true,
        northOffset: 0,
        
        // PARAMÈTRES POUR VISION PLUS ÉLOIGNÉE
        hfov: 140,
        minHfov: 60,
        maxHfov: 140,
        
        // Paramètres pour des mouvements plus fluides
        mouseZoom: true,
        keyboardZoom: true,
        friction: 0.1,
        
        // Vue initiale éloignée
        pitch: 0,
        yaw: 0,
        
        // Contrôles de zoom
        showZoomCtrl: true,
        showFullscreenCtrl: true,
        showControls: true
      });

      // Gérer les événements de chargement
      viewerRef.current.on('load', () => {
        console.log("Panorama chargé avec succès");
        setIsLoading(false);
      });

      viewerRef.current.on('error', (error) => {
        console.error("Erreur de chargement du panorama:", error);
        setIsLoading(false);
      });

    } catch (error) {
      console.error("Erreur lors de l'initialisation:", error);
      setIsLoading(false);
    }
  };

  // Effet principal qui se déclenche quand l'image change
  useEffect(() => {
    console.log("Image changée, rechargement du viewer...");
    
    // Détruire l'ancien viewer
    destroyViewer();
    
    // Attendre un peu avant de réinitialiser
    const timeoutId = setTimeout(() => {
      initializeViewer();
    }, 100);

    // Ajouter les raccourcis clavier
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!viewerRef.current) return;

      const point = pointsInteret.find((_, index) => 
        event.key === (index + 1).toString()
      );
      if (point) {
        naviguerVers(point.targetYaw, point.targetPitch, point.targetHfov || 120, 500);
      }
      
      // Raccourcis pour le zoom
      switch(event.key.toLowerCase()) {
        case 'z':
          if (viewerRef.current) {
            const currentHfov = viewerRef.current.getHfov();
            viewerRef.current.setHfov(Math.min(currentHfov + 10, 140));
          }
          break;
        case 'x':
          if (viewerRef.current) {
            const currentHfov = viewerRef.current.getHfov();
            viewerRef.current.setHfov(Math.max(currentHfov - 10, 60));
          }
          break;
        case 'r':
          if (viewerRef.current) {
            viewerRef.current.lookAt(0, 0, 120, 1000);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      clearTimeout(timeoutId);
      destroyViewer();
    };
  }, [image]); // Dépendance sur l'image - se déclenche à chaque changement

  // Interface de navigation avec boutons + contrôles de zoom
  const NavigationPanel = () => (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      background: 'rgba(0,0,0,0.8)',
      padding: '15px',
      borderRadius: '12px',
      color: 'white',
      minWidth: '200px',
      opacity: isLoading ? 0.5 : 1,
      pointerEvents: isLoading ? 'none' : 'auto'
    }}>
      
      {isLoading && (
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '15px',
          color: '#4CAF50',
          fontSize: '12px'
        }}>
          🔄 Chargement de l'image...
        </div>
      )}
      
      {/* Contrôles de zoom */}
      <div style={{ marginBottom: '15px', textAlign: 'center',zIndex:10 }}>
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
          <button
            onClick={() => {
              if (viewerRef.current) {
                const currentHfov = viewerRef.current.getHfov();                                                                                                  
                viewerRef.current.setHfov(Math.min(currentHfov + 15, 140));
              }
            }}
            style={{
              padding: '8px 12px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
            title="Vision plus éloignée (Z)"
            disabled={isLoading}
          >
            🔍- Éloigner
          </button>
          <button
            onClick={() => {
              if (viewerRef.current) {
                const currentHfov = viewerRef.current.getHfov();
                viewerRef.current.setHfov(Math.max(currentHfov - 15, 60));
              }
            }}
            style={{
              padding: '8px 12px',
              backgroundColor: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
            title="Vision plus proche (X)"
            disabled={isLoading}
          >
            🔍+ Rapprocher
          </button>
        </div>
        <button
          onClick={() => {
            if (viewerRef.current) {
              viewerRef.current.lookAt(0, 0, 120, 1000);
            }
          }}
          style={{
            width: '100%',
            marginTop: '5px',
            padding: '6px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '10px'
          }}
          title="Reset vue éloignée (R)"
          disabled={isLoading}
        >
          🏠 Vue d'ensemble
        </button>
      </div>

      <hr style={{ border: '1px solid rgba(255,255,255,0.2)', margin: '10px 0' }} />

      {/* Boutons de navigation */}
      {pointsInteret.map((point) => (
        <button
          key={point.id}
          onClick={() => naviguerVers(point.targetYaw, point.targetPitch, point.targetHfov || 120, 600)}
          style={{
            display: 'block',
            width: '100%',
            margin: '8px 0',
            padding: '10px 12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '12px',
            transition: 'all 0.3s',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              (e.target as HTMLButtonElement).style.backgroundColor = '#45a049';
              (e.target as HTMLButtonElement).style.transform = 'translateX(2px)';
            }
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#4CAF50';
            (e.target as HTMLButtonElement).style.transform = 'translateX(0px)';
          }}
          disabled={isLoading}
        >
          📍 {point.text}
        </button>
      ))}
      
      
    </div>
  );

  return (
    <div style={{ position: 'relative', width: "100%", height: "100vh" }}>
      <div id="panorama" style={{ width: "100%", height: "100vh" }}>
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            zIndex: 999
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔄</div>
            <div>Chargement du panorama...</div>
          </div>
        )}
      </div>
      <NavigationPanel />
      
      {/* Instructions initiales */}
      {!isLoading && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '20px',
          fontSize: '14px',
          zIndex: 1000,
          textAlign: 'center'
        }}>
          🔍 Utilisez la molette pour zoomer • Glissez pour naviguer
        </div>
      )}
    </div>
  );
};

export default VisiteVirtuelle;
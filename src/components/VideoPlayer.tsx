import React from "react";

const VideoPlayer: React.FC = () => {
  return (
    <div className="flex justify-center p-4">
      <video 
        controls 
        autoPlay 
        loop
        width="600"
        height="340"
        className="rounded-lg shadow-lg"
      >
        <source src="/src/video/WhatsApp Vidéo 2025-09-01 à 09.03.37_6fcfbcf2.mp4" type="video/mp4" />
        <p className="text-gray-600">
          Your browser does not support the video tag. Please try a different browser or 
          <a href="/src/video/WhatsApp Vidéo 2025-09-01 à 09.03.37_6fcfbcf2.mp4" className="text-blue-500 underline ml-1">
            download the video
          </a>.
        </p>
      </video>
    </div>
  );
};

export default VideoPlayer;
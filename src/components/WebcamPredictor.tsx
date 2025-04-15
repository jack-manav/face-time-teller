
import React, { useEffect, useRef, useState } from 'react';

interface Prediction {
  gender: string;
  age: number;
  confidence: number;
}

export const WebcamPredictor = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [predictions, setPredictions] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setIsLoading(false);
      }
    };

    startWebcam();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  // Simulate predictions (replace with actual ML model later)
  useEffect(() => {
    const interval = setInterval(() => {
      const mockPrediction: Prediction = {
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        age: Math.floor(Math.random() * 50) + 15,
        confidence: Math.random() * 0.3 + 0.7
      };
      setPredictions(mockPrediction);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-2xl mx-auto">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
          <div className="text-white text-lg">Loading camera...</div>
        </div>
      )}
      
      <div className="relative rounded-lg overflow-hidden shadow-xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full aspect-video object-cover"
        />
        
        {predictions && (
          <div className="absolute bottom-4 left-4 right-4 flex gap-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg flex-1">
              <div className="text-sm text-gray-600">Gender</div>
              <div className="text-xl font-semibold">{predictions.gender}</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg flex-1">
              <div className="text-sm text-gray-600">Age</div>
              <div className="text-xl font-semibold">{predictions.age} years</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg flex-1">
              <div className="text-sm text-gray-600">Confidence</div>
              <div className="text-xl font-semibold">{(predictions.confidence * 100).toFixed(1)}%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

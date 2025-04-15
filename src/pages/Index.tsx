
import { WebcamPredictor } from "@/components/WebcamPredictor";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Real-time Age & Gender Predictor
        </h1>
        <p className="text-center mb-8 text-gray-600">
          Point your camera at a face to get instant predictions
        </p>
        <WebcamPredictor />
      </div>
    </div>
  );
};

export default Index;

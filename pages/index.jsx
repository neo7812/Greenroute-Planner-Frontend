import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import MapCanvas from '../components/MapCanvas';
import RouteStats from '../components/RouteStats';
import Navbar from '../components/Navbar';

export default function Home() {
  const [location, setLocation] = useState(null);
  const [networkType, setNetworkType] = useState('unknown');
  const [routes, setRoutes] = useState([]);
  const [destination, setDestination] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setLocation({ lat: userLat, lng: userLng });
          setDestination({ lat: 20.9517, lng: 85.0985 }); 
          toast.success('Location fetched successfully!');
        },
        (error) => toast.error(`Geolocation error: ${error.message}`)
      );
    } else {
      toast.error('Geolocation not supported');
    }
  }, []);

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      setNetworkType(connection.effectiveType);
      connection.addEventListener('change', () => setNetworkType(connection.effectiveType));
    }
  }, []);

  const fetchRoutes = async () => {
    if (!location || !destination) {
      toast.error('Location or destination not available');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://greenroute-planner-backend.onrender.com/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start: location, end: destination }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${await response.text()}`);
      }
      const data = await response.json();
      console.log('Raw response data:', data);
      if (Array.isArray(data)) {
        setRoutes(data);
      } else {
        setRoutes([]);
        toast.error('Unexpected data format from server');
      }
      toast.success('Routes fetched successfully!');
    } catch (error) {
      console.error('Fetch error:', error.message);
      setRoutes([]);
      toast.error(`Failed to fetch routes due to server error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container">
        <p className="text-center mb-8 text-lg text-gray-600">Network: {networkType}</p>
        <motion.button
          onClick={fetchRoutes}
          className="bg-green-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mx-auto block font-medium transition duration-300 disabled:bg-green-400"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? 'Loading...' : 'Find Eco-Friendly Routes'}
        </motion.button>
        <motion.div
          className="mt-10 p-6 bg-white rounded-xl shadow-xl border border-green-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MapCanvas location={location} routes={routes} networkType={networkType} />
        </motion.div>
        <motion.div
          className="mt-10 p-6 bg-white rounded-xl shadow-xl border border-green-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RouteStats routes={routes} />
        </motion.div>
      </div>
    </div>
  );
}
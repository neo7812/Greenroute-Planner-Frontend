import { motion } from 'framer-motion';

export default function RouteStats({ routes }) {
  const safeRoutes = Array.isArray(routes) ? routes : [];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-green-800">Route Options</h2>
      <ul className="space-y-4">
        {safeRoutes.length > 0 ? (
          safeRoutes.map((route, index) => (
            <motion.li
              key={index}
              className="p-4 bg-green-50 rounded-lg shadow-md hover:bg-green-100 transition duration-300 border border-green-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <span className="font-medium text-green-800">{route.mode}</span>
              <span className="ml-2 text-gray-600">{route.distance.toFixed(2)}km</span>
              <span className="ml-2 text-green-600">CO2: {route.co2.toFixed(2)}kg</span>
            </motion.li>
          ))
        ) : (
          <motion.li
            className="p-4 text-gray-500 bg-gray-50 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            No routes available
          </motion.li>
        )}
      </ul>
    </div>
  );
}
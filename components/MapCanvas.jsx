import { useRef, useEffect } from 'react';

export default function MapCanvas({ location, routes, networkType }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const isLowQuality = networkType === 'slow-2g' || networkType === '2g';
    const width = isLowQuality ? 300 : 600;
    const height = isLowQuality ? 200 : 400;
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = 'lightblue';//
    ctx.fillRect(0, 0, width, height);

    if (location) {//check if location is provided
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.font = isLowQuality ? '10px Arial' : '12px Arial';
      ctx.fillText('You', width / 2 - 10, height / 2 - 10);
    }

    const destX = width / 1.5;
    const destY = height / 3;
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(destX, destY, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.fillText('Dest', destX - 10, destY - 10);

    if (routes.length > 0) {
      const lineWidth = isLowQuality ? 2 : 4;
      routes.forEach((route, index) => {
        const color = index === 0 ? 'green' : index === 1 ? 'blue' : 'orange';
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(destX, destY);
        ctx.stroke();

        ctx.fillStyle = 'black';
        ctx.font = isLowQuality ? '10px Arial' : '12px Arial';
        ctx.fillText(`${route.mode}: ${route.co2.toFixed(2)}kg CO2`, 10, 20 + (index * 20));
      });
    }
  }, [location, routes, networkType]);

  return <canvas ref={canvasRef} className="w-full h-auto border border-green-200 rounded-lg shadow-md" />;
}
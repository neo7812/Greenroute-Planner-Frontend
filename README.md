# GreenRoute Planner

## Overview
GreenRoute Planner is an eco-friendly route planning application designed to help users find sustainable travel options. It leverages modern web APIs to calculate routes with estimated CO2 emissions, promoting environmentally conscious commuting. The app features a responsive UI with route visualization and adapts to network conditions for optimal performance.


## Features
- **Geolocation API**: Retrieves the user's current location for route starting points.
- **Network Information API**: Optimizes map rendering based on network speed (e.g., low-quality for 2G).
- **OpenRouteService (ORS) API**: Calculates routes (e.g., 295km from 20.9077139, 83.1220074 to 20.9517, 85.0985) with CO2 estimates for Biking, Walking, and Car modes.
- **Canvas API**: Visualizes routes with colored lines and labels on an interactive map.
- **Responsive UI**: Built with Tailwind CSS, featuring a modern design and animations via Framer Motion.
- **Error Handling**: Includes fallback data and toast notifications for API failures.

## Tech Stack
- **Frontend**: Next.js , React , Tailwind CSS 
- **Backend**: Node.js, Express
- **Dependencies**: React Toastify 11.0.5, Framer Motion 12.23.5
- **Deployment**: Vercel (Frontend), Render (Backend)

## Installation

### Prerequisites
- Node.js (v22.12.0 or later)
- npm 
- Git

### Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/neo7812/Greenroute-Planner-Frontend.git
   cd Greenroute-Planner-Frontend
   git clone https://github.com/neo7812/Greenroute-Planner-Backend.git ../backend

   
2.  **Install Dependencies**
    a.For Frontend:
    ```bash
    cd Greenroute-Planner-Frontend
    npm install

   b.For Backend:
   ```bash
   cd ../backend
   npm install  
  
3. **Configure Environment**:

Create a .env file in the backend directory:

ORS_API_KEY=Your_ORS_API_Key
PORT=5000


4. **Run the Project**
:Start the Backend:bash

cd ../backend
npm start

Start the Frontend:bash

cd ../Greenroute-Planner-Frontend
npm run dev --port 3003



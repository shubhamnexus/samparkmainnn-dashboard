import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Annotation } from 'react-simple-maps';
import indiaStates from '../data/india-states.json';

interface IndiaMapProps {
  coveredDistricts: number;
  onHover: (district: { name: string; blocks: number; schools: number }) => void;
}

interface DistrictData {
  blocks: number;
  schools: number;
  covered: boolean;
}

// Haryana district data with coverage information
const districtData: Record<string, DistrictData> = {
  "Panchkula": { blocks: 8, schools: 120, covered: true },
  "Ambala": { blocks: 12, schools: 180, covered: true },
  "Yamunanagar": { blocks: 15, schools: 220, covered: false },
  "Kurukshetra": { blocks: 10, schools: 150, covered: true },
  "Kaithal": { blocks: 11, schools: 160, covered: false },
  "Karnal": { blocks: 14, schools: 200, covered: true },
  "Panipat": { blocks: 9, schools: 140, covered: true },
  "Sonipat": { blocks: 13, schools: 190, covered: true },
  "Rohtak": { blocks: 10, schools: 150, covered: false },
  "Jhajjar": { blocks: 8, schools: 130, covered: true },
  "Gurugram": { blocks: 16, schools: 250, covered: true },
  "Faridabad": { blocks: 15, schools: 230, covered: true },
  "Palwal": { blocks: 9, schools: 140, covered: false },
  "Nuh": { blocks: 8, schools: 120, covered: true },
  "Rewari": { blocks: 10, schools: 150, covered: true },
  "Mahendragarh": { blocks: 9, schools: 130, covered: false },
  "Charkhi Dadri": { blocks: 7, schools: 110, covered: true },
  "Bhiwani": { blocks: 12, schools: 180, covered: false },
  "Hisar": { blocks: 14, schools: 210, covered: true },
  "Fatehabad": { blocks: 11, schools: 160, covered: false },
  "Sirsa": { blocks: 13, schools: 190, covered: true },
  "Jind": { blocks: 12, schools: 170, covered: false }
};

// Pastel color palette matching the reference map
const COLORS = {
  COVERED: {
    DEFAULT: '#e7f5e9', // Light green
    HOVER: '#c8e6c9',
    BORDER: '#81c784'
  },
  NOT_COVERED: {
    DEFAULT: '#ffecb3', // Light yellow
    HOVER: '#ffe082',
    BORDER: '#ffd54f'
  }
};

// District center coordinates for labels
const districtCenters: Record<string, [number, number]> = {
  "Panchkula": [76.95, 30.6],
  "Ambala": [76.75, 30.25],
  "Yamunanagar": [77.15, 30.1],
  "Kurukshetra": [76.8, 29.85],
  "Kaithal": [76.4, 29.6],
  "Karnal": [76.9, 29.4],
  "Panipat": [76.85, 29.1],
  "Sonipat": [76.65, 28.8],
  "Rohtak": [76.45, 28.6],
  "Jhajjar": [76.6, 28.4],
  "Gurugram": [76.85, 28.2],
  "Faridabad": [77.25, 28.2],
  "Palwal": [77.15, 27.8],
  "Nuh": [76.85, 27.8],
  "Rewari": [76.4, 27.9],
  "Mahendragarh": [76.1, 28.0],
  "Charkhi Dadri": [76.15, 28.4],
  "Bhiwani": [75.8, 28.5],
  "Hisar": [75.7, 29.0],
  "Fatehabad": [75.4, 29.3],
  "Sirsa": [75.0, 29.5],
  "Jind": [76.3, 29.2]
};

export function IndiaMap({ coveredDistricts, onHover }: IndiaMapProps) {
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: [76.5, 29.0], // Centered on Haryana
    zoom: 8
  });
  const [tooltipContent, setTooltipContent] = useState("");
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  return (
    <div className="relative w-full h-[600px] bg-white rounded-xl overflow-hidden">
      {/* Map title and compass */}
      <div className="absolute top-4 left-4 z-10">
        <h2 className="text-2xl font-bold text-gray-800">HARYANA</h2>
        <h3 className="text-lg text-gray-600">DISTRICT MAP</h3>
      </div>
      
      <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.COVERED.DEFAULT, border: `1px solid ${COLORS.COVERED.BORDER}` }}></div>
            <span className="text-gray-700">Covered District</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.NOT_COVERED.DEFAULT, border: `1px solid ${COLORS.NOT_COVERED.BORDER}` }}></div>
            <span className="text-gray-700">Not Covered</span>
          </div>
        </div>
      </div>
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 6000,
          center: [76.5, 29.0] // Centered on Haryana
        }}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          maxZoom={12}
        >
          <Geographies geography={indiaStates}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const districtName = geo.properties.name;
                const isHaryanaDistrict = geo.properties.state === "Haryana";
                const district = districtData[districtName];

                if (!isHaryanaDistrict) return null;

                const colors = district?.covered ? COLORS.COVERED : COLORS.NOT_COVERED;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      if (district) {
                        setTooltipContent(
                          `${districtName}\nBlocks: ${district.blocks}\nSchools: ${district.schools}`
                        );
                        setActiveDistrict(districtName);
                        onHover({
                          name: districtName,
                          blocks: district.blocks,
                          schools: district.schools
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                      setActiveDistrict(null);
                    }}
                    style={{
                      default: {
                        fill: colors.DEFAULT,
                        stroke: "#ffffff",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: colors.HOVER,
                        stroke: "#ffffff",
                        strokeWidth: 1,
                        outline: "none",
                      },
                      pressed: {
                        fill: colors.HOVER,
                        stroke: "#ffffff",
                        strokeWidth: 1,
                        outline: "none",
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* District Labels */}
          {Object.entries(districtCenters).map(([name, coordinates]) => (
            <Annotation
              key={name}
              subject={coordinates}
              dx={0}
              dy={0}
              connectorProps={{}}
            >
              <text
                x={0}
                y={0}
                fontSize={8}
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="#4a4a4a"
              >
                {name}
              </text>
            </Annotation>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Hover tooltip */}
      {tooltipContent && (
        <div
          className="absolute bg-white p-3 rounded-lg shadow-lg border border-gray-200"
          style={{
            left: '50%',
            bottom: '20px',
            transform: 'translateX(-50%)',
            pointerEvents: 'none'
          }}
        >
          <div className="text-sm text-gray-700 whitespace-pre-line">
            {tooltipContent}
          </div>
        </div>
      )}

      {/* District details panel */}
      {activeDistrict && districtData[activeDistrict] && (
        <div className="absolute top-20 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-2">{activeDistrict}</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-600">Blocks:</span>
              <span className="text-sm font-medium text-gray-800">
                {districtData[activeDistrict].blocks}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-600">Schools:</span>
              <span className="text-sm font-medium text-gray-800">
                {districtData[activeDistrict].schools}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-600">Status:</span>
              <span className={`text-sm font-medium ${districtData[activeDistrict].covered ? 'text-green-600' : 'text-amber-600'}`}>
                {districtData[activeDistrict].covered ? 'Covered' : 'Not Covered'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Compass Rose */}
      <div className="absolute bottom-8 left-8 z-10">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <g transform="translate(30,30)">
            <circle r="25" fill="white" stroke="#666" strokeWidth="1"/>
            <path d="M 0,-25 L 5,-5 L -5,-5 Z" fill="#666"/>
            <text x="0" y="-15" textAnchor="middle" fontSize="10" fill="#666">N</text>
            <path d="M 25,0 L 5,5 L 5,-5 Z" fill="#666"/>
            <text x="15" y="0" textAnchor="middle" fontSize="10" fill="#666">E</text>
            <path d="M 0,25 L -5,5 L 5,5 Z" fill="#666"/>
            <text x="0" y="15" textAnchor="middle" fontSize="10" fill="#666">S</text>
            <path d="M -25,0 L -5,-5 L -5,5 Z" fill="#666"/>
            <text x="-15" y="0" textAnchor="middle" fontSize="10" fill="#666">W</text>
          </g>
        </svg>
      </div>
    </div>
  );
} 
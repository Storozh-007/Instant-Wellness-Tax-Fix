
export interface TaxJurisdiction {
  name: string;
  rate: number; // Total combined rate
  lat: number;
  lon: number;
  breakdown: {
    state: number;
    county: number;
    city?: number;
    special?: number;
  };
}

// Approximate centroids and rates for NY Counties (Simplified for the task)
// Source: NYS Department of Taxation and Finance (General knowledge)
export const NY_JURISDICTIONS: TaxJurisdiction[] = [
  {
    name: "New York City (Bronx, Kings, NY, Queens, Richmond)",
    rate: 0.08875,
    lat: 40.7128,
    lon: -74.0060,
    breakdown: { state: 0.04, city: 0.045, county: 0, special: 0.00375 }
  },
  {
    name: "Albany",
    rate: 0.08,
    lat: 42.6001,
    lon: -73.9662,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Allegany",
    rate: 0.085,
    lat: 42.2500,
    lon: -78.0000,
    breakdown: { state: 0.04, county: 0.045, special: 0 }
  },
  {
    name: "Broome",
    rate: 0.08,
    lat: 42.1596,
    lon: -75.8138,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Cattaraugus",
    rate: 0.08,
    lat: 42.2500,
    lon: -78.7500,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Cayuga",
    rate: 0.08,
    lat: 42.8333,
    lon: -76.5500,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Chautauqua",
    rate: 0.08,
    lat: 42.3000,
    lon: -79.4000,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Chemung",
    rate: 0.08,
    lat: 42.1333,
    lon: -76.8000,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Chenango",
    rate: 0.08,
    lat: 42.5333,
    lon: -75.6167,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Clinton",
    rate: 0.08,
    lat: 44.7333,
    lon: -73.6833,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Columbia",
    rate: 0.08,
    lat: 42.2500,
    lon: -73.6333,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Cortland",
    rate: 0.08,
    lat: 42.6000,
    lon: -76.0667,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Delaware",
    rate: 0.08,
    lat: 42.2000,
    lon: -74.9000,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Dutchess",
    rate: 0.08125,
    lat: 41.7667,
    lon: -73.7500,
    breakdown: { state: 0.04, county: 0.0375, special: 0.00375 }
  },
  {
    name: "Erie",
    rate: 0.0875,
    lat: 42.7500,
    lon: -78.7833,
    breakdown: { state: 0.04, county: 0.0475, special: 0 }
  },
  {
    name: "Essex",
    rate: 0.08,
    lat: 44.1167,
    lon: -73.7667,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Franklin",
    rate: 0.08,
    lat: 44.7167,
    lon: -74.3333,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Fulton",
    rate: 0.08,
    lat: 43.1167,
    lon: -74.4333,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Genesee",
    rate: 0.08,
    lat: 43.0000,
    lon: -78.1833,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Greene",
    rate: 0.08,
    lat: 42.2833,
    lon: -74.1333,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Hamilton",
    rate: 0.08,
    lat: 43.5333,
    lon: -74.5000,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Herkimer",
    rate: 0.0825,
    lat: 43.4167,
    lon: -74.9667,
    breakdown: { state: 0.04, county: 0.0425, special: 0 }
  },
  {
    name: "Jefferson",
    rate: 0.08,
    lat: 44.0500,
    lon: -75.9833,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Lewis",
    rate: 0.08,
    lat: 43.8000,
    lon: -75.4500,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Livingston",
    rate: 0.08,
    lat: 42.7333,
    lon: -77.7667,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Madison",
    rate: 0.08,
    lat: 42.9167,
    lon: -75.6667,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Monroe",
    rate: 0.08,
    lat: 43.1667,
    lon: -77.6667,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Montgomery",
    rate: 0.08,
    lat: 42.9167,
    lon: -74.4167,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Nassau",
    rate: 0.08625,
    lat: 40.7333,
    lon: -73.5833,
    breakdown: { state: 0.04, county: 0.0425, special: 0.00375 }
  },
  {
    name: "Niagara",
    rate: 0.08,
    lat: 43.3000,
    lon: -78.7667,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Oneida",
    rate: 0.0875,
    lat: 43.2333,
    lon: -75.4333,
    breakdown: { state: 0.04, county: 0.0475, special: 0 }
  },
  {
    name: "Onondaga",
    rate: 0.08,
    lat: 43.0000,
    lon: -76.1667,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Ontario",
    rate: 0.075,
    lat: 42.8500,
    lon: -77.2833,
    breakdown: { state: 0.04, county: 0.035, special: 0 }
  },
  {
    name: "Orange",
    rate: 0.08125,
    lat: 41.4000,
    lon: -74.3000,
    breakdown: { state: 0.04, county: 0.0375, special: 0.00375 }
  },
  {
    name: "Orleans",
    rate: 0.08,
    lat: 43.2500,
    lon: -78.2500,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Oswego",
    rate: 0.08,
    lat: 43.4667,
    lon: -76.1167,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Otsego",
    rate: 0.08,
    lat: 42.6333,
    lon: -75.0333,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Putnam",
    rate: 0.08375,
    lat: 41.4333,
    lon: -73.6500,
    breakdown: { state: 0.04, county: 0.04, special: 0.00375 }
  },
  {
    name: "Rensselaer",
    rate: 0.08,
    lat: 42.7167,
    lon: -73.5000,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Rockland",
    rate: 0.08375,
    lat: 41.1500,
    lon: -74.0333,
    breakdown: { state: 0.04, county: 0.04, special: 0.00375 }
  },
  {
    name: "Saratoga",
    rate: 0.08,
    lat: 43.1000,
    lon: -73.8667,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Schenectady",
    rate: 0.08,
    lat: 42.8500,
    lon: -74.0000,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Schoharie",
    rate: 0.08,
    lat: 42.6000,
    lon: -74.4500,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Schuyler",
    rate: 0.08,
    lat: 42.3833,
    lon: -76.8667,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Seneca",
    rate: 0.08,
    lat: 42.7833,
    lon: -76.8333,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "St. Lawrence",
    rate: 0.08,
    lat: 44.5000,
    lon: -75.0667,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Steuben",
    rate: 0.08,
    lat: 42.3333,
    lon: -77.3833,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Suffolk",
    rate: 0.08625,
    lat: 40.8667,
    lon: -72.8500,
    breakdown: { state: 0.04, county: 0.0425, special: 0.00375 }
  },
  {
    name: "Sullivan",
    rate: 0.08,
    lat: 41.7167,
    lon: -74.7667,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Tioga",
    rate: 0.08,
    lat: 42.1667,
    lon: -76.3000,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Tompkins",
    rate: 0.08,
    lat: 42.4500,
    lon: -76.5000,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Ulster",
    rate: 0.08,
    lat: 41.8500,
    lon: -74.2667,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Warren",
    rate: 0.07,
    lat: 43.5667,
    lon: -73.8500,
    breakdown: { state: 0.04, county: 0.03, special: 0 }
  },
  {
    name: "Washington",
    rate: 0.07,
    lat: 43.3167,
    lon: -73.4333,
    breakdown: { state: 0.04, county: 0.03, special: 0 }
  },
  {
    name: "Wayne",
    rate: 0.08,
    lat: 43.1500,
    lon: -77.0500,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Westchester",
    rate: 0.08375,
    lat: 41.1167,
    lon: -73.7833,
    breakdown: { state: 0.04, county: 0.04, special: 0.00375 }
  },
  {
    name: "Wyoming",
    rate: 0.08,
    lat: 42.7000,
    lon: -78.0833,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  },
  {
    name: "Yates",
    rate: 0.08,
    lat: 42.6667,
    lon: -77.1000,
    breakdown: { state: 0.04, county: 0.04, special: 0 }
  }
];

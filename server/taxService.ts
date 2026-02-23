
import { NY_JURISDICTIONS, TaxJurisdiction } from './tax_rates';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface TaxResult {
  composite_tax_rate: number;
  tax_amount: number;
  total_amount: number;
  breakdown: {
    state_rate: number;
    county_rate: number;
    city_rate: number;
    special_rates: number;
  };
  jurisdictions: {
    name: string;
  };
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}

export function calculateTax(coords: Coordinates, subtotal: number): TaxResult {
  let closestJurisdiction: TaxJurisdiction | null = null;
  let minDistance = Infinity;

  for (const jurisdiction of NY_JURISDICTIONS) {
    const distance = getDistanceFromLatLonInKm(
      coords.latitude,
      coords.longitude,
      jurisdiction.lat,
      jurisdiction.lon
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestJurisdiction = jurisdiction;
    }
  }

  if (!closestJurisdiction) {
    // Fallback to State Rate if something goes wrong (unlikely with the list)
    return {
      composite_tax_rate: 0.04,
      tax_amount: subtotal * 0.04,
      total_amount: subtotal * 1.04,
      breakdown: {
        state_rate: 0.04,
        county_rate: 0,
        city_rate: 0,
        special_rates: 0
      },
      jurisdictions: {
        name: "New York State (Fallback)"
      }
    };
  }

  const taxAmount = subtotal * closestJurisdiction.rate;
  const totalAmount = subtotal + taxAmount;

  return {
    composite_tax_rate: closestJurisdiction.rate,
    tax_amount: Number(taxAmount.toFixed(2)),
    total_amount: Number(totalAmount.toFixed(2)),
    breakdown: {
      state_rate: closestJurisdiction.breakdown.state,
      county_rate: closestJurisdiction.breakdown.county,
      city_rate: closestJurisdiction.breakdown.city || 0,
      special_rates: closestJurisdiction.breakdown.special || 0
    },
    jurisdictions: {
      name: closestJurisdiction.name
    }
  };
}

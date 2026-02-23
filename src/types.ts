
export interface Order {
  id: number;
  latitude: number;
  longitude: number;
  subtotal: number;
  timestamp: string;
  composite_tax_rate: number;
  tax_amount: number;
  total_amount: number;
  state_rate: number;
  county_rate: number;
  city_rate: number;
  special_rates: number;
  jurisdiction_name: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrderResponse {
  data: Order[];
  pagination: Pagination;
}

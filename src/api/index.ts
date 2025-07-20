export interface Theme {
  themeId: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  imageURL: string;
  brandInfo: { id: number; name: string; imageURL: string };
  price: { basicPrice: number; discountRate: number; sellingPrice: number };
}

export type RankingParams = {
  targetType?: string;
  rankType?: string;
};
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000' });

async function request<T>(url: string, params?: Record<string, string | undefined>): Promise<T> {
  const { data } = await api.get<{ data: T }>(url, { params });
  return data.data;
}

export function fetchThemes() {
  return request<Theme[]>('/api/themes');
}

export function fetchRanking(params: RankingParams) {
  return request<Product[]>('/api/products/ranking', params);
}

import axios from 'axios';

import type { Product } from '../types/product';

export const API_URL = 'http://localhost:3000/products'
console.log('API_URL:', API_URL);

export const getProducts = async () => axios.get<Product[]>(API_URL);
export const getProductById = async (id: string) => axios.get<Product>(`${API_URL}/${id}`);
export const createProduct = async (product: Product) => axios.post<Product>(API_URL, product);
export const updateProduct = async (id: string, product: Product) => axios.patch<Product>(`${API_URL}/${id}`, product);
export const deleteProduct = async (id: string) => axios.delete<void>(`${API_URL}/${id}`);
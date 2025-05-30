// src/services/baseService.ts
import apiClient from './apiClient';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function getAll<T>(url: string): Promise<T[]> {
    const res = await apiClient.get<T[]>(url);
    return res.data;
}

export async function post<T, R>(url: string, payload: T): Promise<R> {
    const res = await apiClient.post<R>(url, payload);
    return res.data;
}

export async function put<T>(url: string, payload: T): Promise<void> {
    const res = await apiClient.put(url, payload);
    if (res.status !== 200) throw new Error('Failed to update resource');
}

export async function del(url: string): Promise<void> {
    const res = await apiClient.delete(url);
    if (res.status !== 200) throw new Error('Failed to delete resource');
}
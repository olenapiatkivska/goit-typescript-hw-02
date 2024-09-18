import axios from 'axios';
import { Params, ResponseGetImages } from './components/App/App.types';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: 'Client-ID w9r6qYhrX5u7sUqV4uLPpcrVrMbk7uyDlQViiLHpSAU',
  },
});

export async function fetchImages(
  query: string,
  page: number,
): Promise<ResponseGetImages> {
  const params: Params = {
    query,
    page,
    per_page: 12,
  };

  const response = await unsplashApi.get<ResponseGetImages>('/search/photos', {
    params,
  });
  return response.data;
}

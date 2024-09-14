import axios from 'axios';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: 'Client-ID w9r6qYhrX5u7sUqV4uLPpcrVrMbk7uyDlQViiLHpSAU',
  },
});

export async function fetchImages(query, page) {
  const params = {
    query,
    page,
    per_page: 12,
  };

  const response = await unsplashApi.get('/search/photos', { params });
  return response.data;
}

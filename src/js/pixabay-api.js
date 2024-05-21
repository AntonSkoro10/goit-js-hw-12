import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const API_KEY = '43933435-35fbbd09623d667ed19d4c9fb'; 
const BASE_URL = 'https://pixabay.com/api/';

import axios from 'axios'

axios.defaults.baseURL = BASE_URL;

export async function fetchPhotos(query, page = 1, perPage = 20) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  };

  try {
    const response = await axios.get('', { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response.statusText || 'Error fetching data');
  }
}



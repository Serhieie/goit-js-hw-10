import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1';
const AXIOS_KEY = (axios.defaults.headers.common['x-api-key'] =
  'live_ajkKKGCAdKH3qvZSgLDIEw0l5R7CIvMW6b3ishmFFd9ltkpLVD67CQkbGGx5vnZO');
const container = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const select = document.querySelector('.breed-select');

export default { BASE_URL, container, loader, select };

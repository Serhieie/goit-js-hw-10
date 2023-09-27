import axios from 'axios';
import SlimSelect from 'slim-select';
import COMMONS from './commons.js';
import BASIC from './basic.js';
import Notiflix from 'notiflix';

function fetchBreedsToSelect() {
  return axios
    .get(`${COMMONS.BASE_URL}/breeds`)
    .then(response => {
      Notiflix.Notify.success(
        `Загрузка успішна! Завантажилося ${response.data.length} порід котів`,
        {
          position: 'center-top',
          width: '500px',
          fontFamily: 'Arial',
          fontSize: '18px',
          timeout: 3000,
          cssAnimationDuration: 300,
        }
      );
      const breeds = response.data;
      breeds.forEach(({ id, name }) => {
        BASIC.addOption(id, name);
      });
      new SlimSelect({
        select: '#beautify',
      });
      const firstBreedData = breeds[0];
      getCat(firstBreedData.id)
        .then(catData => BASIC.renderCatInfo(catData))
        .catch(error => BASIC.onFetchError(error));
    })
    .catch(error => {
      BASIC.onFetchError(error);
    });
}

function getCat(id) {
  return axios
    .get(`${COMMONS.BASE_URL}/images/search?breed_ids=${id}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response;
    });
}

export default { fetchBreedsToSelect, getCat };

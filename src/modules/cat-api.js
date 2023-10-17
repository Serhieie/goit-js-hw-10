import axios from 'axios';
import SlimSelect from 'slim-select';
import COMMONS from './commons.js';
import BASIC from './basic.js';
import Notiflix from 'notiflix';

async function fetchBreedsToSelect() {
  try {
    const response = await axios.get(`${COMMONS.BASE_URL}/breeds`);
    if (response.status === 200) {
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
    }
    const breeds = response.data;
    await breeds.forEach(({ id, name }) => {
      BASIC.addOption(id, name);
    });
    new SlimSelect({
      select: '#beautify',
      settings: {
        placeholderText: 'Оберіть породу кота',
        font: '20px',
      },
    });
    const firstBreedData = breeds[0];
    const getCatByID = await getCat(firstBreedData.id);
    // BASIC.renderCatInfo(getCatByID);
    return response;
  } catch (error) {
    BASIC.onFetchError(error);
  }
}

async function getCat(id) {
  try {
    const response = await axios.get(
      `${COMMONS.BASE_URL}/images/search?breed_ids=${id}`
    );
    return response;
  } catch (error) {
    return Notiflix.Notify.failure(`Невідома помилка, вибачте ${error}`);
  }
}

export default { fetchBreedsToSelect, getCat };

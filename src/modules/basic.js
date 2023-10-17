import Notiflix from 'notiflix';
import COMMONS from './commons.js';

function addOption(id, name) {
  const option = document.createElement('option');
  option.value = id;
  option.textContent = name;
  COMMONS.select.appendChild(option);
}

function renderCatInfo(imageData) {
  const {
    breeds: {
      0: { temperament, name, description },
    },
    url,
  } = imageData.data[0];
  const markup = `<div class="cat-info-container" style="height: 400px; display: flex;">
  <img class="for-basiclightbox" style="object-fit: cover;" src="${url}" alt ="${name}" width ="550"/>
    <div id="breed_text">
      <h2>${name}</h2>
      <p>${description}</p>
      <p><span class = "temperament" >Temperament: </span>${temperament}</p>
    </div>
  </div>`;
  COMMONS.loader.classList.add('is-hidden');
  return (COMMONS.container.innerHTML = markup);
}

function onFetchError(error) {
  const errorMarkup = `<div class="cat-info-container" style="height: 400px; display: flex;">
  <img class="for-basiclightbox" style="object-fit: cover;" src="https://animalhaven.org/hubfs/raw_assets/public/animal-haven/images/placeholder--cat.png" alt ="cat placeholder" width ="750"/>
  </div>`;
  if (Object.keys(error).length === 0) {
    Notiflix.Notify.failure(
      `Вибачте, але цього котика ми не можемо хавантажити!`,
      {
        position: 'center-top',
        width: '650px',
        fontFamily: 'Arial',
        fontSize: '18px',
        timeout: 3000,
        cssAnimationDuration: 300,
        messageMaxLength: 200,
      }
    );
    COMMONS.loader.classList.add('is-hidden');
    return (COMMONS.container.innerHTML = errorMarkup);
  } else {
    Notiflix.Notify.failure(`Невідома помилка, вибачте ${error}`);
    COMMONS.loader.classList.add('is-hidden');
    return (COMMONS.container.innerHTML = errorMarkup);
  }
}

function onloadMarkupFu() {
  const onloadMarkup = `<div class="cat-info-container" style="height: 400px; display: flex;">
  <img class="for-basiclightbox" style="object-fit: cover;" src="https://wallpapers.com/images/featured/cat-eyes-2xf0xus42z76qi28.jpg" alt ="cat placeholder" width ="750"/>
  </div>`;
  return (COMMONS.container.innerHTML = onloadMarkup);
}

export default { addOption, renderCatInfo, onFetchError, onloadMarkupFu };

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
  const markup = `<div class="cat-info-container">
    <img src="${url}" alt ="${name}" height ="350"/>
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
  Notiflix.Notify.failure(`Hey something going wrong! ${error}`, {
    position: 'center-top',
    width: '650px',
    fontFamily: 'Arial',
    fontSize: '18px',
    timeout: 3000,
    cssAnimationDuration: 300,
    messageMaxLength: 200,
  });
  COMMONS.loader.classList.add('is-hidden');
}

export default { addOption, renderCatInfo, onFetchError };

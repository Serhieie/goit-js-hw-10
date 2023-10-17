import 'slim-select/dist/slimselect.css';
import API from './modules/cat-api';
import COMMONS from './modules/commons.js';
import BASIC from './modules/basic.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

COMMONS.select.classList.add('is-hidden');

BASIC.onloadMarkupFu();
API.fetchBreedsToSelect();

setTimeout(() => {
  COMMONS.select.classList.remove('is-hidden');
  COMMONS.loader.classList.add('is-hidden');
}, 1500);

COMMONS.select.addEventListener('change', onChange);

function onChange(evt) {
  evt.preventDefault();
  COMMONS.loader.classList.remove('is-hidden');
  const selectedOption = evt.target.selectedOptions[0];
  API.getCat(selectedOption.value)
    .then(catData => {
      BASIC.renderCatInfo(catData);
      // let gallery = new SimpleLightbox('.gallery__link', {
      //   overlayOpacity: 1,
      //   closeText: '',
      //   maxZoom: 2,
      //   showCounter: false,
      // });
      BASIC.letGallery();
    })
    .catch(error => BASIC.onFetchError(error));
}

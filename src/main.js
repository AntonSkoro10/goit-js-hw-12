import {
    renderImages,
    clearGallery,
    showLoadMoreButton,
    hideLoadMoreButton,
    showEndOfResultsMessage
} from './js/render-functions.js';

import { fetchPhotos } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let currentPage = 1;
let currentQuery = '';

const form = document.querySelector('.search-form');
const galleryElement = document.querySelector('.gallery-list');
const loader = document.querySelector('.js-loader');
const loadMoreBtn = document.querySelector('.btn-loader-js');


document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', onSearch);
    loadMoreBtn.addEventListener('click', onLoadMore);
});


async function onSearch(event) {
  event.preventDefault();

  currentQuery = event.target.elements.keyboardSearch.value.trim();
  currentPage = 1;

  if (currentQuery === '') {
    clearGallery();
    event.target.reset();
    iziToast.error({
      title: 'Error',
      message: 'Search query cannot be empty!',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  loader.classList.remove('is-hidden');

  try {
    const { hits, totalHits } = await fetchPhotos(currentQuery, currentPage);
    if (hits.length === 0) {
      iziToast.show({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 2000,
        color: 'red'
      });
      loader.classList.add('is-hidden');
      return;
    }
    renderImages(hits);
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });

    if (hits.length < totalHits) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong, please try again later!',
      position: 'topRight',
      timeout: 2000,
    });
  } finally {
    event.target.reset();
    loader.classList.add('is-hidden');
  }
}

async function onLoadMore() {
  currentPage += 1;

  try {
    const { hits, totalHits } = await fetchPhotos(currentQuery, currentPage);
    renderImages(hits);

    const totalLoadedImages = document.querySelectorAll('.gallery-list .gallery-item').length;
    if (totalLoadedImages >= totalHits) {
      hideLoadMoreButton();
      showEndOfResultsMessage();
    } else {
      showLoadMoreButton();
    }

    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });

    scrollPage();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong, please try again later!',
      position: 'topRight',
      timeout: 2000,
    });
  }
}

function scrollPage() {
  const { height: cardHeight } = document.querySelector('.gallery-list').firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

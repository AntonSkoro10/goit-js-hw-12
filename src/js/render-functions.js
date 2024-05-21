import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const markupItem = images => {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        comments,
        views,
        downloads,
      }) => {
        return `
          <li class="gallery-item">
            <a href="${largeImageURL}" class="gallery-link">
              <img src="${webformatURL}" alt="${tags}" class="gallery-img">
            </a>
            <div class="small-content">
              <small class="text-likes">Likes: ${likes}</small>
              <small class="text-views">Views: ${views}</small>
              <small class="text-comments">Comments: ${comments}</small>
              <small class="text-downloads">Downloads: ${downloads}</small>
            </div>
          </li>`;
      }
    )
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
})

export function renderImages(images) {
  const gallery = document.querySelector('.gallery-list');
  gallery.insertAdjacentHTML('beforeend', markupItem(images));
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery-list');
  gallery.innerHTML = '';
}

export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.btn-loader-js');
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.btn-loader-js');
  loadMoreBtn.classList.add('is-hidden');
}

export function showEndOfResultsMessage() {
  const gallery = document.querySelector('.gallery-list');
  const message = `<p class="end-of-results">We're sorry, but you've reached the end of search results.</p>`;
  gallery.insertAdjacentHTML('beforeend', message);
}
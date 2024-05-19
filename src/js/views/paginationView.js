import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerCLick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, annd there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage, 'next');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage, 'previous');
    }
    // Other page
    if (curPage < numPages) {
      return (
        this._generateMarkupButton(curPage, 'next') +
        this._generateMarkupButton(curPage, 'previous')
      );
    }
    // Page 1, and there are NO other pages
    return '';
  }
  _generateMarkupButton(page, type) {
    if (type === 'previous') {
      return `
          <button data-goto=${
            page - 1
          } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
          </button>
      `;
    }
    if (type === 'next') {
      return `
          <button data-goto=${
            page + 1
          } class="btn--inline pagination__btn--next">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
  `;
    }
  }
}

export default new PaginationView();

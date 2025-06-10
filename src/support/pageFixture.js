// src/support/pageFixture.js

export class PageFixture {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  setPage(page) {
    this.page = page;
  }

  getPage() {
    return this.page;
  }

  setContext(context) {
    this.context = context;
  }

  setBrowser(browser) {
    this.browser = browser;
  }
}

export const pageFixture = new PageFixture();

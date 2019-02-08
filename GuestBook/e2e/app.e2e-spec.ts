import { GuestBookPage } from './app.po';

describe('guest-book App', () => {
  let page: GuestBookPage;

  beforeEach(() => {
    page = new GuestBookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

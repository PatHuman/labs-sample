import { GapeliPage } from './app.po';

describe('gapeli App', () => {
  let page: GapeliPage;

  beforeEach(() => {
    page = new GapeliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

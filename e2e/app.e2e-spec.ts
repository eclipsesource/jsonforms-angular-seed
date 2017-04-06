import { JsonformsAngularSeedPage } from './app.po';

describe('jsonforms-angular-seed App', () => {
  let page: JsonformsAngularSeedPage;

  beforeEach(() => {
    page = new JsonformsAngularSeedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

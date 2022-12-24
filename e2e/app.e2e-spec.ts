import { InstaShareTemplatePage } from './app.po';

describe('InstaShare App', function() {
  let page: InstaShareTemplatePage;

  beforeEach(() => {
    page = new InstaShareTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

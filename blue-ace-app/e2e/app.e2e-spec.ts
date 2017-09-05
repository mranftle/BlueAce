import { BlueAceAppPage } from './app.po';

describe('blue-ace-app App', () => {
  let page: BlueAceAppPage;

  beforeEach(() => {
    page = new BlueAceAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

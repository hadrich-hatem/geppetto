scenario('Test mocha with puppeteer', client => {
  test('shoud open the browser', () => client.open());
  test('shoud go to the Back office', () => client.accessToBo());
  test('shoud take a screenshot', () => client.screenshot());
}, 'common_client', true);
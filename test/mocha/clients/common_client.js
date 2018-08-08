const puppeteer = require('puppeteer');
const {globals} = require('../../globals.js');

let options = {
  timeout: 30000,
  headless: false,
  defaultViewport: {
    width: 0,
    height: 0
  },
  args:[`--window-size=${1280},${1024}`]
};

class CommonClient {

  async open () {
    this.browser = await puppeteer.launch(options);
    this.page = await this.browser.newPage();
  };

  async close () {
    await this.page.tracing.stop();
    await this.browser.close();
  }

  async accessToBo () {
    await this.page.tracing.start({
      path: 'test.json',
      categories: ['devtools.timeline']
    });
    await this.page.goto(global.URL + 'admin-dev');
    await this.page.setViewport({width: 0, height: 0});
    await this.page.waitFor('body').then(() => console.log('should check that the authentication page is well opened'));
  };

  async screenshot() {
    await this.page.screenshot({path: 'screenshot.png'});
  }
}

module.exports = CommonClient;

let CommonClient = require('../common_client');

class Product extends CommonClient {

  async getCombinationId(selector) {
    await this.waitFor(selector);
    const id = await page.$eval(selector, (el, attribute) => el.getAttribute(attribute), 'data');
    global.combinationId = id;
  }

  async getCombinationNumber(selector, wait = 0) {
    await this.waitFor(wait);
    await this.waitFor(selector);
    await page.$eval(selector, el => el.getElementsByTagName('tr').length).then((number) => {
      expect(number).to.be.greaterThan(0);
      global.productCombinationNumber = number;
    });
  }
}

module.exports = Product;
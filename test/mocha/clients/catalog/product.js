let CommonClient = require('../common_client');

class Product extends CommonClient {

  async getCombinationId(selector) {
    await this.waitFor(selector);
    const id = await page.$eval(selector, (el, attribute) => el.getAttribute(attribute), 'data');
    global.combinationId = id;
  }

  /**
   * This function allows to check the number of products after search in the Front Office
   * @param selector
   * @param numberToCheckWith
   * @param wait
   * @returns {Promise<void>}
   */
  async checkProductNumberInFO(selector, numberToCheckWith, wait) {
    await this.waitFor(wait);
    await this.waitFor(selector);
    const articleNumber = await page.$eval(selector, el => el.getElementsByTagName('article').length);
    await expect(articleNumber).to.equal(numberToCheckWith);
  }
}

module.exports = Product;
const authentication = require('../common_scenarios/authentication');
const product = require('../common_scenarios/catalog/product');
const {CommonBO} = require('../../selectors/BO/commonBO');
const {HomePage} = require('../../selectors/FO/homePage');
const {SearchProduct} = require('../../selectors/FO/SearchPage');
const {Menu} = require('../../selectors/BO/menu');

let productData = [{
  name: 'TestProduct1',
  reference: 'P10536',
  quantity: '30',
  type: 'standard',
  priceHT: '10',
  pictures: [
    '1.png',
    '2.jpg'
  ]
}, {
  name: 'TestProduct2',
  reference: 'P10536',
  quantity: '30',
  type: 'standard',
  priceHT: '10',
  pictures: [
    '1.png',
    '2.jpg'
  ]
}];

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10536
 */

scenario('PR-10536: Add customizations field in catalog whitelist', () => {
  authentication.signInBO('10536');
  for (let i = 0; i< productData.length; i++) {
    product.createProduct(productData[i]);
  }
  scenario('Go to the front office and check the result of search ', client => {
    test('should go to the "Dashboard" page', () => client.waitForAndClick(Menu.dashboard_menu, 2000));
    test('should go to the Front Office', () => client.accessToFO(CommonBO.shopname_link, 1, 6000));
    test('should go switch language to "English"', () => client.switchShopLanguageInFo('en'));
    test('should search for the created product', async() => {
      await client.waitForAndClick(HomePage.search_input, 2000);
      await client.waitForAndType(HomePage.search_input, 'Test', 2000);
      await client.waitForAndClick(HomePage.search_button, 2000);
    });
    test('should check the search result', () => client.checkProductNumberInFO(SearchProduct.product_result_list, 2, 2000));
    test('should go to the Back Office', () => client.switchWindow(0));
  }, 'catalog/product');
  product.deleteProductInBO(productData[0]);
  scenario('Check the result of search after deleting product', client => {
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should go switch language to "English"', () => client.switchShopLanguageInFo('en'));
    test('should search for the created product', async() => {
      await client.waitForAndClick(HomePage.search_input, 2000);
      await client.clearInputAndSetValue(HomePage.search_input, 'Test', 2000);
      await client.waitForAndClick(HomePage.search_button, 2000);
    });
    test('should check the search result', () => client.checkProductNumberInFO(SearchProduct.product_result_list, 1, 2000));
    test('should go to the Back Office', () => client.switchWindow(0));
  }, 'catalog/product');
  product.deleteProductInBO(productData[1]);
  authentication.signOutBO();
}, 'common_client', true);

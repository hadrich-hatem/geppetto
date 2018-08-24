const {HomePage} = require('../../selectors/FO/homePage');
const {SearchProduct} = require('../../selectors/FO/SearchPage');
const {Product} = require('../../selectors/FO/ProductPage');
const authentication = require('../common_scenarios/authentication');
const product = require('../common_scenarios/catalog/product');

let productData = {
  name: 'P1',
  reference: 'P8710',
  quantity: '12',
  priceHT: '20',
  type: 'standard',
  quantities: {
    availability: 'default'
  }
};

scenario('This scenario is based on the bug described on his PR: https://github.com/PrestaShop/PrestaShop/pull/9445', client => {
  authentication.signInBO('9445');

  product.createProduct(productData);

  scenario('Check order in the Front Office', client => {
    test('should go to the Front office', () => client.openShopURL());
    test('should search for the created product', async () => {
      await client.waitForAndType(HomePage.search_input, productData.name + global.dateTime);
      await client.keyboardPress('Enter');
    });
    test('should go to the searched product page', () => client.waitForAndClick(SearchProduct.product_result_name));
    test('should set the quantity wanted input to ' + productData.quantity, () => client.eval(Product.quantity_wanted_input, productData.quantity, 1000));
    test('should check that the "Add to cart" button is still enabled', () => client.isEnable(Product.add_to_cart_button));
    test('should check that the product availability message is empty', () => client.checkTextValue(Product.product_availability, ''));
  }, 'common_client');
}, 'common_client', true);

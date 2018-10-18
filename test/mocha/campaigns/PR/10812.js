const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');
const {HomePage} = require('../../selectors/FO/homePage');
const {SearchProduct} = require('../../selectors/FO/SearchPage');
const {ProductPageFO} = require('../../selectors/FO/productPage');

let combinationsReferences= {
  1: {
    id: '',
    reference: 'PR1'
  },
  2: {
    id: '',
    reference: 'PR2'
  },
  3: {
    id: '',
    reference: 'PR3'
  }
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10812
 */

scenario('PR-10812: Check the specific reference for each combination in the Front Office', () => {
  authentication.signInBO('10812');
  scenario('Edit the references of each combinations', client => {
    test('should go to "Catalog" page', async() => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu, 2000);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 2000);
    });
    test('should search for the product "Today is a good day Framed poster"', async() => {
      await client.clearInputAndSetValue(Catalog.filter_input.replace('%NAME', 'name'), "Today is a good day Framed poster", 2000, {visible: true});
      await client.waitForAndClick(Catalog.submit_filter_button, 1000);
    });
    test('should click on the product name link', () => client.waitForAndClick(Catalog.searched_product_link, 3000));
    test('should click on "Combinations" tab', async () => {
      await client.waitForAndClick(AddProduct.quantity_combination_tab, 1000);
      await client.getCombinationNumber(AddProduct.Combination.combination_table, 2000)
    });
    test('should set the "Combination\'s reference" input', async () => {
      for(let i = 1; i <= global.productCombinationNumber; i++) {
        await client.waitFor(3000);
        await client.getCombinationId(AddProduct.Combination.combination_tr.replace('%POS', i));
        await client.waitForAndClick(AddProduct.Combination.edit_combination_icon.replace('%ID', combinationId), 2000);
        await client.waitForAndSetValue(AddProduct.Combination.reference_input.replace('%ID', combinationId), combinationsReferences[i].reference,2000);
        await client.waitForAndClick(AddProduct.Combination.back_to_product_button.replace('%ID', combinationId), 2000).then(() => {
          combinationsReferences[i].id = combinationId;
        });
      }
    });
    test('should close the symfony toolbar', async () => {
      await client.isVisible(AddProduct.symfony_toolbar, 7000);
      if (visible) {
        await client.waitForAndClick(AddProduct.symfony_toolbar);
      }
    });
    test('should click on "Save" button', () => client.waitForAndClick(AddProduct.save_button, 3000));
    test('should check and close the green validation', async() => {
      await client.checkTextValue(AddProduct.validation_msg, 'Settings updated.');
      await client.waitForAndClick(AddProduct.close_validation_button);
    });
  }, 'catalog/product');
  authentication.signOutBO();
  scenario('Check the specific reference in the Front Office', client => {
    test('should go to the Front office', () => client.openShopURL());
    test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
    test('should search for the created product', async () => {
      await client.waitForAndType(HomePage.search_input, 'Today is a good day Framed poster');
      await client.keyboardPress('Enter');
    });
    test('should go to the searched product page', () => client.waitForAndClick(SearchProduct.product_result_name));
    test('should check that the product reference is well displayed', async () => {
      for (let i = 1; i <= global.productCombinationNumber; i++) {
        await client.waitForAndSelect(ProductPageFO.dimension_attribute_select, combinationsReferences[i].id);
        await client.waitForAndClick(ProductPageFO.list_tabs.replace('%POS', 2), 3000);
        await client.checkTextValue(ProductPageFO.product_reference_text, combinationsReferences[i].reference);
      }
    });
  }, 'common_client');
}, 'common_client', true);
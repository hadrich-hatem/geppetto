const {Menu} = require('../../selectors/BO/menu');
const {Catalog} = require('../../selectors/BO/Catalog/Products/catalog');
const authentication = require('../common_scenarios/authentication');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10217
 */
scenario('PR-10217: Check that all Bulk actions types successfuly work in "Product" page', () => {
  authentication.signInBO();
  scenario('Check all "Bulk actions" types', client => {
    test('should go to product page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitFor(1000);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu);
    });
    scenario('Check the "Deactivate" product', client => {
      test('should click on "Select all" checkbox', () => client.waitForAndClick(Catalog.select_all_checkbox, 2000));
      test('should click on "Bulk actions" button', () => client.waitForAndClick(Catalog.bulk_action_button, 2000));
      test('should click on "Deactivate selection" action', () => client.waitForAndClick(Catalog.deactivate_selection, 2000));
      test('should check that the first product is well deactivated', () => client.checkTextValue(Catalog.product_status_icon.replace('%ID', 1), 'clear', 'equal', 1000));
    }, 'common_client');
    scenario('Check the "Activate" product', client => {
      test('should click on "Select all" checkbox', () => client.waitForAndClick(Catalog.select_all_checkbox, 2000));
      test('should click on "Bulk actions" button', () => client.waitForAndClick(Catalog.bulk_action_button, 2000));
      test('should click on "Activate selection" action', () => client.waitForAndClick(Catalog.activate_selection, 2000));
      test('should check that the first product is well activated', () => client.checkTextValue(Catalog.product_status_icon.replace('%ID', 1), 'check', 'equal', 1000));
    }, 'common_client');
    scenario('Check the "Duplicate" product', client => {
      test('should click on "Select all" checkbox', () => client.waitForAndClick(Catalog.select_all_checkbox, 2000));
      test('should click on "Bulk actions" button', () => client.waitForAndClick(Catalog.bulk_action_button, 2000));
      test('should click on "Duplicate selection" action', () => client.waitForAndClick(Catalog.duplicate_selection, 2000));
      test('should search for a product by name that contains "Copy"', () => client.searchByValue(Catalog.product_filter_name_input, Catalog.product_search_button, 'Copy'));
      test('should check that the first product name contains "Copy"', () => client.checkTextValue(Catalog.product_name.replace('%ID', 1), 'Copy', 'contain', 1000));
      test('should click on "Reset" button', () => client.waitForAndClick(Catalog.product_reset_button, 2000));
    }, 'common_client');
    scenario('Check the "Delete" product', client => {
      test('should search for a product by name that contains "Copy"', () => client.searchByValue(Catalog.product_filter_name_input, Catalog.product_search_button, 'Copy'));
      test('should click on "Select all" checkbox', () => client.waitForAndClick(Catalog.select_all_checkbox, 2000));
      test('should click on "Bulk actions" button', () => client.waitForAndClick(Catalog.bulk_action_button, 2000));
      test('should click on "Delete selection" action', () => client.waitForAndClick(Catalog.delete_selection, 2000));
      test('should click on "Reset" button', () => client.waitForAndClick(Catalog.product_reset_button, 2000));
      test('should search for a product by name that contains "Copy"', () => client.searchByValue(Catalog.product_filter_name_input, Catalog.product_search_button, 'Copy'));
      test('should check that all product contains "Copy" successfuly deleted', () => client.checkTextValue(Catalog.no_records_found, 'There is no result for this search. Update your filters to view other products.', 'equal', 1000));
      test('should click on "Reset" button', () => client.waitForAndClick(Catalog.product_reset_button, 2000));
    }, 'common_client');
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);
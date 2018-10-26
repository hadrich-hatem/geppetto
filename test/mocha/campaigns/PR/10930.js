const authentication = require('../common_scenarios/authentication');
const trafficAndSeo = require('../common_scenarios/shopParameters/trafficAndSeo');
const importScenario = require('../common_scenarios/advancedParameters/import');

let filesData = ['first_product_import.csv', 'second_product_import.csv'];

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10930
 */
scenario('PR-10930: Check download simple file, available fields and confirmation modal in import page', () => {
  authentication.signInBO('10930');
  importScenario.importCSVProductFile('first_product_import.csv');
  authentication.signOutBO();
}, 'common_client', true);
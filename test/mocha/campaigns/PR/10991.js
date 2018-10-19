const authentication = require('../common_scenarios/authentication');
const onBoarding = require('../common_scenarios/onboarding');
const sqlQueryScenario = require('../common_scenarios/advancedParameters/database');
const {SqlManagerPage} = require('../../selectors/BO/advancedParameters/databasePage');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10991
 */

let sqlQueryData = [
  {
    name: 'shop' + dateTime,
    sql: 'select * from ps_shop;'
  },
  {
    name: 'product' + dateTime,
    sql: 'select * from ps_product;'
  }];

scenario('PR-10991: Check the sort of SQL query in database page', () => {
  authentication.signInBO('10991');
  onBoarding.closeOnBoardingModal();
  onBoarding.stopOnBoarding();
  for (let i = 0; i < sqlQueryData.length; i++) {
    sqlQueryScenario.createSqlQuery(sqlQueryData[i]);
  }
  sqlQueryScenario.sortSqlQuery(SqlManagerPage.sql_query_id, 'id_request');
  sqlQueryScenario.sortSqlQuery(SqlManagerPage.sql_query_name, 'name');
  sqlQueryScenario.sortSqlQuery(SqlManagerPage.sql_query, 'sql');
  sqlQueryScenario.deleteSqlQueryWithBulkAction(true);
  authentication.signOutBO();
}, 'common_client', true);
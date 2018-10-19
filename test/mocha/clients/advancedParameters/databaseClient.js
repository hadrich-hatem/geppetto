let CommonClient = require('../common_client');

global.elementsSortedTable = [];
global.elementsTable = [];

class Database extends CommonClient {

  async getTableField(element_list, i, sorted = false) {
    await this.waitFor(element_list.replace('%S', i + 1));
    await page.$eval(element_list.replace('%S', i + 1), el => el.innerText)
      .then(function (value) {
        if (sorted) {
          elementsSortedTable[i] = value.toLowerCase();
        }
        else {
          elementsTable[i] = value.toLowerCase();
        }
      });
  }

  async checkSortTable(sort_mode) {
    switch (sort_mode) {
      case "ASC": {
        expect(elementsTable.sort()).to.deep.equal(elementsSortedTable);
        break;
      }
      case "DESC": {
        expect(elementsTable.sort().reverse()).to.deep.equal(elementsSortedTable);
        break;
      }
    }
  }
}

module.exports = Database;
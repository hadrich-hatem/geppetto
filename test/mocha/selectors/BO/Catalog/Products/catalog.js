module.exports = {
  Catalog: {
    add_new_button: '#page-header-desc-configuration-add',
    catalog_actions: '#catalog-actions',
    bulk_action_button: '#product_bulk_menu',
    get activate_selection() {
      return this.catalog_actions + ' a[onclick*="activate_all"]';
    },
    get deactivate_selection() {
      return this.catalog_actions + ' a[onclick*="deactivate_all"]';
    },
    get duplicate_selection() {
      return this.catalog_actions + ' a[onclick*="duplicate_all"]';
    },
    get delete_selection() {
      return this.catalog_actions + ' a[onclick*="delete_all"]';
    },
    get select_all_checkbox() {
      return this.catalog_actions + ' div.md-checkbox > label';
    },
    products_table: 'form#product_catalog_list table',
    get product_name() {
      return this.products_table + ' tbody tr:nth-child(%ID) td:nth-child(4) > a';
    },
    get product_status_icon() {
      return this.products_table + ' tbody tr:nth-child(%ID) td:nth-child(9) i';
    },
    get product_filter_name_input() {
      return this.products_table + ' thead input[name="filter_column_name"]';
    },
    get no_records_found() {
      return this.products_table + ' tbody tr:nth-child(1) td:nth-child(1)';
    },
    get product_search_button() {
      return this.products_table + ' thead button[type="submit"]';
    },
    get product_reset_button() {
      return this.products_table + ' thead button[type="reset"]';
    },
  }
};

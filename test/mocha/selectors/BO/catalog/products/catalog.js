module.exports = {
  Catalog: {
    add_new_button: '#page-header-desc-configuration-add',
    filter_input: '#product_catalog_list  thead[class="with-filters"] input[name="filter_column_%NAME"]',
    submit_filter_button: '#product_catalog_list  thead[class="with-filters"] button[name="products_filter_submit"]',
    searched_product_link: '#product_catalog_list td:nth-child(4) > a',
    tools_button: '#catalog-tools-button',
    import_button: '#desc-product-import',
    dropdown_button: '#product_catalog_list div.btn-group button.product-edit',
    delete_button: '#product_catalog_list div.btn-group a.product-edit[onclick*= "delete"]',
    delete_now_modal_button: '#catalog_deletion_modal div.modal-footer button:nth-child(2)',
    reset_filter_button: '#product_catalog_list  thead[class="with-filters"] button[name="products_filter_reset"]'
  }
};

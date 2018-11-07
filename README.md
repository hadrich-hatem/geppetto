[![Prestashop](https://i.imgur.com/qDqeQ1E.png)](https://www.prestashop.com)

# **Geppetto** Functional Tests

## Summary

Geppetto functional tests are based on the following stack:

* [mocha](https://mochajs.org/)
* [chai](http://chaijs.com/)
* [puppeteer](https://pptr.dev/)
* [nodejs](https://nodejs.org/en/)
* [PageObject pattern](https://martinfowler.com/bliki/PageObject.html)

### Puppeteer

This project integrates Puppeteer and Mocha to create tests suits on PrestaShop Shop
Puppeteer Headless Chrome Project for real life use cases.

Interesting links to begin developing on Puppeteer:
Non-Regression test
project puppeteer
https://github.com/GoogleChrome/puppeteer
Puppeteer > API
https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#

### UI testing

projet differencify
https://github.com/NimaSoroush/differencify
differencify > API
https://github.com/NimaSoroush/differencify/blob/master/API.md

## How to install **Geppetto** project 
Clone this repo directly on your workspace.

```bash
git clone https://github.com/mbadrani/geppetto
cd geppetto
```

## Requirements

### Software needed

To run these tests you have to install

* [node.js](https://nodejs.org/en/download/), the minimum required version is 7.6 or greater
* [npm](https://www.npmjs.com/get-npm), the minimum required version is 6
* [mysql](https://www.mysql.com)

* Enable the user namespaces for Debian users

> Note:
> To enable the user namespaces in debian kernel you can run those commands: 

> 1) echo 'kernel.unprivileged_userns_clone=1' > /etc/sysctl.d/00-local-userns.conf
> 2) service procps restart

### Dependencies

To install npm dependencies you have to run this command:

```bash
npm install
```

### PrestaShop

Install **Prestashop** with the following requirements:
* Installation must be in **English** with setting country to **France** (or you may change some assertions like the separator “,” or “.”, “€” or “$” or “£” or …)
* A user in Back Office with **SuperAdmin** rights

## Tests suite

### Available command line parameters

| Parameter           | Description      |
|---------------------|----------------- |
| URL                 | URL of your PrestaShop website (default to **http://localhost/prestashop**) |
| LANG                | Language to install with (default to "en") |
| COUNTRY             | Country to install with (default to "france") |
| DB_SERVER           | DataBase server (default to "127.0.0.1") |
| DB_USER             | DataBase user (default to "root") |
| DB_PASSWD           | DataBase password (default to "doge") |
| RELEASE_TARGET      | Release version location directory (example: /var/www/html/) (default to '') |
| RELEASE_LINK        | Url of stable version to download (default to **https://download.prestashop.com/download/releases/prestashop_1.7.4.2.zip**) |
| ADMIN_FOLDER_NAME   | (Optional) Admin folder name (default to "admin-dev") |
| INSTALL_FOLDER_NAME | (Optional) Install folder name (default to "install-dev") |


#### Install test
If you want to run the Install test you can run the script **installPrestashop**

```
node test/not_mocha/installPrestashop.js --URL urlOfPrestashop \ 
                                         --LANG language \
                                         --COUNTRY country \
                                         --DB_SERVER dataBaseServer \
                                         --DB_USER dataBaseUsername \
                                         --DB_PASSWD dataBasePassword \
                                         --RELEASE_TARGET pathOfReleaseTarget \
                                         --RELEASE_LINK urlOfPrestashopRelease \
                                         --ADMIN_FOLDER_NAME adminFolderName \
                                         --INSTALL_FOLDER_NAME installFolderName
```

>Notes: If you want to run the Install test on release version you have to change the value of RELEASE_TARGET and this script will

> 1) Download a release
> 2) Copy the ZIP file in RELEASE_TARGET 
> 3) Extract the zip file to *prestashop* folder, 
> 3) Rename the folders admin to admin-dev and install to install-dev

#### All tests

If you want to run all the mocha PR tests you can run the campaign **PR**

```
npm run PR -- --URL='http://localhost/prestashop' --ADMIN_FOLDER_NAME adminFolderName
```

#### Specific test

If you want to run mocha test only on specific parts (for example PR 9095), you have to run this command:

```
TEST_PATH=PR/9095.js npm run specific-test -- --URL='http://localhost/prestashop' --ADMIN_FOLDER_NAME adminFolderName
```

Use `TEST_PATH` environment variable to specify which test you want to run.

If you want to run not mocha test only on specific parts (for example PR 8237), you have to run this command:

```
node test/not_mocha/PR/8237.js --URL 'http://localhost/prestashop' --ADMIN_FOLDER_NAME adminFolderName
```

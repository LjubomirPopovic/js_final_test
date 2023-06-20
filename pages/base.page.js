"use strict";

const {By} = require("selenium-webdriver");

module.exports = class BasePage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    driver() {
        return this.#driver;
    }

    getPageHeaderTitle() {
        return this.driver().findElement(By.tagName('h1')).getText();
    }

    getPageTitle() {
        return this.driver().findElement(By.tagName('h2')).getText()
    }

    async clickOnViewShoppingCartLink() {
        const linkShoppingCart = await this.driver().findElement(By.partialLinkText('shopping cart'));
        await linkShoppingCart.click();
    }

    getCurrentUrl() {
        return this.driver().getCurrentUrl();
    }

}
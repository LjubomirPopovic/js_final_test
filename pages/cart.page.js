"use strict";

const BasePage = require('./base.page');
const { By } = require("selenium-webdriver");

module.exports = class CartPage extends BasePage {

    getOrderRow(packageName) {
        const xpathOrderRow =  `//td[contains(., "${packageName}")]/parent::tr`;
        return this.driver().findElement(By.xpath(xpathOrderRow));
    }

    getOrderQuantity(orderRow) {
        return orderRow.findElement(By.xpath('td[2]'));
    }

    async clickEmptyShoppingCart() {
        await this.driver().get('http://test.qa.rs/cart/empty');
    }

    getCheckoutButton() {
        return this.driver().findElement(By.name('checkout'));
    }

    async clickOnCheckoutButton() {
        await this.getCheckoutButton().click();
    }
    getCurrentUrl() {
        return this.driver().getCurrentUrl();
    }
}
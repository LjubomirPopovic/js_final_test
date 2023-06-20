"use strict";

const {By} = require("selenium-webdriver");
const BasePage = require('./base.page');
module.exports = class HomePage extends BasePage {

    goToPage() {
        this.driver().get('http://test.qa.rs');
    }

    isBugListDivDisplayed() {
        return this.driver().findElement(
            By.xpath('//div[@class="row" and contains (., "ORDER NOW")]')).isDisplayed();
    }

    async clickOnRegisterLink () {
        const registerLink = await this.driver().findElement(By.linkText('Register'));
        await registerLink.click();
    }

/*    getSuccessAlertText() {
        return this.driver().findElement(By.className('alert alert-success')).getText();
    }*/

    getWelcomeBackTittle() {
        return this.driver().findElement(By.tagName('h2')).getText();
    }

    getLinkLogout() {
        return this.driver().findElement(By.partialLinkText('Logout'));
    }

    isLogoutLinkDisplayed() {
        return this.getLinkLogout().isDisplayed();
    }

    async clickOnLogoutLink() {
        await this.getLinkLogout().click();
    }

    getLinkLogin() {
        return this.driver().findElement(By.linkText('Login'));
    }

    isLoginLinkDisplayed() {
        return this.getLinkLogin().isDisplayed();
    }

    getPackageDiv(title) {
        const xPathPackage = `//h3[contains(text(), "${title}")]/ancestor::div[contains(@class, "panel")]`;
        return this.driver().findElement(By.xpath(xPathPackage));
    }

    getSideDishDropdown(packageDiv) {
        return packageDiv.findElement(By.name('side'));
    }

    getSideDishOptions(sideDishDropdown) {
        return sideDishDropdown.findElements(By.tagName('option'));
    }


    async getOrderButton(packageDiv) {
        return packageDiv.findElement(By.className('btn btn-success'));
    }

    async getInputQuantity() {
        return await this.driver().findElement(By.name('quantity'));
    }
}
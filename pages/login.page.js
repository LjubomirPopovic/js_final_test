"use strict"

const { By } = require('selenium-webdriver');
const BasePage = require('./base.page');

module. exports = class LoginPage extends BasePage {

    goToPage() {
        this.driver().get('http://test.qa.rs/login');
    }

    getLoginButton() {
        return this.driver().findElement(By.name('login'));
    }

    fillInputUsername(username) {
        this.driver().findElement(By.name('username')).sendKeys(username);
    }

    fillInputPassword(password) {
        this.driver().findElement(By.name('password')).sendKeys(password);
    }

    async clickLoginButton() {
        await this.getLoginButton().click();
    }
}
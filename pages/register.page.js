"use strict";

const { By } = require('selenium-webdriver');
const BasePage = require('./base.page');

module.exports = class RegisterPage extends BasePage {

    getRegisterButton() {
        return this.driver().findElement(By.name('register'));
    }

    getRegisterButtonValue() {
        return this.getRegisterButton().getAttribute('value');
    }

    async getInputFirstName() {
        const inputFirstName = await this.driver().findElement(By.name('firstname'));
        inputFirstName.sendKeys('Vasilije');
    }

    async getInputLastName() {
        const inputLastName = await this.driver().findElement(By.name('lastname'));
        inputLastName.sendKeys('Popovic');
    }

    async getInputEmail() {
        const inputEmail = await this.driver().findElement(By.name('email'));
        inputEmail.sendKeys('vasilije.popovic@example.local');
    }

    async getInputUsername() {
        const inputUsername = await this.driver().findElement(By.name('username'));
        inputUsername.sendKeys('vasilije.popovic');
    }
    async getInputPassword() {
        const inputPassword = await this.driver().findElement(By.name('password'));
        inputPassword.sendKeys('lozinka123');
    }

    async getInputPasswordConfirm() {
        const inputPasswordAgain = await this.driver().findElement(By.name('passwordAgain'));
        inputPasswordAgain.sendKeys('lozinka123');
    }
}
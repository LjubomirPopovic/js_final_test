"use strict";

require ('chromedriver');
const webdriver = require('selenium-webdriver');
const { By, Key, until } = require('selenium-webdriver');
const { assert, expect } = require('chai');
const HomePage = require('../pages/home.page');
const RegisterPage = require('../pages/register.page');
const LoginPage = require('../pages/login.page');
const CartPage = require('../pages/cart.page');
const CheckoutPage = require('..//pages/checkout.page');

describe('test.qa.rs tests', function () {
    let driver;
    let pageHomePage;
    let pageRegister;
    let pageLogin;
    let pageCart;
    let pageCheckout;


    const packageToAdd = 'double burger';
    const packageSideDish = 'mozzarella sticks';
    const packageQuantity = '2';

    before(function () {
        driver = new webdriver.Builder().forBrowser('chrome').build();
        pageHomePage = new HomePage(driver);
        pageRegister = new RegisterPage(driver);
        pageLogin = new LoginPage(driver);
        pageCart = new CartPage(driver);
        pageCheckout = new CheckoutPage(driver);
    });

    after(async function() {
        await driver.quit();
    });

    it('Verifies homepage is open', async function() {
        await pageHomePage.goToPage();
        const pageTitle = await pageHomePage.getPageHeaderTitle();
        expect(pageTitle).to.contain('QA FastFood');
        expect(await pageHomePage.isBugListDivDisplayed()).to.be.true;
    });

    it('Goes to registration page', async function() {
        await pageHomePage.clickOnRegisterLink();
        expect(await pageRegister.getRegisterButtonValue()).to.contain('Register');
        expect(await pageRegister.getCurrentUrl()).to.be.eq('http://test.qa.rs/register');
    });

    it('Successfully performs registration', async function() {
        await pageRegister.getInputFirstName();
        await pageRegister.getInputLastName();
        await pageRegister.getInputEmail();

        await pageRegister.getInputUsername();
        await pageRegister.getInputPassword();
        await pageRegister.getInputPasswordConfirm();

        await pageRegister.getRegisterButton().click();

        //expect(await pageHomePage.getSuccessAlertText()).to.contain('Sucess!');
    });

    it('Goes to login page and performs login', async function() {
        await pageLogin.goToPage();

        await pageLogin.fillInputUsername('vasilije.popovic');
        await pageLogin.fillInputPassword('lozinka123');

        await pageLogin.clickLoginButton();

        expect(await pageHomePage.getWelcomeBackTittle()).to.contain('Welcome back');
        expect(await pageHomePage.isLogoutLinkDisplayed()).to.be.true;
    });

    it('Empty shopping cart', async function() {
        await pageCart.clickEmptyShoppingCart();
    });

    it('Adds item(s) to cart', async function() {

        const packageDiv = await pageHomePage.getPackageDiv(packageToAdd);
        const sideDish = await pageHomePage.getSideDishDropdown(packageDiv);
        const options = await pageHomePage.getSideDishOptions(sideDish);

        await Promise.all(options.map(async function (option) {
           const text = await option.getText();

           if (text === packageSideDish) {
               await option.click();

               const selectedValue = await sideDish.getAttribute('value');
               expect(selectedValue).to.contain(packageSideDish);


               await pageHomePage.getInputQuantity().sendKeys(packageQuantity);
               const selectedValueQuantity = await sideDish.getAttribute('quantity');
               expect(selectedValueQuantity).to.contain(packageQuantity);


               const checkboxSelected = await driver.findElement(By.xpath('(//div[@class=\'col-sm-3 text-center\'])//input[@type=\'checkbox\']'));
               const isSelectedCheckbox = checkboxSelected.isSelected();

               if (isSelectedCheckbox === false)
               {
                   checkboxSelected.click();
               }

                await pageHomePage.getOrderButton(packageDiv, selectedValueQuantity, isSelectedCheckbox).click();
                expect(await driver.getCurrentUrl()).to.contain('http://test.qa.rs/order');
           }
        }));
        pageHomePage.goToPage();
    });

    it('Opens shopping cart', async function() {
        await pageHomePage.clickOnViewShoppingCartLink();

        expect(await pageCart.getCurrentUrl()).to.be.eq('http://test.qa.rs/cart');
        expect(await pageCart.getPageHeaderTitle()).to.contain('Order');

    });

    it('Verifies item(s) in cart', async function() {
        const orderRow = await pageCart.getOrderRow(packageToAdd.toUpperCase());
        const orderQuantity = await pageCart.getOrderQuantity(orderRow);

        expect(await orderQuantity.getText()).to.eq(packageToAdd);
    });

    it('Performs checkout', async function() {
        await pageCart.clickOnCheckoutButton();

        expect(await pageCheckout.getCurrentUrl()).to.be.eq('http://test.qa.rs/checkout');
        expect(await pageCheckout.getPageTitle()).to.contain('You have successfully placed your order.');
    });

    it('Performs logout', async function() {
        await pageHomePage.clickOnLogoutLink();
        expect(await pageHomePage.isLoginLinkDisplayed()).to.be.true;
    });
});
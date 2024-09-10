const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {

    it('should fill in the addresses for route', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        // note to reviewer: expect added to function - see page.js

    }),

    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    })
    it("should select supportive plan ", async () => {
        await browser.url(`/`);
        await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
        await page.selectSupportive();
        await expect ($(page.supportivePlanButton).parentElement()).toHaveElementClass("active");
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should save the credit card', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.addCard();
        await expect(await $(`${page.paymentCard}`)).toBeExisting();
    })

    it('should message the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.addCard();
        await expect(await $(`${page.paymentCard}`)).toBeExisting();
        await page.addMessageForDriver();
        const messageDriverField = await $(page.messageDriverField);
        await expect(await messageDriverField.getValue()).toEqual('Honk when you are here');
    
    })

    it('should add blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.addCard();
        await expect(await $(`${page.paymentCard}`)).toBeExisting();
        await page.addMessageForDriver()
        const messageDriverField = await $(page.messageDriverField);
        await expect(await messageDriverField.getValue()).toEqual('Honk when you are here');
        await page.ensureArrowIsOpen();
        await page.blanketsReq();
        //TO REVIEWER: expect is already written into the function itself

    
    })

    it('should add 2 ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.addCard();
        await expect(await $(`${page.paymentCard}`)).toBeExisting();
        await page.addMessageForDriver()
        const messageDriverField = await $(page.messageDriverField);
        await expect(await messageDriverField.getValue()).toEqual('Honk when you are here');
        await page.ensureArrowIsOpen();
        await page.ensureArrowIsOpen();
        await page.blanketsReq();
        await page.addTwoIceCreams();
        //TO REVIEWER: expect is already written into the function itself
    
    })
    it('should show car search modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.addCard();
        await expect(await $(`${page.paymentCard}`)).toBeExisting();
        await page.addMessageForDriver()
        const messageDriverField = await $(page.messageDriverField);
        await expect(await messageDriverField.getValue()).toEqual('Honk when you are here');
        await page.ensureArrowIsOpen();
        await page.blanketsReq();
        await page.addTwoIceCreams();
        await page.displayCarSearch();
        //TO REVIEWER: expect is already written into the function itself
    })

    it('should driver details after car is found', async () =>{
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.addCard();
        await expect(await $(`${page.paymentCard}`)).toBeExisting();
        await page.addMessageForDriver()
        const messageDriverField = await $(page.messageDriverField);
        await expect(await messageDriverField.getValue()).toEqual('Honk when you are here');
        await page.ensureArrowIsOpen();
        await page.blanketsReq();
        await page.addTwoIceCreams();
        await page.displayCarSearch();
        await browser.pause(41000);
        const carPlateNumber = await $(page.carPlateNumber);
        await expect(carPlateNumber).toBeExisting();

    })
    
})



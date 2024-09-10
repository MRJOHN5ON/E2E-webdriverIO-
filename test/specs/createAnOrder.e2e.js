const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
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
    })

    it('should message the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.addCard();
        await page.addMessageForDriver();
    
    })

    it('should add blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.addCard();
        await page.addMessageForDriver()
        await page.ensureArrowIsOpen();
        await page.blanketsReq();

    
    })

    it('should add 2 ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.addCard();
        await page.addMessageForDriver()
        await page.ensureArrowIsOpen();
        await page.blanketsReq();
        await page.addTwoIceCreams();

    
    })
    it('should show car search modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.addCard();
        await page.addMessageForDriver()
        await page.ensureArrowIsOpen();
        await page.blanketsReq();
        await page.addTwoIceCreams();
        await page.displayCarSearch();

    })

    it('should driver details after car is found', async () =>{
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        await page.addCard();
        await page.addMessageForDriver()
        await page.ensureArrowIsOpen();
        await page.blanketsReq();
        await page.addTwoIceCreams();
        await page.displayCarSearch();
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(4000);
        const carPlateNumber = await $(page.carPlateNumber);
        await carPlateNumber.waitForDisplayed;

    })
    
})



import { selectors, actions } from '../../page.js';

describe('Create an order', () => {
    beforeEach(async () => {
        await browser.url(`/`);
    });

    it('should fill in the addresses for route', async () => {
        await actions.fillAddresses('East 2nd Street, 601', '1300 1st St');
    });

    it('should open phone number modal', async () => {
        await actions.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(selectors.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(selectors.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    });

    it("should select supportive plan ", async () => {
        await actions.fillAddresses("East 2nd Street, 601", "1300 1st St");
        await actions.selectSupportive();
        await expect($(selectors.supportivePlanButton).parentElement()).toHaveElementClass("active");
    });

    it('should save the phone', async () => {
        await actions.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = actions.getPhoneNumber("+1");
        await actions.submitPhoneNumber(phoneNumber);
        await expect(await actions.getElementByText(phoneNumber)).toBeExisting();
    });

    it('should save the credit card', async () => {
        await actions.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = actions.getPhoneNumber("+1");
        await actions.submitPhoneNumber(phoneNumber);
        await expect(await actions.getElementByText(phoneNumber)).toBeExisting();
        await actions.addCard();
        await expect(await $(`${selectors.paymentCard}`)).toBeExisting();
    });

    it('should message the driver', async () => {
        await actions.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = actions.getPhoneNumber("+1");
        await actions.submitPhoneNumber(phoneNumber);
        await expect(await actions.getElementByText(phoneNumber)).toBeExisting();
        await actions.addCard();
        await expect(await $(`${selectors.paymentCard}`)).toBeExisting();
        await actions.addMessageForDriver();
        const messageDriverField = await $(selectors.messageDriverField);
        await expect(await messageDriverField.getValue()).toEqual('Honk when you are here');

    });

    it('should add blanket and handkerchiefs', async () => {
        await actions.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = actions.getPhoneNumber("+1");
        await actions.submitPhoneNumber(phoneNumber);
        await expect(await actions.getElementByText(phoneNumber)).toBeExisting();
        await actions.addCard();
        await expect(await $(`${selectors.paymentCard}`)).toBeExisting();
        await actions.addMessageForDriver()
        const messageDriverField = await $(selectors.messageDriverField);
        await expect(await messageDriverField.getValue()).toEqual('Honk when you are here');
        await actions.ensureArrowIsOpen();
        await actions.blanketsReq();
    });

    it('should add 2 ice creams', async () => {
        await actions.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = actions.getPhoneNumber("+1");
        await actions.submitPhoneNumber(phoneNumber);
        await expect(await actions.getElementByText(phoneNumber)).toBeExisting();
        await actions.addCard();
        await expect(await $(`${selectors.paymentCard}`)).toBeExisting();
        await actions.addMessageForDriver()
        const messageDriverField = await $(selectors.messageDriverField);
        await expect(await messageDriverField.getValue()).toEqual('Honk when you are here');
        await actions.ensureArrowIsOpen();
        await actions.ensureArrowIsOpen();
        await actions.blanketsReq();
        await actions.addTwoIceCreams();
    });

    it('should show car search modal', async () => {
        await actions.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = actions.getPhoneNumber("+1");
        await actions.submitPhoneNumber(phoneNumber);
        await expect(await actions.getElementByText(phoneNumber)).toBeExisting();
        await actions.addCard();
        await expect(await $(`${selectors.paymentCard}`)).toBeExisting();
        await actions.addMessageForDriver()
        const messageDriverField = await $(selectors.messageDriverField);
        await expect(await messageDriverField.getValue()).toEqual('Honk when you are here');
        await actions.ensureArrowIsOpen();
        await actions.blanketsReq();
        await actions.addTwoIceCreams();
        await actions.displayCarSearch();
    });

    it('should driver details after car is found', async () => {
        await actions.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = actions.getPhoneNumber("+1");
        await actions.submitPhoneNumber(phoneNumber);
        await expect(await actions.getElementByText(phoneNumber)).toBeExisting();
        await actions.addCard();
        await expect(await $(`${selectors.paymentCard}`)).toBeExisting();
        await actions.addMessageForDriver()
        const messageDriverField = await $(selectors.messageDriverField);
        await expect(await messageDriverField.getValue()).toEqual('Honk when you are here');
        await actions.ensureArrowIsOpen();
        await actions.blanketsReq();
        await actions.addTwoIceCreams();
        await actions.displayCarSearch();
        await browser.pause(41000);
        const carPlateNumber = await $(selectors.carPlateNumber);
        await expect(carPlateNumber).toBeExisting();
    });

});



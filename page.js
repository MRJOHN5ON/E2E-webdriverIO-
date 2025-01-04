
export const selectors = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField: '//*[@id="root"]/div/div[2]/div[2]/div[2]/form/div[1]/div[1]/div[2]',
    cvvField: '//*[@id="root"]/div/div[2]/div[2]/div[2]/form/div[1]/div[2]/div[2]/div[2]',
    messageDriverField: '#comment',

    // Buttons and elements
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[2]',
    supportivePlanButton: 'div=Supportive',
    addCardButton: '//*[@id="root"]/div/div[2]/div[2]/div[1]/div[2]/div[3]',
    linkCardButton: '//*[@id="root"]/div/div[2]/div[2]/div[2]/form/div[3]/button[1]',
    exitAddCardModalButton: '//*[@id="root"]/div/div[2]/div[2]/div[1]/button',
    reqArrow: '.reqs-arrow',
    reqSlider: '.r-sw',
    reqSliderChecked: '#checkboxinput.switch-input[type="checkbox"]:nth-of-type(1)',
    addIceCreamBt: '.counter-plus',
    disabledPlusBt: '.counter-plus.disabled',
    iceCreamValue: '.counter-value',
    orderButton: '.smart-button',
    carPlateNumber: '.order-number',
    paymentCard: 'div=Card',

    // Modals
    phoneNumberModal: '.modal',
    paymentModal: '//*[@id="root"]/div/div[2]/div[2]/div[1]',
    addCardModal: '//*[@id="root"]/div/div[2]/div[2]/div[2]',
    outFocusCardModal: '//*[@id="root"]/div/div[2]/div[2]/div[2]/form',
    carSearchModal: '.order-header-content',
}

export const actions = {
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(selectors.fromField);
        await fromField.setValue(from);
        expect(await fromField.getValue()).toBe(from);
        const toField = await $(selectors.toField);
        await toField.setValue(to);
        expect(await toField.getValue()).toBe(to);
        const callATaxiButton = await $(selectors.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(selectors.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(selectors.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(selectors.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await actions.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(selectors.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(selectors.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(selectors.confirmButton).click()
    },
    selectSupportive: async function () {
    const supportivePlanButton = await $(selectors.supportivePlanButton);
    await supportivePlanButton.waitForDisplayed();
    await supportivePlanButton.click();
    },

    fillCardNumber: function() {
        const number = Math.floor(100000000000 + Math.random() * 900000000000)
        return `${number}`
    },
    fillCVV: function() {
        const number = Math.floor(Math.random() * 100);
        return `${number}`;
    },

    addCard: async function () {
        const paymentButton = await $(selectors.paymentButton);
        await paymentButton.waitForDisplayed();
        await paymentButton.click();

        const paymentModal = await $(selectors.paymentModal)
        await expect(paymentModal).toBeExisting();

        const addCardButton = await $(selectors.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();

        const addCardModal = await $(selectors.addCardModal);
        await expect(addCardModal).toBeExisting();

        const cardNumberField = await $(selectors.cardNumberField);
        await cardNumberField.waitForDisplayed
        await cardNumberField.click();
        await cardNumberField.setValue(actions.fillCardNumber());

        const cvvField = await $(selectors.cvvField);
        await cvvField.waitForDisplayed
        await cvvField.click();
        await cvvField.setValue(actions.fillCVV());

        
        const outFocusClick = await $(selectors.outFocusCardModal);
       
        await outFocusClick.click();

        const linkCardButton = await $(selectors.linkCardButton);
        await linkCardButton.waitForClickable();
        await linkCardButton.click();

        
        const exitAddCardModalButton = await $(selectors.exitAddCardModalButton)
        await exitAddCardModalButton.click();    
    },

    addMessageForDriver: async function (){
        const messageDriverField = await $(selectors.messageDriverField)
        await messageDriverField.waitForDisplayed
        await messageDriverField.click()
        await messageDriverField.setValue('Honk when you are here')

    },
    ensureArrowIsOpen: async function () {
        //sometimes when the page is opened the arrow that reveals the dropdown menu is already pressed
        //sometimes it isn't. In manual tests this seemed like a random occurrence. 
        //This is a function that checks if the dropdown menu is open already and if it is not to open it. 
        const arrowElement = await $(selectors.reqArrow);
    
        
        await arrowElement.waitForDisplayed();
    
        // Check if the arrow has the 'open' class
        const hasOpenClass = await arrowElement.getAttribute('class').then(classes => classes.includes('open'));
    
        if (!hasOpenClass) {
            // Click the arrow to open it if it's not already open
            await arrowElement.click();
        }
    },
    blanketsReq: async function () {
        //clicks the slider to require blankets and hankerchiefs
        const blanketsButton = await $(selectors.reqSlider)
        await blanketsButton.click()
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(5000);
        //validates the slider has been moved
        const isChecked = await $(selectors.reqSliderChecked);
        await expect(isChecked).toBeChecked;

    },

    addTwoIceCreams: async function () {
        //locates the + button for adding ice cream and hits it twice
        const addIceCreamBt = await $(selectors.addIceCreamBt);
        await addIceCreamBt.waitForDisplayed();
        await addIceCreamBt.click();
        await addIceCreamBt.click();
        //locates the class that contains the value and pulls the number(string)
        const iceCreamValue = await $(selectors.iceCreamValue);
        const text = await iceCreamValue.getText();
        await expect(text).toBe('2');
        //validates that the + button is disabled, which also validates that you cant add more than 2
        const disabledPlusBt = await $(selectors.disabledPlusBt)
        await disabledPlusBt.tobeDisabled
    },

    displayCarSearch: async function () {
        const orderButton = await $(selectors.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
        const carSearchModal = await $(selectors.carSearchModal);
        await carSearchModal.waitForDisplayed();
        await expect(carSearchModal).toBeExisting();


    },
    getPhoneNumber: function(countryCode) {
        const number = Math.floor(1000000000 + Math.random() * 9000000000)
        return `${countryCode}${number}`
    },
    getElementByText: async function(obj) {
        return await $(`div=${obj.toString()}`);
    },

};
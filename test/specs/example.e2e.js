const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');
const Reporter = require('../../support/Reporter');

describe('Testing docker project', () => {
    it('Case one login', async () => {
        await LoginPage.open();

        await Reporter.step("Login Page")
        await Reporter.debug("Input Username and password")
        await LoginPage.login('tomsmith', 'SuperSecretPassword!');

        await Reporter.step("Validate an allert should be appears")
        await Reporter.debug("To be Existing")
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'You logged into a secure area!');
    });

   it('Case 1', async () => {
      console.log("Test");
   });

   it('Case 2', async () => {
        console.log("Test");
   });
});



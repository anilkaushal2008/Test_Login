import { Selector } from 'testcafe';

fixture `Login Page`
    .page `http://localhost:3000/login`;

test('User can log in with valid credentials', async t => {
    const usernameInput = Selector('input[name="username"]');
    const passwordInput = Selector('input[name="password"]');
    const loginButton = Selector('button[type="submit"]');
    const successMessage = Selector('.success-message');

    await t
        .typeText(usernameInput, 'validUser')
        .typeText(passwordInput, 'validPassword')
        .click(loginButton)
        .expect(successMessage.visible).ok();
});

test('User cannot log in with invalid credentials', async t => {
    const usernameInput = Selector('input[name="username"]');
    const passwordInput = Selector('input[name="password"]');
    const loginButton = Selector('button[type="submit"]');
    const errorMessage = Selector('.error-message');

    await t
        .typeText(usernameInput, 'invalidUser')
        .typeText(passwordInput, 'invalidPassword')
        .click(loginButton)
        .expect(errorMessage.visible).ok();
});
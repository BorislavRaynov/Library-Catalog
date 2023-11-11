const { test, expect } = require('@playwright/test')

test("Verify 'All Books' link is visible", async({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const AllBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await AllBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
})

test("Verify 'Login' button is visible", async({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();
    expect(isLoginButtonVisible).toBe(true);
})

test("Verify 'Register' button is visible", async({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();
    expect(isRegisterButtonVisible).toBe(true);
});

test('Verify "All Books" link is visible after user login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
  
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();
  
    expect(isAllBooksLinkVisible).toBe(true);
  });

test('Verify "My Books" link is visible after user login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
  
    const myBooksLink = await page.$('a[href="/profile"]');
    const isMyBooksLinkVisible = await myBooksLink.isVisible();
  
    expect(isMyBooksLinkVisible).toBe(true);
  });

test('Verify "Add Book" link is visible after user login', async({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    const addBookLink = await page.$('a[href="/create"]');
    const isAddBookLinkVisible = await addBookLink.isVisible();
    expect(isAddBookLinkVisible).toBe(true);
});

test('Verify that the "Users Email Address" is visible after user login', async({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.waitForSelector('#user');
    const userEmail = await page.$('#user span');
    const isUserEmailVisible = await userEmail.isVisible();
    expect(isUserEmailVisible).toBe(true);
});

test('Login with valid credentials', async({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Sbumit form with empty input fields', async({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Sbumit form with empty email input field', async({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Sbumit form with empty password input field', async({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Sbumit register form with valid values', async({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'test3@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Sbumit register form with empty values', async({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Sbumit register form with empty email value', async({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Sbumit register form with empty password value', async({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'test@abv.bg');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Sbumit register form with empty repeat-password value', async({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'test@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Sbumit register form with different passwords value', async({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '213456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain("Passwords don't match!");
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Add book with correct data', async({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ])

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    await page.waitForURL('http://localhost:3000/catalog');
    expect(page.url()).toBe('http://localhost:3000/catalog')
});

test('Add book with empty title field', async({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ])

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
});

test('Add book with empty description field', async({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ])

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
});

test('Add book with empty img field', async({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ])

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is a test book description');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
});


const { test, expect } = require('@playwright/test')

test("Verify 'All Books' link is visible", async({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const AllBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await AllBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
})
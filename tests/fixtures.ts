import { test as base } from '@playwright/test';
import { HomePage } from '../pageobjectmodels/HomePage';
import { ProductDetailPage } from '../pageobjectmodels/ProductDetailPage';
import { CartPage } from '../pageobjectmodels/CartPage';

type MyFixtures = {
    homePage: HomePage;
    productDetailPage: ProductDetailPage;
    cartPage: CartPage;
};

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    productDetailPage: async ({ page }, use) => {
        const productDetailPage = new ProductDetailPage(page);
        await use(productDetailPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    }
});

export { expect } from '@playwright/test';
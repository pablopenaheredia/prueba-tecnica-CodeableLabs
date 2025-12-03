import { type Page, type Locator } from '@playwright/test';

export class HomePage {
    page: Page;
    
    // barra de busqueda principal
    searchInput: Locator;
    
    // carrito en navbar
    cartIcon: Locator;
    
    // resultados de busqueda
    firstResultItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('input#cb1-edit');
        this.cartIcon = page.locator('a[href*="/cart"]').first();
        this.firstResultItem = page.locator('.poly-component__title').first();
    }
	//funciones de la pagina principal.
    // ir a la pagina principal
    async goToHomePage() {
        await this.page.goto('https://www.mercadolibre.com.ar');
        await this.page.waitForLoadState('domcontentloaded');
    }

    // buscar un producto
    async searchProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.searchInput.press('Enter');
        await this.page.waitForLoadState('domcontentloaded');
    }

    // click en el primer resultado de busqueda
    async clickFirstResult() {
        await this.firstResultItem.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
    // ir al carrito
    async goToCart() {
        await this.cartIcon.click();
    }
}
import { type Page, type Locator, expect } from '@playwright/test';

export class ProductDetailPage {
    page: Page;
    
    // botones
    addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.getByRole('button', { name: /agregar al carrito/i }).first();
    }

	//funciones de la pagina de detalles de un producto.
    // ir a la pagina de un producto
    async navigateToProduct(url: string) {
        await this.page.goto(url);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // click en agregar al carrito
    async clickAddToCart() {
        await this.addToCartButton.click();
    }

    // verificar que aparece el error de variante cuando no se selecciona
    // deberia mostrar "Talle: Elegí" en rojo (#f23d4f)
    async verifyVariantError() {
        const errorColor = 'rgb(242, 61, 79)'; // #f23d4f en rgb
        
        // el texto "Elegí" debe ser rojo
        const elegiText = this.page.getByText('Elegí').first();
        await expect(elegiText).toBeVisible({ timeout: 5000 });
        await expect(elegiText).toHaveCSS('color', errorColor);
    }

    // verificar que el modal no aparece (producto no se agrego)
    async verifyProductNotAdded() {
        const iframe = this.page.locator('[data-testid="iframe-element"]');
        await expect(iframe).not.toBeVisible({ timeout: 3000 });
    }
}
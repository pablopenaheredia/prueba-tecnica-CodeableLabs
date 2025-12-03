import { type Page, type Locator, expect } from '@playwright/test';

export class CartPage {
    page: Page;
    
    // botones
    removeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // boton para eliminar productos del carrito
        this.removeButton = page.getByTestId('remove-button');
    }

    // verificar que estamos en la pagina del carrito
    async verifyCartPage() {
        // solo verificar que la url contiene "cart"
        await expect(this.page).toHaveURL(/.*cart.*/, { timeout: 10000 });
    }

    // verificar un producto en el carrito
    async verifyProduct(product: { name: string; quantity?: number }) {
        // buscar el texto del producto en la página
        const productText = this.page.locator(`text=${product.name}`).first();
        await expect(productText).toBeVisible({ timeout: 10000 });
    }

    // limpiar el carrito (eliminar todos los productos)
    async clearCart() {
        // ir al carrito
        await this.page.goto('https://www.mercadolibre.com.ar/cart');
        await this.page.waitForLoadState('domcontentloaded');
        
        // mientras haya botones de eliminar, seguir eliminando
        while (await this.removeButton.first().isVisible({ timeout: 2000 }).catch(() => false)) {
            await this.removeButton.first().click();
            await this.page.waitForTimeout(1000); // esperar a que se elimine
        }
    }
}
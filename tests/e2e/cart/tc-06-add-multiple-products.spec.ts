import { test } from '../../fixtures';

test.describe('[US03] Carrito de compras | Agregar múltiples productos', () => {

    test.beforeEach(async ({ homePage, cartPage }) => {
        await test.step('Limpiar carrito si hay productos', async () => {
            await cartPage.clearCart();
        });

        await test.step('Background: El usuario está logueado y ubicado en la página principal de Mercado Libre', async () => {
            await homePage.goToHomePage();
        });
    });

    test('TC-06 - Validar cantidad al agregar múltiples productos diferentes', async ({ homePage, productDetailPage, cartPage }) => {
        // Data del test - URLs directas de los productos
        const productASearch = 'Mouse Logitech G203 Lightsync, Color Negro';
        const productAName = 'Mouse Logitech G203 Lightsync';
        const productBUrl = 'https://www.mercadolibre.com.ar/teclado-inalambrico-bluetooth-logitech-k250-rosado/p/MLA54514677';
        const productBName = 'Teclado Inalámbrico Bluetooth';

        // PRODUCTO A: Mouse Logitech G203
        await test.step('Buscar producto A (Mouse Logitech G203)', async () => {
            await homePage.searchProduct(productASearch);
        });

        await test.step('Hacer click en producto A y dirigirse a su PDP', async () => {
            await homePage.clickFirstResult();
        });

        await test.step('Hacer click en "Agregar al carrito" para producto A', async () => {
            await productDetailPage.clickAddToCart();
        });

        /*await test.step('Cerrar modal de confirmación', async () => {
            await productDetailPage.closeModal();
        });*/

        // PRODUCTO B: Teclado Logitech K250 - ir directo a la URL
        await test.step('Ir al producto B (Teclado Logitech K250) directamente', async () => {
            await productDetailPage.navigateToProduct(productBUrl);
        });

        await test.step('Hacer click en "Agregar al carrito" para producto B', async () => {
            await productDetailPage.clickAddToCart();
        });

        /*await test.step('Cerrar modal de confirmación', async () => {
            await productDetailPage.closeModal();
        });*/

        // VERIFICAR CARRITO
        await test.step('Abrir carrito desde el icono', async () => {
            await homePage.goToCart();
        });

        await test.step('Verificar que estamos en el carrito', async () => {
            await cartPage.verifyCartPage();
        });

        await test.step('Verificar que producto A está en el carrito', async () => {
            await cartPage.verifyProduct({ name: productAName });
        });

        await test.step('Verificar que producto B está en el carrito', async () => {
            await cartPage.verifyProduct({ name: productBName });
        });
    });
});
import { test } from '../../fixtures';

test.describe('Agregar productos al carrito', () => {

    test.beforeEach(async ({ homePage }) => {
        await test.step('Background: El usuario está logueado y ubicado en la página principal de Mercado Libre', async () => {
            // La sesión ya está cargada desde auth.json (storageState)
            await homePage.goToHomePage();
        });
    });

    test('TC-01 - Validar agregar productos al carrito (happy path)', async ({ homePage, productDetailPage, cartPage }) => {
        // Data del test
        const searchTerm = 'Auriculares Inalámbricos Bluetooth Sony WH-CH520 Negro';
        const productName = 'Auriculares Inalámbricos Bluetooth Sony WH-CH520 Negro';

        await test.step('Buscar el producto', async () => {
            await homePage.searchProduct(searchTerm);
        });

        await test.step('Hacer click en la card del producto', async () => {
            await homePage.clickFirstResult();
        });

        await test.step('Hacer click en el botón "Agregar al carrito"', async () => {
            await productDetailPage.clickAddToCart();
        });

        /*await test.step('Visualizar la ventana modal "Agregaste a tu carrito" + Nombre del producto + Unidades', async () => {
            await productDetailPage.verifyConfirmationModal(productName);
        });

        await test.step('Cerrar modal e ir al carrito', async () => {
            await productDetailPage.closeModalAndGoToCart();
        });*/

        await test.step('Verificar que se redirige al carrito de compras', async () => {
            await cartPage.verifyCartPage();
        });

        await test.step('Verificar que el producto se encuentra en el carrito con cantidad y precio', async () => {
            await cartPage.verifyProduct({
                name: productName,
                quantity: 1
            });
        });
    });
});
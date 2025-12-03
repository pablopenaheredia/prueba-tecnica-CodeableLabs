import { expect, test } from '../../fixtures';

test.describe('[US02] Carrito de compras | Validaciones del carrito', () => {

    test.beforeEach(async ({ homePage }) => {
        await test.step('Background: El usuario está logueado y ubicado en la página principal de Mercado Libre', async () => {
            await homePage.goToHomePage();
        });
    });

    test('TC-02 - Validar no poder agregar productos sin elegir variantes obligatorias', async ({ productDetailPage }) => {
        // Producto CON variantes obligatorias (Zapatillas Topper con talle)
        const productUrl = 'https://articulo.mercadolibre.com.ar/MLA-1475074077-zapatillas-urbanas-topper-t350-mesh-26887-35-al-45-gamati-_JM?searchVariation=186853266083#polycard_client=search-nordic&searchVariation=186853266083&search_layout=grid&position=1&type=item&tracking_id=ce59edc6-f9e6-4b85-ab5b-a3cf8c13ac73';
        
        await test.step('Dado que el usuario se encuentra en el Product Detail Page de un producto con variantes obligatorias', async () => {
            await productDetailPage.navigateToProduct(productUrl);
        });

        await test.step('Y no selecciona un talle', async () => {
        });

        await test.step('Cuando hace click en el botón "Agregar al carrito"', async () => {
            await productDetailPage.clickAddToCart();
        });

        await test.step('Entonces el recuadro de "Talle" deberá enmarcarse en rojo con la palabra "Elegí"', async () => {
            await productDetailPage.verifyVariantError();
        });

        await test.step('Y el producto no se agrega al carrito', async () => {
            await productDetailPage.verifyProductNotAdded();
        });
    });
});
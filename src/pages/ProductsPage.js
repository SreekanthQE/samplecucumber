import { expect } from "@playwright/test";
import { ProductsPageLocators } from "../pageobjects/productsPageLocators.js"


export class ProductsPage{
    async userVerifiesAllProductsVisible(){
      //  const productLocators = await pageFixture.getPage().locator(ProductsPageLocators.allProducts).all();
        expect(productLocators.length).toEqual(ProductsPageLocators.productsCount);
        for(let product of productLocators){
            await product.isVisible();
        }
    }
}
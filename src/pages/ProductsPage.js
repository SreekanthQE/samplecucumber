import { expect } from "@playwright/test";
import { ProductsPageLocators } from "../pageobjects/productsPageLocators.js"
<<<<<<< HEAD

=======
import { pageFixture } from "../support/pageFixture.js"
import * as utils  from 'playwright-ultimate-utils';
>>>>>>> 58afde6f4ac6d6fdef5d4f19dd11695b7a6b8758

export class ProductsPage{
    async userVerifiesAllProductsVisible(){
      //  const productLocators = await pageFixture.getPage().locator(ProductsPageLocators.allProducts).all();
        expect(productLocators.length).toEqual(ProductsPageLocators.productsCount);
        for(let product of productLocators){
            await product.isVisible();
            await utils.gotoURL();
        }
    }
}
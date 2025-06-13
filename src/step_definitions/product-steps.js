import { Given, When, Then } from '@cucumber/cucumber';
import { pages } from '../pages/Pages.js';

Then ('the user verifies all products are visible', async function(){
    await pages.productsPage.userVerifiesAllProductsVisible();
})

When('the user click on "View Product" of first product', async function(){

})

Then('the user lands on product details page and verifies product details', async function(){
    
})


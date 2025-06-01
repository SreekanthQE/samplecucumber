
class BasePage{

    constructor(page){
        this.page = page;
    }

    static async highlight(selector) {
  await page.$eval(selector, el => {
    el.style.border = '3px solid green';
    el.style.transition = 'border 0.3s ease-in-out';
  });
}

}
module.exports = { BasePage };

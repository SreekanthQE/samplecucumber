

class HomePage{
    constructor(page){
        this.page = page;
    }
   async navigateToURL() {
        await this.page.goto(process.env.BASE_URL);
        await this.page.waitForLoadState('networkidle');
    }
    async verifyUserLandsOnHomePage(){


    }

}

module.exports = { HomePage }


class HomePage{
    constructor(page){
        this.page = page;
    }
   async navigateToURL() {
        await this.page.goto(process.env.BASE_URL);
        await this.page.waitForLoadState('networkidle');
    }
    async clickLoginOrRegister(){
        await this.page.getByText('Login or register').click();
        await this.page.waitForLoadState('networkidle');
    }
    async verifyUserLandsOnHomePage(){


    }

}

module.exports = { HomePage }


export class TestCasesPage{

    async verifyUserIsOnTestCasesPage(){
        await pw.verifyURL('/test_cases');
    }   

}
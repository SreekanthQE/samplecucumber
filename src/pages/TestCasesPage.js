import { playwrightUtils as pw } from '../utils/playwrightUtils.js';


export class TestCasesPage{

    async verifyUserIsOnTestCasesPage(){
        await pw.verifyURL('/test_cases');
    }   

}
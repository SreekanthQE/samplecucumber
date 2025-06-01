
const { HomePage } = require('./HomePage')
class POManager
{
constructor(page)
{
    this.page = page;
    this.HomePage = new HomePage(this.page);


}
getHomePage(){
    return this.HomePage;
}
}
module.exports = {POManager};
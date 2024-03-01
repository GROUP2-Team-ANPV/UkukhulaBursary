export default class{
    
    constructor(){

    }

    setTitle(title){
        document.title =title;
    }
    setCSS(href){
        document.querySelector("#content-css").setAttribute("href", href);
    }
   

    async getHtml(){
        return "";
    }
    async getJS(){
    
    }
}
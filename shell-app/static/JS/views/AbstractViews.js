
export default class{
    
    constructor(){

    }

    setTitle(title){
        document.title =title;
    }
    setCSS(href){
        document.querySelector("#content-css").setAttribute("href", href);
    }
    setJS(jsfile){
        document.querySelector("#content-script").setAttribute("src", jsfile);
    }

    async getHtml(){
        return "";
    }
}
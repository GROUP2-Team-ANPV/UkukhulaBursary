
 import login_view from "./views/login_view.js";
 import university_application_view from "./views/university_application_view.js";




const navigateTo = url =>{
    history.pushState(null, null ,url);
    router();
}

const router = async () =>{
    const routes = [
        {path: "/", view: university_application_view},
        {path: "/login", view:login_view},
       // {path: "/settings", view:(() => console.log("Viewing Settings"))}

    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route =>{
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)
    

    if (!match) {
        match ={
            route: routes[0],
            isMatch: true
        };
    }
    const view = new match.route.view();
    document.querySelector("#content").innerHTML = await view.getHtml();
};

window.addEventListener("popstate" , router);
document.addEventListener("DOMContentLoaded",()=>{
    let menuIcon = document.querySelector('#menu_icon');
    let menuIconClose = document.querySelector('#menu_icon_close');
    let navbar = document.querySelector('.sidebar');

        menuIcon.addEventListener('click', () => {
            
                menuIcon.style.display='none';
                navbar.style.display = 'block';
                menuIconClose.style.display='flex'

            
        });

        menuIconClose.addEventListener('click', () => {
            menuIconClose.style.display='none';
                navbar.style.display = 'none';
                menuIcon.style.display='flex'

        });
    document.body.addEventListener("click" ,e =>{
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    } )
    router();
});
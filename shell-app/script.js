document.addEventListener('DOMContentLoaded', function() {
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
})
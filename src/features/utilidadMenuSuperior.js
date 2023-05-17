function utilidadMenuSuperior() {
    setTimeout(function () {
        //console.log('invocando utilidad de menú superior');
        const menusuperior = document.querySelector('.container-menu-main');
        if (menusuperior != null) menusuperior.style.display = 'block';
    }, 1000);
}

function isInViewportMenu() {
    const menusuperior = document.querySelector('.container-menu-main')
    const barranav = document.querySelector('.navbar-principal');
    const rect = menusuperior.getBoundingClientRect();
    const { scrollTop, offsetHeight } = document.documentElement;
    console.log('datos de video encabezado', rect.top, rect.left, rect.bottom, rect.right)
    console.log('limite datos de video encabezado ', Math.round(scrollTop - rect.top))
    if (Math.round(scrollTop - rect.top) > 0) {
        menusuperior.style.display = 'block'

    }
    else {
        menusuperior.style.display = 'none'
    }

}

function isInViewportMenuEvt() {
    const menusuperior = document.querySelector('.container-menu-main')
    const eventomain = document.querySelector('.main-content-this-event');
    const navbar = document.querySelector('.nonHiddenClass');
    const rect = menusuperior.getBoundingClientRect();
    const rectnav = eventomain.getBoundingClientRect();
    const { scrollTop, offsetHeight } = document.documentElement;
    console.log('datos de scroll en menu de eventos ',rectnav,rect);
    if (Math.round(scrollTop - rectnav.top) < rectnav.height) {
        menusuperior.style.display = 'block'

    }
    else {
        menusuperior.style.display = 'none'
    }
    navbar.style.display='block';
}
export { utilidadMenuSuperior, isInViewportMenu, isInViewportMenuEvt }
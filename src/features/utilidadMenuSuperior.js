export default function utilidadMenuSuperior(){
    setTimeout(function(){
    console.log('invocando utilidad de menú superior');
    const menusuperior = document.querySelector('.container-menu-main');
    if(menusuperior != null) menusuperior.style.display = 'block';
    },5000);
}
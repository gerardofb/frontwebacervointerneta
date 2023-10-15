let valor = {
    url: window.location.href,
    changefreq: 'yearly',
    priority: 0.5,
}
var contenedorImg = document.getElementsByTagName("img");
let arregloUrlImagen = [];
let regularSrc = new RegExp('deploy-videos-acervo-interneta-prod.s3.amazonaws.com');
for (let i of contenedorImg) {
    if (regularSrc.test(i.src))
        arregloUrlImagen.push(i.src);
}
let unica = [...new Set(arregloUrlImagen)];
arregloUrlImagen = unica.map((el, i) => {
    return { url: el };
});

valor.img = unica;
console.log(valor);
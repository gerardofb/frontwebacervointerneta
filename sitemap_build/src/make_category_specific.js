let valor = {
    url:window.location.href,
    changefreq:'yearly',
    priority:0.4
    }
    var contenedorImg = document.getElementsByClassName("item-video-block-hovered");
    let arregloUrlImagen = [];
    let arregloLinks = [];
    let reg = /https:\/\/acervo-audiovisual-interneta.org\/Reproduccion\//g
    var contendorLinks = document.getElementsByTagName("a");
    for(let i of contenedorImg){
    arregloUrlImagen.push({url:i.getElementsByTagName('img')[0].src});
    }
    for(let links of coleccion){

        if(reg.test(links.href)){
        arregloLinks.push({lang:"es",url:links.href});
        }
    }
    valor.img = arregloUrlImagen;
    valor.links = arregloLinks;
    console.log(valor);
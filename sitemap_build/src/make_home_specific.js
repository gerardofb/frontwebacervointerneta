let valor = {
    url:window.location.href,
    changefreq:'yearly',
    priority:0.8,
	video:[
	{description:document.head.querySelector("[name=description][content]").content,thumbnail_loc:"https://api.acervo-audiovisual-interneta.org/static/img/logo_nuevo_negro.png",title:document.head.querySelector("[property=title][content]").content+" "+"Clip introductorio del acervo.",
	content_loc:"https://acervo-audiovisual-interneta.org/images/Web_InterNeta.mp4", duration:52, family_friendly:'YES', requires_subscription:'NO'}
	]
    }
	var contenedorImg = document.getElementsByTagName("img");
    var contenedorVideo = document.getElementsByTagName("video");
	var arregloUrlVideo = []
    let arregloUrlImagen = [];
let regularSrc = new RegExp('deploy-videos-acervo-interneta-prod.s3.amazonaws.com');
    for(let i of contenedorImg){
    if(regularSrc.test(i.src))
    arregloUrlImagen.push({url:i.src});
    }
    valor.img = arregloUrlImagen;
    console.log(valor);
let valor = {
    url: window.location.href,
    changefreq: 'yearly',
    priority: 0.6,
}
var contenedorImg = document.getElementsByTagName("img");
var contenedorVideo = document.getElementsByTagName("video")[0].getElementsByTagName("source");
var contenedorDiv = document.getElementsByClassName("category-item");
var contenedorLink = document.getElementsByClassName("category-item")
let arregloUrlImagen = [];
let arregloUrlVideo = [];
let arregloLinks = [];
let regularSrc = new RegExp('deploy-videos-acervo-interneta-prod.s3.amazonaws.com');
for (let i of contenedorImg) {
    if (regularSrc.test(i.src))
        arregloUrlImagen.push(i.src);
}
for (let i of contenedorDiv) {
	var salidaestilo =  window.getComputedStyle(i).getPropertyValue('background');
	var regularMatchComillas = /"(.*?)"/
    if (regularSrc.test(salidaestilo)){
		let elementoimg = salidaestilo.match(regularMatchComillas)[0].replace("\"","");
		elementoimg = elementoimg.substring(0,elementoimg.length-1);
        arregloUrlImagen.push(elementoimg)
		
	}
}
let description = document.head.querySelector("[name=description][content]").content;
let titulo = document.head.querySelector("title").getInnerHTML();

for(let v of contenedorVideo){
arregloUrlVideo.push(
 {
                "description": description,
                "thumbnail_loc": "https://deploy-videos-acervo-interneta-prod.s3.us-west-1.amazonaws.com/logo_cabeza_negro_social_net_2.png",
                "title": titulo,
                "content_loc": v.src,
                "family_friendly": "YES",
                "requires_subscription": "NO"
            }
)
}
for(let a of contenedorLink){
let links = a.getElementsByTagName("a");
    arregloLinks.push({lang:"es",url:links[0].href})
}
let unica = [...new Set(arregloUrlImagen)];
arregloUrlImagen = unica.map((el, i) => {
    return { url: el };
});
valor.video = arregloUrlVideo;
valor.img = arregloUrlImagen;
valor.links =arregloLinks;
console.log(valor);
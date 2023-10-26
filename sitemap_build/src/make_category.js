let valor = {
    url: window.location.href,
    changefreq: 'yearly',
    priority: 0.6,
}

var contenedorVideo = document.getElementsByTagName("video");

let arregloUrlVideo = [];
let arregloDesc=[];
for(let t of document.getElementsByClassName("category-explore-desc-white")){
    let desc = t.getElementsByTagName("h3")[0].innerHTML;
    arregloDesc.push(desc);
}
let regularSrc = new RegExp('deploy-videos-acervo-interneta-prod.s3.amazonaws.com');


let description = document.head.querySelector("[name=description][content]").content;
let titulo = document.head.querySelector("title").getInnerHTML();
let indice = 0;
for(let v of contenedorVideo){
for(let vid of v.getElementsByTagName("source")){
arregloUrlVideo.push(
 {
                "description": arregloDesc[indice],
                "thumbnail_loc": "https://deploy-videos-acervo-interneta-prod.s3.us-west-1.amazonaws.com/logo_cabeza_negro_social_net_2.png",
                "title": titulo+" "+arregloDesc[indice],
                "content_loc": vid.src,
                "family_friendly": "YES",
                "requires_subscription": "NO"
            }
);
}
indice++;
}

valor.video = arregloUrlVideo;
console.log(valor);
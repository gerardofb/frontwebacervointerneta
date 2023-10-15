const { SitemapStream, streamToPromise } = require( 'sitemap' )
const { Readable } = require( 'stream' )
console.log('Hello sitemap maker');
const fs = require('fs');
const links = JSON.parse(fs.readFileSync('./archivo_links_sitemap.json'));

// An array with your links
 

// Create a stream to write to
const stream = new SitemapStream( { hostname: 'https://acervo-audiovisual-interneta.org' } )

// Return a promise that resolves with your XML string
const valor = streamToPromise(Readable.from(links).pipe(stream)).then((data) =>{
  let salida = data.toString(); 
  console.log("\r\n"); 
  console.log(salida);
  console.log("\r\n");
  fs.writeFile("./build/sitemap_desktop.xml", salida, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Se guardó correctamente el archivo");
}); 
});


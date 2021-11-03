 // https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaGVldElEIjoiMU5zZ0dmbFdtNlhRa3ljX2dxQjdVNy1lbmM5d0ZxcnlCQ3N6QXFsM0dYX1EiLCJzaGVldE5vbWJyZSI6Im9yZGVuYWRvcyBwb3IgZWRpdG9yaWFsIiwic2hlZXRSYW5nbyI6IkE6RSIsInNoZWV0VG9rZW4iOiJBSXphU3lEbEZuUnVTcWdsVng1bUJzcGlVa2hORE1Nd3U0Z1ZoWGMifQ.PxjPAeQ4P29l2nNqyhJQJcxmbuhPGtrFX7pP3E8g-6M
 //https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
 //AIzaSyBRTUHed5siMGRCTgopqNzmeSeJB9vg7Qc api de google
 // https://www.googleapis.com/books/v1/volumes?q=BAILANDO CON LOS OSOS+inauthor:FERNANDO KRAPP&key=AIzaSyBRTUHed5siMGRCTgopqNzmeSeJB9vg7Qc
 let spreadsheetId = "1NsgGflWm6XQkyc_gqB7U7-enc9wFqryBCszAql3GX_Q";
 let sheetName = "ordenados por editorial";
 let cellRange = "A:E";
 let yourAPIKey = "AIzaSyDlFnRuSqglVx5mBspiUkhNDMMwu4gVhXc";

 let linkSheet = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values/' + sheetName + '!' + cellRange + '?key=' + yourAPIKey;


 $(document).ready(function() {

     let librosMostrados = 5;

     consultarStock(librosMostrados);



     /* $(window).scroll(function() {
         if ($(window).scrollTop() == $(document).height() - $(window).height()) {
             console.log("llegó al final de la página");
             librosMostrados = librosMostrados + 5;
             consultarStock(librosMostrados);
         }
     }); */

 });

 function consultarStock(numero) {

     getData(linkSheet)
         .then((respuesta) => {
             let libros = respuesta.values;
             console.log(libros);
             let datosJuntos = [];


             libros.forEach((dato, index) => {

                 if (index < numero) {
                     datosJuntos = {
                         titulo: dato[0],
                         editorial: dato[1],
                         autor: dato[2],
                         stock: dato[3],
                         otro: dato[4],
                         id: Math.random()
                     };
                     //$("#biblioteca3D").append(contruirLibros(datosJuntos)); construirLibro3D
                     $("#biblioteca3D").append(construirLibro3D(datosJuntos));


                 }
             });
             //   console.log(datosJuntos);
             $(".book").on('click', function() {
                 //                 console.log($(this));
                 let titulo = $(this).data("titulo");
                 let autor = $(this).data("autor");
                 let id = $(this).data("id");

                 let data = { 'titulo': titulo, 'autor': autor, 'id': id };
                 console.log(data);
                 consultarApiGoogle(data);

             });

         })
         .catch(function(error) {
             console.error(error);
         });
 }



 function construirLibro3D(datos) {

     return `
            <div class="col mb-4" style="display: flex;
            justify-content: center;
            align-items: center;">

            <button class="book" data-titulo="${datos.titulo}" data-autor="${datos.autor}" data-id="${datos.id}"style="border-radius: 6px;">
                <div class="back"></div>
                <div class="page6"><div id="mas_datos_${datos.id}" class="container mt-4"></div></div>
                <div class="page5">
                <div class="mr-4 mt-4" style="transform: scaleX(-1);">
                <p class="text-dark"><span class="text-muted">Título: </span>${datos.titulo}</p>
                <p class="text-dark"><span class="text-muted">Autor/es: </span>${datos.autor}</p>
                <p class="text-dark"><span class="text-muted">Editorial:</span> ${datos.editorial}</p>
                </div>
                </div>
                <div class="page4"></div>
                <div class="page3"></div>
                <div class="page2"></div>
                <div class="page1"></div>
                <div class="front">
                    <div class="container mt-4">
                            <h5 class="card-title text-white ">${datos.titulo}</h5>
                            <h5 class="card-title  text-white">${datos.autor}</h5>
                            <p class="card-text  text-white">${datos.editorial}</p>
                            <span class="badge badge-dark">Stock: ${datos.stock}</span>
                        </div>
                            </div>                           
            </button>

            </div>
            
            `;

 }

 function contruirLibros(datos) {
     return `
            <div class="col mb-4">
                    <div class="card h-100">
                        <img src="..." class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${datos.titulo}</h5>
                            <h5 class="card-title">${datos.autor}</h5>
                            <p class="card-text">${datos.editorial}</p>
                            <span class="badge badge-dark">Stock: ${datos.stock}</span>
                            <div id="mas_datos_${datos.id}"
                        </div>
                    </div>
                </div>
            `;
 }

 function consultarApiGoogle(datos) {
     $("#mas_datos_" + datos.id).empty();
     $("#mas_datos_" + datos.id).append(`<div class="spinner-grow" role="status">
     <span class="sr-only">Loading...</span>
   </div>`);
     //https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
     let yourAPIKey = "AIzaSyBRTUHed5siMGRCTgopqNzmeSeJB9vg7Qc";
     let link = 'https://www.googleapis.com/books/v1/volumes?q=' + datos.titulo + '+inauthor:' + datos.autor + '&key=' + yourAPIKey;

     getData(link)
         .then((respuesta) => {
             //  console.log(respuesta);
             $("#mas_datos_" + datos.id).empty();
             if (respuesta.items != undefined) {


                 let paginas = respuesta.items[0].volumeInfo.pageCount;
                 let fecha = respuesta.items[0].volumeInfo.publishedDate;
                 let idioma = respuesta.items[0].volumeInfo.language;
                 let masInfo = respuesta.items[0].volumeInfo.previewLink;


                 if (paginas != '') {
                     $("#mas_datos_" + datos.id).append(`<p class="card-text text-dark"><span class="text-muted">Cantidad de páginas: </span>${paginas}</p>`);
                 }
                 if (fecha != '') {
                     $("#mas_datos_" + datos.id).append(`<p class="card-text text-dark"><span class="text-muted">Fecha de publicación: </span>${fecha}</p>`);
                 }
                 if (idioma != '') {
                     $("#mas_datos_" + datos.id).append(`<p class="card-text text-dark"><span class="text-muted">Idioma:</span> ${idioma}</p>`);
                 }

                 $("#mas_datos_" + datos.id).append(`<p class="card-text "><a href="${masInfo}" target="_blank" rel="noopener noreferrer">Más Información</a></p>`);
             } else {
                 $("#mas_datos_" + datos.id).append(`<p class="card-text text-dark">Sin datos</p> `);

             }

         })
         .catch(function(error) {
             console.error(error);
         });

 }

 async function getData(url = "") {
     let response = await fetch(url);
     let data = await response.json();
     return data;
 }




 /*
    PRUEBA: https://github.com/hakimel/meny
    cc: https://hakim.se/

    https://lab.hakim.se/scroll-effects/
    
    */

// importamos el modulo para hacer las peticiones
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// direccion de la API
let API = 'https://rickandmortyapi.com/api/character/';
// funcion principal
function fetchData(url_api, callback) {
    // instanciamos la conexion
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', url_api, true);
    // validacion del llamado
    xhttp.onreadystatechange = (event) => {
        // el state 4 es el ultimo de la peticion
        if(xhttp.readyState === 4) {
            // verificamos que el status este en 200, que dice que todo bien, no un 400 o 500
            if (xhttp.status === 200) {
                callback(null, JSON.parse(xhttp.responseText));
            }
        } else {
            // si no es 200
            const error = new Error('Error' + url_api);
            // matamos el proceso con un error
            return callback(error, null);
        }
    }
    // por ultimo enviamos la peticion
    xhttp.send();
}

fetchData(API, function (error1, data1){
    if (error1) return console.error(error1);
    fetchData(API + data1.results[0].id, function (error2, data2) {
        if (error2) return console.error(error2);
        fetchData(data2.origin.url, function (error3, data3) {
            if (error3) return console.error(error3);
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        });
    })
})
// importamos el modulo para hacer las peticiones
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// funcion principal
const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        // instanciamos la conexion
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', url_api, true);
        xhttp.onreadystatechange = (() => {
            if(xhttp.readyState === 4) {
                (xhttp.status === 200)
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('Error', url_api))
            }
        });
        // por ultimo enviamos la peticion
        xhttp.send();
    });
}

module.exports = fetchData;
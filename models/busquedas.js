const axios = require("axios");

class Busquedas {
    historial = ['Tequcigalga', 'Madrid', 'San Jose'];

    constructor() {
        // TOdo Leer DB si existe
    }

    async ciudad(lugar = '') {
        // peticion HTTP

        console.log(lugar);
        try {
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data);
            return []; // retornar todas los lugares de la ciudad
        } catch (e) {
            return [];
        }
        
    }
}

module.exports = Busquedas;
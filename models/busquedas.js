const axios = require("axios");

class Busquedas {
    historial = ['Tequcigalga', 'Madrid', 'San Jose'];

    constructor() {
        // TOdo Leer DB si existe
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        };
    }
    async ciudad(lugar = '') {
        // peticion HTTP

        console.log(lugar);
        try {
            //const resp = await axios.get('https://reqres.in/api/users?page=2');
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox()
            });
            
            const respuesta = intance.get();





            //const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/madri.json?access_token=pk.eyJ1IjoiZGFya3BpbmVjbyIsImEiOiJja3RuOXVoaXowMHNuMm5veDRpaWp1NWM5In0.q67nUxWL1_zrGH_Upu3_Bw&limit=5&language=es');
            console.log(resp.data);
            return []; // retornar todas los lugares de la ciudad
        } catch (e) {
            return [];
        }
        
    }
}

module.exports = Busquedas;
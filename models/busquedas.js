const fs = require('fs');
const axios = require("axios");

class Busquedas {
    historial = [];
    dbPath = `./db/database.json`;

    constructor() {
        // TOdo Leer DB si existe
        this.leerEnBD;
    }

    getHistorialCapitalizado() {

        return this.historial.map((lugar) => {
            let palabras = lugar.split(' ');

            palabras = palabras.map((p) => {
                return p[0].toUpperCase() + p.substring(1);
            });

            return palabras.join(' ');
        });
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        };
    }

    get paramsWeather(lat, lon){
        return {
            lat,
            lon,
            appid: process.env.OPEN_WEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad(lugar = '') {
        // peticion HTTP

        console.log(lugar);
        try {
            //const resp = await axios.get('https://reqres.in/api/users?page=2');
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });
            
            const respuesta = intance.get();
            //const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/madri.json?access_token=pk.eyJ1IjoiZGFya3BpbmVjbyIsImEiOiJja3RuOXVoaXowMHNuMm5veDRpaWp1NWM5In0.q67nUxWL1_zrGH_Upu3_Bw&limit=5&language=es');
            console.log(respuesta.data.feature);

            // return []; // retornar todas los lugares de la ciudad

            return respuesta.data.feature.map((lugar) => {
                return {
                    id: lugar.id,
                    nombre: lugar.place_name,
                    lng: lugar.center[0],
                    lat: lugar.center[1]
                }
            });
        } catch (e) {
            console.log("ERROR -> " + e)
            return [];
        }
    }

    async climaLugar(lat,lon) {
        try {
            // instancia axios
            const intance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: this.paramsWeather(lat, lon)
            })
            // respuesta.data
            const resp = await intance.get();
            const { weather, main } = resp.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };
        } catch(e) {

        }
        return null;
    }

    agregarHistoria(lugar = '') {

        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }

        this.historial = this.historial.splice(0, 5);
        this.historial.unshift(lugar);

        // Grabar en BD
        this.guardarEnBD();
    }

    guardarEnBD() {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }


    leerEnBD() {

        if ( !fs.existsSync(this.dbPath)) return ;

        const resp = fs.readFileSync(this.dbPath, {endcoding: 'utf-8'});

        this.historial = JSON.parse(resp)?.historial || [];
    }}


module.exports = Busquedas;
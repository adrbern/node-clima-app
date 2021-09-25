require('dotenv').config();
const {
    leerInput,
    inquirerMenu,
    pausa, 
    listarLugares} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

console.clear();
console.log('hola mundo');

console.log('variable entornos -> ');
console.log(process.env);
console.log(process.env.MAPBOX_KEY);
console.log(process.env.OPEN_WEATHER_KEY);

const main = async() => {
    const busquedas = new Busquedas;
    let opt = 0;

    do {
        opt = await inquirerMenu();

        switch(opt) {
            case 1:
                //MOstrar mensaje
                const termino = await leerInput('Ciudad:');
                //buscar los lugares
                console.log(lugar);
                const lugares = await busquedas.ciudad(termino);
                //Seleccionar el lugar
                console.log(lugares);
                const id = await listarLugares(lugares);
                if (id === '0') continue;

                const { nombre, lat, lng } = lugares.find((l) => {
                    return l.id === id;
                });
                // Guardar de BD
                busquedas.agregarHistoria({nombre, lat, lng});

                //Clima
                const { max, min, temp, desc } = await busquedas.climaLugar(lat, lng);

                //Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ' + nombre);
                console.log('Lat: ') + lat;
                console.log('Lng: ' + lng);
                console.log('Temperatura: ' + temp);
                console.log('Minima: ' + min);
                console.log('Maxima: ' + max);
                console.log('Como esta el clima' + desc);
            break;
            case 2:
                busquedas.historial.forEach((lugar, i) => {
                    const idx = `${i+1}. `.green;
                    console.log(`${idx} ${lugar}`);
                })
            break;
            case 0:
            break;
        }
         

        if(opt !== 0) {
            await pausa();
        }
    } while(opt !== 0)

    
}


main();
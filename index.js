require('dotenv').config();
const {
    leerInput,
    inquirerMenu,
    pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

console.clear();
console.log('hola mundo');

console.log('variable entornos -> ');
console.log(process.env);
console.log(process.env.MAPBOX_KEY);

const main = async() => {
    const busquedas = new Busquedas;
    let opt = 0;

    do {
        opt = await inquirerMenu();

        switch(opt) {
            case 1:
                const lugar = await leerInput('Ciudad:');
                console.log(lugar);
                busquedas.ciudad(lugar);
                //MOstrar mensaje
                //buscar los lugares
                //Seleccionar el lugar
                //Clima
                //Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ');
                console.log('Lat: ');
                console.log('Lng: ');
                console.log('Temperatura: ');
                console.log('Minima: ');
                console.log('Maxima: ');
            break;
            case 2:
                await leerInput('Hola:');
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
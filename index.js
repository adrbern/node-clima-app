const {
    leerInput,
    inquirerMenu,
    pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

console.clear();
console.log('hola mundo');

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
                console('\nInformacion de la ciudad\n'.green);
                console('Ciudad: ');
                console('Lat: ');
                console('Lng: ');
                console('Temperatura: ');
                console('Minima: ');
                console('Maxima: ');
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
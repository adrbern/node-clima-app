const { green } = require('colors');
const inquire = require('inquirer');
require('colors');

const preguntas = [
    {
        type: "list",
        name: "opcion",
        message: "¿Que desea hacer?",
        choices: [
            {
                value: 1,
                name: `${"1.".green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${"2.".green} Historial`
            },
            {
                value: 0,
                name: `${"0.".green} Salir`
            }
        ]
    }
];

const salida = {
    type: "input",
    name: "salidaOpt",
    message: `Presione ${ 'ENTER'.green} para continuar\n`
}


const inquirerMenu = async() => {
    console.log('========================='.green);
    console.log(' Selecciona una opcion'.white);
    console.log('=========================\n'.green);

    const { opcion } = await inquire.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    console.log('\n');
    const { salidaOpt } = await inquire.prompt(salida);


    return salidaOpt;
}

const leerInput = async(message) => {
    const question = [
        {
            type: "input",
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0) {
                    return "Por favor ingrese un valor";
                }

                return true;
            }
        }
    ];

    const { desc } = await inquire.prompt(question);

    return desc;
}

const listarLugares = async(lugares) => {
    const choices = lugares.map(({id, nombre}, index) => {
        const idx = `${index+1}.`;

        return {
            value: id,
            name: `${idx} ${nombre}`
        };
    })
    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    })
    console.log(choices);

    const preguntas = [
        {
            type: "list",
            name: "id",
            message: "Seleccione lugar:",
            choices
        }
    ]

    const { id } = await inquire.prompt(preguntas);

    return id;
}

const mostrarListadoChecklist = async(tareas = []) => {
    const choices = tareas.map(({id, desc, completadoEn}, index) => {
        const idx = `${index+1}.`;

        return {
            value: id,
            name: `${idx} ${desc}`,
            checked: completadoEn ? true: false
        };
    })
 
    console.log(choices);

    const preguntas = [
        {
            type: "checkbox",
            name: "ids",
            message: "Selecciones",
            choices
        }
    ]

    const { ids } = await inquire.prompt(preguntas);

    return ids;
}

const confirmar = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message: ''
    }];
    const { ok } = await inquire.prompt(question);

    return ok;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    mostrarListadoChecklist,
    confirmar
}
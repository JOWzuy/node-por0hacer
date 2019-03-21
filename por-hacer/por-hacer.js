const fs = require('fs');


let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err => {
        if (err) throw new Error('No se pudo grabar', err);


    }))

}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];

    }


}
const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false,
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;

}

const getListado = () => {
        cargarDB();
        return listadoPorHacer;


    }
    //default
const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        // me devuelve si encontro la descripcion de la tarea si es igual a la desc
        // que manda el usuario
        return tarea.descripcion === descripcion;

    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;

    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;

    } else {

        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;

    }


}

module.exports = {

    crear,
    getListado,
    actualizar,
    borrar
}
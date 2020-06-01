'use strict'

let txtnombres,
    txtapellidoPa,
    txtapellidoMa,
    txtdireccion,
    region,
    provincia,
    comuna,
    bAgregar,
    bEliminar,
    campos,
    tablaPer

txtnombres = document.getElementById('Nombres');
txtapellidoPa = document.getElementById('apellidoPa');
txtapellidoMa = document.getElementById('apellidoMa');
txtdireccion = document.getElementById('direccion');
region = document.getElementById('selecReg');
provincia = document.getElementById('selecPro');
comuna = document.getElementById('selecCom');
bAgregar = document.getElementById('btnAgregar');
bEliminar = document.getElementById('btnEliminar');
tablaPer = document.getElementById("tablaPer").tBodies[0];
const dropRegion = document.getElementById('selecReg');
const dropProvincia = document.getElementById('selecPro');
const dropComuna = document.getElementById('selecCom');

campos = txtnombres, txtapellidoMa, txtapellidoPa, txtdireccion

bAgregar.addEventListener("click", () => {
    Agregar();
})

bEliminar.addEventListener("click", () => {
    Eliminar();
})

let dataJson;

readTextFile("chile.json", text => {
    dataJson = JSON.parse(text);
    console.log(dataJson);
});

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

onload = function () {
    Iniciar();
}

function Iniciar() {
    inicializaRegion();
    inicializaProvincia();
    inicializaComuna();

    for (let i = 0; i < dataJson.length; i++) {
        var option = document.createElement("option");
        option.value = i + 1
        option.text = dataJson[i].region;
        dropRegion.appendChild(option)
    }
}

function inicializaComuna() {
    dropComuna.options.length = 0;
    var option = document.createElement("option");
    option.value = "0"
    option.text = "::  Seleccione Comuna  ::";
    dropComuna.appendChild(option);
}

function inicializaProvincia() {
    dropProvincia.options.length = 0;
    var option = document.createElement("option");
    option.value = "0"
    option.text = "::  Seleccione Provincia  ::";
    dropProvincia.appendChild(option)
}

function inicializaRegion() {
    dropRegion.options.length = 0;
    var option = document.createElement("option");
    option.value = "0"
    option.text = "::  Seleccione Región  ::";
    dropRegion.appendChild(option)
}

// onload = function () {
//     Iniciar();

//     dropRegion.options.length = 0; //Limpia el select
//     let option = document.createElement("option"); //Configura el option del select
//     option.value = "0";
//     option.text = ":: Seleccione Region :: ";
//     dropRegion.appendChild(option); //Agrega el primer elemento a mostrar

//     for (let i = 0; i < dataJson.length; i++) {
//         let option = document.createElement("option");
//         option.value = i;
//         option.text = dataJson[i].region;
//         dropRegion.appendChild(option);
//     } 
// }

// function Iniciar() {
//     Limpiar();
//     // console.log(dataJson.length);
//     // cargarRegion();
//     // cargarComuna();
// }

// function cargarRegion() {
//     dropRegion.options.length = 0; //Limpia el select
//     let option = document.createElement("option"); //Configura el option del select
//     option.value = "0";
//     option.text = ":: Seleccione Region :: ";
//     dropRegion.appendChild(option); //Agrega el primer elemento a mostrar

//     for (let i = 0; i < dataJson.length; i++) {
//         let option = document.createElement("option");
//         option.value = i;
//         option.text = dataJson[i].region;
//         dropRegion.appendChild(option);
//     }
// }

// function cargarProvincia(id_Region) {
//     dropProvincia.options.length = 0;
//     let option = document.createElement("option");
//     option.value = "0";
//     option.text = " :: Seleccione Provincia ::";
//     dropProvincia.appendChild(option);

//     for (let j = 0; j < dataJson.length; j++) {
//         let option = document.createElement("option");
//         option.value = j;
//         option.text = dataJson[j].provincia;
//         dropProvincia.appendChild(option);
//     }
// }

// function cargarComuna() {
//     dropComuna.options.length = 0;
//     let option = document.createElement("option");
//     option.value = "0";
//     option.text = " :: Seleccione Comuna ::";
//     dropComuna.appendChild(option);
//     for (let j = 0; j < dataJson.length; j++) {
//         let option = document.createElement("option");
//         option.value = j;
//         option.text = dataJson[j].comunas;
//         dropComuna.appendChild(option);
//     }
// }

function Agregar() {
    if (campos.value !== "") {
        if (filaSelec == null) {
            agregarPers(campos.value);
        } else {
            filaSelec.cells[0].innerHTML = txtnombres.value;
            filaSelec.cells[1].innerHTML = txtapellidoPa.value;
            filaSelec.cells[2].innerHTML = txtapellidoMa.value;
            filaSelec.cells[3].innerHTML = txtdireccion.value;
        }
        Limpiar();
    }
}

function agregarPers(txtnombres, txtapellidoPa, txtapellidoMa, txtdireccion) {
    let fila = tablaPer.insertRow(0),
        Cnombre = fila.insertCell(0),
        CapeP = fila.insertCell(1),
        CapeM = fila.insertCell(2),
        Cdire = fila.insertCell(3);

    Cnombre.innerHTML = txtnombres;
    CapeP.innerHTML = txtapellidoPa;
    CapeM.innerHTML = txtapellidoMa;
    Cdire.innerHTML = txtdireccion;

    // fila.addEventListener("click", () => {
    //     tomarFila(this);
    // });
}

function tomarFila(fila) {
    txtnombres.value = fila.cells[0].innerHTML;
    txtapellidoPa.value = fila.cells[1].innerHTML;
    txtapellidoMa.value = fila.cells[2].innerHTML;
    txtdireccion.value = fila.cells[3].innerHTML;

    filaSelec = fila;
}

function Eliminar() {}

function Limpiar() {
    campos = "";
    txtnombres.focus();
}




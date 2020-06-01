'use strict'

let txtnombres,
    txtapellidoPa,
    txtapellidoMa,
    txtdireccion,
    bAgregar,
    bEliminar,
    campos
    // tablaPer

txtnombres = document.getElementById('Nombres')
txtapellidoPa = document.getElementById('apellidoPa')
txtapellidoMa = document.getElementById('apellidoMa')
txtdireccion = document.getElementById('direccion')
bAgregar = document.getElementById('btnAgregar')
bEliminar = document.getElementById('btnEliminar')
// tablaPer = document.getElementById("tabla").tBodies[0];

const dropRegion = document.getElementById('selecReg');
const dropProvincia = document.getElementById('selecPro');
const dropComuna = document.getElementById('selecCom');

let dataJson;

function jsonData() {
    return new Promise((resolve, reject) => {
        readTextFile("chile.json", text => {
            if (text != "") {
                dataJson = JSON.parse(text);
                resolve(dataJson)
                console.log(dataJson);
            } else {
                reject(false)
            }
        })
    });
}

console.log(jsonData());

function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
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
    jsonData().then(val => {
        console.log(val.length);
        for (let i = 0; i < val.length; i++) {
            let option = document.createElement("option");
            option.value = i + 1
            option.text = dataJson[i].region;
            dropRegion.appendChild(option)
        }
    })
}

let idRegion;

dropRegion.addEventListener("change", (e) => {
    idRegion = e.target.value -1 
    inicializaProvincia();
    for(let i = 0; i < dataJson[idRegion].provincias.length;i++){
        let option = document.createElement("option");
        option.value = i + 1
        option.text = dataJson[idRegion].provincias[i].name;
        dropProvincia.appendChild(option)
    }
})

function inicializaComuna() {
    dropComuna.options.length = 0;
    let option = document.createElement("option");
    option.value = "0"
    option.text = "::  Seleccione Comuna  ::";
    dropComuna.appendChild(option);
}

function inicializaProvincia(idRegion) {
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

function Eliminar() { }

function Limpiar() {
    campos = "";
    txtnombres.focus();
}




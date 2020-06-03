'use strict'

let nombre,
    paterno,
    materno,
    direccion,
    bAgregar,
    bEliminar,
    campos,
    tablaPer,
    filaSelec

nombre  = document.getElementById('Nombre')
paterno = document.getElementById('ApellidoPat')
materno = document.getElementById('ApellidoMat')
direccion = document.getElementById('Direccion')
bAgregar = document.getElementById('btnAgregar')
bEliminar = document.getElementById('btnEliminar')
tablaPer = document.getElementById("tablaPer").tBodies[0];

bAgregar.addEventListener("click",() => {
    
    Agregar();
 })


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

let idProvincia;
dropProvincia.addEventListener("change",(e) => {
    idProvincia = e.target.value - 1
    inicializaComuna();
    for(let i = 0; i < dataJson[idRegion].provincias[idProvincia].comunas.length; i++){
        let option = document.createElement("option");
        option.value = i + 1 
        option.text = dataJson[idRegion].provincias[idProvincia].comunas[i].name;
        dropComuna.appendChild(option)
    }
})

let idComuna

dropComuna.addEventListener("click", (e) => {
    idComuna = e.target.value -1
    for(let i = 0; i < dataJson[idRegion].provincias[idProvincia].comunas[idComuna]; i++){
        let option = document.createElement("option");
        option.value = i + 1 
        option.text = dataJson[idRegion].provincias[idProvincia].comunas[i].name;
        
        // optext = option.text;
        dropComuna.append(option)
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
    if (nombre.value == "" && paterno == "" && materno == "" &&  direccion == "") {
        agregarPers();
        if (filaSelec == null) {
        } else {
            filaSelec.cells[0].innerHTML = nombre.value;
            filaSelec.cells[1].innerHTML = paterno.value;
            filaSelec.cells[2].innerHTML = materno.value;
            filaSelec.cells[3].innerHTML = direccion.value;
            filaSelec.cells[4].innerHTML = dropComuna.options[dropComuna.value ].textContent; 
        }

    }
}

const agregarPers = () => {
    
    let row
    let table = document.getElementById("tablaPer")
    let count = table.rows.length;
          row = table.insertRow(count);
        row.insertCell(0).innerHTML = nombre.value
        row.insertCell(1).innerHTML = paterno.value
        row.insertCell(2).innerHTML = materno.value
        row.insertCell(3).innerHTML = direccion.value
        row.insertCell(4).innerHTML = dropComuna.options[dropComuna.value ].textContent
    Limpiar();

    row.addEventListener("click",() =>{
        tomarFila(this)
    })
}

const tomarFila = (row) => {
    nombre.value     = row.cells[0].innerHTML;
    paterno.value    = row.cells[1].innerHTML;
    materno.value    = row.cells[2].innerHTML;
    direccion.value  = row.cells[3].innerHTML;
    dropComuna.options[dropComuna.value ].textContent = row.cells[4].innerHTML;
    filaSelec = row;
}

// function Eliminar() { }

let Limpiar = () => {
    nombre.value    = "";
    paterno.value   = "";
    materno.value   = "";
    direccion.value = "";
    nombre.focus()
}




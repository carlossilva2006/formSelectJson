'use strict'

let nombre,
    paterno,
    materno,
    direccion,
    bAgregar,
    bEliminar,
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

bEliminar.addEventListener("click",() => {
    Eliminar();
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

const Agregar = () => {
    if (nombre.value == "" && paterno.value == "" && materno.value == "" && direccion.value =="" && dropComuna.value =="" || dropComuna.value == 0) {
        alert("debe llenar todos los campos");
    }else if (filaSelec == null) {
        agregarPers();
        } else {
            filaSelec.cells[0].innerHTML = nombre.value;
            filaSelec.cells[1].innerHTML = paterno.value;
            filaSelec.cells[2].innerHTML = materno.value;
            filaSelec.cells[3].innerHTML = direccion.value;
            filaSelec.cells[4].innerHTML = dropComuna.options[dropComuna.value ].textContent; 
        }
        Limpiar();
}

const agregarPers = () => {
    let fila    = tablaPer.insertRow(0),
        celdaN  = fila.insertCell(0),
        celdaAP = fila.insertCell(1),
        celdaAM = fila.insertCell(2),
        celdaD  = fila.insertCell(3),
        celdaCo = fila.insertCell(4);
        
    celdaN.innerHTML  = nombre.value
    celdaAP.innerHTML = paterno.value
    celdaAM.innerHTML = materno.value
    celdaD.innerHTML  = direccion.value
    celdaCo.innerHTML = dropComuna.options[dropComuna.value ].textContent

    Limpiar();

    fila.addEventListener("click",() =>{
        tomarFila(fila)
    })
}


const tomarFila = (fila) => {
    
    nombre.value     = fila.cells[0].innerHTML;
    paterno.value    = fila.cells[1].innerHTML;
    materno.value    = fila.cells[2].innerHTML;
    direccion.value  = fila.cells[3].innerHTML;
    dropComuna.options[dropComuna.value ].textContent = fila.cells[4].innerHTML;
    filaSelec = fila;
    
}

let Limpiar = () => {
    nombre.value    = "";
    paterno.value   = "";
    materno.value   = "";
    direccion.value = "";
    dropRegion.options[dropRegion.value ].innerHTML = "::  Seleccione Region  ::";
    dropProvincia.options[dropProvincia.value ].innerHTML = "::  Seleccione Provincia  ::";
    dropComuna.options[dropComuna.value ].innerHTML = "::  Seleccione Comuna  ::";
    nombre.focus()
}

const Eliminar = () => {
    if(filaSelec !== null){
        tablaPer.deleteRow(filaSelec.rowIndex - 1)
        Limpiar()
    }
}


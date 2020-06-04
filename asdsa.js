const dropRegion = document.getElementById("region");
const dropProvincia = document.getElementById("provincia");
const dropComuna = document.getElementById("comuna");
const input_nombre = document.getElementById("nombres");
const input_paterno = document.getElementById("paterno");
const input_materno = document.getElementById("materno");
const input_direccion = document.getElementById("direccion");
const btn_eliminar = document.getElementById("eliminar");
const btn_agregar = document.getElementById("agregar");

let dataJson;
let idRegion;
let idProvincia;

function jsonData() {
    return new Promise((resolve, reject) => {
        readTextFile("chile.json", text => {
            if (text != "") {
                dataJson = JSON.parse(text);
                resolve(dataJson)
                console.log(dataJson);
                inicializa();
            } else {
                reject(false)
            }
        })
    });
}

//console.log(jsonData());

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
    jsonData();
};


dropRegion.addEventListener('change', function (e) {
    //console.log(e);
    idRegion = e.target.value - 1;

    inicializaProvincia();
    inicializaComuna();

    if (dataJson[idRegion].provincias.length > 0) {
        console.log(dataJson[e.target.value - 1].provincias.length);
        var option = document.createElement("option");
        dropComuna.appendChild(option)
        llenaProvincias(idRegion);
    }
});


function llenaProvincias(idRegion) {
    for (let j = 0; j < dataJson[idRegion].provincias.length; j++) {
        var option = document.createElement("option");
        //console.log(dataJson[idRegion].provincias[j].name);
        option.value = j + 1
        option.text = dataJson[idRegion].provincias[j].name;
        dropProvincia.appendChild(option);
    }
}

dropProvincia.addEventListener('change', function (e) {
    dropComuna.options.length = 0;
    idProvincia = e.target.value - 1;
    console.log(idRegion, idProvincia);
    console.log(e);
    var option = document.createElement("option");
    option.value = 0;
    option.text = ":: Seleccione Provincia ::"
    dropComuna.appendChild(option);
    if (dataJson[idRegion].provincias[idProvincia].comunas.length > 0) {
        //console.log(dataJson[idRegion].provincias[idProvincia].comunas.length);
        //console.log(idRegion, idProvincia + 1);
        llenaComunas(idRegion, idProvincia);
    }
});


function llenaComunas(idRegion, idProvincia) {
    console.log(dataJson[idRegion].provincias[idProvincia].length);
    for (let j = 0; j < dataJson[idRegion].provincias[idProvincia].length; j++) {
        var option = document.createElement("option");
        console.log(j);
        console.log(dataJson[idRegion].provincias[idProvincia].comunas[j].name);

        option.value = j + 1
        option.text = dataJson[idRegion].provincias[idProvincia].comunas[j].name;
        dropComuna.appendChild(option);
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
    for (let i = 0; i < dataJson.length; i++) {
        var option = document.createElement("option");
        option.value = i + 1
        option.text = dataJson[i].region;
        dropRegion.appendChild(option)
    }
}

function inicializa() {
    inicializaRegion();
    inicializaProvincia();
    inicializaComuna();
    input_nombre.value = "";
    input_paterno.value = "";
    input_materno.value = "";
    input_direccion.value = "";
}

btn_eliminar.addEventListener('click', function () {
    inicializa();
})

btn_agregar.addEventListener('click', function () {

    if ((input_nombre.value != "") || (input_paterno.value != "")) {
        var row;
        var table = document.getElementById('tabla');
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.insertCell(0).textContent = input_nombre.value;
        row.insertCell(1).textContent = input_paterno.value;
        row.insertCell(2).textContent = input_materno.value;
        row.insertCell(3).textContent = input_direccion.value;
        row.insertCell(4).textContent = dropComuna.options[dropComuna.value].textContent;

        inicializa();

    }
});



/*
function llenaComunas(_idRegion, _idProvincia) {
    console.log(idRegion, idProvincia, dataJson[_idRegion].provincias[_idProvincia].comunas.length);

    for (let j = 0; j < dataJson[_idRegion].provincias[_idProvincia].comunas.length; j++) {
        var option = document.createElement("option");
        console.log(j);
        console.log(dataJson[_idRegion].provincias[_idProvincia].comunas[j].name);

        option.value = j + 1
        option.text = dataJson[_idRegion].provincias[_idProvincia].comunas[j].name;
        dropComuna.appendChild(option);
    }
}
*/

var table = document.getElementById('tabla');
table.addEventListener('click', (e) => {

    inicializa();

    input_nombre.value = e.target.parentElement.cells[0].textContent;
    input_paterno.value = e.target.parentElement.cells[1].textContent;
    input_materno.value = e.target.parentElement.cells[2].textContent;
    input_direccion.value = e.target.parentElement.cells[3].textContent;

let comuna = e.target.parentElement.cells[4].textContent;
    let tagCom = false;
    let idR, idP, idC
    for (let idReg = 0; idReg < dataJson.length; idReg++) {
        for (let idProv = 0; idProv < dataJson[idReg].provincias.length; idProv++) {
            for (let idCom = 0; idCom < dataJson[idReg].provincias[idProv].comunas.length; idCom++) {
                if (dataJson[idReg].provincias[idProv].comunas[idCom].name == comuna) {
                    tagCom = true;
                    idR = idReg;
                    idP = idProv;
                    idC = idCom;
                    break;
                }
                if (tagCom == true) { break; }
            }
            if (tagCom == true) { break; }
        }
        if (tagCom == true) { break; }
    }

    console.log(idR, idP, idC);
    dropRegion[idR + 1].selected = true;

    llenaProvincias(idR);
    dropProvincia[idP + 1].selected = true;

    llenaComunas(idR, idP)
    dropComuna[idC + 1].selected = true;


});
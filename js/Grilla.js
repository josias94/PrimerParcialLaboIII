// window.onload=function(){
//     $_Table(document.getElementById("d_tbl"));
//     let btnAgregar = document.getElementById("btnAgregar");
//     btnAgregar.addEventListener("click", Agregar);
// }

function $_Table(obj, array)
{       
    let arraykeys = Object.keys(array[0]);    
    //var arraykeys = ["Nombre", "Apellido", "Direccion", "DNI", "Edad"];//TODO: Sirve para harcorar el header
    let tabla = document.createElement("table");
    SetId(tabla, obj.id);
    if(array.length == 0){
        tabla.hidden = true;
    }
    tabla.appendChild($_Thead(arraykeys));
    tabla.appendChild($_Tbody(array));
    //tabla.appendChild($_Tfoot(array));//TODO: Josias Esto esta incompleto y harcodeado    
    
    tabla.setAttribute("border","1");
     
    obj.appendChild(tabla);
}

function $_Thead(arraykeys){
    var thead = document.createElement("thead");
    for(i = 0; i< arraykeys.length; i++)
    {
        var th = document.createElement("th"); 
        let head = arraykeys[i].substr(0 ,1).toUpperCase() + arraykeys[i].substr(1);
        th.appendChild(document.createTextNode(head));
        thead.appendChild(th);
    }    
    return thead;
}

function $_Tbody(array){
    var tbody = document.createElement("tbody");
    tbody.id = "tbody"
    //var arraykeys = Object.keys(array[0]);//TODO: Va a tomar de estructura para todos los objetos los datos que tenga el primero, si otro elemento trae un dato mas no lo muestra
    for(i = 0; i< array.length; i++)
    {
        var arraykeys = Object.keys(array[i]);//TODO: Revisar muestra las propiedades aunque los objetos tengan distinta estructura, mas completo - menos performante 
        var tr = document.createElement("tr");
        tr.id = "tr"+i;
        tr.addEventListener("click",TraerDatos);
        arraykeys.forEach(element => {
            tr.appendChild($_Td(array[i][element]));
        });        
        tbody.appendChild(tr);
    }   
    return tbody;
}

function $_Td(value){
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(value));
    return td;
}

function $_Tfoot(array){
    var arraykeys = Object.keys(array[0]);
    var tFoot = document.createElement("tfoot");
    var tr = document.createElement("tr");

    var td = document.createElement("td");
    td.appendChild(document.createTextNode("Total de personas:"));
    td.colSpan = arraykeys.length-1;
    tr.appendChild(td);

    var td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(array.length));
    tr.appendChild(td2);
     
    tFoot.appendChild(tr);
    return tFoot;
}

function SetId(obj, parentId, i){
    obj.id = parentId + "_" + obj.nodeName.toLowerCase();
    if(i != undefined)
    obj.id += "_" + i;
}





function Agregar(obj){
    var tr = document.createElement("tr");
    obj = JSON.parse(obj);
    var keys = Object.keys(obj);
    keys.forEach(element => {
        var a = element;
        tr.appendChild($_Td(obj[element]));
    });

    var tabla = document.getElementById("d_tbl_table");
    tabla.hidden = false;

    var body = "";
    tabla.childNodes.forEach(element => {        
        if(element.localName == "tbody"){
            body = element;
        }
    });

    body.appendChild(tr);
}

function Create(element){
    return document.createElement(element);
}

function CreateText(text){
    return document.createTextNode(text);
}

function FindTable(parentNode){
    var retorno = null;
    var obj = parentNode;
    obj.childNodes.forEach(element => {
        if(element.localName == "table"){
            retorno = element;
        }        
    });
    if(retorno == null){
        return FindTable(parentNode.parentNode);
    }
    else{
        return retorno;
    }    
}


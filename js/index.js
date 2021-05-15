window.addEventListener("load",function(){
    PeticionGET();
});

function PeticionGET(){
    var peticionHttp = new XMLHttpRequest();
    // $("preview-area").hidden = false;
    peticionHttp.onreadystatechange = function(){
        if(peticionHttp.readyState == 4){
            if(peticionHttp.status == 200){  
                let array = JSON.parse(peticionHttp.responseText);
                // $("preview-area").hidden = true;
                $_Table(document.getElementById("d_tbl"), array);
            }
        }        
    }
    peticionHttp.open("GET","http://localhost:3000/materias");    
    peticionHttp.send();
}

function TraerDatos(ev){
    $("divModificar").hidden = false;
    let tr = ev.target.parentNode;    

    $("impNombre").value = tr.childNodes[1].innerHTML;
    
    $("selCuatri").disabled = true;

    switch(tr.childNodes[2].innerHTML){
        case "1":
            $("selCuatri")[0].selected = true;            
            break;
        case "2":
            $("selCuatri")[1].selected = true;
            break;
        case "3":
            $("selCuatri")[2].selected = true;
            break;
    }
    if(tr.childNodes[4].innerHTML == "Noche"){
        $("radNoc").checked = true;
    }
    else{        
        $("radMan").checked = true;
    }
    var fecha = tr.childNodes[3].innerHTML;
    var array = fecha.split("/");
    $("impFecha").value = array[2] + "-" + array[1] + "-" + array[0];
    let btn = $("btnModif");
    btn.setAttribute("i",tr.childNodes[0].innerHTML);
    btn.setAttribute("rowIndex",tr.id);    
    btn.addEventListener("click", ModificarMateria);

    let btnBorrar = $("btnBorrar");
    btnBorrar.setAttribute("i",tr.childNodes[0].innerHTML);    
    btnBorrar.setAttribute("rowIndex",tr.id);
    btnBorrar.addEventListener("click", borrarMateria);
}

function $(id){
    return document.getElementById(id);
}

function ModificarMateria(){
    var peticionHttp = new XMLHttpRequest();
    $("preview-area").hidden = false;
    peticionHttp.onreadystatechange = function(){
        if(peticionHttp.readyState == 4){
            if(peticionHttp.status == 200){
                let array = peticionHttp.responseText; 
                console.log(array);   
                $("preview-area").hidden = true;
                if(JSON.parse(peticionHttp.responseText).type == "ok"){
                    ModificarTabla();
                }
            }
        }        
    }
    let btn = $("btnModif");
    let id = btn.attributes.i.value;


    let nombre = $("impNombre").value;
    if(nombre.length < 6){
        $("impNombre").className = "conError";
        $("preview-area").hidden = true;
        return;
    }
    else{
        $("impNombre").className = "sinError";
    }
    let cuatrimestre = "";
    
    var array = $("selCuatri").children;

    for (let index = 0; index < array.length; index++) {
        let option = array[index]; 
        if(option.selected){
            cuatrimestre = index+1;
            break;
        }
    }
    let fechaFinal = "";
    
    var fecha = $("impFecha").value;
    var array = fecha.split("-");
    fechaFinal = array[2] + "/" + array[1] + "/" + array[0];
   
    let turno = "";
    if($("radNoc").checked == true){
        turno = "Noche";
    }
    else{
        turno = "Mañana";
    }
    

    let materia ={"id": id, "nombre":nombre, "cuatrimestre": cuatrimestre, "fechaFinal":fechaFinal,"turno":turno};

    peticionHttp.open("POST","http://localhost:3000/editar");
    peticionHttp.setRequestHeader("content-type", "application/json");
    peticionHttp.send(JSON.stringify(materia));
}

function ModificarTabla(){
    let btn = $("btnModif");
    let i = btn.attributes.rowIndex.value;    

    let cuerpo = $("tbody");
    let tr = "";
    cuerpo.childNodes.forEach(element => {
        if(element.id == i)
        {
            tr = element;
        }
    });    

    if(tr != "")
    {
        let nombre = $("impNombre").value;
        let cuatrimestre = "";
        var array = $("selCuatri").children;

        for (let index = 0; index < array.length; index++) {
            let option = array[index]; 
            if(option.selected){
                cuatrimestre = index+1;
                break;
            }
        }
        let fechaFinal = "";
        
        var fecha = $("impFecha").value;
        var array = fecha.split("-");
        fechaFinal = array[2] + "/" + array[1] + "/" + array[0];
    
        let turno = "";
        if($("radNoc").checked == true){
            turno = "Noche";
        }
        else{
            turno = "Mañana";
        }
    

        let materia ={"nombre":nombre, "cuatrimestre": cuatrimestre, "fechaFinal":fechaFinal,"turno":turno};

        tr.childNodes[1].innerHTML = materia.nombre;
        tr.childNodes[2].innerHTML = materia.cuatrimestre;
        tr.childNodes[3].innerHTML = materia.fechaFinal;
        tr.childNodes[4].innerHTML = materia.turno;
    }
}

function borrarMateria(e){
    let btn = e.target;
    let id = btn.attributes.i.value;

    var peticionHttp = new XMLHttpRequest();
    $("preview-area").hidden = false;
    peticionHttp.onreadystatechange = function(){
        if(peticionHttp.readyState == 4){
            if(peticionHttp.status == 200){
                let array = peticionHttp.responseText; 
                console.log(array);   
                $("preview-area").hidden = true;
                if(JSON.parse(peticionHttp.responseText).type == "ok"){
                    BorrarElementoTabla();
                }
            }
        }        
    }

    peticionHttp.open("POST","http://localhost:3000/eliminar");
    peticionHttp.setRequestHeader("content-type", "application/json");
    var request = {"id":id};
    peticionHttp.send(JSON.stringify(request));
}

function BorrarElementoTabla(){
    let btn = $("btnBorrar");
    let id = btn.attributes.rowIndex.value;
    let tr = $(id);
    let tbody = tr.parentNode;
    tbody.removeChild(tr);
}
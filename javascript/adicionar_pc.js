let url_teste = 'pc';
let tabela = null;
let data = null;
let bus = new Array;

//criando as tags
function createH(hN){
    let h = document.createElement(hN);
    h.innerText = url_teste.replace("_", " ").replace("_", " ");
    return h;
}
function createLabel(file, file_tipo){
    let label = document.createElement('label');
    label.innerText = 'Coluna: ' + file.replace("_", " ").replace("_", " ") + ' | Tipo: ' + file_tipo;
    return label;
}
function createLabelBarramento(file){
    let label = document.createElement('label');
    label.innerText = 'Coluna: ' + file.replace("_", " ").replace("_", " ");
    return label;
}
function createInput(file, inputType){
    let input = document.createElement('input');
    input.setAttribute('placeholder', file);
    input.setAttribute('name', file);
    input.setAttribute('type', inputType);
    return input;
}
function createInputSubmit(){
    let input_submit = document.createElement('input');
    input_submit.setAttribute('type', 'submit');
    input_submit.setAttribute('value', 'Enviar');
    input_submit.setAttribute('name', 'Enviar');
    return input_submit;
}
function createInputHidden(){
    let input_hidden = document.createElement('input');
    input_hidden.setAttribute('value', url_teste);
    input_hidden.setAttribute('name', 'table');
    input_hidden.setAttribute('type', 'hidden');
    return input_hidden;
}
function createButton(){
    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    let barramento = "adicionarBarramento('barramento_"+url_teste+"')";
    button.setAttribute('onclick', barramento);
    button.innerText = 'Adicionar barramento';
    return button;
}
function createSelect(barramento){
    let select = document.createElement('select');
    select.setAttribute('name', 'barramento[]')
    select.setAttribute('id', barramento); 
    select.appendChild(createOption(""));
    
    select.setAttribute('onchange', "createBusLabels("+barramento+")");
    return select;
}
function createOption(barramento, barramento_id){
    let option = document.createElement('option');
    option.setAttribute('value', barramento_id);
    option.innerText = barramento;
    return option;
}
//criando o select dos barramentos
function createSelectBarramento(documentoPai, Id, data){
    documentoPai.appendChild(createSelect(Id));
    for(o = 0; o < data[1].length; o++){
        document.getElementById(Id).appendChild(createOption(data[1][o][2], data[1][o][0]));
    }
}
//pegando o tipo do input
function inputType(file_tipo){
    let inputType = null;
    if (file_tipo.includes("int") || file_tipo == "int" || file_tipo == "float" || file_tipo == "decimal" || file_tipo == "real"){
        inputType = "number";
    }
    else if(file_tipo.includes("char") || file_tipo == "char" || file_tipo == "binary" || file_tipo == "text" || file_tipo == "blob" || file_tipo == "enum" || file_tipo == "set"){
        inputType = "text";
    }
    else if(file_tipo.includes("time") || file_tipo == "date"){
        inputType = "date";
    }
    return inputType;
}

//carregando a tabela e os barramentos
function loadTable(path){
        //JSON request
        
        const json_request = new XMLHttpRequest();
        json_request.open('GET', path ,true);
        json_request.responseType = 'json';
    
        //assim que o json carregar
        json_request.onload = () =>{
            tabela = json_request.response;
            adicionarTabela(tabela);
            loadTablesPc('json/tabelas/pecas_pc.json');
        }
        json_request.send();
}
function loadTablesPc(path){
        //JSON request
        
        const json_request = new XMLHttpRequest();
        json_request.open('GET', path ,true);
        json_request.responseType = 'json';
    
        //assim que o json carregar
        json_request.onload = () =>{
            tabelas = json_request.response;
            for(let i = 0; i < tabelas.length; i++){
                loadTables('api/consulta_pecas_pc.php?table=' + tabelas[i]);
            }
        }
        json_request.send();
}

function loadTables(path){
    //JSON request
    
    const json_request = new XMLHttpRequest();
    json_request.open('GET', path ,true);
    json_request.responseType = 'json';

    //assim que o json carregar
    json_request.onload = () =>{
        data = json_request.response;
        bus.push(data);
        //console.log(bus);

        let form = document.querySelector('form');

        if (document.querySelector('select')){ 
            let numId = document.querySelectorAll('select');
            let numIdId = numId[numId.length -1].id;
            let id = parseInt(numIdId) + 1;
            createSelectBarramento(form, id, data);
        }
        else{
            createSelectBarramento(form, 1, data);
        }
    }
    json_request.send();
}

//imprimindo a tabela
function adicionarTabela(tabela){      
    let data = tabela;
    let form = document.querySelector('form');

    form.appendChild(createH('h1', url_teste));
    form.appendChild(createInputHidden(url_teste));

    for(i = 0; i < data[0].length; i++){
        let file = data[0][i];
        let file_tipo = data[1][i];
        
        form.appendChild(createLabel(file, file_tipo));
        form.appendChild(createInput(file, inputType(file_tipo)));
    }

    /*
    if(bus[1] != null){
        form.appendChild(createButton(url_teste));  
    }
    */

    if(document.querySelector("input[name='Enviar']")){
        document.querySelector("input[name='Enviar']").remove();
    }
    form.appendChild(createInputSubmit());
}

/*
function adicionarBarramento(url_barramento){
    let data = bus;
    
    //imprimindo o resultado
    let form = document.querySelector('form');

    form.appendChild(createH('h4', url_barramento));

    //criando os select
    if (document.querySelector('select')){ 
        let numId = document.querySelectorAll('select');
        let numIdId = numId[numId.length -1].id;
        let id = parseInt(numIdId) + 1;
        createSelectBarramento(form, id, bus);
    }
    else{
        createSelectBarramento(form, 1, bus);
    }

    if(document.querySelector("input[name='Enviar']")){
        document.querySelector("input[name='Enviar']").remove();
    }
    form.appendChild(createInputSubmit());
}
*/

function createBusLabels(id_barramento){    
    let form = document.querySelector('form');
    let select = document.getElementById(id_barramento);

    while(document.querySelector("#label" + id_barramento.toString())){
        document.querySelector("#label" + id_barramento.toString()).remove();
    }

    bus_teste = bus[id_barramento -1];
    console.log(bus_teste);
    console.log(select.value);

    for(let i = bus_teste[1][select.value - bus_teste[1][0][0]].length; i > 0; i--){
        let file = bus_teste[1][select.value - bus_teste[1][0][0]][i];
        let file_tipo = bus_teste[0][0][i];
    
        //criando os labels de acordo com option escolhido
        if(file_tipo != undefined){
            let tipo = select.form.insertBefore(document.createElement('label'), select.nextSibling);
            tipo.innerText = file + " ";
            tipo.setAttribute("id", 'label'+id_barramento);
            tipo.setAttribute("class", "bus_label");
            
            let tipo2 = select.form.insertBefore(document.createElement('label'), select.nextSibling);
            tipo2.innerText = file_tipo + ": ";
            tipo2.setAttribute("id", 'label'+id_barramento);
            tipo2.setAttribute("class", "bus_label_tipo");
        }
    }
    
    if(document.querySelector("input[name='Enviar']")){
        document.querySelector("input[name='Enviar']").remove();
    }
    form.appendChild(createInputSubmit());
}      
loadTable('json/tabelas/' + url_teste +'.json');
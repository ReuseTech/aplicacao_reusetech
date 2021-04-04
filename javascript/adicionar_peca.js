//pegando o nome da tabela
let url_teste = window.location.href.substring(window.location.href.indexOf("?") + 1);
url_teste = url_teste.substring(url_teste.indexOf("=") + 1);

//criando as tags
function createH1(url_teste){
    let h1 = document.createElement('h1');
    h1.innerText = url_teste.replace("_", " ").replace("_", " ");
    return h1;
}
function createLabel(file, file_tipo){
    let label = document.createElement('label');
    label.innerText = 'Coluna: ' + file.replace("_", " ").replace("_", " ") + ' | Tipo: ' + file_tipo;
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
    return input_submit;
}
function createInputHidden(url_teste){
    let input_hidden = document.createElement('input');
    input_hidden.setAttribute('value', url_teste);
    input_hidden.setAttribute('name', 'table');
    input_hidden.setAttribute('type', 'hidden');
    return input_hidden;
}
function createButton(url_teste){
    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    let barramento = "adicionarTabela('barramento_"+url_teste+"')";
    button.setAttribute('onclick', barramento);
    button.innerText = 'Adicionar barramento';
    return button;
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

function adicionarTabela(url_teste){
    //JSON request
    const json_request = new XMLHttpRequest();
    json_request.open('GET', 'json/tabelas/' + url_teste +'.json' ,true);
    json_request.responseType = 'JSON';

    //assim que o json carregar
    json_request.onload = () =>{
        let data = JSON.parse(json_request.response);
        
        //imprimindo o resultado
        let form = document.querySelector('form');

        form.appendChild(createH1(url_teste));
        form.appendChild(createInputHidden(url_teste));

        for(i = 0; i < data[0].length; i++){
            let file = data[0][i];
            let file_tipo = data[1][i];
            
            form.appendChild(createLabel(file, file_tipo));
            form.appendChild(createInput(file, inputType(file_tipo)));
            form.appendChild(document.createElement('br'));
        }
        if(!document.querySelector('button')){
            form.appendChild(createButton(url_teste));
            form.appendChild(createInputSubmit());
        }
    }
    json_request.send();
}   
adicionarTabela(url_teste);
let url_teste = window.location.href.substring(window.location.href.indexOf("?") + 1);
url_teste = url_teste.substring(url_teste.indexOf("=") + 1);

const json_request = new XMLHttpRequest();
const caminho = ('GET', 'json/tabelas/' + url_teste +'.json');
json_request.open('GET', caminho ,true);
json_request.responseType = 'JSON';

json_request.onload = () =>{
    let data = JSON.parse(json_request.response);
    
    let form = document.querySelector('form');

    let h1 = document.createElement('h1');
    h1.innerText = url_teste.replace("_", " ").replace("_", " ");
    form.appendChild(h1);

    for(i = 0; i < data[0].length; i++){
        let file = data[0][i];
        let file_tipo = data[1][i];

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
    
        let label = document.createElement('label');
        label.innerText = 'Coluna: ' + file.replace("_", " ").replace("_", " ") + ' | Tipo: ' + file_tipo;

        let input = document.createElement('input');
        input.setAttribute('placeholder', file);
        input.setAttribute('name', file);
        input.setAttribute('type', inputType);

        var br = document.createElement('br');
        
        
        form.appendChild(label);

        form.appendChild(input);
        form.appendChild(br);
    }
    let input_submit = document.createElement('input');
    input_submit.setAttribute('type', 'submit');
    input_submit.setAttribute('value', 'Voltar');
    form.appendChild(input_submit);
}

json_request.send();
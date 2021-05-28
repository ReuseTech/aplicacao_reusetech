//criando as tags
function createDiv(){
    let div = document.createElement("div");
    div.setAttribute("class", "peca");
    return div;
}
function createA(file){
    let a = document.createElement("a");
    a.setAttribute("href", "adicionar_peca.html?table=" + file);
    a.setAttribute("class", file);
    return a;
}
function createH1(file){
    let h1 = document.createElement("h1"); 
    h1.innerText = file.replace("_", " ").replace("_", " ");
    return h1;
}
function createAPc(){
    let a = document.createElement("a");
    a.setAttribute("href", "adicionar_pc.html");
    a.setAttribute("class", 'pc');
    return a;
}


//JSON request
const json_request = new XMLHttpRequest();
json_request.open('GET', 'json/pecas.json', true);
json_request.responseType = 'json';

//assim que o json carregar
json_request.onload = () =>{
    data = json_request.response;

    //imprimindo o resultado
    for (i = 0; i < data.length; i++){
        if(data[i] != 'pc'){
            let file = data[i];

            //inserindo as tags
            let coluna = document.querySelector("div.coluna");
            coluna.appendChild(createDiv()).
            appendChild(createA(file)).
            appendChild(createH1(file));            
        }
    }        
}

let coluna = document.querySelector("div.coluna");
coluna.appendChild(createDiv()).
appendChild(createAPc()).
appendChild(createH1('pc'));   

json_request.send();



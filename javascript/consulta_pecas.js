//variaveis globais

//JSON request
const json_request = new XMLHttpRequest();
json_request.open('GET', 'json/pecas.json%20', true);
json_request.responseType = 'json';

//assim que o json carregar
json_request.onload = () =>{
    data = json_request.response;

    //imprimindo o resultado
    for (i = 0; i < data.length; i++){
        let file = data[i];

        //DOOM
        //configurando as tags
        let coluna = document.querySelector("div.coluna");
        let div = document.createElement("div");
        div.setAttribute("class", "peca");

        let a = document.createElement("a");
        a.setAttribute("href", "pecas/adicionar_peca.php?table=" + file);
        a.setAttribute("class", file);

        let h1 = document.createElement("h1"); 
        h1.innerText = file.replace("_", " ").replace("_", " ");

        //criando as tags
        coluna.appendChild(div);
        div.appendChild(a);
        document.querySelector("a." + file).appendChild(h1);        
    }        
}
json_request.send();             
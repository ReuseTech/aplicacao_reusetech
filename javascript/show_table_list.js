let loadTablesList = (method, url) => {
    return new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open(method, url);
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(null);
        xhr.send();
    })
}

let showTables = (tables_list) => {
    for (i = 0; i < tables_list.length; i++){
        if(tables_list[i] !== 'pc') {
            let coluna = document.querySelector("div.coluna");
            coluna.appendChild(createDiv()).
            appendChild(createA(tables_list[i])).
            appendChild(createH1(tables_list[i]));  
        }          
    }
}
let showPc = () => {
    let coluna = document.querySelector("div.coluna");
    coluna.appendChild(createDiv()).
    appendChild(createAPc('pc')).
    appendChild(createH1('pc')); 
}

let createDiv = () => {
    let div = document.createElement("div");
    div.setAttribute("class", "peca");

    return div;
}
let createA = (table_name) => {
    let a = document.createElement("a");
    a.setAttribute("href", "insert_piece.php?table=" + table_name);
    a.setAttribute("class", table_name);

    return a;
}
let createH1 = (table_name) => {
    let h1 = document.createElement("h1"); 
    h1.innerText = table_name.replace("_", " ").replace("_", " ");

    return h1;
}
let createAPc = () => {
    let a = document.createElement("a");
    a.setAttribute("href", "adicionarPc.php");
    a.setAttribute("class", 'pc');

    return a;
}

loadTablesList('POST', '../api/cache/tables_list.json')
    .then((tables_list) => {
        showPc();
        showTables(tables_list)
    })




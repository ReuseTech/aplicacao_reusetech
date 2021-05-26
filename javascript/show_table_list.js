loadTablesList('POST', '../api/cache/tables_list.json')
    .then((tables_list) => show_tables(tables_list)
)
function loadTablesList(method, url) {
    return new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open(method, url);
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(null);
        xhr.send();
    })
}

function show_tables(tables_list){
    for (i = 0; i < tables_list.length; i++){
        let coluna = document.querySelector("div.coluna");
        coluna.appendChild(createDiv()).
        appendChild(createA(tables_list[i])).
        appendChild(createH1(tables_list[i]));            
    }
}

function createDiv(){
    let div = document.createElement("div");
    div.setAttribute("class", "peca");
    return div;
}
function createA(table_name){
    let a = document.createElement("a");
    a.setAttribute("href", "insert_piece.php?table=" + table_name);
    a.setAttribute("class", table_name);
    return a;
}
function createH1(table_name){
    let h1 = document.createElement("h1"); 
    h1.innerText = table_name.replace("_", " ").replace("_", " ");
    return h1;
}
function createAPc(){
    let a = document.createElement("a");
    a.setAttribute("href", "adicionar_pc.html");
    a.setAttribute("class", 'pc');
    return a;
}




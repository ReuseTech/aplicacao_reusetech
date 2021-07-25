import * as exports from '../javascript/listaDeTabelas.js';
Object.entries(exports).forEach(([name, exported]) => window[name] = exported);

//override
let showTables = (tables_list) => {
    for(let i = 0; i < tables_list.length; i++){
        if(tables_list[i].search('barramento') != -1) {
            let coluna = document.querySelector("div.coluna");
            coluna.appendChild(createDiv()).
            appendChild(createA(tables_list[i])).
            appendChild(createH1(tables_list[i]));  
        }    
    }
}    
//override
let createA = (table_name) => {
    let a = document.createElement("a");
    a.setAttribute("href", "inserirBarramentosEFKs.php?table=" + table_name);
    a.setAttribute("class", table_name);

    return a;
}


loadTablesList('POST', '../api/cache/tables_list.json')
    .then((tables_list) => {
        showTables(tables_list)
    })



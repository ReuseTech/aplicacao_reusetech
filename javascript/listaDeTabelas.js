export let loadTablesList = (method, url) => {
    return new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open(method, url);
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(null);
        xhr.send();
    })
}
export let createDiv = () => {
    let div = document.createElement("div");
    div.setAttribute("class", "peca");
    div.setAttribute('id', 'funcoes');

    return div;
}
export let createH1 = (table_name) => {
    let h1 = document.createElement("h1"); 
    h1.innerText = table_name.replace("_", " ").replace("_", " ");

    return h1;
}
export let createAPc = () => {
    let a = document.createElement("a");
    a.setAttribute("href", "adicionarPc.php");
    a.setAttribute("class", 'pc');

    return a;
}




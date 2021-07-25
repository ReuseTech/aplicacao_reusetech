import TableForm from './TableForm.js';

let loadJson = (method, url) => {
    return new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open(method, url);
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(null);
        xhr.send();
    })
}
let getTableName = () => {
    const queryString = window.location.search;
    const urlSearch = new URLSearchParams(queryString);
    return urlSearch.get('table');
}

let tableForm = new TableForm(getTableName());

loadJson('POST', '../api/cache/tabelas/' + getTableName() + '.json').then((namesAndTypesOfColumns) => {
    tableForm.createTitleWith(getTableName());
    tableForm.generateFormAbout(namesAndTypesOfColumns);
}).then(() => {
    try {
        let passwordInput = document.querySelector('input[placeholder=senha');
        passwordInput.type = 'password';
    } catch(error) {
        console.log(error);
        console.log('O Erro acima ocorreu porque não há uma tag input de senha');
    }
})



import TableForm from './TableForm.js';

let getTableName = () => {
    const queryString = window.location.search;
    const urlSearch = new URLSearchParams(queryString);
    return urlSearch.get('table');
}

let tableForm = new TableForm(getTableName());

tableForm.loadJson('POST', '../api/cache/tabelas/' + getTableName() + '.json').then((namesAndTypesOfColumns) => {
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



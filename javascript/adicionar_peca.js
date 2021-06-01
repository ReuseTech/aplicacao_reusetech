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

class DomElements {
    constructor(table_name) {
        this.table_name = table_name;
    }

    createH1 = (innerText) => {
        let h = document.createElement('h1');
        h.innerText = this.removeUnderlines(innerText);
        return h;
    }
    createLabel = (columnName, columnType) => {
        let label = document.createElement('label');
        label.innerText = 'Coluna: ' + this.removeUnderlines(columnName) + ' || tipo: ' + this.removeUnderlines(columnType);
        return label;
    }
    createInput = (file, inputType) => {
        let input = document.createElement('input');
        input.setAttribute('placeholder', this.removeUnderlines(file));
        input.setAttribute('name', file);
        input.setAttribute('type', inputType);
        return input;
    }
    createInputSubmit = () => {
        let input_submit = document.createElement('input');
        input_submit.setAttribute('type', 'submit');
        input_submit.setAttribute('value', 'Enviar');
        input_submit.setAttribute('name', 'Enviar');
        return input_submit;
    }
    createInputHidden = () => {
        let input_hidden = document.createElement('input');
        input_hidden.setAttribute('value', this.table_name);
        input_hidden.setAttribute('name', 'table');
        input_hidden.setAttribute('type', 'hidden');
        return input_hidden;
    }
    createButton = () => {
        let button = document.createElement('button');
        button.setAttribute('type', 'button');
        let barramento = "adicionarBarramento('barramento_" + this.table_name + "')";
        button.setAttribute('onclick', barramento);
        button.innerText = 'Adicionar barramento';
        return button;
    }

    removeUnderlines = (innerText) => {
        let newText = innerText.replace(/_/g, " ");
        return newText;
    }
    /*
    let createSelect = (barramento) => {
        let select = document.createElement('select');
        select.setAttribute('name', 'barramento[]')
        select.setAttribute('id', barramento); 
        select.appendChild(createOption(""));
        
        select.setAttribute('onchange', "createBusLabels("+barramento+")");
        return select;
    }
    
    let createOption = (barramento, barramento_id) => {
        let option = document.createElement('option');
        option.setAttribute('value', barramento_id);
        option.innerText = barramento;
        return option;
    }
    
    //criando o select dos barramentos
    let createSelectBarramento = (documentoPai, Id, data) =>{
        documentoPai.appendChild(createSelect(Id));
        for(o = 0; o < data[0].length; o++){
            document.getElementById(Id).appendChild(createOption(data[0][o][1], data[0][o][0]));
        }
    }
    */
}

class TableForm {
    constructor() {
        this.form = document.querySelector('form');
    }

    createForm = (tableColumns) => { 
        this.form.appendChild(domElements.createInputHidden()); //necessário para mandar para o back-end o nome da peça

        for(let columnName in tableColumns){
            this.form.appendChild(domElements.createLabel(columnName, tableColumns[columnName]));
            this.form.appendChild(domElements.createInput(columnName, this.getInputType(tableColumns[columnName])));
            this.form.appendChild(document.createElement('br'));
        }
        this.autoRecreateInputSubmit();
    }

    createTitle = (innerText) => {
        let body = document.querySelector('body');
        body.insertBefore(domElements.createH1(innerText), body.childNodes[2]);
    }

    getInputType = (file_tipo) => {
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

    autoRecreateInputSubmit = () => {
        if(document.querySelector("input[name='Enviar']")){
            document.querySelector("input[name='Enviar']").remove();
        }
        this.form.appendChild(domElements.createInputSubmit());
    }
}

let tableForm = new TableForm();
let domElements = new DomElements(getTableName());

loadJson('POST', '../api/cache/tabelas/' + getTableName() + '.json')
    .then((pieces_list) => {
        tableForm.createTitle(getTableName());
        tableForm.createForm(pieces_list);
    }
)














/*




//imprimindo a tabela

function adicionarBarramento(url_barramento){
    let data = bus;
    
    //imprimindo o resultado
    let form = document.querySelector('form');

    form.appendChild(createH('h4', url_barramento));

    //criando os select
    if (document.querySelector('select')){ 
        let numId = document.querySelectorAll('select');
        let numIdId = numId[numId.length -1].id;
        let id = parseInt(numIdId) + 1;
        createSelectBarramento(form, id, data);
    }
    else{
        createSelectBarramento(form, 1, data);
    }

    if(document.querySelector("input[name='Enviar']")){
        document.querySelector("input[name='Enviar']").remove();
    }
    form.appendChild(createInputSubmit());
}
function createBusLabels(id_barramento){
    let form = document.querySelector('form');
    let select = document.getElementById(id_barramento);

    let file = bus[0][parseInt(select.value)-1][1];
    let file_tipo = bus[1][1];
    let file2 = bus[0][parseInt(select.value)-1][2];
    let file2_tipo = bus[1][2];

    while(document.querySelector("#label" + id_barramento.toString())){
        document.querySelector("#label" + id_barramento.toString()).remove();
    }


    //criando os labels de acordo com option escolhido
    let tipo = select.form.insertBefore(document.createElement('label'), select.nextSibling);
    tipo.innerText = file2;
    tipo.setAttribute("id", 'label'+id_barramento);
    tipo.setAttribute("class", "bus_label");
    let tipo2 = select.form.insertBefore(document.createElement('label'), select.nextSibling);
    tipo2.innerText = file2_tipo;
    tipo2.setAttribute("id", 'label'+id_barramento);
    tipo2.setAttribute("class", "bus_label_tipo");  

    let barramento = select.form.insertBefore(document.createElement('label'), select.nextSibling);
    barramento.innerText = file;
    barramento.setAttribute('id', 'label'+id_barramento);
    barramento.setAttribute("class", "bus_label");
    let barramento2 = select.form.insertBefore(document.createElement('label'), select.nextSibling);
    barramento2.innerText = file_tipo;
    barramento2.setAttribute('id', 'label'+id_barramento);
    barramento2.setAttribute("class", "bus_label_tipo");

    form.appendChild(document.createElement('br'));  
    
    if(document.querySelector("input[name='Enviar']")){
        document.querySelector("input[name='Enviar']").remove();
    }
    form.appendChild(createInputSubmit());
}      
loadTable('json/tabelas/' + url_teste +'.json', loadBus);
*/
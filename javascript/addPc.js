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
let loadPiecesNamesAndRows = (pathToGetName, pathToGetRows) => {
    return new Promise((resolve, reject) => {
        loadJson('POST', pathToGetName)
            .then((namesAndTypesOfColumns) => {
        loadJson('POST', pathToGetRows)
            .then((busesRows) => {
                if(namesAndTypesOfColumns !== null) {
                    let form = tableForm.getForm();
    
                    let addSelectButton = form.appendChild(domElementsBus.createButtonWithCallback(() => {
                            form.appendChild(document.createElement('br'));
                            form.appendChild(document.createElement('br'));


                            let select = form.insertBefore(
                                domElementsBus.createSelectAboutRows(busesRows),
                                addSelectButton.nextSibling
                            );
                            form.insertBefore(document.createElement('br'), select);
                            form.insertBefore(document.createElement('br'), select);


                            let removeSelectButton = form.insertBefore(domElementsBus.createButtonWithCallback(() => {
                                ifExistsRemoveTagElement(`div[id='${select.name}']`);
                                select.remove();
                                removeSelectButton.remove();
                            }),
                            select.nextSibling
                            );
                            removeSelectButton.innerText = "Remover Select";
    
                            select.onchange = () => {
                                ifExistsRemoveTagElement(`div[id='${select.name}']`);
    
                                let selectDiv = tableFormBus.createUnchangableFormAbout(namesAndTypesOfColumns, select);
                                form.insertBefore(selectDiv, removeSelectButton.nextSibling)
                            }
                            form.insertBefore(document.createElement('br'), removeSelectButton.nextSibling);

                            tableFormBus.autoRecreateInputSubmit();
                        })
                    )
                            
                    tableFormBus.autoRecreateInputSubmit();
                    resolve(addSelectButton);
                }
            })
        })
    })
}
let getTableName = () => {
    return 'pc';
}
let ifExistsRemoveTagElement = (querySelector) => {
    if(document.querySelector(querySelector)) {
        document.querySelector(querySelector).remove();
    }
}

let checkIfIsOnBlackList = (element) => {
    let blackList = ['barramento', 'fk_', 'usuario', 'teclado', 'pc', 'outros', 'mouse', 'monitor', 'dispositivos_moveis'];

    for(let i = 0; i < blackList.length; i++) {
        if(element.search(blackList[i]) != -1) {
            return false;
        }
    }

    return true;
}

class DomElements {
    createH1WithInnerText = (innerText) => {
        let h = document.createElement('h1');
        h.innerText = this.removeUnderlinesFrom(innerText);

        return h;
    }
    createLabelWithColumnNameAndMySQLType = (columnName, columnType) => {
        let label = document.createElement('label');
        label.innerText = 'Coluna: ' + this.removeUnderlinesFrom(columnName) + ' || tipo: ' + this.removeUnderlinesFrom(columnType);

        return label;
    }
    createInputWithNameAndType = (inputName, inputType) => {
        let input = document.createElement('input');
        input.setAttribute('placeholder', this.removeUnderlinesFrom(inputName));
        input.setAttribute('name', inputName);
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
    createInputHiddenWithTableName = (tableName) => {
        let inputHidden = document.createElement('input');
        inputHidden.setAttribute('value', tableName);
        inputHidden.setAttribute('name', 'table');
        inputHidden.setAttribute('type', 'hidden');

        return inputHidden;
    }
    createButtonWithCallback = (callBack) => {
        let button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'button');
        button.addEventListener("click", callBack);
        button.innerText = 'Adicionar barramento';
        return button;
    }

    createDivWithSelectId = (selectId) => {
        let busDiv = document.createElement('div');
        busDiv.setAttribute('id', selectId);

        return busDiv;
    }

    createSelectAboutRows = (tableRows) => {
        let select = document.createElement('select');
        select.setAttribute('name', document.getElementsByTagName('select').length);
        select.setAttribute('id', document.getElementsByTagName('select').length);
        select.appendChild(document.createElement('option'));

        //TODO melhorar isso aqui
        for(let i = 0; i < tableRows.length; i++){
            let optionName = Object.keys(tableRows[1])[1];
            optionName = tableRows[i][optionName];
            let busId = tableRows[i]['id'];

            select.appendChild(
                this.createOptionWithInnerTextAndValue(optionName, busId)
            );
        }

        select.getCorrectBusToSelectValue = () => {
            for(let i = 0; i < tableRows.length; i++) {
                if(tableRows[i]['id'] == select.value){
                    return tableRows[i];
                }
            }
        }
        
        return select;
    }

    createOptionWithInnerTextAndValue = (innerText, value) => {
        let option = document.createElement('option');
        option.setAttribute('value', value);
        option.innerText = innerText;

        return option;
    }

    removeUnderlinesFrom = (innerText) => {
        let newText = innerText.replace(/_/g, " ");

        return newText;
    }
}

class TableForm {
    constructor() {
        this.dom = new DomElements();
    }

    generateFormAbout = (tableColumns) => { 
        this.getForm().appendChild(this.dom.createInputHiddenWithTableName(getTableName())); //necessário para mandar para o back-end o nome da peça

        for(let columnName in tableColumns){
            if(columnName !== "id__pc" && columnName !== 'id') {
                this.getForm().appendChild(
                    this.dom.createLabelWithColumnNameAndMySQLType(columnName, tableColumns[columnName])
                );
                this.getForm().appendChild(
                    this.dom.createInputWithNameAndType(columnName, this.getInputTypeFrom(tableColumns[columnName]))
                );
                this.getForm().appendChild(document.createElement('br'));
            }
        }
        this.autoRecreateInputSubmit();
    }
    createUnchangableFormAbout = (tableColumns, select) => {
        let busDiv = this.dom.createDivWithSelectId(select.id);

        let h1Bus = busDiv.appendChild(document.createElement('h1'));  
        h1Bus.innerText = "Barramento " + getTableName();

        for(let columnName in tableColumns){
            busDiv.appendChild(
                this.dom.createLabelWithColumnNameAndMySQLType(columnName, tableColumns[columnName])
            );
            let input = busDiv.appendChild( 
                this.dom.createInputWithNameAndType(columnName, this.getInputTypeFrom(tableColumns[columnName]))
            );
            input.value = select.getCorrectBusToSelectValue()[columnName];
            input.readOnly = true;
        }

        return busDiv;
        
    }

    createTitleWith = (innerText) => {
        let body = document.querySelector('body');
        body.insertBefore(this.dom.createH1WithInnerText(innerText), body.childNodes[2]);
    }

    getInputTypeFrom = (file_tipo) => {
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
        this.getForm().appendChild(this.dom.createInputSubmit());
    }
    
    getForm() {
        return document.querySelector('form');
    }
}

let tableForm = new TableForm();
let domElementsBus = new DomElements();
let tableFormBus = new TableForm();

loadJson('POST', '../api/cache/tabelas/pc.json').then((namesAndTypesOfColumns) => {
    tableForm.createTitleWith(getTableName());
    tableForm.generateFormAbout(namesAndTypesOfColumns);
})
.then(
    loadJson('POST', '../api/cache/tables_list.json')
    .then((piecesNameList) => {
        for(let i = 0; i < piecesNameList.length; i++) {
            if(checkIfIsOnBlackList(piecesNameList[i])) {
                loadPiecesNamesAndRows('../api/cache/tabelas/' + piecesNameList[i] + '.json', '../api/select_table_rows.php?table=' + piecesNameList[i])
                .then((button) => {
                    button.innerText = "Adicionar " + domElementsBus.removeUnderlinesFrom(piecesNameList[i]);
                    tableForm.getForm().appendChild(document.createElement('br'));
                })
            }
        }
    })
)


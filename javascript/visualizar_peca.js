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
let loadColumnsAndRows = (tablesName) => {
    return new Promise((resolve, reject) => {
        let promisesColumns = tablesName.map((tableName) => {
            return new Promise((resolve, reject) => {
                loadJson('POST', '../api/cache/tabelas/' + tableName +'.json').then((tableColumns) => {
                    resolve(tableColumns);
                });
            })
        });
        let promisesRows = tablesName.map((tableName) => {
            return new Promise((resolve, reject) => {
                loadJson('GET', '../api/select_table_rows.php?table='  + tableName).then((tableRows) => {
                    resolve(tableRows);
                });
            })
        });
    
        Promise.all(promisesColumns).then((tablesColumns) => {
            Promise.all(promisesRows).then((tablesRows) => {
                resolve([tablesColumns, tablesRows]);
            })
        })
    })
}

let ifExistsRemoveTagElement = (querySelector) => {
    if(document.querySelector(querySelector)) {
        document.querySelector(querySelector).remove();
    }
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
        select.setAttribute('name', 'busesIds[]');
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
        this.getForm().appendChild(this.dom.createInputHiddenWithTableName(getTableName())); //necessário para mandar informações para o back-end

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
    createUnchangableFormAbout = (tableColumns, tableRows) => {
        let busDiv = this.dom.createDivWithSelectId('1');

        for(let columnName in tableColumns){
            busDiv.appendChild(
                this.dom.createLabelWithColumnNameAndMySQLType(columnName, tableColumns[columnName])
            );
            let input = busDiv.appendChild( 
                this.dom.createInputWithNameAndType(columnName, this.getInputTypeFrom(tableColumns[columnName]))
            );
            input.value = tableRows[columnName];
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
let checkIfThereIsData = (tablesRows) => {
    if(tablesRows.length != 0) {
        return true;
    } else {
        return false;
    }
}
let checkIfTableIsFkByIndex = (tableName) => {
    if(tableName.search('fk_') == -1) {
        return false;
    } else {
        return true;
    }
}
let checkIfTableIsBusByIndex = (tableName) => {
    if(tableName.search('barramento') == -1) {
        return false;
    } else {
        return true;
    }
}
let removeAllELementsFromExcept = (parentElement, querySelector) => {
    let childElement = parentElement.querySelector(querySelector);
    parentElement.innerHTML = '';
    parentElement.appendChild(childElement);
}


let tableForm = new TableForm();
let domElements = new DomElements();

loadJson('POST', '../api/cache/tables_list.json').then((tablesName) => {
    loadColumnsAndRows(tablesName).then((tablesColumnsAndRows) => {
        let tablesColumns = tablesColumnsAndRows[0];
        let tablesRowsList = tablesColumnsAndRows[1];
       
        tablesRowsList.forEach((tablesRows, index) => {
            if(checkIfThereIsData(tablesRows) && checkIfTableIsFkByIndex(tablesName[index]) == false && checkIfTableIsBusByIndex(tablesName[index]) == false) {
                tablesRows.forEach((tableRows) => {
                    tableForm.getForm().appendChild(
                        domElements.createH1WithInnerText(tablesName[index])
                    );
                    tableForm.getForm().appendChild(
                        tableForm.createUnchangableFormAbout(tablesColumns[index], tableRows)
                    );


                    tablesRowsList.forEach((tablesRowsFk, indexFk) => {
                        if(checkIfThereIsData(tablesRowsFk) && checkIfTableIsFkByIndex(tablesName[indexFk]) ) {
                            tablesRowsFk.forEach((tableRowsFk) => {
                                if(tableRows['id'] == tableRowsFk['id__' + tablesName[index]] && tablesName[indexFk] == 'fk_' + tablesName[index] + '_barramento') {

                                    
                                    tablesRowsList.forEach((tablesRowsBus, indexBus) => {
                                        if(checkIfThereIsData(tablesRowsBus) && checkIfTableIsBusByIndex(tablesName[indexBus]) ) {
                                            tablesRowsBus.forEach((tableRowsBus) => {
                                                if(tableRowsFk['id__barramento'] == tableRowsBus['id'] && tablesName[indexBus] == 'barramento_'+tablesName[index]) {
                                                    for(let i = 0; i < tableRowsFk['quantidade']; i++) {
                                                        tableForm.getForm().appendChild(
                                                            document.createElement('h4')
                                                        ).innerText = "barramento";
                                                        let div = tableForm.getForm().appendChild(
                                                            tableForm.createUnchangableFormAbout(tablesColumns[indexBus], tableRowsBus)
                                                        );
                                                        
                                                        removeAllELementsFromExcept(div, 'input[name=barramento');
                                                    }
                                                }
                                            })
                                        }
                                    });
                                }
                            })
                        }
                    });
                })
            }
        });
    })  
})

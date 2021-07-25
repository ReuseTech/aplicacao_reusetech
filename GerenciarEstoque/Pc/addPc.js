import TableForm from '../../javascript/TableForm.js';
import DomElements from '../../javascript/DomElements.js';

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
let loadPiecesNamesAndRows = (pathToGetName, pathToGetRows, piecesName) => {
    return new Promise((resolve, reject) => {
        loadJson('POST', pathToGetName)
            .then((namesAndTypesOfColumns) => {
        loadJson('POST', pathToGetRows)
            .then((busesRows) => {
                if(namesAndTypesOfColumns !== null) {
                    let form = tableForm.getForm();
    
                    let addSelectButton = form.appendChild(domElementsBus.createButtonWithCallback(() => {
                            let select = form.insertBefore(
                                domElementsBus.createSelectAboutRowsAndTableName(busesRows, piecesName),
                                addSelectButton.nextSibling
                            );

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
    
                                let selectDiv = tableForm.createUnchangableFormAbout(namesAndTypesOfColumns, select);
                                form.insertBefore(selectDiv, removeSelectButton.nextSibling)
                            }

                            tableForm.autoRecreateInputSubmit();
                        })
                    )
                            
                    tableForm.autoRecreateInputSubmit();
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


let tableForm = new TableForm(getTableName());
//override
tableForm.createUnchangableFormAbout = (tableColumns, select) => {
    let busDiv = tableForm.dom.createDivWithSelectId(select.id);

    let h1Bus = busDiv.appendChild(document.createElement('h1'));  
    h1Bus.innerText = "Peça";

    for(let columnName in tableColumns){
        busDiv.appendChild(
            tableForm.dom.createLabelWithColumnNameAndMySQLType(columnName, tableColumns[columnName])
        );
        let input = busDiv.appendChild( 
            tableForm.dom.createInputWithNameAndType(columnName, tableForm.getInputTypeFrom(tableColumns[columnName]))
        );
        input.name = null;
        input.value = select.getCorrectBusToSelectValue()[columnName];
        input.readOnly = true;
    }

    return busDiv;
    
}

let domElementsBus = new DomElements();

domElementsBus.createSelectAboutRowsAndTableName = (tableRows, tableName) => {
    let select = document.createElement('select');
    select.setAttribute('name', tableName);
    select.setAttribute('id', document.getElementsByTagName('select').length);
    select.appendChild(document.createElement('option'));

    //TODO melhorar isso aqui
    for(let i = 0; i < tableRows.length; i++){
        let optionName = Object.keys(tableRows[i])[2];
        optionName = tableRows[i][optionName];
        let busId = tableRows[i]['id'];

        select.appendChild(
            domElementsBus.createOptionWithInnerTextAndValue(optionName, busId)
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

loadJson('POST', '../../api/cache/tabelas/pc.json').then((namesAndTypesOfColumns) => {
    tableForm.createTitleWith(getTableName());
    tableForm.generateFormAbout(namesAndTypesOfColumns);
})
.then(
    loadJson('POST', '../../api/cache/tables_list.json')
    .then((piecesNameList) => {
        for(let i = 0; i < piecesNameList.length; i++) {
            if(checkIfIsOnBlackList(piecesNameList[i])) {
                loadPiecesNamesAndRows('../../api/cache/tabelas/' + piecesNameList[i] + '.json', '../../api/select_table_rows.php?table=' + piecesNameList[i], piecesNameList[i])
                .then((button) => {
                    button.innerText = "Adicionar " + domElementsBus.removeUnderlinesFrom(piecesNameList[i]);
                })
            }
        }
    })
)


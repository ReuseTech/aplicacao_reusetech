import TableForm from './TableForm.js';
import DomElements from './DomElements.js';

export let loadJson = (method, url) => {
    return new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open(method, url);
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(null);
        xhr.send();
    })
}
export let loadColumnsAndRows = (tablesName) => {
    return new Promise((resolve, reject) => {
        let promisesColumns = tablesName.map((tableName) => {
            return new Promise((resolve, reject) => {
                loadJson('POST', '../../api/cache/tabelas/' + tableName +'.json').then((tableColumns) => {
                    resolve(tableColumns);
                });
            })
        });
        let promisesRows = tablesName.map((tableName) => {
            return new Promise((resolve, reject) => {
                loadJson('GET', '../../api/select_table_rows.php?table='  + tableName).then((tableRows) => {
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

export let checkIfThereIsData = (tablesRows) => {
    if(tablesRows.length != 0) {
        return true;
    } else {
        return false;
    }
}
export let checkIfTableIsFkByIndex = (tableName) => {
    if(tableName.search('fk_') == -1) {
        return false;
    } else {
        return true;
    }
}
export let checkIfTableIsBusByIndex = (tableName) => {
    if(tableName.search('barramento') == -1) {
        return false;
    } else {
        return true;
    }
}
export let removeAllELementsFromExcept = (parentElement, querySelector) => {
    let childElement = parentElement.querySelector(querySelector);
    parentElement.innerHTML = '';
    parentElement.appendChild(childElement);
}

export let domElements = new DomElements();
export let tableForm = new TableForm();
//Overrride
tableForm.createUnchangableFormAbout = (tableColumns, tableRows) => {
    let busDiv = tableForm.dom.createDivWithSelectId('1');

    for(let columnName in tableColumns){
        busDiv.appendChild(
            tableForm.dom.createLabelWithColumnNameAndMySQLType(columnName, tableColumns[columnName])
        );
        let input = busDiv.appendChild( 
            tableForm.dom.createInputWithNameAndType(columnName, tableForm.getInputTypeFrom(tableColumns[columnName]))
        );
        input.value = tableRows[columnName];
        input.readOnly = true;
    }

    return busDiv;

}
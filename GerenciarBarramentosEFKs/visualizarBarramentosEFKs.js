import * as exports from '../javascript/vizualizarTuplas.js';
Object.entries(exports).forEach(([name, exported]) => window[name] = exported);

//override
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

loadJson('POST', '../api/cache/tables_list.json').then((tablesName) => {
    loadColumnsAndRows(tablesName).then((tablesColumnsAndRows) => {
        let tablesColumns = tablesColumnsAndRows[0];
        let tablesRowsList = tablesColumnsAndRows[1];
       
        tablesRowsList.forEach((tablesRows, index) => {
            if(checkIfThereIsData(tablesRows) && checkIfTableIsFkByIndex(tablesName[index]) == false && checkIfTableIsBusByIndex(tablesName[index]) == true) {
                tablesRows.forEach((tableRows) => {
                    tableForm.getForm().appendChild(
                        domElements.createH1WithInnerText(tablesName[index])
                    );
                    tableForm.getForm().appendChild(
                        tableForm.createUnchangableFormAbout(tablesColumns[index], tableRows)
                    );
                })
            }
            if(checkIfThereIsData(tablesRows) && checkIfTableIsFkByIndex(tablesName[index]) == true) {
                tablesRows.forEach((tableRows) => {
                    tableForm.getForm().appendChild(
                        domElements.createH1WithInnerText(tablesName[index])
                    );
                    tableForm.getForm().appendChild(
                        tableForm.createUnchangableFormAbout(tablesColumns[index], tableRows)
                    );
                })
            }
        });
    })  
})

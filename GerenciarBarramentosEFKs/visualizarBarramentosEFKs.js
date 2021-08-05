import * as exports from '../javascript/vizualizarTuplas.js';
Object.entries(exports).forEach(([name, exported]) => window[name] = exported);

let tableForm = new Viewer('', '../api/');

tableForm.loadJson('POST', '../api/cache/tables_list.json').then((tablesName) => {
    tableForm.loadColumnsAndRows(tablesName).then((tablesColumnsAndRows) => {
        let tablesColumns = tablesColumnsAndRows[0];
        let tablesRowsList = tablesColumnsAndRows[1];
       
        tablesRowsList.forEach((tablesRows, index) => {
            if(checkIfThereIsData(tablesRows) && checkIfTableIsFkByIndex(tablesName[index]) == false && checkIfTableIsBusByIndex(tablesName[index]) == true) {
                tablesRows.forEach((tableRows) => {
                    tableForm.getForm().appendChild(
                        createH1WithInnerText(tablesName[index])
                    );
                    tableForm.getForm().appendChild(
                        tableForm.createUnchangableFormAbout(tablesColumns[index], tableRows)
                    );
                })
            }
            if(checkIfThereIsData(tablesRows) && checkIfTableIsFkByIndex(tablesName[index]) == true) {
                tablesRows.forEach((tableRows) => {
                    tableForm.getForm().appendChild(
                        createH1WithInnerText(tablesName[index])
                    );
                    tableForm.getForm().appendChild(
                        tableForm.createUnchangableFormAbout(tablesColumns[index], tableRows)
                    );
                })
            }
        });
    })  
})

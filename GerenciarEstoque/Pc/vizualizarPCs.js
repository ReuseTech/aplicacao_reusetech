import * as exports from '../../javascript/vizualizarTuplas.js';
Object.entries(exports).forEach(([name, exported]) => window[name] = exported);

let tableForm = new Viewer('', '../../api/');

tableForm.loadJson('POST', '../../api/cache/tables_list.json').then((tablesName) => {
    tableForm.loadColumnsAndRows(tablesName).then((tablesColumnsAndRows) => {
        let tablesColumns = tablesColumnsAndRows[0];
        let tablesRowsList = tablesColumnsAndRows[1];
        
        tablesRowsList.forEach((tablesRows, index) => {
            if(tablesName[index].search('pc') != -1) {
                if(checkIfThereIsData(tablesRows)) {
                    tablesRows.forEach((tableRows) => {
                        tableForm.getForm().appendChild(
                            createH1WithInnerText(tablesName[index])
                        );
                        tableForm.getForm().appendChild(
                            tableForm.createUnchangableFormAbout(tablesColumns[index], tableRows)
                        );
                        
                        tablesRowsList.forEach((tablesRowsPieces, indexPiece) => {
                            if(checkIfThereIsData(tablesRowsPieces)) {
                                tablesRowsPieces.forEach((tableRowsPieces) => {
                                    if(tableRowsPieces['id__pc'] == tableRows['id']) {
                                        tableForm.getForm().appendChild(
                                            document.createElement('h4')
                                        ).innerText = tablesName[indexPiece];

                                        let div = tableForm.getForm().appendChild(
                                            tableForm.createUnchangableFormAbout(tablesColumns[indexPiece], tableRowsPieces)
                                        )     
                                    }
                                })
                            }
                        });
                    })
                }
            }
        });
    })  
})

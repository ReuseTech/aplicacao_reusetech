import * as exports from '../../javascript/vizualizarTuplas.js';
Object.entries(exports).forEach(([name, exported]) => window[name] = exported);

let tableForm = new Viewer('', '../../api/');

let checkIfThereIsDataOnArray = (array, arrayIndex, compareTo) => {
    for(let i = 0; i < array.length; i++) {
        if(array[i][arrayIndex] == compareTo) {
            return true;
        }
    }

    return false;
}


tableForm.loadJson('POST', '../../api/cache/tables_list.json').then((tablesName) => {
    tableForm.loadColumnsAndRows(tablesName).then((tablesColumnsAndRows) => {
        let tablesColumns = tablesColumnsAndRows[0];
        let tablesRowsList = tablesColumnsAndRows[1];
        
        tablesRowsList.forEach((tablesRows, index) => {
            if(tablesName[index].search('pc') == -1 && tablesName[index].search("usuario") == -1) {
                if(checkIfThereIsData(tablesRows) && checkIfTableIsFkByIndex(tablesName[index]) == false && checkIfTableIsBusByIndex(tablesName[index]) == false) {
                    tablesRows.forEach((tableRows) => {
                        tableForm.getForm().appendChild(
                            createH1WithInnerText(tablesName[index])
                        );
                        let div = tableForm.getForm().appendChild(
                            tableForm.createUnchangableFormAbout(tablesColumns[index], tableRows)
                        );

                        div.appendChild(createInputHiddenWithTableName(tablesName[index]));

                        changeTupleChangable(div);

                        tablesRowsList.forEach((tablesRowsFk, indexFk) => {
                            if(checkIfThereIsData(tablesRowsFk) && checkIfTableIsFkByIndex(tablesName[indexFk])) {
                                if(checkIfThereIsDataOnArray(tablesRowsFk, 'id__' + tablesName[index], tableRows['id'])) {

                                    tableForm.getForm().appendChild(
                                        document.createElement('h4')
                                    ).innerText = "barramentos";
                                    
                                    tablesRowsFk.forEach((tableRowsFk) => {                                    
                                        if(tableRows['id'] == tableRowsFk['id__' + tablesName[index]] && tablesName[indexFk] == 'fk_' + tablesName[index] + '_barramento') {
                                            
                                            tablesRowsList.forEach((tablesRowsBus, indexBus) => {
                                                if(checkIfThereIsData(tablesRowsBus) && checkIfTableIsBusByIndex(tablesName[indexBus]) ) {
                                                    tablesRowsBus.forEach((tableRowsBus) => {
                                                        if(tableRowsFk['id__barramento'] == tableRowsBus['id'] && tablesName[indexBus] == 'barramento_'+tablesName[index]) {
                                                            let div = tableForm.getForm().appendChild(
                                                                tableForm.createUnchangableFormAbout(tablesColumns[indexBus], tableRowsBus)
                                                            );
                                                            div.querySelector('input[name=barramento]').value += ' x' + tableRowsFk['quantidade'];
                                                                
                                                            removeAllELementsFromExcept(div, 'input[name=barramento]');
                                                            
                                                        }
                                                    })
                                                }
                                            });
                                        } 
                                    })
                                } 
                            }
                        });
                    })
                }
            }
        });
    })  
})

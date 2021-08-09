import * as exports from '../javascript/vizualizarTuplas.js';
Object.entries(exports).forEach(([name, exported]) => window[name] = exported);

let tableForm = new Viewer('', '../api/');

tableForm.loadJson('POST', '../api/cache/tables_list.json').then((tablesName) => {
    tableForm.loadColumnsAndRows(tablesName).then((tablesColumnsAndRows) => {
        let tablesColumns = tablesColumnsAndRows[0];
        let tablesRowsList = tablesColumnsAndRows[1];
       
        tablesRowsList.forEach((tablesRows, index) => {
            if(checkIfThereIsData(tablesRows) && (tablesName[index] == 'usuario')) {
                tablesRows.forEach((tableRows) => {
                    tableForm.getForm().appendChild(
                        createH1WithInnerText(tablesName[index])
                    );
                    let div = tableForm.getForm().appendChild(
                        tableForm.createUnchangableFormAbout(tablesColumns[index], tableRows)
                    );
                    changeTupleChangable(div);
                })
            }
        });
    }).then(() => {
        try {
            document.querySelector('input[placeholder=senha').type = 'password';
        } catch(error) {
            console.log(error);
            console.log('O Erro acima ocorreu porque não há uma tag input de senha');
        }
    })  
})

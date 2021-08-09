import TableForm from '../../javascript/TableForm.js';
import * as exports from '../../javascript/DomElements.js';
Object.entries(exports).forEach(([name, exported]) => window[name] = exported);

let getTableName = () => {
    const queryString = window.location.search;
    const urlSearch = new URLSearchParams(queryString);
    return urlSearch.get('table');
}
let ifExistsRemoveTagElement = (querySelector) => {
    if(document.querySelector(querySelector)) {
        document.querySelector(querySelector).remove();
    }
}

let tableForm = new TableForm(getTableName());

tableForm.loadJson('POST', '../../api/cache/tabelas/' + getTableName() + '.json')
.then((namesAndTypesOfColumns) => {
    tableForm.loadJson('GET', '../../api/select_table_s_table_not_null.php?table=' + getTableName())
    .then((tableNulls) => {
        tableForm.createTitleWith(getTableName());
        tableForm.generateFormAbout(namesAndTypesOfColumns, tableNulls);
    })
})
.then(tableForm.loadJson('POST', '../../api/cache/tabelas/' + "barramento_" + getTableName() + '.json')
    .then((namesAndTypesOfColumns) => {
        tableForm.loadJson('POST', '../../api/select_table_rows.php?table=barramento_' + getTableName())
        .then((busesRows) => {
            if(namesAndTypesOfColumns !== null) {
                let form = tableForm.getForm();

                form.appendChild(createButtonWithCallback(() => {

                        let select = form.appendChild(
                            createSelectAboutRows(busesRows)
                        );
                        let removeSelectButton = form.appendChild(createButtonWithCallback(() => {
                            ifExistsRemoveTagElement(`div[id='${select.id}']`);
                            select.remove();
                            removeSelectButton.remove();
                        })
                        );
                        removeSelectButton.innerText = "Remover Select";

                        select.onchange = () => {
                            ifExistsRemoveTagElement(`div[id='${select.id}']`);

                            let selectDiv = tableForm.createUnchangableFormAbout(namesAndTypesOfColumns, select);
                            form.insertBefore(selectDiv, removeSelectButton.nextSibling)
                        }
                        tableForm.autoRecreateInputSubmit();
                    })
                );
                        
                tableForm.autoRecreateInputSubmit();
            }
        })
    })
)

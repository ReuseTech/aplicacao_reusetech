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
let domElementsBus = new DomElements();

loadJson('POST', '../../api/cache/tabelas/' + getTableName() + '.json').then((namesAndTypesOfColumns) => {
    tableForm.createTitleWith(getTableName());
    tableForm.generateFormAbout(namesAndTypesOfColumns);
})
.then(
    loadJson('POST', '../../api/cache/tabelas/' + "barramento_" + getTableName() + '.json')
    .then((namesAndTypesOfColumns) => {
        loadJson('POST', '../../api/select_table_rows.php?table=barramento_' + getTableName())
        .then((busesRows) => {
            if(namesAndTypesOfColumns !== null) {
                let form = tableForm.getForm();

                form.appendChild(domElementsBus.createButtonWithCallback(() => {

                        let select = form.appendChild(
                            domElementsBus.createSelectAboutRows(busesRows)
                        );
                        let removeSelectButton = form.appendChild(domElementsBus.createButtonWithCallback(() => {
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

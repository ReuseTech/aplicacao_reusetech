import TableForm from './TableForm.js';
import * as exports from './DomElements.js';
Object.entries(exports).forEach(([name, exported]) => window[name] = exported);

export class Viewer extends TableForm {
    //override
    createUnchangableFormAbout = (tableColumns, tableRows) => {
        let busDiv = createDivWithSelectId('1');

        for(let columnName in tableColumns){
            busDiv.appendChild(
                createLabelWithColumnNameAndMySQLType(columnName, tableColumns[columnName])
            );
            let input = busDiv.appendChild( 
                createInputWithNameAndType(columnName, this.getInputTypeFrom(tableColumns[columnName]))
            );
            input.value = tableRows[columnName];
            input.readOnly = true;
        }
    
        return busDiv;
    }
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
export let changeTupleChangable = (div) => {
    let buttonReadOnlyChanger = div.insertBefore(createButtonWithCallback(() => {
        disableAllDivsExcept(div);
    }
    ), div.firstChild);  
    
    buttonReadOnlyChanger.innerText = 'Mudar para modo de alteração';
}
export let disableAllDivsExcept = (exceptionDiv) => {
    let exceptionDivButton = exceptionDiv.querySelector('button');

    if(exceptionDivButton.innerText == 'Mudar para modo de alteração') {
        changeAllChangeButtonsToDefault();
        setAllDivsChidrenReadOnly();
        setIsAllDivsDisabled(true);

        exceptionDiv.querySelectorAll('input').forEach((element) => {
            element.readOnly = false;
        });
        exceptionDiv.querySelectorAll('input').forEach((element) => {
            element.disabled = false;
        });

        removeAllInputSubmits()
        exceptionDiv.appendChild(
            createInputSubmit()
        );

        exceptionDivButton.innerText = 'Mudar para modo de apenas leitura';
    } 
    else if(exceptionDivButton.innerText == 'Mudar para modo de apenas leitura') {
        setAllDivsChidrenReadOnly();
        setIsAllDivsDisabled(false);
        removeAllInputSubmits();

        exceptionDivButton.innerText = 'Mudar para modo de alteração';
    } 
}
export let setAllDivsChidrenReadOnly = () => {
    document.querySelectorAll('form div').forEach((div) => {
        div.childNodes.forEach((element) => {
            element.readOnly = true;
        });
    });
}
export let changeAllChangeButtonsToDefault = () => {
    document.querySelectorAll('form div').forEach((div) => {
        let button = div.querySelector('button');

        if(button != null) {
            button.innerText = 'Mudar para modo de alteração';
        }
    })
}
export let setIsAllDivsDisabled = (boolean) => {
    document.querySelectorAll('form div').forEach((div) => {
        let allDivInputs = div.querySelectorAll('input');
        allDivInputs.forEach((elementChild) => {
            elementChild.disabled = boolean;
        })
    })
}
export let removeAllInputSubmits = () => {
    document.querySelectorAll('input[type=submit]').forEach((input) => {
        input.remove();
    });
}





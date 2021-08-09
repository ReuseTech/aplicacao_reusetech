export let createH1WithInnerText = (innerText) => {
    let h = document.createElement('h1');
    h.setAttribute('id', 'title');
    h.innerText = removeUnderlinesFrom(innerText);

    return h;
}
export let createLabelWithColumnNameAndMySQLType = (columnName, columnType, nullability) => {
    let label = document.createElement('label');
    label.innerText = 'Coluna: ' + removeUnderlinesFrom(columnName) + ' || tipo: ' + removeUnderlinesFrom(columnType);
    if(nullability != null) {
        label.innerText += ' || Pode ser Null:' + nullability
    }

    return label;
}
export let createInputWithNameAndType = (inputName, inputType) => {
    let input = document.createElement('input');
    input.setAttribute('placeholder', removeUnderlinesFrom(inputName));
    input.setAttribute('name', inputName);
    input.setAttribute('type', inputType);

    return input;
}
export let createInputSubmit = () => {
    let input_submit = document.createElement('input');
    input_submit.setAttribute('type', 'submit');
    input_submit.setAttribute('value', 'Enviar');
    input_submit.setAttribute('name', 'Enviar');

    return input_submit;
}
export let createInputHiddenWithTableName = (tableName) => {
    let inputHidden = document.createElement('input');
    inputHidden.setAttribute('value', tableName);
    inputHidden.setAttribute('name', 'table');
    inputHidden.setAttribute('type', 'hidden');

    return inputHidden;
}
export let createButtonWithCallback = (callBack) => {
    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.addEventListener("click", callBack);
    button.innerText = 'Adicionar barramento';
    return button;
}

export let createDivWithSelectId = (selectId) => {
    let busDiv = document.createElement('div');
    busDiv.setAttribute('id', selectId);

    return busDiv;
}

export let createSelectAboutRows = (tableRows) => {
    let select = document.createElement('select');
    select.setAttribute('name', 'busesIds[]');
    select.setAttribute('id', document.getElementsByTagName('select').length);
    select.appendChild(document.createElement('option'));

    //TODO melhorar isso aqui
    for(let i = 0; i < tableRows.length; i++){
        let optionName = Object.keys(tableRows[1])[1];
        optionName = tableRows[i][optionName];
        let busId = tableRows[i]['id'];

        select.appendChild(
            createOptionWithInnerTextAndValue(optionName, busId)
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

export let createOptionWithInnerTextAndValue = (innerText, value) => {
    let option = document.createElement('option');
    option.setAttribute('value', value);
    option.innerText = innerText;

    return option;
}

export let removeUnderlinesFrom = (innerText) => {
    let newText = innerText.replace(/_/g, " ");

    return newText;
}

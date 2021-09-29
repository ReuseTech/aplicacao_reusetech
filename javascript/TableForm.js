import * as exports from './DomElements.js';
Object.entries(exports).forEach(([name, exported]) => window[name] = exported);

export default class TableForm {
    generateFormAbout = (tableColumns, tableNulls) => { 
        this.getForm().appendChild(createInputHiddenWithTableName(this.tableName)); //necessário para mandar para o back-end o nome da peça

        for(let columnName in tableColumns){
            if(columnName !== "id__pc" && columnName !== 'id') {
                this.getForm().appendChild(
                    createLabelWithColumnNameAndMySQLType(columnName, tableColumns[columnName], tableNulls[columnName])
                );
                this.getForm().appendChild(
                    createInputWithNameAndType(columnName, this.getInputTypeFrom(tableColumns[columnName]))
                );
            }
        }
        this.autoRecreateInputSubmit();
    }

    createUnchangableFormAbout = (tableColumns, select) => {
        let busDiv = createDivWithSelectId(select.id);

        let h1Bus = busDiv.appendChild(document.createElement('h1'));  
        h1Bus.innerText = "Barramento " + this.tableName;

        for(let columnName in tableColumns){
            busDiv.appendChild(
                createLabelWithColumnNameAndMySQLType(columnName, tableColumns[columnName])
            );
            let input = busDiv.appendChild( 
                createInputWithNameAndType(columnName, this.getInputTypeFrom(tableColumns[columnName]))
            );
            input.value = select.getCorrectBusToSelectValue()[columnName];
            input.readOnly = true;
        }

        return busDiv;
        
    }

    createTitleWith = (innerText) => {
        let body = document.querySelector('form');
        let h1 = createH1WithInnerText(innerText);
        h1.setAttribute('id', 'title');
        body.insertBefore(h1, body.childNodes[2]);
    }

    getInputTypeFrom = (file_tipo) => {
        let inputType = null;
        if (file_tipo.includes("int") || file_tipo == "int" || file_tipo == "float" || file_tipo == "decimal" || file_tipo == "real"){
            inputType = "number";
        }
        else if(file_tipo.includes("char") || file_tipo == "char" || file_tipo == "binary" || file_tipo == "text" || file_tipo == "blob" || file_tipo == "enum" || file_tipo == "set"){
            inputType = "text";
        }
        else if(file_tipo.includes("time") || file_tipo == "date"){
            inputType = "date";
        }
        return inputType;
    }

    autoRecreateInputSubmit = () => {
        if(document.querySelector("input[name='Enviar']")){
            document.querySelector("input[name='Enviar']").remove();
        }
        this.getForm().appendChild(createInputSubmit());
    }
    
    getForm() {
        return document.querySelector('form');
    }
}
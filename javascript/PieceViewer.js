import * as exports from './vizualizarTuplas.js';
Object.entries(exports).forEach(([name, exported]) => window[name] = exported);


export default class PieceViewer extends Viewer {
    constructor(tableName, piecesInfoManager) {
        super();
        this.tableName = tableName
        this.piecesInfoManager = piecesInfoManager;
    }
    
    showTableAllPieces = (tableRows, index) => {
        tableRows.forEach((row) => {
            this.showPiece(row, index);
        });
    }
    showPiece = (row, index) => {
        let tableColumns = this.piecesInfoManager.allTablesColumns[index];

        this.getForm().appendChild(
            createH1WithInnerText(this.tableName)
        );
        let div = this.getForm().appendChild(
            this.createUnchangableFormWithColumnsAndRows(tableColumns, row)
        );

        div.appendChild(createInputHiddenWithTableName(this.tableName));

        changeTupleChangeable(div);

        let rowId = row['id'];
        this.showPieceBuses(rowId);
    }
    showUnchangeblePiece = (row, index) => {
        let tableColumns = this.piecesInfoManager.allTablesColumns[index];

        this.getForm().appendChild(
            createH1WithInnerText(this.tableName)
        );
        let div = this.getForm().appendChild(
            this.createUnchangableFormWithColumnsAndRows(tableColumns, row)
        );

        div.appendChild(createInputHiddenWithTableName(this.tableName));

        let rowId = row['id'];
        this.showPieceBuses(rowId);
    }
    showPieceBuses = (rowId) => {
        this.piecesInfoManager.tablesListOfRows.forEach((tableRowsFk, indexFk) => {
            let tableNameFk = this.piecesInfoManager.tablesName[indexFk];

            if(this.checkIfIsFkTable(tableRowsFk, tableNameFk) && this.checkIfThereIsBuses(tableRowsFk, 'id__' + this.tableName, rowId)) {
                this.showBusesSignOnScreen();
                tableRowsFk.forEach((rowFk) => {
                    if(rowId == rowFk['id__' + this.tableName] && tableNameFk == 'fk_' + this.tableName + '_barramento') {
                        this.showBuses(rowFk);
                    } 
                })
            } 
        });
    }

    showBuses = (rowFk) => {
        this.piecesInfoManager.tablesListOfRows.forEach((tableRowsBus, indexBus) => {
            let tableNameBus = this.piecesInfoManager.tablesName[indexBus];

            if(checkIfThereIsData(tableRowsBus) && checkIfTableIsBusByIndex(tableNameBus)) {
                tableRowsBus.forEach((rowBus) => {
                    if(rowFk['id__barramento'] == rowBus['id'] && tableNameBus == 'barramento_'+this.tableName) {
                        let div = this.getForm().appendChild(
                            this.createUnchangableFormWithColumnsAndRows(this.piecesInfoManager.allTablesColumns[indexBus], rowBus)
                        );
                        let inputBarramento = div.querySelector('input[name=barramento]');
        
                        this.addStringQuantityInsideInput(rowFk['quantidade'], inputBarramento);
                            
                        removeAllELementsFrom(div);
                        div.appendChild(inputBarramento);
                    }
                });
                
            }
        });
    }
    showBusesSignOnScreen = () => {
        this.getForm().appendChild(
            document.createElement('h4')
        ).innerText = "barramentos";
    }

    checkIfIsNormalTable = (tablesRows) => {
        if(this.checkBlackList(this.tableName) 
            && checkIfThereIsData(tablesRows) 
            && checkIfTableIsFkByIndex(this.tableName) == false 
            && checkIfTableIsBusByIndex(this.tableName) == false) {
            return true;
        }

        return false;
    }
    checkIfIsFkTable = (tableRowsFk, tableNameFk) => {
        if(checkIfThereIsData(tableRowsFk) && checkIfTableIsFkByIndex(tableNameFk) ) {
            return true;
        }   

        return false;
    }
    addStringQuantityInsideInput = (quantity, input) => {
        input.value += ' x' + quantity;
    }
    checkBlackList = (item) => {
        let list = ["pc", "usuario"];
    
        for(let i = 0; i < list.length; i++) {
            if(item === list[i]) {
                return false;
            } 
        }
        return true;
    }
    checkIfThereIsBuses = (arrayOfArrays, subArrayIndex, compareTo) => {
        if (typeof compareTo != "undefined") {
            for(let i = 0; i < arrayOfArrays.length; i++) {
                if(arrayOfArrays[i][subArrayIndex] == compareTo) {
                    return true;
                }
            }
        }
        return false;
    }
}
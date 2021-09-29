export default class PiecesInfoManager {
    constructor(pathToApiFolder){
        this.pathToApiFolder = pathToApiFolder;
        this.tablesName;
        this.allTablesColumns;
        this.tablesListOfRows;
    }

    async initializer() {
        this.tablesName = await this.loadJson('POST', this.pathToApiFolder+'/cache/tables_list.json');
        let tablesColumnsAndRows = await this.loadColumnsAndRowsList(this.tablesName);
        
        this.allTablesColumns = tablesColumnsAndRows[0];
        this.tablesListOfRows = tablesColumnsAndRows[1];
    };

    loadJson = (method, url) => {
        return new Promise((resolve, reject) =>{
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open(method, url);
            xhr.onload = () => resolve(xhr.response);
            xhr.onerror = () => reject(null);
            xhr.send();
        })
    }
    loadColumnsAndRowsList = (tablesName) => {
        return new Promise((resolve, reject) => {
            let promisesColumns = tablesName.map((tableName) => {
                return new Promise((resolve, reject) => {
                    this.loadJson('POST', this.pathToApiFolder + 'cache/tabelas/' + tableName +'.json').then((tableColumns) => {
                        resolve(tableColumns);
                    });
                })
            });
            let promisesRows = tablesName.map((tableName) => {
                return new Promise((resolve, reject) => {
                    this.loadJson('GET', this.pathToApiFolder + 'select_table_rows.php?table='  + tableName).then((tableRows) => {
                        resolve(tableRows);
                    });
                })
            });
        
            Promise.all(promisesColumns).then((tablesColumns) => {
                Promise.all(promisesRows).then((tablesRows) => {
                    resolve([tablesColumns, tablesRows]);
                })
            })
        })
    }
}

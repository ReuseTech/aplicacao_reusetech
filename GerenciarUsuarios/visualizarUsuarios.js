import PiecesInfoManager from "../javascript/Info/PiecesInfoManager.js";
import PieceViewer from "../javascript/PieceViewer.js";

let changePasswordFieldToPassword = () => {
    try {
        document.querySelectorAll('input[placeholder=senha').forEach((inputSenha) => {
            inputSenha.type = 'password';
        }) ;

    } catch(error) {
        console.log(error);
        console.log('O Erro acima ocorreu porque não há uma tag input de senha');
    }
}

let piecesInfoManager = new PiecesInfoManager('../api/');
await piecesInfoManager.initializer();

piecesInfoManager.tablesListOfRows.forEach((tableRows, index) => {
    let tableName = piecesInfoManager.tablesName[index];
    let pieceViewer = new PieceViewer(tableName, piecesInfoManager);

    if(tableName == 'usuario') {
        pieceViewer.showTableAllUnchangeblePieces(tableRows, index);
    }
    changePasswordFieldToPassword();
});


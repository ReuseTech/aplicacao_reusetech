import PiecesInfoManager from "../../javascript/Info/PiecesInfoManager.js";
import PieceViewer from "../../javascript/PieceViewer.js";

let piecesInfoManager = new PiecesInfoManager('../../api/');
await piecesInfoManager.initializer();

piecesInfoManager.tablesListOfRows.forEach((tableRows, index) => {
    let tableName = piecesInfoManager.tablesName[index];
    let pieceViewer = new PieceViewer(tableName, piecesInfoManager);

    pieceViewer.showPiece(tableRows, index);
});



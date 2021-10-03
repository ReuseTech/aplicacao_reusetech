import PiecesInfoManager from "../../javascript/Info/PiecesInfoManager.js";
import ComputerViewer from "../../javascript/ComputerViwer.js";
import PieceViewer from "../../javascript/PieceViewer.js";

let piecesInfoManager = new PiecesInfoManager('../../api/');
await piecesInfoManager.initializer();

let computerViewer = new ComputerViewer(piecesInfoManager);

piecesInfoManager.tablesListOfRows.forEach((tableRows, index) => {
    let tableName = piecesInfoManager.tablesName[index];
    let pieceViewer = new PieceViewer(tableName, piecesInfoManager);

    if(tableName == 'pc') {
        computerViewer.showAllComputers(tableRows, index);
    }
});

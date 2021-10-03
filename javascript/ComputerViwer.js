import PieceViewer from "./PieceViewer.js";

export default class ComputerViewer {
    constructor(piecesInfoManager) {
        this.piecesInfoManager = piecesInfoManager;
    }

    showAllComputers = (computerRows, index) => {
        computerRows.forEach(computerRow => {
            let pieceViewer = new PieceViewer('pc', this.piecesInfoManager);
            let pcId = computerRow['id'];
            pieceViewer.showPiece(computerRow, index);
    
            this.piecesInfoManager.tablesListOfRows.forEach((pieceRows, pieceIndex) => {
                pieceViewer = new PieceViewer(this.piecesInfoManager.tablesName[pieceIndex], this.piecesInfoManager);
    
                if(pieceViewer.checkIfIsNormalTable(pieceRows)) {
                    pieceRows.forEach(row => {
                        let rowId_Pc = row['id__pc']
                        if(this.computerIdEqualRowId_Pc(pcId, rowId_Pc)) {
                            pieceViewer.showUnchangeblePiece(row, pieceIndex);
                        }
                    })
                }
            });
        })
    }

    computerIdEqualRowId_Pc = (computerId, rowId) => {
        if(computerId == rowId) {
            return true;
        }

        return false;
    }
}
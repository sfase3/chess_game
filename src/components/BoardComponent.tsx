import React, { FC, useEffect, useState } from 'react'
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import CellComponent from './CellComponent';

interface BoardProps{
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board,setBoard}) =>{
  const [selectedCell,setSelectedCell] = useState<Cell | null>(null)
  
function click(cell: Cell){
  if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
    selectedCell.moveFigure(cell);
    setSelectedCell(null)
  } else{
    setSelectedCell(cell)
  }
  
}

function higlightCells(){
  board.higlightCells(selectedCell)
  updateBoard()
}

function updateBoard(){
  const newBoard = board.getCopyBoard()
  setBoard(newBoard)
}

useEffect(()=>{
  higlightCells()
},[selectedCell])

  return (
    <div className='board'>
      {board.cells.map((row,index) =>
      <React.Fragment key={index}>
        {row.map(cell=>
          <CellComponent
           click={click}
           cell={cell} 
           key={cell.id}
           selected = {cell.x === selectedCell?.x && cell.y === selectedCell?.y } 
           />
          )}
      </React.Fragment>
      )}
        </div>
  )
}

export default BoardComponent



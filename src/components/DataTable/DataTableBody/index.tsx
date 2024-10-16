import { ChangeEvent, useEffect, useState } from "react"
import { DataTableBodyTypes, DataTableColumnType } from "./types"
import { sortRows } from "../utils/sortRows"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { Checkbox } from "@mui/material"

const DataTableBody = ({ columns, rows, onSelectRow, controls }: DataTableBodyTypes) => {

  // armazenando colunas
  const [cols, setCols] = useState<DataTableColumnType[]>(columns)
  // armazenando linhas
  const [lines, setLines] = useState<(string | number | string[])[][]>(rows)
  // armazenando linhas ordenadas
  const [sortedRows, setSortedRows] = useState<(string | number | string[])[][]>(lines)
  // mapeando coluna ordenada
  const [activeSortedColumn, setActiveSortedColumn] = useState<boolean[]>(() => cols.map(() => false))
  // mapeando última coluna ordenada
  const [lastActiveSorted, setLastActiveSorted] = useState<boolean[]>(() => cols.map(() => false))
  // mapeando checkbox ativas
  const [activeCheckBox, setActiveCheckbox] = useState<boolean[]>(() => lines.map(() => false))
  // checkbox principal
  const [activeMainCheckbox, setActiveMainCheckbox] = useState<boolean>(false)
  // armazenando linhas selecionadas
  const [selectedRows, setSelectedRows] = useState<(string | number)[][]>([])

  // atualizar colunas
  useEffect(() => {

    setCols(columns)
  }, [columns])

  // atualizar linhas
  useEffect(() => {

    setLines(rows)
  }, [rows])

  // atualizar linhas ordenadas
  useEffect(() => {

    setSortedRows(rows)
  }, [rows])

  // função para ordenar linhas e aplicar estados
  const handleSortRow = (index: number) => {

    const alreadySorted = activeSortedColumn.map( a => a === true)
    const order: 'asc' | 'desc' = alreadySorted[index] ? 'asc' : 'desc'

    setActiveSortedColumn( (prev) => prev.map( (p, i) => index === i && !p))
    setLastActiveSorted( (prev) => prev.map( (p, i) => index === i ? true : false))
    setSortedRows(sortRows(cols, lines, index, order))
  }

  // função para ativar checkbox única
  const handleCheckOne = (index: number) => {

    setActiveCheckbox((prev) => prev.map( (p, i) => index === i ? !p : p))
  }

  // função para ativar todas as checkboxes
  const handleCheckAll = () => {

    const allChecked = activeCheckBox.filter(Boolean)
    
    if (allChecked.length === lines.length || allChecked.length === 0) {

      setActiveCheckbox( (prev) => prev.map( p => p === false ? true : false))
    } else {

      setActiveCheckbox( (prev) => prev.map( p => p !== true ? true : true))
    }
  }

  // ativando checkbox principal de acordo com as outras
  useEffect(() => {

    const allChecked = activeCheckBox.filter(Boolean)

    if (allChecked.length === lines.length) {

      setActiveMainCheckbox(true)
    } else {

      setActiveMainCheckbox(false)
    }
  }, [activeCheckBox])

  // função para extrair e armazenar dados das linha(s) selecionada(s), além de acionar a checkbox
  const handleSelectRow = (index: number) => {

    if (controls === 'visible') {
      handleCheckOne(index) //acionando checkbox

      // armazenando elemento row de acordo com o id
      const rowElement = document.querySelector(`#DataTableRow-${index}`)
      
      // verificando se retornou o elemento row
      if (rowElement) {

        // buscando células e transformando em um array
        const cells = Array.from(rowElement.children)

        // extraindo dados das células e filtrando células vazias (caso da checkbox)
        const cellsData: (string | number)[] = cells.map( cell => cell.textContent ?? '').filter( cell => cell !== '')

        // adicionando linhas selecionadas na variável
        setSelectedRows((prev) => {

          // comparando se a linha selecionada já está armazenada
          const alreadySelected = prev.some( row => JSON.stringify(row) === JSON.stringify(cellsData))

          // gerenciando linhas já selecionadas
          if (alreadySelected) {

            // removendo linhas caso já tenho sido selecionada
            return prev.filter(row => JSON.stringify(row) !== JSON.stringify(cellsData))
          } else {

            // adicionando linha caso contrário
            return [...prev, cellsData]
          }
        })
      }
    }
  }

  const handleSelectAllRows = () => {

    handleCheckAll()
    
    // armazenando container de rows
    const rowsContainer = document.querySelector(`#DataTableRows`)
    
    // verificando se retornou o container
    if (rowsContainer) {

      // buscando linhas e transformando em um array
      const rows = Array.from(rowsContainer.children)

      // extraindo children de cada linha e convertendo em array
      const rowsChildren = rows.map( row => Array.from(row.children))

      // extraindo dados das linhas
      const rowData: (string | number)[][] = rowsChildren.map( children => children.map( child => child.textContent ?? '').filter( cell => cell !== ''))

      // adicionando/removendo linhas selecionadas na variável
      setSelectedRows((prev) => {

        // Verifica se todas as linhas já estão selecionadas
        const allRowsAlreadySelected = rowData.every(row =>
          prev.some(prevRow => JSON.stringify(prevRow) === JSON.stringify(row))
        );

        if (allRowsAlreadySelected) {

          // Remover todas as linhas selecionadas
          return prev.filter(prevRow =>
            !rowData.some(row => JSON.stringify(row) === JSON.stringify(prevRow))
          );
        } else {

          // Adicionar as novas linhas que ainda não estão selecionadas
          const newSelectedRows = rowData.filter(row =>
            !prev.some(prevRow => JSON.stringify(prevRow) === JSON.stringify(row))
          );
          return [...prev, ...newSelectedRows];
        }
      });
    }
  }

  // verificando se alguma linha foi selecionada
  useEffect(() => {

    if (onSelectRow) onSelectRow(selectedRows);
  }, [selectedRows])

  // estilização da checkbox
  const checkboxSx = {
		color: '#fff',
		'&.Mui-checked': {
			color: '#fff',
		},
    '&.MuiCheckbox-indeterminate': {
      color: '#fff'
    }
	}

  return (
    <div className="w-full pb-3 flex flex-col overflow-auto bg-projectPallet-quaternary rounded-b-xl">

      {/* Colunas */}
      <div className="w-full flex sticky top-0 bg-projectPallet-quaternary pr-[5px] pl-3 py-3 border-b-2 cursor-pointer">

        {/* Checkbox multiseleção */}
        {
          controls === 'visible' && <div className="pr-3">
            <Checkbox className="w-2 h-2" sx={checkboxSx} indeterminate={activeCheckBox.filter(Boolean).length !== 0 && activeCheckBox.filter(Boolean).length < rows.length} checked={activeMainCheckbox} onClick={() => handleSelectAllRows()}/>
          </div>
        }

        {/* mapeando colunas */}
        {
          cols.map( (column, index) => (
            !column.key && !column.hidden &&
            <div key={index} className="w-full font-bold flex gap-2 items-center group" onClick={() => handleSortRow(index)}>
              <p className="text-xl">{ column.name }</p>
              <FontAwesomeIcon icon={faArrowDown} className={`w-[12px] transition-all duration-300 ${lastActiveSorted[index] ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`} style={{ transform: activeSortedColumn[index] === true ? 'rotate(180deg)' : 'rotate(0deg)'}}/>
            </div> 
          ))
        }
      </div>

      {/* Linhas */}
      <div id="DataTableRows" className="w-full pt-2">

        {/* mapeando linhas */}
        {
          sortedRows.map( (sortedRow, index) => (
            <div key={index} id={`DataTableRow-${index}`} className={`w-full flex pl-3 py-2 cursor-pointer hover:bg-white hover:text-black hover:bg-opacity-50 ${index % 2 === 0 ? 'bg-projectPallet-tertiary' : ''} ${activeCheckBox[index] && 'bg-white bg-opacity-50 text-black'}`} onClick={(e) => handleSelectRow(index)}>

              {/* Checkbox seleção única */}
              {
                controls === 'visible' && <div className="pr-3 flex items-center">
                  <Checkbox className="w-2" sx={checkboxSx} checked={activeCheckBox[index]} onClick={(e) => {e.stopPropagation();handleSelectRow(index)}}/>
                </div>
              }

              {/* mapeando células */}
              {
                sortedRow.map( (cell, index) => (
                  !cols[index]?.key && !cols[index]?.hidden && (
                    <div key={index} className="w-full text-lg flex items-center gap-2">
                      {
                        cols[index]?.brand && cols[index].brandType === 'image' && Array.isArray(cell) ? <div className="w-8 h-8">
                          <img src={cell[0]} alt="Brand" className="w-full h-full rounded-full bg-white"/>
                        </div> : cols[index]?.brand && cols[index].brandType === 'icon' && Array.isArray(cell) && <div className={`w-8 h-8 flex items-center justify-center rounded-full`} style={{ backgroundColor: cell[1]}}>
                          <i className={`fa fa-${cell[2]} text-white`}></i>
                        </div>
                      }
                      {
                        cols[index]?.format && !Array.isArray(cell) ? cols[index].format(cell) : 
                        cols[index]?.brand && cols[index].brandType === 'image' && Array.isArray(cell) ? cell[1] : cols[index]?.brand && cols[index].brandType === 'icon' && Array.isArray(cell) ? cell[0] : cell
                      }
                    </div>
                  )
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DataTableBody
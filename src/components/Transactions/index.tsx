import { useState, useEffect } from "react"
import Container from "../Container"
import InputSearch from "../InputSearch"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Button, Checkbox } from "@mui/material"

const TransactionsContainer = ({ title, transactions = [], searchTerm = '', dataInicio, showOptions = false, onDataChange = () => {}, onSearch = () => {}, handleAddClick}: TransactionsContainerTypes) => {

	const [filteredTransactions, setFilteredTransactions] = useState<CompactTransactionResponse[]>(transactions)
	const [isOptions, setIsOptions] = useState<boolean>(false)
	const [rowIndex, setRowIndex] = useState<number>(0)
	const [selectedRows, setSelectedRows] = useState<RowTypes[]>([])
	const [checked, setChecked] = useState<boolean[]>(() => {

		return transactions.map(() => false)
	})
	const [allChecked, setAllChecked] = useState<boolean>(true)

	useEffect(() => {

		const filtered = transactions.filter(({ transacao }) =>
      transacao.transacaoNome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTransactions(filtered);
	}, [searchTerm, transactions])

	useEffect(() => {

		setChecked( (prev) => {

			return prev.map( p => false)
		})
		setAllChecked(false)
		setSelectedRows([])

		console.log('teste')
	}, [dataInicio])

	const checkAll = () => {
		const body = document.querySelector('tbody')

		if (allChecked) {
			
			setChecked(transactions.map(() => false));
			setAllChecked(false)
		} else {

			setChecked(transactions.map(() => true))
			setAllChecked(true)
		}
		
		if (body && !allChecked) {
			
			const getRows = Array.from(body.querySelectorAll('tr')).map( row => Array.from(row.querySelectorAll('td')).filter( cell => cell.textContent !== ''))
			const formatedRows = getRows.map( (row, index) => {

				const cells = row.filter( cell => cell.textContent || '').map( cell => cell.textContent || '')

				return {
					id: index+1,
					nome: cells[0],
					data: cells[1],
					valor: cells[2],
					status: cells[3]
				}
			})
			
			setSelectedRows(formatedRows)
		} else {

			setSelectedRows([])
		}
	};

	const onRowClick = (e: React.MouseEvent<HTMLTableRowElement>, index: number) => {

		const updateChecked = [...checked]
		updateChecked[index] = !checked[index]
		setChecked(updateChecked)

		const extractedCells = Array.from(e.currentTarget.querySelectorAll('td'))
		const formatedCells = extractedCells.filter( row => row.textContent !== '').map( row => row.textContent || '')

		const formatedRow = {
			id: index+1,
			nome: formatedCells[0],
			data: formatedCells[1],
			valor: formatedCells[2],
			status: formatedCells[3]
		}

		setSelectedRows( prev => {

			const alreadySelected = prev.find( row => row.id === formatedRow.id)

			if (alreadySelected) {

				return prev.filter( row => row.id !== formatedRow.id)
			}

			return [...prev, formatedRow]
		})
	}

	const checkboxSx = {
		color: '#6359E9',
		'&.Mui-checked': {
			color: '#6359E9',
		},
	}

	return (
		<Container>
			<div className="px-1 font-bold text-2xl w-full flex justify-between">
				<h2>{title}</h2>
				<div className="flex gap-3 w-[50rem]">
					<InputSearch
						value={searchTerm}
						onChange={(e) => onSearch(e)}
						placeholder="Search for anything..." 
						className="w-full gap-3 bg-projectPallet-primary text-sm" 
						inputClassName="bg-transparent text-white text-sm placeholder:text-projectPallet-tertiary font-light"
					/>
					<div className="w-full flex gap-3">
						<input type="date" value={dataInicio} onChange={(e) => onDataChange(e.target.value)} className="rounded-xl bg-transparent border-2 border-projectPallet-tertiary p-2 text-sm w-full text-projectPallet-tertiary outline-none"/>
						<Button className={`bg-projectPallet-secondary rounded-xl text-white font-bold px-2 w-full gap-2 ${ showOptions ? '' : 'hidden'}`} onClick={handleAddClick}>
							<FontAwesomeIcon icon={faPlus} size="lg"/>
							ADICIONAR
						</Button>
					</div>
				</div>
			</div>
			<table className="w-full">
				<thead>
					<tr>
						<td className={`py-2 ${ showOptions ? '' : 'hidden'}`}><Checkbox onClick={checkAll} sx={checkboxSx} checked={allChecked}></Checkbox></td>
						<td className="pl-2 py-2">Name</td>
						<td className="pl-2 py-2">Date</td>
						<td className="pl-2 py-2">Amount</td>
						<td className="pl-2 py-2">Status</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
						{
							filteredTransactions.length > 0 ?
							filteredTransactions.map(({ transacao, estabelecimentoLink }, index) => (
								<tr className="hover:bg-projectPallet-tertiary cursor-pointer hover:bg-opacity-50" key={index} onMouseEnter={() => {setIsOptions(true);setRowIndex(index)}} onMouseLeave={() => setIsOptions(false)} onClick={(e) => onRowClick(e, index)}>
									<td className={`pl-3 rounded-l-xl ${ showOptions ? '' : 'hidden'}`}>
										<Checkbox className="w-2" checked={checked[index] || false} sx={checkboxSx}></Checkbox>
									</td>
									<td className={`pl-2 py-2 ${ showOptions ? '' : 'rounded-l-xl'}`}>
										<div className="flex gap-4 text-md items-center">
											<img src={`https://cdn.brandfetch.io/${estabelecimentoLink}/w/400/h/400`} alt="icone" width={30} className="rounded-full"></img>
											<p>{transacao.transacaoNome}</p>
										</div>
									</td>
									<td className="pl-2 py-2">
										<p>{(new Date(transacao.dataLancamento)).toLocaleString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric'})}</p>
									</td>
									<td className="pl-2 py-2">
										<p>{parseFloat(transacao.transacaoValor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</p>
									</td>
									<td className={`pl-2 py-2 ${showOptions ? 'rounded-r-none' : 'rounded-r-xl'}`}>
										<span className={`${transacao.transacaoStatus === 'depositado' ? 'bg-green-700 text-green-500' : 'bg-red-700 text-red-500'} bg-opacity-20 px-3 py-1 rounded-2xl text-md`}>{transacao.transacaoStatus}</span>
									</td>
									<td className="text-end pl-2 rounded-r-xl" style={{ opacity: isOptions && rowIndex === index ? '1' : '0', display: showOptions ? '' : 'none'}}>
										<FontAwesomeIcon icon={faPencil} className="text-projectPallet-secondary pr-3"/>
										<FontAwesomeIcon icon={faTrash} className="text-red-500 pr-2"/>
									</td>
								</tr>
							)) :
							<tr>
								<td>-</td>
								<td>-</td>
								<td>-</td>
								<td>-</td>
							</tr>
						}
				</tbody>
			</table>
		</Container>
	)
}

export default TransactionsContainer
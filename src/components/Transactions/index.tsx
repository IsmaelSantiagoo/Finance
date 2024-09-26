import { useState, useEffect } from "react"
import Container from "../Container"
import InputSearch from "../InputSearch"
import { TransactionsContainerTypes } from "./types"
import { CompactTransactionResponse } from "@/pages/dashboard/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@mui/material"

const TransactionsContainer = ({ title, transactions = [], searchTerm = '', dataInicio, showOptions = false, onDataChange = () => {}, onSearch = () => {}}: TransactionsContainerTypes) => {

	const [filteredTransactions, setFilteredTransactions] = useState<CompactTransactionResponse[]>(transactions)
	const [isOptions, setIsOptions] = useState<boolean>(false)
	const [rowIndex, setRowIndex] = useState<number>(0)

	useEffect(() => {

		const filtered = transactions.filter(({ transacao }) =>
      transacao.transacaoNome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTransactions(filtered);
	}, [searchTerm, transactions])

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
						<Button className="bg-projectPallet-secondary rounded-xl text-white font-bold px-2 w-full gap-2">
							<FontAwesomeIcon icon={faPlus} size="lg"/>
							ADICIONAR
						</Button>
					</div>
				</div>
			</div>
			<table className="w-full">
				<thead>
					<tr>
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
								<tr className="hover:bg-projectPallet-tertiary cursor-pointer hover:bg-opacity-50" key={index} onMouseEnter={() => {setIsOptions(true);setRowIndex(index)}} onMouseLeave={() => setIsOptions(false)}>
									<td className="pl-2 py-2 rounded-l-xl">
										<div className="flex gap-4 text-md items-center">
											<img src={`https://cdn.brandfetch.io/${estabelecimentoLink}/w/400/h/400`} alt="icone" width={30} className="rounded-full"></img>
											<p>{transacao.transacaoNome}</p>
										</div>
									</td>
									<td className="pl-2 py-2">
										<p>{(new Date(transacao.dataLancamento)).toLocaleString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric'})}</p>
									</td>
									<td className="pl-2 py-2">
										<p>{transacao.transacaoValor}</p>
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
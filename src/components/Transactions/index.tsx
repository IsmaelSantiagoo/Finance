import Container from "../Container"
import InputSearch from "../InputSearch"
import { TransactionsContainerTypes } from "./types"

const TransactionsContainer = ({ title, transactions, searchTerm, dataInicio, onDataChange = () => {}, onSearch = () => {}}: TransactionsContainerTypes) => {

	return (
		<Container>
			<div className="px-1 font-bold text-2xl w-full flex justify-between">
				<h2>{title}</h2>
				<div className="flex gap-3 w-[500px]">
					<InputSearch
							value={searchTerm}
							onChange={(e) => onSearch(e)}
							placeholder="Search for anything..." 
							className="w-full gap-3 bg-projectPallet-primary text-sm" 
							inputClassName="bg-transparent text-white text-sm placeholder:text-projectPallet-tertiary font-light"
					/>
					<input type="date" value={dataInicio} onChange={(e) => onDataChange(e.target.value)} className="rounded-xl bg-transparent border-2 border-projectPallet-tertiary p-2 text-sm w-full text-projectPallet-tertiary outline-none"/>
				</div>
			</div>
			<div className="w-full flex justify-between pt-10 px-1">
				<p className="w-full">Name</p>
				<p className="w-full">Date</p>
				<p className="w-full">Amount</p>
				<p className="w-full">Status</p>
			</div>
			{
				transactions.length > 0 ?
				transactions.map(({ transacao, estabelecimentoLink }, index) => (
					<div className="w-full flex justify-between pt-3" key={index}>
						<div className="w-full flex justify-between pl-1">
							<div className="flex gap-4 text-md items-center">
								<img src={`https://cdn.brandfetch.io/${estabelecimentoLink}/w/400/h/400`} alt="icone" width={30} className="rounded-full"></img>
								<p>{transacao.transacaoNome}</p>
							</div>
						</div>
						<div className="w-full flex items-center text-md">
							<p>{(new Date(transacao.dataLancamento)).toLocaleString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric'})}</p>
						</div>
						<div className="w-full flex items-center text-md">
							<p>{transacao.transacaoValor}</p>
						</div>
						<div className="w-full flex items-center text-md">
						<span className={`${transacao.transacaoStatus === 'depositado' ? 'bg-green-700 text-green-500' : 'bg-red-700 text-red-500'} bg-opacity-20 px-3 py-1 rounded-2xl text-md`}>{transacao.transacaoStatus}</span>
						</div>
							
					</div>
				)) :
				<div>
						Nenhuma informação disponível
				</div>
			}
		</Container>
	)
}

export default TransactionsContainer
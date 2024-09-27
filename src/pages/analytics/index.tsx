import Layout from "@/components/Layout"
import TransactionsContainer from "@/components/Transactions"
import React, { useEffect, useState } from "react"
import { getCompactTransactions } from "@/utils/getCompactTransactions"
import InputBRL from "@/components/InputBRL"
import InputNumber from "@/components/InputNumber"
import InputText from "@/components/InputText"
import DatePicker from "@/components/DatePicker"
import { Button } from "@mui/material"
import Popup from "@/components/Popup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRetweet } from "@fortawesome/free-solid-svg-icons"
import { addTransaction } from "./services"
import { notify } from "@/utils/notify"

const Analytics = () => {

  const [transactions, setTransactions] = useState<CompactTransactionResponse[] | void>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [dataInicio, setDataInicio] = useState<string>(() => {
		const today = new Date();
		const year = today.getUTCFullYear();
		const month = String(today.getUTCMonth() + 1).padStart(2, '0');
		const day = '01'
		return `${year}-${month}-${day}`;
	});
  const [transacaoNome, setTransacaoNome] = useState<string>('')
  const [transacaoDesc, setTransacaoDesc] = useState<string>('')
  const [dataLancamento, setDataLancamento] = useState<string>(() => {
		const today = new Date();
		const year = today.getUTCFullYear();
		const month = String(today.getUTCMonth() + 1).padStart(2, '0');
		const day = today.getDate()
		return `${year}-${month}-${day}`;
	})
  const [transacaoStatus, setTransacaoStatus] = useState<string>('')
  const [transacaoValor, setTransacaoValor] = useState<string>('0')
  const [estabelecimentoID, setEstabelecimentoID] = useState<string>('')
  const [categoriaID, setCategoriaID] = useState<string>('')
  const [popupVisible, setPopupVisible] = useState<boolean>(false)

  useEffect(() => {

    const completeDate = `${dataInicio} 00:00:00`
    getCompactTransactions(completeDate).then( (data) => setTransactions(data))

  }, [dataInicio])

  const reloadTransactions = () => {

    const completeDate = `${dataInicio} 00:00:00}`
    getCompactTransactions(completeDate).then( (data) => setTransactions(data))
  }

  const convertValue = (value: string) => {

    const formated = (parseInt(value) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2})
    return formated.replace(/\D/g, '').replace(',', '.')
  } 
  
  const handleAdd = () => {

    const formatedValue = convertValue(transacaoValor)
    const payload = {
      transacaoId: 0, transacaoNome, transacaoDesc, dataLancamento, transacaoValor: formatedValue, transacaoStatus, estabelecimentoID, categoriaID
    }

    addTransaction(payload).then( ({ message, status}) => {

      notify(message, status)
      reloadTransactions()
    })
  }

  const clearData = () => {

    if ( transacaoNome && transacaoDesc && dataLancamento && transacaoValor && transacaoStatus && estabelecimentoID && categoriaID) {

      setTransacaoNome('')
      setTransacaoDesc('')
      setDataLancamento('')
      setTransacaoValor('0')
      setTransacaoStatus('')
      setEstabelecimentoID('')
      setCategoriaID('')
    }
  }

  return (
    <Layout defaultActiveMenuIndex={1} className="flex justify-between gap-6 pr-5 overflow-hidden">
      <TransactionsContainer title="Transactions" transactions={transactions} dataInicio={dataInicio} onDataChange={(e) => setDataInicio(e)} searchTerm={searchTerm} onSearch={(e) => setSearchTerm(e.target.value)} showOptions={true} handleAdd={() => setPopupVisible(true)} handleDelete={reloadTransactions}/>
      <Popup visible={popupVisible}>
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faRetweet} size="xl" className="text-projectPallet-secondary"/>
          <h1 className="font-bold text-2xl">Adicionar transações</h1>
        </div>
        <div className="w-full h-full py-10 flex flex-col gap-2">
          <InputText label='Nome' placeholder="Insira o nome" value={transacaoNome} onChange={setTransacaoNome}/>
          <InputText label='Descrição' placeholder="Insira a descrição" value={transacaoDesc} onChange={setTransacaoDesc}/>
          <DatePicker label='Data de lançamento' dataInicio={dataLancamento} onChange={setDataLancamento}/>
          <InputBRL label='Valor em R$' placeholder="R$ 0,00" value={transacaoValor} onChange={setTransacaoValor}/>
          <InputText label='Status' placeholder="Insira o status" value={transacaoStatus} onChange={setTransacaoStatus}/>
          <InputNumber label='Estabelecimento' value={estabelecimentoID} placeholder='Insira o id do estabelecimento' onChange={setEstabelecimentoID}/>
          <InputNumber label='Categoria' value={categoriaID} placeholder='Insira o id da categoria' onChange={setCategoriaID}/>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Button className="bg-none border-2 border-projectPallet-secondary rounded-xl text-white font-bold p-4 w-full" variant="outlined" onClick={() => {setPopupVisible(false);clearData}}>
            CANCELAR
          </Button>
          <Button onClick={() => {handleAdd();clearData()}} className="bg-projectPallet-secondary rounded-xl text-white font-bold p-4 w-full">
            ADICIONAR
          </Button>
        </div>
      </Popup>
    </Layout>
  )
}

export default Analytics
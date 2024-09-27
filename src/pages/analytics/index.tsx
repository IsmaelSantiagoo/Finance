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
  const [transacaoDataLancamento, setTransacaoDataLancamento] = useState<string>('')
  const [transacaoStatus, setTransacaoStatus] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [estabelecimentoIDValue, setEstabelecimentoIDValue] = useState<string>('')
  const [categoriaIDValue, setCategoriaIDValue] = useState<string>('')
  const [popupVisible, setPopupVisible] = useState<boolean>(false)

  useEffect(() => {

    const completeDate = `${dataInicio} 00:00:00`
    getCompactTransactions(completeDate).then( (data) => setTransactions(data)).catch( data => console.log(data))

  }, [dataInicio])

  return (
    <Layout defaultActiveMenuIndex={1} className="flex justify-between gap-6 pr-5 overflow-hidden">
      <TransactionsContainer title="Transactions" transactions={transactions} dataInicio={dataInicio} onDataChange={(e) => setDataInicio(e)} searchTerm={searchTerm} onSearch={(e) => setSearchTerm(e.target.value)} showOptions={true} handleAddClick={() => setPopupVisible(true)}/>
      <Popup visible={popupVisible}>
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faRetweet} size="xl" className="text-projectPallet-secondary"/>
          <h1 className="font-bold text-2xl">Adicionar transações</h1>
        </div>
        <div className="w-full h-full py-10 flex flex-col gap-2">
          <InputText label='Nome' placeholder="Insira o nome" value={transacaoNome} onChange={setTransacaoNome}/>
          <InputText label='Descrição' placeholder="Insira a descrição" value={transacaoDesc} onChange={setTransacaoDesc}/>
          <DatePicker label='Data de lançamento' dataInicio={transacaoDataLancamento} onChange={setTransacaoDataLancamento}/>
          <InputBRL label='Valor em R$' placeholder="R$ 0,00" value={value} onChange={setValue}/>
          <InputText label='Status' placeholder="Insira o status" value={transacaoStatus} onChange={setTransacaoStatus}/>
          <InputNumber label='Estabelecimento' value={estabelecimentoIDValue} placeholder='Insira o id do estabelecimento' onChange={setEstabelecimentoIDValue}/>
          <InputNumber label='Categoria' value={categoriaIDValue} placeholder='Insira o id da categoria' onChange={setCategoriaIDValue}/>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Button className="bg-none border-2 border-projectPallet-secondary rounded-xl text-white font-bold p-4 w-full" variant="outlined" onClick={() => setPopupVisible(false)}>
            CANCELAR
          </Button>
          <Button className="bg-projectPallet-secondary rounded-xl text-white font-bold p-4 w-full">
            ADICIONAR
          </Button>
        </div>
      </Popup>
    </Layout>
  )
}

export default Analytics
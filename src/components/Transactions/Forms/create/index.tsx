import CategorySelector from "@/components/CategorySelector";
import DatePicker from "@/components/DatePicker";
import InputBRL from "@/components/InputBRL";
import InputNumber from "@/components/InputNumber";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import Selector from "@/components/Selector";
import { addTransaction } from "@/pages/analytics/services";
import { getCategorias } from "@/services/categorias";
import { getEstabelecimentos } from "@/services/estabelecimentos";
import { notify } from "@/utils/notify";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export const AddTransacoesForm = ({ reloadData, onCancel, onConfirm }: TransactionsFormTypes) => {

  const transacaoStatusItems: MenuItems[] = [
    {
      value: 'transferido'
    },
    {
      value: 'depositado'
    }
  ]

  const [transacaoNome, setTransacaoNome] = useState<string>('')
  const [transacaoDesc, setTransacaoDesc] = useState<string>('')
  const [dataLancamento, setDataLancamento] = useState<string>(() => {
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = String(today.getUTCMonth() + 1).padStart(2, '0');
    const day = '01'
    return `${year}-${month}-${day}`;
  });
  const [transacaoValor, setTransacaoValor] = useState<string>('0')
  const [transacaoStatus, setTransacaoStatus] = useState<string>(transacaoStatusItems[0].value)
  const [estabelecimentoID, setEstabelecimentoID] = useState<string>('')
  const [categoriaID, setCategoriaID] = useState<string>('')
  const [estabelecimentos, setEstabelecimentos] = useState<SelectorItems[]>([])
  const [categorias, setCategorias] = useState<CategorySelectorItems[]>([])

  console.log(transacaoValor)

	useEffect(() => {

		getEstabelecimentos().then((data) => {

      const array = data.map( d => ({ id: d.estabelecimentoId, url: d.estabelecimentoLink, label: d.estabelecimentoNome}))

      if (array) setEstabelecimentos(array)
    })
	}, [])

  useEffect(() => {

		getCategorias().then((data) => {

      const array = data.map( d => ({ id: d.categoriaId.toString(), label: d.categoriaNome, color: d.categoriaCor, icon: d.categoriaIcone}))

      if (array) setCategorias(array)
    })
	}, [])

  const clearData = () => {

    setTransacaoNome('')
    setTransacaoDesc('')
    setTransacaoValor('0')
    setEstabelecimentoID('')
    setCategoriaID('')
  }

  const handleAddTransaction = async () => {

		if (transacaoNome && transacaoDesc && transacaoStatus && transacaoValor && dataLancamento && estabelecimentoID && categoriaID) {

			try {
				const { message, status } = await addTransaction({
					transacaoId: 1,
					transacaoNome: transacaoNome,
					transacaoDesc: transacaoDesc,
					dataLancamento: `${dataLancamento} 00:00:00`,
					transacaoValor: transacaoValor,
					transacaoStatus: transacaoStatus,
					estabelecimentoID: estabelecimentoID,
					categoriaID: categoriaID
				});
	
				notify(message, status);
				if (status === 'success') {

					reloadData()
          onConfirm
          clearData()
				};
			} catch {
	
				notify('Erro ao inserir dados!', 'error');
			}
		} else {

			notify('Preencha todos os dados!', 'warning')
		}
	}

  return (

    <div>
      <div className="flex flex-col gap-3 w-[50rem]">
        <InputText value={transacaoNome} label="Nome:" placeholder="Insira o nome" onChange={(e) => setTransacaoNome(e)}/>
        <InputText value={transacaoDesc} label="Descrição" placeholder="Insira a descrição" onChange={(e) => setTransacaoDesc(e)}/>
        <DatePicker dataInicio={dataLancamento} label="Data de Lançamento" onChange={(e) => setDataLancamento(e)}/>
        <InputBRL value={transacaoValor} label="Valor" onChange={(e) => setTransacaoValor(e)}/>
        <InputSelect menuItems={transacaoStatusItems} label="Status" onChange={(e) => setTransacaoStatus(e)}/>
        <div className="flex w-full justify-between gap-2">
          <Selector label='Estabelecimento' items={estabelecimentos} onChange={(e) => setEstabelecimentoID(e)}/>
          <CategorySelector label='Categoria' items={categorias} onChange={(e) => setCategoriaID(e)}/>
        </div>
      </div>
      <div className="flex gap-2 py-5">
        <Button onClick={onCancel} className="border border-projectPallet-secondary w-full" variant="outlined">Cancelar</Button>
        <Button onClick={() => handleAddTransaction()} className="bg-projectPallet-secondary text-white w-full">Adicionar</Button>
      </div>
    </div>
  )
}
import CategorySelector from "@/components/CategorySelector";
import DatePicker from "@/components/DatePicker";
import InputBRL from "@/components/InputBRL";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import Selector from "@/components/Selector";
import { addTransaction } from "@/pages/analytics/services";
import { getCards } from "@/pages/dashboard/services";
import { getCategorias } from "@/services/categorias";
import { getEstablishments } from "@/services/estabelecimentos";
import { notify } from "@/utils/notify";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export const AddTransactionForm = ({ onCancel, onConfirm }: TransactionsFormTypes) => {

  const transacaoStatusItems: MenuItems[] = [
    {
      value: 'Transferência'
    },
    {
      value: 'Recebimento'
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
  const [estabelecimentoID, setEstabelecimentoID] = useState<number | null>(null)
  const [categoriaID, setCategoriaID] = useState<number | null>(null)
  const [cartaoID, setCartaoID] = useState<number | null>(null)
  const [estabelecimentos, setEstabelecimentos] = useState<SelectorItems[]>([])
  const [categorias, setCategorias] = useState<CategorySelectorItems[]>([])
  const [cartoes, setCartoes] = useState<SelectorItems[]>([])

	useEffect(() => {

		getEstablishments().then((data) => {

      const array = data.map( d => ({ id: d.estabelecimentoId, url: d.estabelecimentoLink, label: d.estabelecimentoNome}))

      if (array) setEstabelecimentos(array)
    })
	}, [])

  useEffect(() => {

		getCategorias().then((data) => {

      const array = data.map( d => ({ id: d.categoriaId, label: d.categoriaNome, color: d.categoriaCor, icon: d.categoriaIcone}))

      if (array) setCategorias(array)
    })
	}, [])

  useEffect(() => {

		getCards().then((data) => {

      const array = data.data.map( d => ({ id: d.cartaoId, label: d.cartaoNome}))

      if (array) setCartoes(array)
    })
	}, [])

  const clearData = () => {

    setTransacaoNome('')
    setTransacaoDesc('')
    setTransacaoValor('0')
  }

  const handleAddTransaction = async () => {

		if (transacaoNome && transacaoDesc && transacaoStatus && transacaoValor && dataLancamento && estabelecimentoID && categoriaID && cartaoID) {

			try {
				const { message, status } = await addTransaction({
					transacaoId: 1,
					transacaoNome: transacaoNome,
					transacaoDesc: transacaoDesc,
					dataLancamento: `${dataLancamento} 00:00:00`,
					transacaoValor: transacaoValor,
					transacaoStatus: transacaoStatus,
					estabelecimentoID: estabelecimentoID,
					categoriaID: categoriaID,
          cartaoID: cartaoID
				});
	
				notify(message, status);
				if (status === 'success') {

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
          <Selector defaultValue={estabelecimentos[0]} label='Estabelecimento' items={estabelecimentos} onChange={(e) => setEstabelecimentoID(e)} showBrand/>
          <CategorySelector defaultValue={categorias[0]} label='Categoria' items={categorias} onChange={(e) => setCategoriaID(e)}/>
          <Selector defaultValue={cartoes[0]} label='Cartão' items={cartoes} onChange={(e) => setCartaoID(e)}/>
        </div>
      </div>
      <div className="flex gap-2 py-5">
        <Button onClick={onCancel} className="border border-projectPallet-secondary w-full" variant="outlined">Cancelar</Button>
        <Button onClick={() => handleAddTransaction().then(onConfirm)} className="bg-projectPallet-secondary text-white w-full">Adicionar</Button>
      </div>
    </div>
  )
}
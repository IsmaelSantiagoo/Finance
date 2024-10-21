import CategorySelector from "@/components/CategorySelector";
import DatePicker from "@/components/DatePicker";
import InputBRL from "@/components/InputBRL";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import Selector from "@/components/Selector";
import { getTransaction, updateTransaction } from "@/pages/analytics/services";
import { getCards } from "@/pages/dashboard/services";
import { getCategorias } from "@/services/categorias";
import { getEstablishments } from "@/services/estabelecimentos";
import { notify } from "@/utils/notify";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export const UpdateTransactionsForm = ({ id, onCancel, onConfirm }: TransactionsFormTypes) => {

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
  const [transacaoValor, setTransacaoValor] = useState<string>('')
  const [transacaoStatus, setTransacaoStatus] = useState<string>(transacaoStatusItems[0].value)
  const [estabelecimentoID, setEstabelecimentoID] = useState<number | null>(null)
  const [categoriaID, setCategoriaID] = useState<number | null>(null)
  const [cartaoID, setCartaoID] = useState<number | null>(null)
  const [estabelecimentos, setEstabelecimentos] = useState<SelectorItems[]>([])
  const [categorias, setCategorias] = useState<CategorySelectorItems[]>([])
  const [cartoes, setCartoes] = useState<SelectorItems[]>([])
  const [currentEstabelecimento, setCurrentEstabelecimento] = useState<SelectorItems>()
  const [currentCategoria, setCurrentCategoria] = useState<CategorySelectorItems>()
  const [currentCartao, setCurrentCartao] = useState<SelectorItems>()

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

      const array = data.data.map( d => ({ id: d.cartaoId, label: d.cartaoNome }))

      if (array) setCartoes(array)
    })
	}, [])

  const readTransactions = () => {

    if (id) getTransaction(id).then( ({ data }) => {

      const {
        transacaoNome,
        transacaoDesc,
        transacaoStatus,
        transacaoValor,
        dataLancamento,
        estabelecimentoID,
        categoriaID,
        cartaoID
      }  = data[0]

      setTransacaoNome(transacaoNome)
      setTransacaoDesc(transacaoDesc)
      setTransacaoStatus(transacaoStatus)
      setTransacaoValor(transacaoValor)
      setDataLancamento(dataLancamento.split('T')[0])
      setEstabelecimentoID(estabelecimentoID)
      setCategoriaID(categoriaID)
      setCartaoID(cartaoID)

      handleChangeEstabelecimento(estabelecimentoID)
      handleChangeCategoria(categoriaID)
      handleChangeCartao(cartaoID)
    }).catch(() => {

      notify('Erro ao buscar transação!', 'error')
    })
  }

  useEffect(() => {

    readTransactions()
  }, [categorias, estabelecimentos])

  const clearData = () => {

    setTransacaoNome('')
    setTransacaoDesc('')
    setTransacaoValor('0')
    setEstabelecimentoID(null)
    setCategoriaID(null)
    setCartaoID(null)
  }

  const handleUpdateTransaction = async () => {

		if (id && transacaoNome && transacaoDesc && transacaoStatus && transacaoValor && dataLancamento && estabelecimentoID && categoriaID && cartaoID) {

			try {
				const { message, status } = await updateTransaction({
					transacaoId: id,
					transacaoNome: transacaoNome,
					transacaoDesc: transacaoDesc,
					dataLancamento: `${dataLancamento} 00:00:00`,
					transacaoValor: transacaoValor,
					transacaoStatus: transacaoStatus,
					estabelecimentoID: estabelecimentoID,
					categoriaID: categoriaID,
          cartaoID
				});
	
				notify(message, status);

				if (status === 'success') {

          clearData()
				};
			} catch {
	
				notify('Erro ao atualizar dados!', 'error');
			}
		} else {

			notify('Preencha todos os dados!', 'warning')
		}
	}

  const handleChangeEstabelecimento = (id: number) => {
    
    setEstabelecimentoID(id)
    
    if (estabelecimentos) {
      const current = estabelecimentos.map( e => e.id === id && e).filter(Boolean)[0]
      if (current) {
        setCurrentEstabelecimento(current)
      }
    }
  }

  const handleChangeCategoria = (id: number) => {

    setCategoriaID(id)
    
    if (categorias) {
      const current = categorias.map( c => c.id === id && c).filter(Boolean)[0]
      if (current) {
        setCurrentCategoria(current)
      }
    }
  }

  const handleChangeCartao = (id: number) => {

    setCartaoID(id)
    
    if (cartoes) {
      const current = cartoes.map( c => c.id === id && c).filter(Boolean)[0]
      if (current) {
        setCurrentCartao(current)
      }
    }
  }

  return (

    <div>
      <div className="flex flex-col gap-3 w-[50rem]">
        <InputText value={transacaoNome} label="Nome" placeholder="Insira o nome:" onChange={(e) => setTransacaoNome(e)}/>
        <InputText value={transacaoDesc} label="Descrição" placeholder="Insira a descrição" onChange={(e) => setTransacaoDesc(e)}/>
        <DatePicker dataInicio={dataLancamento} label="Data de Lançamento" onChange={(e) => setDataLancamento(e)}/>
        <InputBRL value={transacaoValor} label="Valor (R$)" onChange={(e) => setTransacaoValor(e)}/>
        <InputSelect menuItems={transacaoStatusItems} label="Status" onChange={(e) => setTransacaoStatus(e)}/>
        <div className="flex w-full justify-between gap-2">
          <Selector defaultValue={currentEstabelecimento} label='Estabelecimento' items={estabelecimentos} onChange={(e) => handleChangeEstabelecimento(e)} showBrand/>
          <CategorySelector defaultValue={currentCategoria} label='Categoria' items={categorias} onChange={(e) => handleChangeCategoria(e)}/>
          <Selector defaultValue={currentCartao} label='Cartão' items={cartoes} onChange={(e) => handleChangeCartao(e)}/>
        </div>
      </div>
      <div className="flex gap-2 py-5">
        <Button onClick={onCancel} className="border border-projectPallet-secondary w-full" variant="outlined">Cancelar</Button>
        <Button onClick={() => handleUpdateTransaction().then(onConfirm)} className="bg-projectPallet-secondary text-white w-full">ATUALIZAR</Button>
      </div>
    </div>
  )
}
import Layout from "@/components/Layout"
import Container from "@/components/Container"
import Card from "@/components/Card"

import estabelecimento_thumbnail from '../../../public/estabelecimento_thumbnail.png'
import categoria_thumbnail from '../../../public/categoria_thumbnail.png'
import cartao_thumbnail from '../../../public/cartao_thumbnail.png'

const Manage = () => {

  return (
    <Layout className="flex justify-between gap-6 pr-5 overflow-hidden" defaultActiveMenuIndex={3}>
      <div className="flex w-full flex-col overflow-y-auto">
        <Container className="p-5 flex gap-2">
					<Card title="Estabelecimentos" icon="store" desc="Gerencie seus estabelecimentos de forma simples e rápida! 🙂" thumbnail={estabelecimento_thumbnail} buttonLabel="GERENCIAR" onClick={() => window.location.href = '/manage/estabelecimentos'}/>
					<Card title="Categorias" icon="icons" desc="Crie suas próprias categorias, não fique só no padrão! 😲" thumbnail={categoria_thumbnail} buttonLabel="GERENCIAR" onClick={() => window.location.href = '/manage/categorias'}/>
					<Card title="Cartões" icon="credit-card" desc="Faça o gerenciamento dos todos os seus cartões em um só lugar! 🤑" thumbnail={cartao_thumbnail} buttonLabel="GERENCIAR" onClick={() => window.location.href = '/manage/cartoes'}/>
				</Container>
      </div>
    </Layout>
  )
}

export default Manage
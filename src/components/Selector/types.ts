interface SelectorTypes {
  items: SelectorItems[];
	label: string;
  onChange: (e: EstablishmentTypes['estabelecimentoId']) => void;
}

interface SelectorItems {
	id: string;
	url: string;
	label: string;
}
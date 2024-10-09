interface CategorySelectorTypes {
  items: CategorySelectorItems[];
  label: string;
  onChange: (e: EstablishmentTypes['estabelecimentoId']) => void;
}

interface CategorySelectorItems {
	id: string;
	label: string;
	color: string;
	icon: string;
}
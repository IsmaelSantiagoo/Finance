interface CategorySelectorTypes {
  items: CategorySelectorItems[];
  label: string;
	defaultValue: CategorySelectorItems | undefined;
  onChange: (e: EstablishmentTypes['estabelecimentoId']) => void;
}

interface CategorySelectorItems {
	id: number;
	label: string;
	color: string;
	icon: string;
}
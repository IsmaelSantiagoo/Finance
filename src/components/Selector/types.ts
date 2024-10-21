interface SelectorTypes {
  items: SelectorItems[];
	label: string;
	defaultValue: SelectorItems | undefined;
  onChange: (e: EstablishmentTypes['estabelecimentoId']) => void;
	showBrand?: boolean;
}

interface SelectorItems {
	id: number;
	url?: string;
	label: string;
	color?: string;
	icon?: string
}
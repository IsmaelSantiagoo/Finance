interface DataTableHeaderProps {
  title: string;
  selectedRows: (string | number)[][];
  showActions: boolean;
  onAddAction: () => void;
	onEditAction: () => void;
	onDeleteAction: () => void;
}
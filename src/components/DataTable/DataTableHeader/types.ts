interface DataTableHeaderProps {
  title: string;
  selectedRows: (string | number | string[])[][];
  showActions: boolean;
  onAddAction: () => void;
	onEditAction: () => void;
	onDeleteAction: () => void;
}
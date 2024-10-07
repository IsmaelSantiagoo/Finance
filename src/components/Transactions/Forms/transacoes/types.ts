interface TransactionsFormTypes {
  onFormChange: (data: TransactionTypes) => void;
  reloadData: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}

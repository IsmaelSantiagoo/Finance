interface FormProps {
  id?: number;
  reloadData: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}
interface AlertTypes {
  onCancel?: () => void;
  onConfirm?: () => void;
  title: string;
  description?: string;
}
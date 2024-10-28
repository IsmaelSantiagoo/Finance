interface InputTextTypes {
  value: string;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  type?: 'text' | 'password';
  onChange: (e:any) => void;
}
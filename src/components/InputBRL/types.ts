interface InputBRLProps {
  value: string; // O valor deve ser uma string contendo somente números
  label?: string; // texto que aparecerá na label do input
  placeholder?: string; //texto que aparecerá dentro do input
  onChange: (value: string) => void; // Função chamada quando o valor muda
}
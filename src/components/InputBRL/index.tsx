import React, { useEffect, useState } from 'react';

const InputBRL: React.FC<InputBRLProps> = ({ value, label, placeholder, onChange }) => {
  const [inputValue, setInputValue] = useState<string>(value);

  // Atualiza o estado local sempre que o valor recebido muda
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const formatToBRL = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue) {
      // Converte a string numérica em um número e formata
      const formattedValue = (Number(numericValue) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      return formattedValue;
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Atualiza o inputValue com o novo valor
    setInputValue(newValue);
    
    // Passa o valor numérico não formatado (apenas dígitos) para o onChange
    const numericValue = newValue.replace(/\D/g, '');
    onChange(numericValue);
  };

  return (
    <div className='flex flex-col gap-2'>
      {
        label && 
        <label htmlFor={label} className="text-lg text-white font-bold">{label}</label>
      }
      <input
        id={label}
        type="text"
        value={formatToBRL(inputValue)} // Formata o valor completo
        onChange={handleChange}
        placeholder={placeholder}
        className='rounded-lg bg-transparent border border-projectPallet-secondary hover:border-projectPallet-tertiary p-2 text-md w-full text-white outline-none focus:outline-projectPallet-secondary'
      />
    </div>
  );
};

export default InputBRL;

import React, { useEffect, useState } from 'react';

const InputBRL: React.FC<InputBRLProps> = ({ value, label, placeholder, onChange }) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [isNegative, setIsNegative] = useState<boolean>(false)

  // Atualiza o estado local sempre que o valor recebido muda
  useEffect(() => {
    setInputValue(value);
    if (value.includes('-')) setIsNegative(true)
      console.log(value)
  }, [value]);

  const formatToBRL = (value: string) => {
    const numericValue = value.replace(/\D/g, '')

    if (numericValue && numericValue !== '00') {

      // Converte a string numérica em um número e formata
      const formattedValue = isNegative ? parseFloat(((Number(numericValue) / 100) * -1).toFixed(2)) : ((Number(numericValue) / 100))

      return formattedValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }

    return (0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.includes('-')) {
      setIsNegative(true)
    } else {
      setIsNegative(false)
    }
    
    // Atualiza o inputValue com o novo valor
    setInputValue(newValue);
    
    // Passa o valor numérico não formatado (apenas dígitos) para o onChange
    const numericValue = newValue.replace(/\D/g, '').replace(/(\d{1,})(\d{2})$/, '$1.$2')

    onChange( newValue.includes('-') ? (parseFloat(numericValue) * -1).toString() : numericValue);
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

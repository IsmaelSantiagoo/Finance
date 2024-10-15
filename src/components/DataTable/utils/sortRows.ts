import { DataTableColumnType } from "../DataTableBody/types";

export const sortRows = (columns: DataTableColumnType[], rows: (string | number | string[])[][], index: number, order: 'asc' | 'desc') => {
  
  return rows.sort((a, b) => {
    const aValue = a[index];
    const bValue = b[index];

    // Comparação numérica
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    // Comparação decimal
    if (typeof aValue === 'string' && columns[index].type === 'float' && typeof bValue === 'string' && columns[index].type === 'float') {
      return order === 'asc' ? parseFloat(aValue) - parseFloat(bValue) : parseFloat(bValue) - parseFloat(aValue);
    }

    // Comparação de string (ou conversão para string se forem de tipos diferentes)
    const aString = aValue.toString();
    const bString = bValue.toString();
    return order === 'asc' ? aString.localeCompare(bString) : bString.localeCompare(aString);
  });
};

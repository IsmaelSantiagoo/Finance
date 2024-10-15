import { DataTableBodyTypes, DataTableColumnType } from "@/components/DataTable/DataTableBody/types"

const columns: DataTableColumnType[] = [
  { name: 'Código', type: 'number', key: true},
  { name: 'Nome', type: 'string', brand: true},
  { name: 'Data', type: 'date'},
  { name: 'Valor', type: 'number', format: (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})},
  { name: 'Status', type: 'string'},
]

const rows = [
  [1, ['https://cdn.brandfetch.io/netflix.com/w/400/h/400', 'Netflix'], '26 de outubro de 2024', 55, 'depositado'],
  [2, ['https://cdn.brandfetch.io/subway.com/w/400/h/400','Subway'], '20 de abril de 2024', 27.8, 'transferido'],
  [3, ['https://cdn.brandfetch.io/drogarede.com.br/w/512/h/289/logo','Droga Rede'], '24 de agosto de 2024', 19.55, 'transferido'],
  [4, ['https://cdn.brandfetch.io/greenlots.com/w/512/h/512','V-Power'], '22 de junho de 2024', 83.5, 'depositado'],
]

export const items: DataTableBodyTypes = {
  columns: columns,
  rows: rows
}
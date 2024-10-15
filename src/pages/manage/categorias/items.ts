import { DataTableBodyTypes, DataTableColumnType } from "@/components/DataTable/DataTableBody/types"

const columns: DataTableColumnType[] = [
  { name: 'Nome', type: 'string'},
  { name: 'Data', type: 'date'},
  { name: 'Valor', type: 'number'},
  { name: 'Status', type: 'string'},
]

const rows = [
  ['Netflix', '26 de outubro de 2024', 55, 'depositado'],
  ['Subway', '20 de abril de 2024', 27.8, 'transferido'],
  ['Droga Rede', '24 de agosto de 2024', 19.55, 'transferido'],
  ['V-Power', '22 de junho de 2024', 83.5, 'depositado'],
]

export const items: DataTableBodyTypes = {
  columns: columns,
  rows: rows
}
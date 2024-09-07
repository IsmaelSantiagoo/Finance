import { ReactNode } from "react"

export interface MenuPanelProps {

  /**
   * Armazena os menus dentro do componente.
   */
  items: MenuItem[],
  
  /**
   * Define o índice do menu que ficará ativo por padrão
   */
  defaultActiveIndex?: number,

  /**
   * Defini a quantidade de menus separadas caso haja, exemplo: 0 - padrão (sem divisão), 1 (1 menu antes da divisão)
   */
  menuDivider?: number
}

export interface MenuItem {
  icon?: ReactNode,
  text: string,
  isActive?: boolean,
  control?: ReactNode,
  handleClick?: () => void,
}
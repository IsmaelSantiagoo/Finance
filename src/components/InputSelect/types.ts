interface InputSelectTypes {
  label: string,
  menuItems: MenuItems[],
  onChange?: (e:string) => void
}

interface MenuItems {
  value: string
}
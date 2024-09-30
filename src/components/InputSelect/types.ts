interface InputSelectTypes {
  label: string,
  menuItems: MenuItems[],
  onChange?: (e:any) => void
}

interface MenuItems {
  value: string
}
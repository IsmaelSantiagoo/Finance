export const DataTableItemConverter = (array: any) => {

  const items = array.map( (e:any) => Object.values(e).map( value => value))
  return items
}
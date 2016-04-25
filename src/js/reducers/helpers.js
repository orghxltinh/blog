export function updateItemList( items, updated ) {
  let findedIndex = items.findIndex( item => item.id === updated.id )
  findedIndex !== -1 && Object.assign( items[ findedIndex ], action.updated )
  return items;
}

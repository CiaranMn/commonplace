export default tagReducer = (state=[], action) => {

  switch (action.type) {
    case 'UPDATE_ALL_LISTS':
      return action.tags
    default:
      return state
  }
  
}
export default authorReducer = (state=[], action) => {

  switch (action.type) {
    case 'UPDATE_ALL_LISTS':
      return action.authors
    default:
      return state
  }
  
}
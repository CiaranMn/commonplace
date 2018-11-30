export default sourceReducer = (state=[], action) => {

  switch (action.type) {
    case 'UPDATE_ALL_LISTS':
      return action.sources
    default:
      return state
  }
  
}
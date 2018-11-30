export default categoryReducer = (state=[], action) => {

  switch (action.type) {
    case 'UPDATE_ALL_LISTS':
      return action.categories
    default:
      return state
  }
  
}
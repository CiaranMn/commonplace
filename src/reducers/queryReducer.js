export default queryReducer = (state = false, action) => {

  switch (action.type) {
    case 'UPDATE_RESULTS':
      return action.query ? action.query : state
    case 'CLEAR_QUERY':
      return {}
    default:
      return state
  }

}
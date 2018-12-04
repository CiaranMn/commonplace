const blankEntry = {
  author: {name: 'None found'},
  content: 'There are no entries to show here - try adding more, or try a new search!',
  tags: [],
  id: 404,
  category: {name: 'None found'}
}

export default resultsReducer = (state = [blankEntry], action) => {

  switch (action.type) {
    case 'UPDATE_RESULTS':
      return action.results.length !== 0 ? action.results : [blankEntry]
    case 'ADD_RESULTS':
      return [...action.results, ...state]
    default:
      return state
  }

}
export default updateResults = (results, query=false) => 
  ({
    type: 'UPDATE_RESULTS', 
    results,
    query
  })
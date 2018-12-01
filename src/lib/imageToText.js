export default imageToText = (imageBase64) => {

  const apiKey = ""
  const request = JSON.stringify({
    "requests": [
      { 
        "image": {
          "content": `${imageBase64}`
        },
        "features": [
          { "type": "DOCUMENT_TEXT_DETECTION" }
        ]
      },
      {
        "image": {
          "content": `${imageBase64}`
        },
        "features": [
          { "type": "TEXT_DETECTION" }
        ]
      }
    ]
  })

  return fetch('https://vision.googleapis.com/v1/images:annotate?key=' + apiKey,
    {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: request
    })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.responses.every(response => 
        Object.keys(response).length === 0 
        || 
        !!response.error
      )) {
        return Promise.reject('Could not read text from image.')
      } else { 
          let text
          resp["responses"].forEach(response => {
            if (response.fullTextAnnotation) {
              text = response.fullTextAnnotation.text.slice(0)
          }
          })
          return Promise.resolve(text)
        }
      })
}



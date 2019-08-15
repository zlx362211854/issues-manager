const ajax = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url).then((response) => {
      return response.json();
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}
export default ajax;
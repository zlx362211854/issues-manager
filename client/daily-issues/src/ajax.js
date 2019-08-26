const ajax = (url, init) => {
  return new Promise((resolve, reject) => {
    fetch(url, init).then((response) => {
      return response.json();
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}
export default ajax;
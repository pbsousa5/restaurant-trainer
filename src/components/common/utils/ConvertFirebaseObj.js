const ConvertFireBaseObj = {
  convert = (firebaseObj) => {
    return Object.keys(firebaseObj).map((key)=> {
        return Object.assign(firebaseObj[key], {key});
    })
  }
}
export default ConvertFireBaseObj

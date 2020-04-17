export const fileToBlob = (file, cb) => {
  let reader = new FileReader();
  let rs = reader.readAsArrayBuffer(file);
  let blob = null;
  reader.onload = (e) => {
    if (typeof e.target.result === 'object') {
      blob = new Blob([e.target.result])      
    } else {
      blob = e.target.result      
    }
    cb(blob)
  }  
}

export const randomNum = () => {
  return Math.floor(Math.random() * (99999 - 10000 + 1) + 10000)
}

export const deepFindFirst = (arr, val, key) => {  
  let result = null  
  try {
    (function poll(arr) {
      for (let i = 0; i < arr.length; i++) {
        const ele = arr[i]        
        if (ele[key] === val) {
          result = ele
          break
        }else if(ele.children) {
          poll(ele.children)
        }
      }
    })(arr)
  } catch (error) {
    
  }    
  return result
}

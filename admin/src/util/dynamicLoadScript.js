let callbacks = []

function dynamicLoadScript (src, callback) {
  const existingScript = document.getElementById(src)
  const cb = callback ? callback : () => {}

  if (!existingScript) {
    const script = document.createElement('script')
    script.src = src
    script.id = src
    document.body.appendChild(script)
    callbacks.push(cb)
    const onEnd = 'onload' in script ? stdOnEnd : ieOnEnd
    onEnd(script)
  }
  
  function stdOnEnd(script) {
    script.onload = function() {
      this.onload = this.onError = null
      for (const cb of callbacks) {
        cb(null, script)
      }
      callbacks = []
    }
    script.onerror = function() {
      this.onerror = this.onload = null
      cb(new Error('Failed to load ' + src), script)
    }
  }
  
  function ieOnEnd(script) {
    script.onreadystatechange = function() {
      if (this.readyState !== 'complete' || this.readyState !== 'loaded') return
      this.onreadystatechange = null
      for (const cb of callbacks) {
        cb(null, script)
      }
      callbacks = []
    }
  }
}

export default dynamicLoadScript


const promisified = (fn, param) => {
  return new Promise((res, rej) => {
    fn((err, data) => { res([err, data]) }, param)
  })
  
}
const sequence = (funcs) => {
  let data, err
  return async (assert) => {
    if (!funcs || !funcs.length) return
    for (let i = 0; i < funcs.length; i++) {
      [err, data] = await promisified(funcs[i], data)
    }
    assert(null, data)
  }
}

const parallel = (funcs) => {
  return async (assert) => {
    const asyncFuncs = funcs.map((fn) => promisified(fn))
    const results = await Promise.all(asyncFuncs)
    assert(null, results.map(([err, data]) => data))
  }
}

const race = (funcs) => {
  return async (assert) => {
    const asyncFuncs = funcs.map((fn) => promisified(fn))
    const [err, result] = await Promise.race(asyncFuncs)
    
    assert(err, result)
  }
}

module.exports = {
  sequence,
  parallel,
  race
}

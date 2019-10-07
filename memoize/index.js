const memoize = (fn) => {
  let memo = []
  let argMemo = []
  return (n, ...args) => {
    if (args.length && argMemo !== args.join()) {
      argMemo = args.join()
      memo = []
    }
    if (!memo[n]) {
      const res = fn(n, ...args)
      memo[n] = res
    }
    return memo[n]
  }
}

module.exports = memoize

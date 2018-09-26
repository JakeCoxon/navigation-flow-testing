
const immutagen = genFun => {
  const nextFor = history => input => {
    const
      newHist = history.concat([input]),
      gen = genFun(newHist[0]),
      { value, done } = newHist.map(x => gen.next(x))[history.length]

    return {
      value,
      next: done ? undefined : nextFor(newHist),
      mutable: gen
    }
  }
  return nextFor([])
}

export default immutagen;
export const listToTree = function(list, pid) {
  const arr = []
  list.forEach(l => {
    if (l.pid === pid) {
      const children = listToTree(list, l.id)
      if (children.length > 0) {
        l.children = children
      }
      arr.push(l)
    }
  })
  return arr
}

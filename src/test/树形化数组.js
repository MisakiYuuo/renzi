const list = [
  { id: 1, name: 1, pid: '' },
  { id: 2, name: 2, pid: 1 },
  { id: 3, name: 3, pid: 2 },
  { id: 4, name: 4, pid: 1 },
  { id: 5, name: 5, pid: '' }
]
// list.forEach(t => {
// let children = list.filter(m => m.pid === t.id)
// if(children.length > 0) {
// t.children = children
// }
// })

// let result = list.filter(t => t.pid === '')
// console.log(result)
function listToTree(list, pid) {
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

console.log(listToTree(list, ''))

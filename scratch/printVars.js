/* 打印变量到页面显示界面 */
const printVars = (vars) => {
  return Object.entries(vars).map(([key, value]) => (
    `<p>${key}: ${JSON.stringify(value, null, 2)}</p>`
  ))
}


let a, b, c
a = 10
b = 'hello world'
c = false
printVars({ a, b, c })

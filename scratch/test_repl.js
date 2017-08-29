const repl = require('repl')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Object.assign(repl.start('$ ').context, {
//   mongoose, Schema
// })

const r = repl.start('$ ')
Object.defineProperties(r.context, {
  mongoose: {enumerable: true, value: mongoose},
  Schema: {enumerable: true, value: Schema}
})

// const r = repl.start({
//   prompt: '$ ',
//   // writer: myWriter
// })

// function myWriter(output) {
//   // return output.toUpperCase()
//   return output
// }

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let db = mongoose.connect('mongodb://localhost/mern')

let catSchema = new Schema({
  name: String
})

let Cat = mongoose.model('Cat', new Schema({name: String}))

let kitty = new Cat({name: 'kitty'})

console.log('kitty:\ntype -- %s', kitty.constructor.name)
kitty.save()
let cat = Cat.find({name: 'kitty'})

console.log('cat:\ntype -- %s', cat.constructor.name)
// console.log('cat:', cat)

console.log('_id of kitty:', kitty._id)

console.log('hello')

console.log('world')

console.log('go')

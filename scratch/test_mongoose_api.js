const mongoose = require('mongoose')

var db = mongoose.connect(dbURI, {
  useMongoClient: true
})

var dbURI = 'mongodb://localhost/mern'

var User = db.model('User')

User.find()
  .then(users => {
    console.log(users)
  })

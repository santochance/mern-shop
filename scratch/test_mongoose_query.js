const db = require('../server/config/mongoose')()

const Property = require('../server/models/property.model.js')

Property.find({catalog: 'phone'}).exec()
  .then(props => console.log(props))


Property.find().exec()
  .then(props => console.log(props))

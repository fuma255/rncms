const Admin = require('./admin')
const Backups = require('./mongo')
const Article = require('./article')
const Power =  require('./power')
const Log = require('./log')
const News = require('./news')
const User = require('./user')
const Image = require('./image')

module.exports = {
  Admin,
  Backups,
  Article,
  Power,
  Log,
  News,
  User,
  Image
}
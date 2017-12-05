const mainRoutes = require('./routes')
module.exports = function (app, db) {
  mainRoutes(app, db)
  // Тут, позже, будут и другие обработчики маршрутов
}

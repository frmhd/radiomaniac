import mainRoutes from './routes'

export default (app, db) => {
  mainRoutes(app, db)
  // Тут, позже, будут и другие обработчики маршрутов
}

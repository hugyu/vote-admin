module.exports = (app) => {
    // path:路径
    // callback:回调
    app.use(require('./mineral_water'))
   app.use(require('./yoghurt'))
   app.use(require('./drinks'))
    app.use(require('./pure_milk'))
    app.use(require('./login'))
    app.use(require('./register'))
    app.use(require('./choice')) 
    app.use(require('./addItem'))
    app.use(require('./itemReq'))
    app.use(require('./deleteReq'))
    app.use(require('./changeItem'))

}
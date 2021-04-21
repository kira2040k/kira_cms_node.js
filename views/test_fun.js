const { concatSeries } = require('async');
const funs = require('./funs');
funs.conn_find({username:'kira'})
.then(result => {
    console.log(result)
})

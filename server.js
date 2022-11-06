const express = require('express')
const path = require('path')
const fs = require('fs')
const   PORT = 2000;
const adminRoute = require('./routes/adminRoute');
const clientRoute = require('./routes/clientRoute');
const session = require('express-session');
const app = express();
const flash  = require('req-flash');
const fileUpload = require('express-fileupload');
const User = require('./controllers/User');
const { use } = require('./routes/adminRoute');


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

app.use(flash({locals:'flash'}));

app.use(express.static('./public'))
app.use(express.static('uploads'))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: 'temp',
  }))


app.use(express.urlencoded({extended:true}))
app.use('/admin', adminRoute)
//app.set('public')
app.set('view engine', 'ejs')
app.set('views', 'public')
app.use( clientRoute)






app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
});

require('dotenv').config()
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const passport=require('passport');
const session=require('express-session');
const passportLocalMongoose=require('passport-local-mongoose');
const DB=require('./MongoDB/MongoDB');
const RegisterRoute=require('./Routes/PostRoutes/Register');
const LoginRoute=require('./Routes/PostRoutes/Login');
const AllmagazineRoute=require('./Routes/PostRoutes/Allmagazine');
const populate=require('./Routes/PostRoutes/Populate');
const Payment=require('./Routes/PostRoutes/Stripe/Payment');
const NotFound=require('./Routes/PostRoutes/NotFound');
const ResetPassword=require('./Routes/PostRoutes/ResetPassword');
const User=require('./userSchema')

// const Webhook=require('./Routes/PostRoutes/Stripe/Webhook');



//connect to MongoDB
DB.DBmongo();

//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
       
}))
app.use(passport.initialize());
app.use(passport.session());

// console.log(`the user is ${userr}`);
app.use('/register', RegisterRoute);
app.use('/login', LoginRoute);
app.use('/allmagazine', AllmagazineRoute);
app.use('/populate', populate);
app.use('/', Payment);
app.use('/notfound', NotFound);
app.use('/resetpassword', ResetPassword);



app.get('/', (req, res) => {
    res.render('login');
})
let message;

app.get('/3erryy67uhrthyreertyoujyiokl', function (req, res){
    res.render('ResetPassword', {message: message})
})
app.post('/3erryy67uhrthyreertyoujyiokl', function async (req, res){
    const {username, password} = req.body;
    // console.log(username, password);

    User.findOne({username: username}).then((resp)=>{
        if(resp){
        resp.setPassword(password, function() {
            resp.save()
        message='password successfully resetted!, please login with the new password'
        res.redirect('/3erryy67uhrthyreertyoujyiokl')
        })}
        else{
            message='this user does not exist'
            res.redirect('/3erryy67uhrthyreertyoujyiokl')
        
        };
        

    })
    
    

})


app.listen(3000, () => {
    console.log('server is running!!!');
});
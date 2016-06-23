var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');


app.use(bodyParser.json());                             // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded
app.use(multer());
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

var connect = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://127.0.0.1/projectdb';
mongoose.connect(connect);

app.use(express.static(__dirname + '/public'));

//------------------------------------------------- MONGO COLLECTIONS-----------------------------------------

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    password2: String,
    email: String,
    firstName: String,
    lastName: String,
    photo: String,
    following: [String],
    followers: [String]
},{ collection: 'user' });

var UserModel = mongoose.model('UserModel', UserSchema);

var ReviewSchema = new mongoose.Schema({
    place: String,
    username: String,
    userphoto: String,
    rate: String,
    comment: String
}, { collection: 'reviews' });

var ReviewModel = mongoose.model('ReviewModel', ReviewSchema);

var LikeSchema = new mongoose.Schema({
    username: String,
    place: String,
    like: String,
    cat: String,
    tip: String,
    url: String
}, { collection: 'like' });

var LikeModel = mongoose.model('LikeModel', LikeSchema);


//-----------------------------------------------  AUTHENTICATION---------------------------------------------

passport.use(new LocalStrategy(
function (username, password, done) {

    UserModel.findOne({ username: username, password: password }, function (err, user) {
        //if (err) { return done(null,false); }
        if (!user) { return done(null, false, { message: "Wrong Credentails" }); }
        return done(null, user);
    })
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

//-------------------------------------------------AUTH---------------------------------------
var auth = function (req, res, next) {
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

//-----------------------------------LOGIN-----------------------------------------------------
app.post('/login', passport.authenticate('local'), function (req, res) {
    var user = req.user;
    //res.json(user);
    if (res != null)
        res.json(user);
    else {
        res.json(null);
    }
});
//-------------------------------------- REGISTER------------------------------------------------
app.post('/register', function (req, res) {
    var newUser = req.body;
   
    UserModel.findOne({ username: newUser.username }, function (err, user) {
        if (err) { return next(err); }
        if (user) {
            res.json(null);
            return;
        }
        var newUser = new UserModel(req.body);
        newUser.save(function (err, user) {
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.json(user);
            });
        });
    });
});
//----------------------------------------Get User Profile-------------------------------------
app.get('/userprofile/:username', auth, function (req, res) {
    UserModel.findOne({ username: req.params.username }, function (err, user) {
        res.json(user);
        
    });
});

app.post('/update', function (req, res) {

    var username = req.body.username;
    
    var updated = {
        username :username,
        password : req.body.password,
        password2 : req.body.password,
        email : req.body.email,
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        photo: req.body.photo
    }
    UserModel.update({ username: username },updated ,  { multi: true },function (err, data) {
        console.log(data);
        res.json(data);
    });

});
//-----------------------------------------------GET USER DETAILS-------------------------------------
app.get('/userdetails/:name', function (req, res) {
    var name = req.params.name;
    UserModel.findOne({ username: name }, function (err, user) {
        res.json(user);

    });
});

//-----------------------------------------------COMMENT ON PLACE--------------------------------------
app.post('/review', function (req, res) {
    var rev = new ReviewModel(req.body);
    rev.save(function (err, data) {
        console.log(data);
        res.json(data);
    });
});
//-----------------------------------------GET Reviews-----------------------------------------
app.get('/getreviews/:place', function (req, res) {
    var place = req.params.place;
    //console.log("get reviews");
    //console.log(place);
    ReviewModel.find({ place: place }, function (err, data) {
        //console.log(data);
        res.json(data);
    });
});
//-----------------------------------------GET User Reviews on dashboard-----------------------------------------
app.get('/userreviews/:name', function (req, res) {
    var username = req.params.name;
    //console.log("get reviews");
    //console.log(username);
    ReviewModel.find({ username: username }, function (err, data) {
        //console.log(data);
        res.json(data);
    });
});
//---------------------------------------------Follow------------------------------------------------------
app.post('/follow', function (req, res) {
    var sup = req.body.sup;
    console.log(sup);
    var sub = req.body.sub;
    console.log(sub);

});
//----------------------------------------------get Like-----------------------------------------
app.post('/getlike', function (req, res) {
    var place = req.body.place;
    var username = req.body.username;
    LikeModel.findOne({ username: username , place: place }, function (err, data) {
        console.log("result");
        console.log(data);
        res.json(data);
    });
});
//------------------------------------------like----------------------------------------------
app.post('/like', function (req, res) {
    //var username = req.body.username;
    //var place = req.body.place;
    //var like = req.body.like;
    var lyk = new LikeModel(req.body);
   
    lyk.save(function (err, data) {
        console.log(data);
        res.json(data);
    });
});
//-----------------------------------------------unlike---------------------------------------
app.put('/unlike', function (req, res) {
    var username = req.body.username;
    var place = req.body.place;
    LikeModel.findOne({ username: username, place: place }, function (err, data) {
        data.like = 'u';
        data.save(function (err, doc) {
            res.json(doc);
        });
        
    });

});
//--------------------------------------liked places-----------------------------------------
app.get('/getlikedplaces/:name', function (req, res) {
    LikeModel.find({ username: req.params.name, like: 'l'}, function (err, data) {
        
            res.json(data);
       

    });
});
//----------------------------------------------------------------------------------------------

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);
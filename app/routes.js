module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/dashboard', isLoggedIn, function(req, res) {//isLogged in checks to see if youre logged in
        db.collection('Mytasks').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('dashboard', {
            user : req.user,
            tasks: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/dashboard', (req, res) => {
      db.collection('Mytasks').save({name: req.body.name, tasks: req.body.tasks, checkDone: false }, (err, result) => { //set to false on creation
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/dashboard')
      })
    })

    app.put('/dashboard/done', (req, res) => {
    db.collection('Mytasks').findOneAndUpdate(
        { name: req.body.name, tasks: req.body.tasks, checkDone: false }, //Find by name, task, and not done.
        { $set: { checkDone: true } }, //change checkDone to true
        { sort: { _id: -1 }, upsert: false }, //upsert is false as we should never create a new one here
        (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        }
    );
});


    app.delete('/dashboard', (req, res) => {
      db.collection('Mytasks').findOneAndDelete({name: req.body.name, tasks: req.body.tasks}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })
// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {//enable us to have 
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/dashboard');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

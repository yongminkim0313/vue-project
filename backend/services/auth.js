module.exports = (app, io, db) => {

    app.post('/auth/login', function(req, res) {
        console.log(req.body);
        req.session.isLogined = true;
        // req.session.save();
        req.session.save(function() {
            res.json('success')
        });
        console.log('req.session', req.session);
    });

    app.get('/auth/logout', (req, res) => {
        req.session.destroy();
        res.json("logout");
    });
}
module.exports = (app, io, db) => {

    app.post('/auth/login', function(req, res) {
        req.session.email = req.body.email;
        console.log(io);
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
module.exports = function(app) {
    app.use(
        ['/isalive', '/isready'],
        (req, res) => {
            res.sendStatus(200)
        }
    );
};

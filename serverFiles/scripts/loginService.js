MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    var dbo = db.db("local"),
        query = { userName: req.body.userName };

    dbo.collection("teacherprofile").findOne(query, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.end('username not found', res);
        } else if (user.password !== req.body.password) {
            res.end('incorrect password', res);
        } else {
            req.session.user = user;
            sess = req.session.user;
            sess.uniquId = req.session.user.userName;
            res.json(user);
        }

        db.close();
    });
});
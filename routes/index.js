
/*
 * GET home page.
 */

exports.index = function(req, res){
    if (req.session.user)
        res.redirect('/home');
    else 
        console.log(req.session);
        res.redirect('/users/new');
};
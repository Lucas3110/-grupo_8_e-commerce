function locals(req, res, next){

    res.locals.userLocals = false;

    if(req.session.usuarioLogueado){
        res.locals.userLocals = req.session.usuarioLogueado;
    }

    next()
}

module.exports = locals
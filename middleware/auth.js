const isAuth = (req,resp,next)=>{
    if (!req.session.userData) {
       resp.redirect("/login");
    }else {
        next();
    }
}

const isAdmin = (req, resp, next) => {
    if (!req.session.userData || req.session.userData.role !== "admin") {
        return resp.status(403).send("Access Denied!"); 
    }
    next();
};

module.exports = {isAuth, isAdmin};
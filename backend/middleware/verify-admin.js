function verifyAdmin(request, response, next) {
    if (request.user && request.user.role==1)
        next();
    else {
        return response.status(401).send("Unauthorized (admin)");
    }
}

module.exports = verifyAdmin;

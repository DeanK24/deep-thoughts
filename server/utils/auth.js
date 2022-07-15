const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    authMiddleware: function({ req }) {
        //allows token to be sent via req.body, req,query, or headers
        let token = req.body.token || req.query.token || req. headers.authorization;

        //seperate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
            token = token
                .split('')
                .pop()
                .trim();
        }

        // if no token, return request object as is
        if (!token) {
            return req;
        }

        try {
            //dcode and attach user data to request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        //return update request object 
        return req;
    }
};
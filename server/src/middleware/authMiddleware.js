//The Bouncer
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_tournament_key_2026';

export const protect = (req, res, next)=>{
    let token;

    //Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header (Format: "Bearer <token>")
            token = req.headers.authorization.split(" ")[1];

            //Verify token
            const decoded = jwt.verify(token, JWT_SECRET);

            //Attach user info to the request object for the next functions to use
            req.user = decoded;
            next();


        } catch (error){
            return res.status(401).json ({ error: 'Not authorized, token failed'});
        }
    }

    if (!token){
       return  res.status(401).json({ error: 'Not authorized, no token provided'})
    }
};

// Optional: specific role guard
export const adminOnly = (req,res,next)=>{
    if (req.user && req.user.role === 'admin'){
        next();
    } else {
        res.status(403).json({ error: 'Not authorised as an admin'})
    }
}
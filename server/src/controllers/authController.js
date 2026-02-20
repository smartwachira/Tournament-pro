import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_tournament_key_2026';

export const registerUser = async (req,res)=>{
    const { username, email,password,role}=req.body;

    try {
        //1.Check if user exists
        const userCheck = await query('SELECT * FROM users WHERE email = $1 OR username = $2',[email, username]);
        if(userCheck.rows.length>0){
            return res.status(400).json({error: 'User already exists'});
        }

        //2. Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password,salt);

        //3. Save to DB
        const result = await query(
            `INSERT INTO users (username, email, password_hash,role)
            VALUES ($1,$2,$3,$4) RETURNING id, username,email,role`,
            [username,email,passwordHash,role || 'fan']
        );

        res.status(201).json({message: 'User registered successfully', user: result.rows[0]});
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Server error during registration'});
    }
};

export const loginUser = async(req,res)=>{
    const{email,password} = req.body;

    try{
        // 1.find user
        const result = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0){
            return res.status(400).json({error: "Invalid credentials"});
        }

        const user = result.rows[0];

        //2. Verify password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch){
            return res.status(400).json({error: 'Invalid credentials'});
        }

        //3. Generate JWT Token 
        const token = jwt.sign(
            {
                id: user.id,
                username: user.name,
                role: user.role

            },
            JWT_SECRET,
            {expiresIn: '7d'}

        );

        res.json({
            message: "login successful",
            token,
            user: { id:user.id,username: user.username,role:user.role}
        })
    } catch (error){
        console.error(error);
        res.status(500).json({
            error: "Server error during login"
        })
    }
}
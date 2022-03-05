import db from "../db.js";


export async function getGames(req,res){
    try {
        const result = db.query(`
        SELECT *
        FROM games;
        `);
        
    } catch (err) {
        res.status(500).send(err);
    }
}
import db from "../db.js";

export async function getRentals(req, res){
    try {
        const result = await db.query(`
            SELECT *
            FROM rentals
        `);
        res.send(result.rows);
    } catch(err){
        res.status(500),send(err);
    }
}
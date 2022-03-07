import db from "../../db.js";


export default async function isGameAvailableMiddleware(req,res,next){

    const {gameId} = req.body;

    try {

        const result = await db.query(`
            SELECT r.id, g."stockTotal"
            FROM    
                rentals r
            JOIN 
                games g ON g.id=r."gameId"
            WHERE 
                "gameId"=$1
        `,[gameId]);

        if(result.rows.length > 0 && result.rowCount >= result.rows[0].stockTotal)
            return res.status(400).send("Não há jogos disponíveis no momento");

        next();
        
    } catch (err) {
        res.status(500).send(err);
    }
}
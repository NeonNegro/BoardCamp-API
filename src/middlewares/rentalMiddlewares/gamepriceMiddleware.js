import db from "../../db.js";


export default async function gamePriceMiddleware(req,res,next){
    const { gameId } = req.body;
    try {
        const result = await db.query(`
            SELECT "pricePerDay"
            FROM games
            WHERE id=$1
        `, [gameId]);

        if(!result.rowCount > 0)
            return res.status(400).send("O jogo não existe!");

        res.locals.pricePerDay = result.rows[0].pricePerDay;
    
    } catch (err) {
        res.status(500).send(err);
    }

    next();
    
}
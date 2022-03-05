import db from "../db.js";


export async function getGames(req,res){

    const { name } = req.query;
    const where = (name) ? `WHERE LOWER(games.name) LIKE LOWER('${name}%')` : '';

    try {
        const result = db.query(`
            SELECT games.*, categories.name AS "categoryName"
            FROM games
            JOIN categories ON games."categoryId"=categories.id
            ${where}
        `);

        res.send((await result).rows);
        
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

export async function createGame(req, res){
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body;
    try {
        let result = await db.query(`
            SELECT id 
            FROM categories
            WHERE id=$1
        `, [categoryId]);

        if(result.rowCount === 0)
            return res.status(400).send("Esta categoria não existe");

        result = await db.query(`
            SELECT id
            FROM games
            WHERE name=$1
        `, [name]);

        if(result.rowCount >0)
            return res.status(400).send("Nome já utilizado");

        result = await db.query(`
            INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
            VALUES ($1, $2, $3, $4, $5)
        `, [name, image, stockTotal, categoryId, pricePerDay]);

        res.sendStatus(201);
        
    } catch (err) {
        console.log(err);
    }
}
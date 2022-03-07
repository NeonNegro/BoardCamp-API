import db from "../../db.js";


export default async function isRentalNotClosedMiddleware(req,res,next){
    const { id } = req.params;
    try {

        const result = await db.query(`
            SELECT id, "returnDate"
            FROM rentals
            WHERE id=$1
        `, [id]);

        if(!result.rowCount > 0)
            return res.status(404).send("Aluguel não encontrado");
        if(result.rows[0].returnDate)
            return res.status(400).send("Aluguel já encerrado");

        next();
        
    } catch (err) {
        res.status(500).send(err);
    }
}
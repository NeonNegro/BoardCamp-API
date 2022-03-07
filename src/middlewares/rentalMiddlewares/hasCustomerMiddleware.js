import db from "../../db.js";


export default async function hasCustomerMiddleware(req,res,next){

    const {customerId} = req.body;

    try {

        const result = await db.query(`
            SELECT id
            FROM customers
            WHERE id=$1
        `,[customerId]);

        if(!result.rowCount >0)
            return res.status(400).send("Usuário Inválido!");

        
    } catch (err) {
        res.status(500).send(err);
    }

    next();

}
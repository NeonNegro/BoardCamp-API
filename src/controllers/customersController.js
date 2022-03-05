import db from "../db.js";



export async function getCustomers(req,res){
    const {cpf} = req.query;
    const where = (cpf) ? `WHERE cpf LIKE '${cpf}%'` : '';
    
    try {
        const result = await db.query(`
            SELECT *
            FROM customers
            ${where}
        `);

        res.send(result.rows);
        
    } catch (err) {
        res.status(500).send(err);
    }
}
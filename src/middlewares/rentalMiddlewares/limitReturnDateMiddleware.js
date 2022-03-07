import dayjs from "dayjs";
import db from "../../db.js";


export default async function limitReturnDateMiddleware(req,res,next){
    const { id } = req.params;
    try {
        const result =  await db.query(`
            SELECT r."rentDate", r."daysRented", r."returnDate", r."originalPrice"
            FROM rentals r 
            WHERE r.id=$1
        `, [id]);


        if(!result.rowCount >0)
            return res.status(404).send("Aluguel não encontrado");

        if(result.rows[0].returnDate !== null)
            return res.status(400).send("Aluguel já tinha sido finalizado");

        const {rentDate} = result.rows[0];
        const {daysRented} = result.rows[0];
        const {originalPrice} = result.rows[0];

        res.locals.limitReturnDate =  dayjs(rentDate).add(Number(daysRented), 'day').format('YYYY-MM-DD');
        res.locals.originalPrice =  originalPrice;

        next();
    } catch (err) {
        res.status(500).send(err);
    }
}
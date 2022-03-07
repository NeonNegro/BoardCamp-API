import dayjs from "dayjs";
import db from "../db.js";


export async function getRentals(req, res){

    const { customerId } = req.query;
    const { gameId } = req.query;

    const WHERE = (customerId || gameId) ? 'WHERE' : '';
    const AND = (customerId && gameId) ? 'AND' : '';
    const FILTER_1 = customerId ? `"customerId"=${Number(customerId)}` : '';
    const FILTER_2 = gameId ? `"gameId"=${Number(gameId)}` : '';

    try {
        const result = await db.query({
            text:`
                SELECT 
                    r.*, 
                    c.name AS "customerName", 
                    g.name AS "gameName",
                    g."categoryId",
                    cat.name AS "categoryName"
                FROM rentals r
                JOIN customers c ON r."customerId"=c.id
                JOIN games g ON r."gameId"=g.id
                JOIN categories cat ON g."categoryId"=cat.id
                ${WHERE}
                    ${FILTER_1}  ${AND}
                    ${FILTER_2}
                `,
            rowMode: 'array'
        });

        res.send(result.rows.map(r =>{
            const [id, customerId, gameId, rentDate, daysRented, returnDate,
                originalPrice, delayFee, customerName, gameName, categoryId,
                categoryName] = r;

            return {
                id, customerId, gameId, returnDate, daysRented, returnDate,
                originalPrice, delayFee, 
                customer: { id: customerId, name:customerName},
                game: {id: gameId, name: gameName, categoryId, categoryName}
            }
        }))
        
    } catch (err) {
        res.status(500).send(err);
    }
}



export async function createRental(req, res){

    const {customerId, gameId, daysRented} = req.body;
    const rentDate = dayjs().format('YYYY-MM-DD');
    const { pricePerDay } = res.locals;
    const originalPrice = pricePerDay * daysRented;
    
    try {

        await db.query(`
            INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
            VALUES ($1, $2, $3 ,$4, $5, NULL, NULL)
        `, [customerId, gameId, daysRented, rentDate, originalPrice]);


        res.sendStatus(201);
        
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function closeRental(req, res){
    const { id } = req.params;
    const returnDate = dayjs().format('YYYY-MM-DD');
    const { limitReturnDate, originalPrice } = res.locals;
    const daysLate = dayjs(returnDate).diff(limitReturnDate, 'day');
    const delayFeeValue = originalPrice * daysLate;

    const delayFee = (delayFeeValue > 0) ? `",delayFee=${delayFeeValue}` : '';

    try {
        await db.query(`
            UPDATE rentals r
            SET "returnDate"=$2 ${delayFee} 
            WHERE r.id=$1
        `,[id, returnDate]);

        res.sendStatus(200);
        
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function deleteRental(req,res){
    const { id } = req.params;

    try {
        await db.query(`
        DELETE 
        FROM rentals
        WHERE id=$1
        `, [id]);

    res.sendStatus(200);
        
    } catch (err) {
        res.status(500).send(err);
    }

}
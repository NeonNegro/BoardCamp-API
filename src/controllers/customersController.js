import db from "../db.js";
import Dayjs from "dayjs";
import customParse from "dayjs/plugin/customParseFormat.js";
const dayjs = Dayjs.extend(customParse);


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

export async function getCustomer(req,res){

    const { id } = req.params;

    if(!parseInt(id))
        return res.status(400).send("Id de cliente inválido - deve ser um número");

    const result = await db.query(`
        SELECT *
        FROM customers
        WHERE id=$1
    `, [id]);

    if(result.rowCount === 0)
        return res.status(404).send("Cliente não encontrado");
    
    res.send(result.rows[0]);

    try {
    } catch (err) {
        res.status(500).send(err);
        
    }
}

export async function createCustomer(req, res){
    const { name, phone, cpf, birthday } = req.body;
    let formattedBirthday;
    if(birthday.search('/') !== -1)
        formattedBirthday = dayjs(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD');
    else if(birthday.search('-') !== -1)
        formattedBirthday = dayjs(birthday, 'YYYY-MM-DD').format('YYYY-MM-DD');
    else
        formattedBirthday = dayjs(birthday, 'DDMMYYYY').format('YYYY-MM-DD');

    try {

        const result = await db.query(`
            SELECT id
            FROM customers
            WHERE cpf=$1
        `, [cpf]);

        if(result.rowCount > 0)
            return res.status(409).send("CPF já cadastrado.");

        await db.query(`
            INSERT INTO 
            customers (name, phone, cpf, birthday)
            VALUES ($1,$2,$3,$4)
        `, [name, phone, cpf, formattedBirthday]);

        res.sendStatus(201);
        
        
    } catch (err) {
        res.status(500).send(err);
    }
}


export async function updateCustomer(req, res){
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;
    let formattedBirthday;
    if(birthday.search('/') !== -1)
        formattedBirthday = dayjs(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD');
    else if(birthday.search('-') !== -1)
        formattedBirthday = dayjs(birthday, 'YYYY-MM-DD').format('YYYY-MM-DD');
    else
        formattedBirthday = dayjs(birthday, 'DDMMYYYY').format('YYYY-MM-DD');

    try {

        const result = await db.query(`
            SELECT id
            FROM customers
            WHERE cpf=$1 AND id!=$2
        `, [cpf, id]);

        if(result.rowCount > 0)
            return res.status(409).send("CPF já cadastrado.");

        await db.query(`
            UPDATE customers
                SET name=$1, phone=$2, cpf=$3, birthday=$4
            WHERE id=$5
        `,[name, phone, cpf, formattedBirthday, id]);

        res.sendStatus(200);
        
    } catch (err) {
        res.status(500).send(err);
    }
}
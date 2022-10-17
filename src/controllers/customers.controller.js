import { getConnection } from "./../database/database";

const getCustomers = async (req, res) => {
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM customers");
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
};

const getCustomer = async (req, res) => {
    try{
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM customers WHERE id = ?", id);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
};

const addCustomers = async (req, res) => {
    try{
        const { name, surname, address, phone, cphone, email } = req.body;
        if(name === undefined || surname === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field."});
        }
        const connection = await getConnection();
        const count = await connection.query("SELECT COUNT(*) as total FROM customers");
        const id = count[0].total + 1;
        const customers = { id, name, surname, address, phone, cphone, email };

        const result = await connection.query("INSERT INTO customers SET ?", customers);

        res.status(201).json({ message: "Customer added." });
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
};

const deleteCustomer = async (req, res) => {
    try{
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM customers WHERE id = ?", id);
        res.json({ message: "Successfully removed."});
    
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
};

export const methods = {
    getCustomers,
    getCustomer,
    addCustomers,
    deleteCustomer
};
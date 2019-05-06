//NPM connections
const { prompt } = require('inquirer')
const { createConnection } = require('mysql2')

//Connection to mySQL table
const db = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon_db'
   })

const updateInventory = (item, newStock) => {
    db.query(`UPDATE products SET stock_quantity = ${newStock} WHERE item_id = ${item}`)
    console.log(`Your order is complete, and since you did not enter any payment information, we cannot charge you! The item(s) will be shipped to your home, you lucky person you. Thank you for shopping at BAMazon!`)
}

//Function for customer prompt
const customerPrompt = () => {
    prompt([
        {
         type: 'input',
         name: 'item',
         message: 'Would you like to purchase something? If so, please input the item #:'
        },
        {
         type: 'input',
         name: 'quantity',
         message: 'How many of those do you want?'
        }
       ])
    .then(( {item, quantity}) => {
        db.query(`SELECT * FROM products WHERE item_id = ?`, item, (error, [{stock_quantity, price }]) => {
            if(error) {
                throw error
            }
            else {
                if (quantity > stock_quantity) {
                    console.log(`Sorry, we only have ${stock_quantity} units in stock.`)
                    process.exit()
                }
                // else if (stock_quantity = 0) {
                //     console.log(`Sorry, we are sold out of that item`)
                //     process.exit()
                // }
                else if (quantity < stock_quantity) {
                    let newStock = stock_quantity - quantity
                    let priceTotal = quantity * price
                    console.log(`Your total cost will be $${priceTotal}`)
                    // prompt({
                    //     type: 'list',
                    //     name: 'confirm purchase',
                    //     message: 'Would you like to confirm your purchase?',
                    //     choices: ['Yes', 'No']
                    // })
                    updateInventory(item, newStock)
                }
            }
        })
    })
}

async function getInventory(columns) {
    let response = await new Promise((resolve, reject) => {
        db.query(`SELECT ${columns} FROM products`, (e, r) => {
            if (e) {
                reject(e)
            }
            else {
                resolve(r)
            }
        })
    })
    return response
}

//initial function call to return list of items and call customer prompt
db.connect(error => {
    if (error) {
        throw error
    } else {
        getInventory('*')
            .then(response => {
                console.log('Welcome to BAMazon! Here are all the items we have available today:')
                response.forEach(({ item_id, product_name, department_name, price, stock_quantity}) => 
                console.log(`
                Item #: ${item_id}
                Product: ${product_name}
                Department: ${department_name}
                Price: $${price}
                Stock Quantity: ${stock_quantity}`))
                customerPrompt()
            })
            .catch(error => console.log(error))
    }
})
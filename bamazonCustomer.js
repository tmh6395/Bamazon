let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
	host: "localhost",

	port: 3306,

	user: "root2",

	password: "root",
	database: "Bamazon"
});

connection.connect(function (err) {
	if (err) throw err;
	// run the start function after the connection is made to prompt the user
	displayItems();
});

// Beginning of displayItems()
function displayItems() {

	connection.query("SELECT * FROM products", function (err, results) {
		if (err) throw err;
		for (let i = 0; i < results.length; i++) {
			console.log("\nProduct ID: " + results[i].item_id);
			console.log("Product name: " + results[i].product_name);
			console.log("Product description: " + results[i].product_description);
			console.log("Product price: $" + results[i].price);
		}

		inquirer
			.prompt([
				// The first should ask them the ID of the product they
				// would like to buy.
				{
					name: "askForId",
					type: "input",
					message: "Enter the ID of the item you would like to purchase: "
				},
				{
					name: "askForQuantity",
					type: "input",
					message: "Enter how many you would like to purchase: "
				}
			])
			.then(function (answer) {

				console.log(answer);
				quantityCheck(answer);
			})
	}) // connection.query endpoint
}


// Beginning of quantityCheck()
function quantityCheck(answer) {
	connection.query("SELECT stock_quantity FROM products WHERE item_id=" + answer.askForId, function (err, res) {
		if (err) throw err;
		// The below is the correct amount of stock remaining of the item.
		let idRequested = answer.askForId;
		let quantityRequested = answer.askForQuantity;
		let stockRemaining = res[0].stock_quantity;

		console.log(idRequested);
		console.log(quantityRequested);
		console.log(stockRemaining);

		// if there are not enough items in stock
		// "Insufficient quantity!"

		if (quantityRequested > stockRemaining) {
			return console.log("Insufficient quantity!");
		}

		// else change the database's quantity (use SET and WHERE)
		// once updated, show the total cost of the purchase

		else {
			updateQuantity(idRequested, quantityRequested, stockRemaining);
		}
	});
}	// End of quantityCheck()


function updateQuantity(idRequested, quantityRequested, stockRemaining) {
	let newRemainingStock = stockRemaining - quantityRequested;
	connection.query("UPDATE products SET ? WHERE ?",
		[
			{
				stock_quantity: newRemainingStock
			},
			{
				item_id: idRequested
			}
		],
		function(err, response){
			if (err) throw err;
			// transaction complete!
			console.log("Transaction complete!");
		}
	)
}




// below is for reference
										// function updateProduct() {
										// 	console.log("Updating all Rocky Road quantities...\n");
										// 	var query = connection.query(
										// 		"UPDATE products SET ? WHERE ?",
										// 		[
										// 			{
										// 				quantity: 100
										// 			},
										// 			{
										// 				flavor: "Rocky Road"
										// 			}
										// 		],
										// 		function (err, res) {
										// 			console.log(res.affectedRows + " products updated!\n");
										// 		}
										// 	);
										// 	// logs the actual query being run
										// 	console.log(query.sql);
										// }
// above is for reference


// insert functions to ask what to do from here (stock, price, etc)
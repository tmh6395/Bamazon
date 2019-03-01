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
	console.log("Hello, and welcome to Bamazon!");
	console.log("Take a look at our selection!")
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

				// Call a function that checks for quantity violation
				quantityCheck(answer);
			})
	})
}	// End of displayItems()


// Beginning of quantityCheck()
function quantityCheck(answer) {
	connection.query("SELECT * FROM products WHERE item_id=" + answer.askForId, function (err, res) {
		if (err) throw err;
		// The below is the correct amount of stock remaining of the item.
		let idRequested = answer.askForId;
		let quantityRequested = answer.askForQuantity;
		let price = res[0].price;
		let stockRemaining = res[0].stock_quantity;

		// If there are not enough items in stock
		if (quantityRequested > stockRemaining) {
			console.log("Unfortunately, we do not have that quantity of the item you wish to purchase in our stock.");
			connection.end();
		}

		// Else call a function that updates the database
		else {
			updateQuantity(idRequested, quantityRequested, price, stockRemaining);
		}
	});
}	// End of quantityCheck()


// Beginning of updateQuantity()
function updateQuantity(idRequested, quantityRequested, price, stockRemaining) {
	let newRemainingStock = stockRemaining - quantityRequested;
	let totalCost = (price * quantityRequested).toFixed(2);
	connection.query("UPDATE products SET ? WHERE ?",
		[
			{
				stock_quantity: newRemainingStock
			},
			{
				item_id: idRequested
			}
		],
		function (err, res) {
			if (err) throw err;
			// transaction complete!
			console.log("Your total cost will come to be $" + totalCost);
			console.log("Thank you for shopping with Bamazon!");
			connection.end();
		}
	)
}	// End of updateQuantity()
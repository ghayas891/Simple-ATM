import inquirer from 'inquirer';
let users = [
    { AccountNumber: 1033441001, pin: 12302435, Name: "Ali", Balance: 200000 },
    { AccountNumber: 1033441002, pin: 1234, Name: "Ali", Balance: 2100000 },
    { AccountNumber: 1033441003, pin: 2345, Name: "Raza", Balance: 300000 },
    { AccountNumber: 1033441004, pin: 3456, Name: "Asif", Balance: 400000 },
    { AccountNumber: 1033441005, pin: 4567, Name: "Ghafoor", Balance: 250000 },
    { AccountNumber: 1033441006, pin: 5678, Name: "Sultan", Balance: 2450000 },
    { AccountNumber: 1033441007, pin: 6789, Name: "Zafar", Balance: 2600000 },
];
const withdrawAmount = async (user, amount) => {
    let pinInput = await inquirer.prompt([
        {
            type: "password",
            name: "pin",
            message: "Please enter your pin to confirm withdrawal:",
            mask: "*",
        },
    ]);
    if (parseInt(pinInput.pin) === user.pin) {
        if (amount > user.Balance) {
            console.log("Insufficient balance " + user.Balance);
        }
        else {
            user.Balance -= amount;
            console.log(`Amount withdrawn = ${amount}`);
            console.log(`Remaining balance = ${user.Balance}`);
        }
    }
    else {
        console.log("Invalid pin!");
    }
};
async function main() {
    let cardInput = await inquirer.prompt([
        {
            type: "number",
            name: "card",
            message: "Please enter your card number:",
        },
    ]);
    let user = users.find(u => u.AccountNumber === cardInput.card);
    if (!user) {
        console.log("Account not found.");
        return;
    }
    console.log(`Welcome dear ${user.Name}`);
    let exit = false;
    while (!exit) {
        let operationInput = await inquirer.prompt([
            {
                type: "list",
                name: "operation",
                message: "Please choose your option",
                choices: ["Check balance", "Withdraw amount", "Exit"],
            },
        ]);
        switch (operationInput.operation) {
            case "Check balance":
                let pinInput = await inquirer.prompt([
                    {
                        type: "password",
                        name: "pin",
                        message: "Please enter your pin:",
                        mask: "*",
                    },
                ]);
                if (parseInt(pinInput.pin) === user.pin) {
                    console.log(`Your balance is ${user.Balance}`);
                }
                else {
                    console.log("Invalid pin!");
                }
                break;
            case "Withdraw amount":
                let amountInput = await inquirer.prompt([
                    {
                        type: "number",
                        name: "amountToWithdraw",
                        message: "Please enter the amount to withdraw:",
                    },
                ]);
                await withdrawAmount(user, amountInput.amountToWithdraw);
                break;
            case "Exit":
                console.log("Thanks for using our service!");
                exit = true;
                break;
            default:
                console.log("Invalid operation selected.");
                break;
        }
    }
}
main();

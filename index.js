const express = require("express");
const app = express();
const fetch = require("node-fetch");



app.get("/", (req, res)=>{
    res.send("<div><h1> Welcome to currency rates</h1><p>You can check currency rayes with this query format:<br/>'/api/rates?base=USD&#38currency=EUR,BRL,CAD'</p></div>")
})

app.get('/api/rates', (req, res) =>  {
    let postArray = [];

    let inputedBase = req.query.base;

    fetch("https://api.exchangeratesapi.io/latest?base="+inputedBase)
    .then( (response) => response.json())
    .then( result => {
        postArray.push(results);


        //breaking down the currency string
        let inputedCurrency = req.query.currency;
        let splited = inputedCurrency.split(",")
        let split1 = splited[0];
        let split2 = splited[1];



        //response objects
        console.log(postArray);
        const myobject = {
            result: {
                "base": inputedBase,
                "data": postArray[0].data,
                "rates":{
                    "CAD": postArray[0].CAD,
                    "EUR": postArray[0].EUR,
                    "NOK": postArray[0].NOK

                }
            }
        }


        //checking if the currency passsed in is in the database

        if(!postArray[0].rates.split1 && postArray[0].rates.split2 && postArray[1].rates.split3) {
            res.status(400).json({message:"the currency you entered is not in the database"})
        }else {
            res.json(myobject)
        }
    })
    .catch(error=> {
        res.status(400).json({ message:"this base query string is not available"})
        console.log("this base  query sting is not available")
    });
});
 


const PORT =process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
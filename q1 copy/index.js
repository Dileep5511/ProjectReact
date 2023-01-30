const express = require("express");
const app = express();
let cors = require("cors");


app.use(express.urlencoded({ extended: true }))
app.use(express. json())
app.use(cors());

// JSON object
const data = [
        { "name": "Mumbai", "x": 1, "y": 5 },
        { "name": "Kolkata", "x": 7, "y": 2 },
        { "name": "Chennai", "x": 6, "y": 5 },
        { "name": "Bangalore", "x": 4, "y": 9 },
]

function getCost(x1, y1, x2, y2) {
        let y = y1 - x1;
        let x = y2 - x2;
        return Math.floor(Math.sqrt(x * x + y * y) ) ;
}

app.get('/distance-calculator',(req, res) => {
        res.json({"source" : "Mumbai", "destinatoin" : "chennai"});
});

app.post('/distance',cors(), async (req, res) => {
        var source = req.body.source;
        var destination = req.body.destination;
        
        var check= source !== destination ? "true" : "false";
        var sou=data.filter((element) => element.name===source);
        var des=data.filter((element) => element.name===destination);
        var x1=sou[0].x;
        var x2=sou[0].y;
        var y1=des[0].x;
        var y2=des[0].y;        
        var temp=0;
        
        if(check === "true"){
                temp=getCost(x1,y1,x2,y2);
                r = {  
                        source:req.body.source,  
                        destination:req.body.destination  ,
                        cost: temp,
                };   
                res.send(JSON.stringify(r)); 
        } 
        else{
                var err="Please select the appropriate city";
                var resp = {
                        error : err,
                };
                res.send(JSON.stringify(resp));
        }
});

var shipper=[
        {
          shipperId:"borzo",
          rating:4,
          availableCities:[
            "Mumbai",
            "Bangalore",
            "Chennai"
          ]
        },

        {
          shipperId:"wefast",
          rating:4.5,
          availableCities:[
            "Mumbai",
            "Kolkata",
            "Chennai"
          ]
        },

        {
          shipperId:"dunzo",
          rating:4.1,
          availableCities:[
            "Kolkata",
            "Bangalore",
            "Chennai"
          ]
        }
      ];

app.get('/shipperdata', (req, res) => {
        res.sendfile("shipper.html");
});

app.post('/shipperprocess', (req, res) => {
        var shipper_name = req.body.city;
        var ress=[];
        var shipper=[
                {
                  shipperId:"borzo",
                  rating:4,
                  availableCities:[
                    "Mumbai",
                    "Bangalore",
                    "Chennai"
                  ]
                },
        
                {
                  shipperId:"wefast",
                  rating:4.5,
                  availableCities:[
                    "Mumbai",
                    "Kolkata",
                    "Chennai"
                  ]
                },
        
                {
                  shipperId:"dunzo",
                  rating:4.1,
                  availableCities:[
                    "Kolkata",
                    "Bangalore",
                    "Chennai"
                  ]
                }
              ];
              
        ress=shipper.filter(shipper => shipper.availableCities.includes(shipper_name));
        ress.forEach(ship => {
                delete ship.availableCities
        });

        res.send(JSON.stringify(ress));
});


app.listen(8080, () => {
        console.log("Started on PORT 8080");
})
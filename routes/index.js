var express = require('express');
var router = express.Router();
var ADODB = require('node-adodb');
//var bodyParser = require('body-parser');


//database connection
ADODB.debug = true;
var connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source= D:\\dbs\\FestoMES.accdb;Persist Security Info=False;');

//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: false }));



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});


router.get('/Index/Time', function (req,res) {
    connection
        .query('SELECT * FROM qrTest')
        .on('done', function(data) {
            //  console.log('Result:'.green.bold, data);
            //console.log(JSON.stringify(data, null, 2));
            obj = {print: data};
            res.render('ProductTime2', obj);
        })
        .on('fail', function(error) {
            console.log(error)
        });
});


router.get('/Index/CycleTime', function (req,res) {

    connection
        .query('SELECT * FROM qrCycleTime')
        .on('done', function(data) {
            console.log(JSON.stringify(data, null, 2));
            obj = {print: data};
            res.render('CycleTime', obj);
            //   var  ProductNumbers = data[0].SumOfMaxOfOPos;
            //   var  TotalTime = data[0].SumOfSumOfrealtime;
            //   var CycleTime = TotalTime / ProductNumbers;
            //   res.render('CycleTime.ejs', {"ProductNumbers":ProductNumbers, "TotalTime":TotalTime, "CycleTime":CycleTime});
        })
        .on('fail', function(error) {
            console.log(error)
        });
});

/*router.get('/Index/CycleTime', function (req,res) {

    connection
        .query('SELECT qrCycle.SumOfMaxOfOPos AS ProductsNumber, qrCycle.SumOfSumOfrealtime AS TotalTime FROM qrCycle')
        .on('done', function(data) {
           // console.log(JSON.stringify(data, null, 2));
            var  ProductNumbers = data[0].ProductsNumber;
            var  TotalTime = data[0].TotalTime;
            var  CycleTime = TotalTime / ProductNumbers;
            var  data1 = {"ProductsNumber":ProductNumbers, "Totaltime":TotalTime, "Cycletime":CycleTime};
          //  console.log(data1);
            obj = {print: data1};
           // res.send(obj);
             res.render('CycleTime', obj);
            //   var  ProductNumbers = data[0].SumOfMaxOfOPos;
            //   var  TotalTime = data[0].SumOfSumOfrealtime;
            //   var CycleTime = TotalTime / ProductNumbers;
            //   res.render('CycleTime.ejs', {"ProductNumbers":ProductNumbers, "TotalTime":TotalTime, "CycleTime":CycleTime});
        })
        .on('fail', function(error) {
            console.log(error)
        });
});*/



router.post('/ProductTime/Details', function (req,res) {
    ordernumber = req.body.ordernumber;
    console.log(ordernumber);
    connection
        .query('SELECT * FROM qrTest2 WHERE ONo=' + ordernumber )
        .on('done', function(data) {
            //  console.log('Result:'.green.bold, data);
            console.log(JSON.stringify(data, null, 2));
            //res.send(data);
            obj = {print: data};
            console.log(obj);
            res.render('Details', obj);
        })
        .on('fail', function(error) {
            console.log(error)
        });
});


router.post('/Description/Details', function (req,res) {
    WorkPlanNumber = req.body.DescriptionNumber;
    connection
        .query('SELECT * FROM qrTest3 WHERE WPNo=' + WorkPlanNumber )
        .on('done', function(data) {
            //  console.log('Result:'.green.bold, data);
            console.log(JSON.stringify(data, null, 2));
            //res.send(data);
            obj = {print: data};
            // res.send(obj);
            res.render('Description', obj);
        })
        .on('fail', function(error) {
            console.log(error)
        });
});





module.exports = router;

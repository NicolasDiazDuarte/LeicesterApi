const express= require('express');
const router = express.Router();
const matchesController = require('../controllers/matchesController')
const userController = require('../controllers/userController')

module.exports = function() {
    
    router.get('/matches/lastmatch', matchesController.showLastMatch);
    
    router.get('/matches/last50matches',matchesController.showLast50Matches);

    router.get('/matches/match/:idMatch',matchesController.ShowMatchById);
    
    router.get('/matches/:date',matchesController.showMatchByDate);

    router.get('/matches/:fromdate/:todate',matchesController.showMatchFromDatetoDate);

    router.get('/points/:fromdate/:todate',matchesController.showPointsFromDateToDate);

    router.post('/create', userController.createAccount)

    router.post('/Authenticate',userController.Auth)

    router.post('/match/addmatch',matchesController.addMatch)


    return router;
}
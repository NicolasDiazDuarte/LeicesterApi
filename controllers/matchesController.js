const Matches = require('../models/Matches')

exports.showLastMatch = async (req,res,next) => {
    
    try {
        const lastMatch = await Matches.find().sort({"date":-1}).limit(1)
        res.json(lastMatch)
    } catch (error) {
        next()
    }
}

exports.showLast50Matches = async (req,res,next) => {
    try {
        const last50 = await Matches.find().sort({"date":-1}).limit(50)
        res.json(last50)
    } catch (error) {
        next()
    }
}


exports.ShowMatchById = async (req,res,next) => {
    const match = await Matches.findById(req.params.idMatch); 

    if (!match) {
        res.json({message : 'That match doesn´t exist'});
        next()
    }

    res.json(match); 

}

exports.showMatchByDate = async (req,res,next) => {
    try {
        matchDate = req.params.date

        if (isNaN(Date.parse(matchDate))){
            res.json({message:'date format incorrect, insert date format like "yyyy-mm-dd"'})
        }else {

        const match = await Matches.findOne({"date":matchDate})

        res.json(match) 
        }

    } catch (error) {
        next()
    }
}

exports.showMatchFromDatetoDate = async (req,res,next) => {
    try {
        const fromDate = req.params.fromdate
        const toDate = req.params.todate

        if (isNaN(Date.parse(fromDate) || isNaN(Date.parse(toDate)))) {
            res.json({message:'date format incorrect, insert date format like "yyyy-mm-dd"'})
            
        } else {
            const matches = await Matches.find({
                "date": { "$gte":fromDate, "$lte":toDate}
            }

            ).sort({"date":1});
            
            res.json(matches)
        }

        
    } catch (error) {
        next()
    }
}

exports.showPointsFromDateToDate = async (req,res,next) => {
    try {
        const fromDate = req.params.fromdate
        const toDate = req.params.todate
        
        if ( (isNaN(Date.parse(fromDate))) || (isNaN(Date.parse(toDate)))) {
            res.json({message:'date format incorrect, insert date format like "yyyy-mm-dd"'})
            
        } else {
            const matches = await Matches.find({
                "date": { "$gte":fromDate, "$lte":toDate}
                }

            );
            const points = 0 
            
            //Calculate points 
            matches.map( el => {
                points = points + el.points
            })

            res.json(points)
           
        }
        

    } catch (error) {
        next()
    }
    
};

exports.addMatch= async (req,res,next) => {
    const match = new Matches(req.body)
    try {
        res.json({message: 'Added a new match'})
    } catch (error) {
        console.log(error);
        next()
        
    }
}

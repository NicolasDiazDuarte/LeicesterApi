const puppeteer = require('puppeteer');
const Matches = require('../models/Matches');
const cron = require('node-cron');





    module.exports = {lastMatch : async() =>{ 
        
        //Using cron to get data of the last match at 11 pm once a day 
        cron.schedule("* * 23 * * *",async() => {
        
        //Using puppeteer to scrapping the website of Leicester 
    
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.lcfc.com');
        
        const data = await page.evaluate( ()=>{
            
            function calculatePoints(homeTeam,homeScore,awayScore)  {
                if (homeTeam=='Leicester') {
            
                    if (homeScore>awayScore) {
                        return 3
                    } else if (homeScore< awayScore) {
                        return 0
                    } else {return 1 }
                }
                else {
                    if (homeScore>awayScore) {
                        return 0
                    } else if (homeScore< awayScore) {
                        return 3
                    } else {return 1 }
                }
                        
            }
            
    
            const homeTeam = document.querySelector('span[class="match-abridged__team match-abridged__team--home match-abridged--slim-hide"]').textContent;
            const awayTeam = document.querySelector('span[class="match-abridged__team match-abridged__team--away match-abridged--slim-hide"]').textContent;
            const score = document.querySelector('.match-abridged__score').textContent.trim();
            const homeScore = parseInt(score[0]);
            const awayScore = parseInt(score[score.length - 1  ]);
            let date = document.querySelector('span[class="match-abridged__date"]').textContent.split(' ');
            const day = date[1]
            const monthString = date[2]
            
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const month = months.indexOf(monthString) + 1 
    
            date= 2020 + '-' + month + '-' + day
    
            const points = calculatePoints(homeTeam,homeScore,awayScore) 
            return{

                homeTeam,
                awayTeam,
                homeScore,
                awayScore,
                date,
                points
                
            }
            
        })
        console.log(data)
        const newMatch = new Matches(data);
        newMatch.save();
        await browser.close()
    }  ) }

    }



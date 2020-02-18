const members = data.results[0].members
const tableMost = document.querySelector("#most")
const tableLeast = document.querySelector("#least")
const loyalId = document.querySelector("#Loyal")
const attendanceId = document.querySelector("#Attendance")
var stats = {
    total : ["Total", members.length , 0 ],
    democrats : ["Democrats", 0 , 0 ],
    republicans : ["Republicans",0 , 0 ],
    independents : ["Independent",0 , 0],
    leastLoyal : [],
    mostLoyal : [],
    mostEngaged : [],
    leastEngaged : [],
    
}
members.forEach(member =>
    {
        if(member.party== "D"){
            stats.democrats[1]++
            stats.democrats[2] += member.votes_with_party_pct
        }else if(member.party == "R"){
            stats.republicans[1]++
            stats.republicans[2] += member.votes_with_party_pct
        }else{
            stats.independents[1]++
            stats.independents[2] += member.votes_with_party_pct
        }
    })
    
    stats.total[2] = (stats.democrats[2] + stats.republicans[2] + stats.independents[2])  / 450
    function innerGlance (party){
        party[1] != 0 ? party[2] /= party[1] : party[2] = 0 ;
        let row = document.querySelector("#table1").insertRow(-1);
        row.innerHTML = `<td>${party[0]}</td><td>${party[1]}</td><td>${party[2].toFixed(2)}\%\</td>`
    } 
    innerGlance(stats.democrats)
    innerGlance(stats.republicans)
    innerGlance(stats.independents) 
    document.querySelector("#table1").insertRow(-1).innerHTML = `<td>${stats.total[0]}</td><td>${stats.total[1]}</td><td>${stats.total[2].toFixed(2)}\%\</td>`
    

if (attendanceId){
        let engages = members.slice().sort(function (a, b) {
            return a.missed_votes_pct - b.missed_votes_pct 
        });
        pushArray10Percent(engages , stats.mostEngaged ,"missed_votes_pct" );
        engages.reverse();
        pushArray10Percent(engages , stats.leastEngaged ,"missed_votes_pct" );
        innerTable(most, "mostEngaged" , "missed_votes","missed_votes_pct", 1 )
        innerTable(least , "leastEngaged" , "missed_votes", "missed_votes_pct" , 1)
        
        
    }else{
        
        let loyals = members.slice().sort(function (a, b) {
            return a.votes_with_party_pct - b.votes_with_party_pct
        });
        pushArray10Percent( loyals , stats.leastLoyal , "votes_with_party_pct");
        loyals.reverse();
        pushArray10Percent( loyals , stats.mostLoyal , "votes_with_party_pct");
        innerTable(most, "mostLoyal" , "total_votes","votes_with_party_pct" , 0 )
        innerTable(least , "leastLoyal" , "total_votes", "votes_with_party_pct" , 0)
        
    }
    
    
    function pushArray10Percent(array , pushedArray , prop){
        let pct10 = array.length * 0.1
        let j = 0
        do{
            if( array[j].total_votes > 0){
                pushedArray.push(array[j]);
            }else{
                pct10 += 1
            }
            j++
            
        }while( j < pct10 || array[j][prop] == array[j-1][prop] )
        
    }
    
    
    function innerTable(tableId , pushedArray , number , pct , boolean){
        stats[pushedArray].forEach(member => {
            let row = tableId.insertRow(-1);
            let fullname = member.first_name + " " + ( member.middle_name ||  "" ) + " " + member.last_name
            fullname = (member.url != "" ? `<a href="`+ member.url + `">` + fullname + `</a>` : fullname )
            let fieldOne = ""
            boolean == 0 ? fieldOne = ( member[pct] * member[number] / 100 ).toFixed(0) : fieldOne = member[number] ;
            row.innerHTML = `
            <td> ${fullname}</td>
            <td> ${fieldOne} </td>
            <td> ${member[pct]}\%\</td>`
        });
    }
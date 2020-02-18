


const tbody = document.querySelector("tbody")
const members = data.results[0].members
const select = document.querySelector("select")

var states =[]
members.forEach(member =>{
    if ( states.indexOf(member.state) == (-1)){
       states.push(member.state)
    }

         })
    select.innerHTML +=`<option value="All">All</option>`
    for(let i= 0; i<states.length; i++)
     select.innerHTML +=`<option value="${states[i]}">${states[i]}</option>`
/*
members.forEach(member => {
    let row = tbody.insertRow (-1)
    row.innerHTML =`
    <td> <a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name} </a></td>
    <td> ${member.party} </td>
    <td> ${member.state} </td>
    <td> ${member.seniority} </td>
    <td> ${member.votes_with_party_pct} </td>`
})
*/
     var aux = ""
function filtrar(){
    tbody.innerHTML=""
    let check = document.getElementsByClassName("congress")
    
    for(let i=0;i<check.length;i++){
        
        if(check[i].checked){
            if ( select.value == "All"){
                aux = members.filter(e => e.party == check[i].value)
            }else{
                aux = members.filter(e => e.party == check[i].value && e.state == select.value) 
            }
            aux.forEach(member => {
                
    let row = tbody.insertRow (-1)
    row.innerHTML =`
    <td> <a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name} </a></td>
    <td> ${member.party} </td>
    <td> ${member.state} </td>
    <td> ${member.seniority} </td>
    <td> ${member.votes_with_party_pct} </td>`
})
        }
    }
}
document.getElementById("rep").addEventListener("click", filtrar)
document.getElementById("dem").addEventListener("click", filtrar)
document.getElementById("ind").addEventListener("click", filtrar)
document.getElementById("select").addEventListener("change", filtrar)


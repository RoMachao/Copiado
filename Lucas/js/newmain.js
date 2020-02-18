const app = new Vue ({
    el: "#app",
    data:{
        url: (document.querySelector("#senator") ? "https://api.propublica.org/congress/v1/113/senate/members.json": "https://api.propublica.org/congress/v1/113/house/members.json"),
        init: {
            method: "GET",
            headers: {
                "X-API-Key":"f47ofriKam7lIdPlxSh0EuuuPCbmQJlkYA1dbag7",
            }
        },
        
        members:[],
        partidos:{
        democratas:[],
        republicanos:[],
        independientes:[],
        total:[],
            },
        selectState: "ALL",
        states:[],
        partido:[],
        d_votes_wp:0,
        r_votes_wp:0,
        i_votes_wp:0,
        least:[],
        most:[],
        least_loyal:[],
        most_loyal:[],
        auxd:0,
        auxr:0,
        auxi:0,
        totalvotes:0,
    },
    
    created (){
        fetch(this.url, this.init)
        .then(function(res){
            if(res.ok){
                return res.json()
            }else{
                throw new Error(res.status)
            }
        })
        .then(function(json){
            app.members = json.results[0].members.filter(e => e.total_votes != 0)
            app.partido = app.checkbox(json.results[0].members,"party")
            app.states = app.checkbox(json.results[0].members,"state")
            app.partidos.democratas.push(app.calcular("D").length)
            app.partidos.democratas.push(app.votos(app.calcular("D"))+"%")
            app.partidos.republicanos.push(app.calcular("R").length)
            app.partidos.republicanos.push(app.votos(app.calcular("R"))+"%")
            app.partidos.independientes.push(app.calcular("I").length)
            app.partidos.independientes.push(app.votos(app.calcular("I"))+"%")
            app.partidos.total.push(app.members.length)
            app.partidos.total.push(app.votos(app.members)+"%")
            app.auxd = app.votos(app.calcular("D"))
            app.auxr = app.votos(app.calcular("R"))
            app.auxi = app.votos(app.calcular("I"))
            //app.total = app.votos(app.members)
            app.most = app.diezprimeros(app.members,"votes_with_party_pct",true)
            
        })
        .catch(function(error){
            console.log(error)
        })
        console.log("hola")
        
    },
    methods:{
        ordenar(array, prop,bool){
            if(bool){
            return array = this.members.slice().sort(function(a,b){
                return a[prop] - b[prop]
            })
                }else{
                    return array = this.members.slice().sort(function(a,b){
                return b[prop] - a[prop]
                })
                }                                                 
        },
        diezprimeros(array,prop,bool){
           let result = []
            let aux = this.ordenar(array,prop,bool)
            for(let i=0; i<aux.length;i++){
                if(bool){
                if(aux[i][prop]<=aux[(Math.round(aux.length/10))-1][prop]){
                   result.push(aux[i])
                }}else if (aux[i][prop]>=aux[(Math.round(aux.length/10))-1][prop]){
                       
                   result.push(aux[i]) 
                    }
                
            }
            return result
            
    },
        calcular (partido){
            return this.members.filter(member => member.party==partido)
        },
        votos (array){
            let aux= 0
            for(let i=0; i<array.length;i++){
             aux += array[i].votes_with_party_pct  
            }
            //return (aux/array.length).toFixed(2)
            return (array.length==0 ? 0: (aux/array.length)).toFixed(2)
        },
        checkbox (array,key){
            let result = []
            array.forEach(e => !result.includes(e[key]) ? result.push(e[key]) : null)

            return result
                    },
      //  option (array,key){
      //      let result=[]
      //      array.forEach(e =>{
      //      if ( states.indexOf(e.state) == (-1)){
      //          result.push(e.state)
      //          
    //     }})
      //      return result
        },
        
        
                
    
            computed:{
                    filterMembers(){
                        return this.members.filter(e => app.partido.includes(e.party)&& (e.state==this.selectState || this.selectState=="ALL"))
                    },
                   
                        
                }
        
    
})
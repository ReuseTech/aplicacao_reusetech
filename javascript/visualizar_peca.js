let json_request = new XMLHttpRequest();
json_request.open('GET', 'api/consulta_pecas.php');
json_request.responseType = "json";

json_request.onload = () =>{
    let tabelas_columns = json_request.response[0];
    let tabelas_values = json_request.response[1];
    let tabelas_names = json_request.response[2];

    let topo = document.querySelector('div.topo');

    for(let i = 0; i < tabelas_columns.length; i++){
        if(tabelas_names[i].indexOf("fk_") == -1 && tabelas_names[i].indexOf("barramento_") == -1){
            let div = document.createElement('div');
            let ul = document.createElement('ul');
            let h3 = document.createElement('h3');
        
            div.setAttribute('class', 'peca');
            h3.innerText = tabelas_names[i];
        
            div.appendChild(h3);
        
            for(let o = 0; o < tabelas_columns[i].length; o++){
                let li = document.createElement('li');
                li.innerText = tabelas_columns[i][o] + ": " + tabelas_values[i][o];
                ul.appendChild(li);
            }

            let tabelas_fk = [];
            for(let n = 0; n < tabelas_columns.length; n++){
                if(tabelas_names[n].indexOf("fk_"+tabelas_names[i]) != -1 && tabelas_values[i][0] == tabelas_values[n][0]){
                    let fk = []
                    fk.push(tabelas_columns[n]);
                    fk.push(tabelas_values[n]);
                    tabelas_fk.push(fk);   
                }
            }

            let tabelas_barramentos = [];
            for(let n = 0; n < tabelas_columns.length; n++){
                if(tabelas_names[n].indexOf("barramento_"+tabelas_names[i]) != -1){
                    let barramento = []
                    barramento.push(tabelas_columns[n]);
                    barramento.push(tabelas_values[n]);
                    tabelas_barramentos.push(barramento);   
                }
            }

                        
            if(tabelas_fk.length > 0){
                for(let z = 0; z < tabelas_fk.length; z ++){
                    for(let x = 0; x < tabelas_barramentos.length; x++){
                        if(tabelas_fk[z][1][1] == tabelas_barramentos[x][1][0]){
                            for(let c = 0; c < tabelas_fk[z][1][2]; c++){
                                console.log("barramento");
                                console.log(tabelas_barramentos[x][1]);

                                let li = document.createElement('li');
                                    li.innerText = "*------------------*";
                                    ul.appendChild(li);

                                for(let v = 0; v < tabelas_barramentos[x][0].length; v++){
                                    if(tabelas_barramentos[x][0][v] != "id"){
                                        let li = document.createElement('li');
                                        li.innerText = tabelas_barramentos[x][0][v] + ": " + tabelas_barramentos[x][1][v];
                                        ul.appendChild(li);
                                    }
                                }
                            }
                        }
                    }
                }
                
            }          


            div.appendChild(ul);
            topo.appendChild(div);
        }    
    }
}

json_request.send();

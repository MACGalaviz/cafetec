const content = document.getElementById("content"),
    host = document.getElementById("host");

function getConnection(host) {
    $.ajax({
        url: `http://${host}:3977/api/product`,
        success: function(response) {
            content.innerHTML = "";
            //console.log("response"+response);
            localStorage.setItem("itemData",response);
            //console.log(localStorage.getItem("itemData"));
            console.log(JSON.parse(localStorage.getItem("itemData")));
            useData();
        },
        error: function() {
            useData();
            console.log("No se ha podido obtener la información");
        }
    });
}

function useData(){
    if(localStorage.getItem("itemData")){
        const itemData = JSON.parse(localStorage.getItem("itemData"));
        let count =1;

        itemData.forEach(e=>{
            drawItem(e);
            let divItem = document.getElementById("divItem");
            divItem.setAttribute("id","item"+count);
            count++;
            if (count === 4)
            {
                count = 1;
            }

        });
    }else{
        content.innerHTML = "";
        const error = `
    
    
        <div class="ed-item l-1-3">
            <div id="divItem" class="rounded border" style="padding: 10px">
            <h3>Lamentablemente no se ha encontrado el menú en su dispositivo,<br>favor de conectarse a internet para descargarlo.<br> Lo siento...</h3>
            </div>
            </div>
        </div>
        `;
            content.insertAdjacentHTML('beforeEnd',error);
    }

}

function drawItem(e){
    //const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;

    const hero = `
    
    
    <div class="ed-item l-1-3">
        <div id="divItem" class="rounded border" style="padding: 10px">
        <h3>${e.name}</h3>
        <div class="item-img">
            <p >${e.description}</p>
            <p style="text-align: end" >Precio: ${e.price}<button class="btn btn-primary">+</button></p>
        </div>
        </div>
    </div>
    `;
    content.insertAdjacentHTML('beforeEnd',hero);
}

host.addEventListener("keyup", e => {
    if(e.keyCode === 13){
        getConnection(e.target.value.trim());


    }
});

getConnection("localhost");

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
        let itemData = JSON.parse(localStorage.getItem("itemData"));
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
        /*const error = `
    
    
        <div class="ed-item l-1-3">
            <div id="divItem" class="rounded border" style="padding: 10px">
            <h3>Lamentablemente no se ha encontrado el menú en su dispositivo,<br>favor de conectarse a internet para descargarlo.<br> Lo siento...</h3>
            </div>
            </div>
        </div>
        `;
            content.insertAdjacentHTML('beforeEnd',error);
    */
        setTimeout(function (){Swal.fire({
            title: 'No se encontró el menú',
            html: 'Lamentablemente no logramos encontrar el menú en su dispositivo,<br>te pedimos que te conectes a internet para poder descargarlo.<br> Una disculpa...',
            type: 'warning',
            onClose: () => {
                getConnection("localhost");
            }
        })},5000);
    }


}

function drawItem(e){
    //const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;

    let hero = `
    
    
    <div class="ed-item l-1-3">
        <div id="divItem" class="rounded border" style="padding: 10px">
        <h3>${e.name}</h3>
        <div class="item-img">
            <p >${e.description}</p>
            <p style="text-align: end" >Precio: ${e.price}<button class="btn btn-primary"  onclick="getItem(${e.id-1});">Agregar al carrito</button></p><!--data-toggle="modal" data-target="#itemModal"-->
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

function getItem(id) {
    /*console.log(id);
    let itemData = JSON.parse(localStorage.getItem("itemData"));
    let itemData1 = itemData[id];
    console.log(itemData1);

    let modalItem =document.getElementById("itemModalBody");
    //let miNodo = document.createElement('div');
    //miNodo.classList.add('card', 'col-sm-4');
    modalItem.classList.add('card');
    // Body
    let miNodoCardBody = document.createElement('div');
    miNodoCardBody.classList.add('card-body');
    // Titulo
    let miNodoTitle = document.createElement('h5');
    miNodoTitle.classList.add('card-title');
    miNodoTitle.textContent = itemData1['name'];
    // Precio
    let miNodoPrecio = document.createElement('p');
    miNodoPrecio.classList.add('card-text');
    miNodoPrecio.textContent = itemData1['price'];
    // Boton
    let miNodoBoton = document.createElement('button');
    miNodoBoton.classList.add('btn', 'btn-primary');
    miNodoBoton.textContent = 'Agregar al carrito';
    miNodoBoton.setAttribute('marcador', itemData1['id']);
    //miNodoBoton.addEventListener('click', anyadirCarrito);
    // Insertamos
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoBoton);
    modalItem.appendChild(miNodoCardBody);
    //$items.appendChild(miNodo);
    content.insertAdjacentHTML('beforeEnd',modalItem);*/

    let itemData = JSON.parse(localStorage.getItem("itemData"));
    let itemData1 = itemData[id];
    console.log(itemData1);

    if(itemData1['type_id'] === 1)
    {
        Swal.fire({
            title: "Deseas agregar "+itemData1['name']+" al carrito?",
            text: "Precio: $"+itemData1['price']+"pesos.",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Si, lo deseo!',
            cancelButtonText: 'No, gracias.'
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: "¡Algunos detalles sobre su pedido!",
                    /*text: "Pedido: "+itemData1['name']
                        +"/n"+"Precio: "+itemData1['price']
                        +"Hay algo en específico que quisiera agregar?"
                        +"Si no le gusta algun condimento o adereso con el que se elabora el producto, háznoslo saber!.",*/
                    html: "<p>Si no le gusta algún condimento o adereso con el que se elabora el producto, háznoslo saber!.</p>" +
                        "<p><textarea id='itemSpecific' class='form-control' placeholder='Hay algo qué específicar sobre tu orden?'></textarea></p>",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#28a745',
                    cancelButtonColor: '#dc3545',
                    confirmButtonText: 'Agregar al carrito!',
                    cancelButtonText: 'Mejor no...'
                }).then((result) => {
                    if (result.value) {
                        Swal.fire(
                            'Agregado al carrito!',
                            'Su producto ha sido agregado al carrito.',
                            'success'
                        )
                    }
                })
            }
        })
    }else{
        Swal.fire({
            title: "Deseas agregar "+itemData1['name']+" al carrito?",
            text: "Precio: $"+itemData1['price']+"pesos.",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Si, lo deseo!',
            cancelButtonText: 'No, gracias.'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Agregado al carrito!',
                    'Su producto ha sido agregado al carrito.',
                    'success'
                )
            }
        })
    }


}

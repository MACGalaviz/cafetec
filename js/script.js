const content = document.getElementById("content"),
    host = document.getElementById("host");


const getConnection = host => {

    const url = `http://${host}:3977/api/product`;
    fetch(url).then(response => response.json()).then(response => {
        localStorage.setItem("data",JSON.stringify(response))
        console.log(localStorage.getItem("data"));
        console.log(JSON.parse(localStorage.getItem("data")))

        /*response.forEach(e => {
            drawHero(e);
        });*/
    }).catch(e=>{
        console.log(e)
    });
};

const useData = () =>{
    const data = JSON.parse(localStorage.getItem("data"));
    data.forEach(e=>{
        drawItem(e);
    })
};

const drawItem = e =>{
    //const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;

    const hero = `
    
    
    <div class="ed-item l-1-3">
        <h3>${e.name}</h3>
        <div class="item-img">
            <p >${e.description}</p>
            <p >${e.price}</p>
        </div>
    </div>
    `;
    content.insertAdjacentHTML('beforeEnd',hero);
};

host.addEventListener("keyup", e => {
    if(e.keyCode === 13){
        content.innerHTML = "";
        getConnection(e.target.value.trim());
    }
});

useData();

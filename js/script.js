const content = document.getElementById("content"),
    search = document.getElementById("search");


const getConnection = () => {

    const url = `http://localhost:3977/api/product`;
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
        drawHero(e);
    })
};

const drawHero = e =>{
    //const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;

    const hero = `
    
    
    <div class="hero ed-item l-1-3">
        <h3>${e.name}</h3>
        <div class="hero-img">
            <p >${e.description}</p>
            <p >${e.price}</p>
        </div>
    </div>
    `;
    content.insertAdjacentHTML('beforeEnd',hero);
};

/*const searchHero = name =>{
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey);
    const hero = encodeURIComponent(name);
    const url = `http://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    fetch(url)
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(e => {
                drawHero(e);
            });
        })
        .catch(e=>console.log(e));
};
search.addEventListener("keyup", e => {
    if(e.keyCode === 13){
        content.innerHTML = "";
        searchHero(e.target.value.trim());
    }
});*/
getConnection();
useData()

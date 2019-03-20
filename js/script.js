const privateKey = "f8363d6b854ce808838b929e91003cb2556983fb",
    publicKey = "cebe2e39110d84fa2562a234511553c7",
    content = document.getElementById("content"),
    search = document.getElementById("search");

/*const getConnection = () => {
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey);
    const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    fetch(url).then(response => console.log(response));
}*/

/*const getConnection = () => {
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey);
    const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    fetch(url).then(response => {
        if(response.status === 200)
        {
            console.log(response);
        }
        else{
            console.log(response);
        }
    });
}*/

/*const getConnection = () => {
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey);
    const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    fetch(url).then(response => response.json()).then(response => {
console.log(response);
        response.data.results.forEach(e => {
           drawHero(e);
        });
    }).catch(e=>console.log(e));
};

const drawHero = e =>{
    const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;

    const hero = `
    
    
    <div class="hero ed-item l-1-3">
        <h3>${e.name}</h3>
        <div class="hero-img">
            <img class="thumbnail" src="${image}">
            <p class="description">${e.description}</p>
        </div>
    </div>
    `;
    content.insertAdjacentHTML('beforeEnd',hero);
};

 const searchHero = name =>{
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
});
getConnection();*/

const getConnection = () => {

    const url = `http://localhost:3977/api/product`;
    fetch(url).then(response => response.json()).then(response => {
        console.log(response);
        response.forEach(e => {
            drawHero(e);
        });
    }).catch(e=>console.log(e));
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

const searchHero = name =>{
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
});
getConnection();

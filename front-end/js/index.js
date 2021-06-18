(async function() {
    const articles = await getArticle()

    for (article of articles) {
        gabaritProduit(article)

    }


})()






function getArticle() {
    return fetch("http://localhost:3000/api/cameras")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(articles) {
            return articles
        })
        .catch(function(error) {
            alert(
                "La connexion au serveur n'a pas pu être effectué."
            )
        })
}



function gabaritProduit(produit) {

    document.getElementById("hero").innerHTML += `
    <article class="article">
    <a href="product.html?id=${produit._id}">
    <img src= ${produit.imageUrl} alt="" />
    <h2>${produit.name}</h2>
    <p class = "descr">${produit.description}</p>
    <div class="price">
    <p class ="prix "> Price : ${produit.price / 1000} $ </p >
    <a class="nav" href="product.html?id=${produit._id}"> <i class="fas fa-cart-arrow-down"></i></a>
    </div >
    </a>
   
    
    </article >
    `;
}


//affichage du logo panier
//si le panier est vide 
function panniervide() {
    let produitInLocalStorage = JSON.parse(localStorage.getItem("produit"));
    if (produitInLocalStorage === null) {
        const select = document.querySelector(".nav")
        gabarithtml = `
        <a href="/front-end/index.html">orinoco</a>
        <a href="cart.html"> <i class="fas fa-cart-arrow-down"><p class="cercle"> <p class="chiffreCercle"> ${0}</p></p></i></a>

        `

        select.innerHTML = gabarithtml;
    }

};


panniervide()



//si le panier est rempli
function panierrempli() {
    let produitInLocalStorage = JSON.parse(localStorage.getItem("produit"));
    if (produitInLocalStorage !== null) {
        const select = document.querySelector(".nav")
        gabarithtml = `
        <a href="/front-end/index.html" class = "back"><i class="fas fa-arrow-left"></i></a>
        <a href="/front-end/index.html">orinoco</a>
        <a href="cart.html"> <i class="fas fa-cart-arrow-down"><p class="cercle"> <p class="chiffreCercle"> ${produitInLocalStorage.length}</p></p></i></a>
        
        `
        select.innerHTML = gabarithtml;
    }

}

panierrempli();
//recupérer ce qui vient aprés ? dans l'URL

const urlParams = new URLSearchParams(window.location.search)
const url = "http://localhost:3000/api/cameras";

let Id = urlParams.get("id")


//appeler le produit avec son id a partir de l'url
const newUrl = `http://localhost:3000/api/cameras/${Id}`;
fetch(newUrl)
    .then((response) => response.json())
    .then((data) => {
        const produit = data;

        //injecter les information dans le html
        document.getElementById("hero").innerHTML += `
        <article class="article">
        <div class ="image">
        <img src= ${produit.imageUrl} alt=""/>
        </div>
        <h2>${produit.name}</h2>
        <p class = "descr"> <strong> Description :</strong>${produit.description}</p>
        <div class="price">
        
        <p class ="prix "> <strong>Price : </strong>${produit.price / 1000} $ </p > &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        <p><strong>Quantite <select name="select" class="select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select></strong></p>
        <form>
        <label for="lenses"> Choisir le lenses :</label>
        <select class="option" name ="lenses" id ="lenses"> 

        </select>
        <button id = "envoyer-btn" name ="envoyer-btn"type="envoyer"><i class="fas fa-cart-arrow-down"></i></button>
         </form>
        </div >
        
        
        </article >
        `;

        // seectionner le bouton ajouter au pannier
        const btn_envoyerPanier = document.querySelector("#envoyer-btn");



        //ajouter l'evenement sur le bouton et envoyer dans le panier
        btn_envoyerPanier.addEventListener("click", (e) => {
            e.preventDefault();

            //selectionner les lense et recuperer la valeur du select
            const idSelect = document.querySelector("#lenses");
            const choixForm = idSelect.value;

            //selectionner du quantite et recuperer la valeur du select

            const quantite = document.querySelector(".select");
            const quantiteChoice = quantite.value;
            document.location.reload();



            //recuperer les valeur 

            let infoProduit = {
                id: produit._id,
                name: produit.name,
                lenses: choixForm,
                description: produit.description,
                price: produit.price / 1000,
                quantite: quantiteChoice,
                priceTotal: ((produit.price) / 1000) * quantiteChoice,
            };






            // local storage //

            // la variable qui contient les valeurs du local storage

            let produitInLocalStorage = JSON.parse(localStorage.getItem("produit"));


            //fonction pour envoyer les donnés dans le tableau

            function envoyerLesfichier() {
                produitInLocalStorage.push(infoProduit);
                localStorage.setItem("produit", JSON.stringify(produitInLocalStorage));
            }

            // Verification du contenu du local storage

            if (produitInLocalStorage) {
                envoyerLesfichier();

            } else {
                produitInLocalStorage = [];
                envoyerLesfichier();

            }


        })

        // selection le choix des options 
        const lensesChoice = produit.lenses;
        let structureOptions = [];

        //la boucle pour afficher les choix 
        for (let i = 0; i < lensesChoice.length; i++) {
            structureOptions = structureOptions +
                `
            <option value = "${lensesChoice[i]}">${lensesChoice[i]}</option>
            `
        }

        const position = document.querySelector(".option");
        //ajouter les données en html 
        position.innerHTML = structureOptions;



    });




//affichage du logo panier
//si le panier est vide 
function panniervide() {
    let produitInLocalStorage = JSON.parse(localStorage.getItem("produit"));
    if (produitInLocalStorage === null) {
        const select = document.querySelector(".nav")
        gabarithtml = `
        <a href="/front-end/index.html" class = "back"><i class="fas fa-arrow-left"></i></a>
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
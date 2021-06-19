function showgabaritconfirmation() {
  // recuperer le prix total du pannier du localstorage
  let produitInLocalStorage = JSON.parse(localStorage.getItem("prixtotal"));
  //recuperer le id du localstorage
  let order = localStorage.getItem("order");
  const select = document.querySelector("#hero");
  const gabarithtml = `

 <h1>Félicitation, votre commande a bien été prise en compte !</h1>
 <div class="info">
     <p> <strong>Prix total:${produitInLocalStorage}$</strong> </p>
     <p><strong>Identifiant de votre commande :  </strong> ${order}</p>
     <a class="bouton" href="/front-end/index.html">Retour a la page d'acceuil</a>
 </div>
    `;

  select.innerHTML = gabarithtml;
}

showgabaritconfirmation();

//affichage du logo panier
//si le panier est vide
function panniervide() {
  let produitInLocalStorage = JSON.parse(localStorage.getItem("produit"));
  if (produitInLocalStorage === null) {
    const select = document.querySelector(".nav");
    gabarithtml = `
        <a href="/front-end/index.html" class = "back"><i class="fas fa-arrow-left"></i></a>
        <a href="/front-end/index.html">orinoco</a>
        <a href="cart.html"> <i class="fas fa-cart-arrow-down"><p class="cercle"> <p class="chiffreCercle"> ${0}</p></p></i></a>

        `;

    select.innerHTML = gabarithtml;
  }
}

panniervide();

//si le panier est rempli
function panierrempli() {
  let produitInLocalStorage = JSON.parse(localStorage.getItem("produit"));
  if (produitInLocalStorage !== null) {
    const select = document.querySelector(".nav");
    gabarithtml = `
        <a href="/front-end/index.html" class = "back"><i class="fas fa-arrow-left"></i></a>
        <a href="/front-end/index.html">orinoco</a>
        <a href="cart.html"> <i class="fas fa-cart-arrow-down"><p class="cercle"> <p class="chiffreCercle"> ${produitInLocalStorage.length}</p></p></i></a>
        
        `;
    select.innerHTML = gabarithtml;
  }
}

panierrempli();
localStorage.clear();

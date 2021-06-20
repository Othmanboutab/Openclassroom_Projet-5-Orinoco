// la variable qui contient les valeurs du local storage
let produitInLocalStorage = JSON.parse(localStorage.getItem("produit"));

//selection de la section
const select = document.querySelector("#pannier_contenu");

// si le pannier est vide afficher pannier vide
if (produitInLocalStorage === null || produitInLocalStorage == 0) {
  const paniervide = `
    
<div class = "container_pannier">
<p> Le panier est vide</p>
</div>
`;

  // injecter le message dans le html
  select.innerHTML = paniervide;
} else {
  structurePanier = [];

  for (i = 0; i < produitInLocalStorage.length; i++) {
    //function pour multiplier le prix et la quantite pour avoir le prix total
    function multiple() {
      const totalPrice =
        produitInLocalStorage[i].price * produitInLocalStorage[i].quantite;
      return totalPrice;
    }

    structurePanier += `
<div class="info">
<p> <strong>L'article : </strong>${
      produitInLocalStorage[i].name
    } &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>Lenses :</strong>${
      produitInLocalStorage[i].lenses
    } </p> 
<p class="quan"><strong>Quantité : ${
      produitInLocalStorage[i].quantite
    }</strong></p>

<p class="quan"> <strong>Prix total :</strong> ${multiple()}$</p>
<button class="btn_supprimer">supprimer </button>

</div>
<div>
 
 
 </div>

        `;
  }
  if (i == produitInLocalStorage.length) {
    select.innerHTML = structurePanier;
  }
}

//----------------------------------------------------------------------------------------//
// bouton supprimer

let btn_supprimer = document.querySelectorAll(".btn_supprimer");

for (let k = 0; k < btn_supprimer.length; k++) {
  btn_supprimer[k].addEventListener("click", (event) => {
    event.preventDefault();

    //selectioner le produit avec la boucle for
    let id_selection_supprimer = produitInLocalStorage[k].id;
    let lenses_selection_supprimer = produitInLocalStorage[k].lenses;
    let quantite_selection_supprimer = produitInLocalStorage[k].quantite;

    // filtrer les produit avec des conditions
    produitInLocalStorage = produitInLocalStorage.filter(
      (e) =>
        e.id !== id_selection_supprimer ||
        e.lenses !== lenses_selection_supprimer ||
        e.quantite !== quantite_selection_supprimer
    );

    //envoi dues nouvelles valeurs dans le local localStorage
    localStorage.setItem("produit", JSON.stringify(produitInLocalStorage));

    //actualiser la page pour afficher tout a jour
    document.location.reload();
  });
}

//----------------------------------------------------------------------------------------//
//vider le panier complet
const btn_delete = `
<button class="btn-all-delete">Vider le panier</button>
`;

//inserer le bouton dans le html
select.insertAdjacentHTML("afterend", btn_delete);

//selectionner le bouton pour vider le panier
const btn_all_delete = document.querySelector(".btn-all-delete");

//supprimer la key prduit pour vider le pannier
btn_all_delete.addEventListener("click", (e) => {
  e.preventDefault;

  //supprimer les produit avec remove

  localStorage.removeItem("produit");

  //actualiser la page pour afficher tout a jour
  document.location.reload();
});

//----------------------------------------------------------------------------------------//
// fonction pour supprimer la partie prix total si le panier est vide

function paniervide() {
  let produitInLocalStorage = JSON.parse(localStorage.getItem("produit"));
  if (produitInLocalStorage === null) {
    panniervide();
  }
}

//----------------------------------------------------------------------------------------//
// fonction pour calculer le prix total du pannier si le panier est rempli
function pannierrempli() {
  let produitInLocalStorage = JSON.parse(localStorage.getItem("produit"));

  if (produitInLocalStorage !== null) {
    let prixtotal = [];
    for (let j = 0; j < produitInLocalStorage.length; j++) {
      let prixpanier = produitInLocalStorage[j].priceTotal;
      prixtotal.push(prixpanier);
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const price_all = prixtotal.reduce(reducer, 0);

    // //envoyer dans le local storage
    localStorage.setItem("prixtotal", price_all);

    const affichageprixtotal = `
 <p class="prixtotal"> <strong>Le prix total :</strong> ${price_all} $ </p>
 `;
    select.insertAdjacentHTML("beforeend", affichageprixtotal);
  }
}

pannierrempli();
paniervide();

//----------------------------------------------------------------------------------------//
//formulaire

function showFormulaire() {
  const selectform = document.querySelector(".formulaire");
  const gabaritHtml = `
    <h2>Formulaire de commande</h2>
    <form>
        <div class="name">
            <div>
                <label for="name">Nom :</label><span id="nommanquant"></span>
                <input class="input" type="text" id="name" name="user_name" required>
                
            </div>
            <div class="info">
                <label for="firstname">Prénom :</label><span id="prenommanquant"></span>
                <input class="input" type="text" id="firstname" name="user_firstname" required >
                
           
                </div>
        </div>


        <div class="tel">
            
            <div class="info">
                <label for="mail">e-mail :</label><span id="mailmanquant"></span>
                <input class="input" type="email" id="mail" name="user_mail" placeholder="orinoco@orinoco.com" required >
                
          
                </div>
        </div>

        <div class="infolivraison">
            <label for="livraison">Adresse de livraison :</label><span id="adressemanquant"></span>
            <input  class="input" type="adress" id="livraison" name="user_adress" placeholder="9 rue jena" required>
            

            <label for="livraison">Ville :</label><span id="villemanquant"></span>
            <input class="input" type="adress" id="ville" name="user_adress" placeholder="France">
            
        
            </div>

        <input class="bouton" type="submit" value="Envoyer">
    </form>
    `;

  selectform.innerHTML = gabaritHtml;
}

//appel de la fonction
showFormulaire();

//----------------------------------------------------------------------------------------//
const btn_formulaire = document.querySelector(".bouton");

btn_formulaire.addEventListener("click", (e) => {
  e.preventDefault();

  //recuperer les valeurs du formulaire

  const formulaireValeur = {
    firstName: document.querySelector("#name").value,
    lastName: document.querySelector("#firstname").value,
    address: document.querySelector("#livraison").value,
    city: document.querySelector("#ville").value,
    email: document.querySelector("#mail").value,
  };

  // const envoyer = {
  //   products: produitInLocalStorage,
  //   contact: formulaireValeur,
  // };

  //***********************************controle du formulaire ******//

  //function de syntaxe regex pour le nom et prenom et ville
  function regexNomPrenomVille(value) {
    return /^[A-Za-z]{3,10}$/.test(value);
  }

  function afficherlechampmanquant(querySelectorid) {
    document.querySelector(`#${querySelectorid}`).textContent = "input valide";
  }

  function afficherlechampmanquanttextalert(querySelectorid) {
    document.querySelector(`#${querySelectorid}`).textContent =
      "Veuillez bien remplir ce champ";
  }

  // controler le nom
  function nomControle() {
    const leNom = formulaireValeur.lastName;
    if (regexNomPrenomVille(leNom)) {
      afficherlechampmanquant("nommanquant");
      return true;
    } else {
      afficherlechampmanquanttextalert("nommanquant");
      return false;
    }
  }

  function prenomControle() {
    const lePrenom = formulaireValeur.firstName;
    if (regexNomPrenomVille(lePrenom)) {
      afficherlechampmanquant("prenommanquant");
      return true;
    } else {
      afficherlechampmanquanttextalert("prenommanquant");
      return false;
    }
  }

  function villeControle() {
    const laville = formulaireValeur.city;
    if (regexNomPrenomVille(laville)) {
      afficherlechampmanquant("villemanquant");
      return true;
    } else {
      afficherlechampmanquanttextalert("villemanquant");
      return false;
    }
  }

  function emailcontrole() {
    const leEmail = formulaireValeur.email;
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(leEmail)) {
      afficherlechampmanquant("mailmanquant");
      return true;
    } else {
      afficherlechampmanquanttextalert("mailmanquant");
      return false;
    }
  }

  // envoyer les donnee apres le controle
  if (produitInLocalStorage.length === null) {
    alert("votre panier est vide");
  } else {
    if (
      nomControle() &&
      prenomControle() &&
      villeControle() &&
      emailcontrole()
    ) {
      const products = JSON.parse(localStorage.getItem("produit"));

      const envoyer = {
        products: [],
        contact: formulaireValeur,
      };

      let objetRequest = JSON.stringify(envoyer);

      fetch("http://localhost:3000/api/cameras/order", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: objetRequest,
      })
        .then((data) => {
          return data.json();
        })
        .then((json) => {
          localStorage.setItem("order", json.orderId);
          location.href = "confirmation.html";
        });
      localStorage.removeItem("produit");
    } else {
      alert("Veuillez bien remplir le formulaire");
    }
  }
});

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

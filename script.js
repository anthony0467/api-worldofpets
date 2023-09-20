const detail = document.querySelector(".detail");
const myForm = document.getElementById('the_form')
const myInput = document.getElementById('searchinput');
const list = document.createElement("ul");
list.classList.add('flex-list');
detail.appendChild(list);

const apiUrl = 'http://127.0.0.1:8000/api/produits';

// Effectuez une requête GET vers l'API des produits
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
         const produits = response['hydra:member'];
         console.log(produitss)
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    

    const produits = data['hydra:member'];

    produits.forEach(produit => {
      
        if(produit.etat == true){
      const listItem = document.createElement("li");
      listItem.style.position = 'relative';
      const divItem = document.createElement("div");
      const divItemTitle = document.createElement("div");
      const divItemP = document.createElement("div");

      divItem.classList.add('div-item');
      divItemP.classList.add('div-item-p');
      divItemTitle.classList.add('div-item-title');

      const pItem = document.createElement("p");
      const pItem2 = document.createElement("p");
      const title = document.createElement("h2");
      const img = document.createElement("img");
      const link = document.createElement("a");

      link.addEventListener('click', (e) =>{
        divItemP.classList.toggle('dsp-block')
    })

      title.textContent = produit.nomProduit;
      pItem.textContent = produit.prix +'€' ;
      pItem2.textContent = produit.statut ;
      link.innerHTML = '<i class="fa-solid fa-plus fa-lg" style="color: #ffffff;"></i>'
      list.appendChild(listItem);
      listItem.appendChild(divItem);
      divItem.append(divItemTitle, divItemP);
      divItemTitle.append(title, link)
      divItemP.append(pItem, pItem2);
      
      // Récupérez l'URI de l'image
      const imageUri = 'http://127.0.0.1:8000'+produit.images[0];
      // Effectuez une requête GET pour obtenir les données de l'image
      fetch(imageUri)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erreur HTTP lors de la récupération de l'image! Statut: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
            console.log(data);
          const imageUrl = 'http://127.0.0.1:8000/uploads/images/'
          const nomImage = data.nomImage
         
          img.src = imageUrl+nomImage;
          img.alt = produit.nomProduit;
          listItem.appendChild(img);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de l\'image:', error);
        });
        }
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des produits:', error);
  });


  function search() { // Fonction de recherche 
    
    const myArr = list.childNodes
    
    //console.log(myArr.dataset)
    myArr.forEach(element => {
        const myValue = myInput.value
        const arrValue = element.dataset.name.toLowerCase()
        const arrTypeValue = element.dataset.types.toLowerCase()
        // RECHERCHE DE CARACTERES SIMILAIRE ENTRE 2 TYPES ET 2 NOMS
        if(arrValue.indexOf(myValue) !== -1){
            element.style.display = "flex"
        }
        else if(arrTypeValue.indexOf(myValue) !== -1){
            element.style.display = "flex"
        }else{
            element.style.display = "none"
        }

        // RECHERCHE DE CARACTERES SIMILAIRE ENTRE 2 NOMS
        //arrValue.indexOf(myValue) !== -1 ? element.style.display = "flex" ? arrTypeValue.indexOf(myValue) !== -1 : element.style.display = "flex" : element.style.display = "none";
    })
}
const detail = document.querySelector(".detail");
const list = document.createElement("ul");
list.classList.add('flex-list');
detail.appendChild(list);

const apiUrl = 'http://127.0.0.1:8000/api/produits';

// Effectuez une requête GET vers l'API des produits
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const produits = data['hydra:member'];

    produits.forEach(produit => {
      
        if(produit.etat == true){
      const listItem = document.createElement("li");
      const divItem = document.createElement("div");
      divItem.classList.add('div-item');
      const pItem = document.createElement("p");
      const pItem2 = document.createElement("p");
      const title = document.createElement("h2");
      const img = document.createElement("img");

      title.textContent = produit.nomProduit;
      pItem.textContent = produit.prix +'€' ;
      pItem2.textContent = produit.statut ;
      list.appendChild(listItem);
      listItem.appendChild(divItem);
      divItem.append(title, pItem, pItem2);
      
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

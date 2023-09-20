const detail = document.querySelector(".detail")
const list = document.createElement('ul')
const myForm = document.getElementById('the_form')
const myInput = document.getElementById('searchinput');
//nav


detail.append(list) // ul dans ma div


window.addEventListener('load', init)


function init(){

fetch('http://127.0.0.1:8000/api/produits').then(response => response.json())
.then(response =>{
    const data = response['hydra:member']
    getCard(data)
   
})


myForm.addEventListener('input', search)


function getCard(arr){
    arr.map(item => createCard(item))
}


function createCard(element){
    // BALISE HTML POUR CREER MA CARTE 
    const itemlist = document.createElement('li')
    const containerImg = document.createElement('figure')
    const img = document.createElement('img')
    img.loading = 'lazy';
    const containerTxt = document.createElement('figcaption')
    const divItemTitle = document.createElement('div');
    const title = document.createElement('h2')
    const divItemP = document.createElement('div');
    const pItem = document.createElement("p");
    const pItem2 = document.createElement("p");
    const link = document.createElement("a");

    link.addEventListener('click', (e) =>{
        divItemP.classList.toggle('dsp-block')
    })
    
    if(element.etat == true ){
        // CREATION DE MA CARTE 
    list.append(itemlist)
    itemlist.append(containerImg)
    containerImg.append(img, containerTxt)
    containerTxt.append(divItemTitle, divItemP)
    divItemTitle.append(title, link)
    divItemP.append(pItem, pItem2)
    //CSS
    list.classList.add('flex-list');
    divItemTitle.classList.add('div-item-title');
    divItemP.classList.add('div-item-p');
    containerTxt.classList.add('div-item');
 
    itemlist.dataset.name = element.nomProduit // récupérer le nom du pokemon pour la recherche input
    title.innerText = element.nomProduit;
    link.innerHTML = '<i class="fa-solid fa-plus fa-lg" style="color: #ffffff;"></i>'
    pItem.innerText = element.prix +'€';
    pItem2.innerText = element.statut;


   const imageUri = 'http://127.0.0.1:8000'+element.images[0]
  
    fetch(imageUri).then(response => response.json())
    .then(response =>{
     const imageUrl = 'http://127.0.0.1:8000/uploads/images/'
     const nomImage = response.nomImage
         
          img.src = imageUrl+nomImage;
          img.alt = element.nomProduit;
          
})
    }
  
}





function search() { // Fonction de recherche 
    
    const myArr = list.childNodes
   
    //console.log(myArr.dataset)
    myArr.forEach(element => {
        const myValue = myInput.value
    
        const arrValue = element.dataset.name.toLowerCase()
        console.log(arrValue)
        // RECHERCHE DE CARACTERES SIMILAIRE ENTRE 2 TYPES ET 2 NOMS
        if(arrValue.indexOf(myValue) !== -1){
            element.style.display = "flex"
        }
        else{
            element.style.display = "none"
        }

        // RECHERCHE DE CARACTERES SIMILAIRE ENTRE 2 NOMS
        //arrValue.indexOf(myValue) !== -1 ? element.style.display = "flex" ? arrTypeValue.indexOf(myValue) !== -1 : element.style.display = "flex" : element.style.display = "none";
    })
}

}
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

function addToCart(product) {
    // Vérifie que le produit a bien un nom et une quantité
    if (!product || !product.name || !product.quantity) {
        console.error("Le produit est invalide ou incomplet :", product);
        alert("Erreur : le produit n'a pas pu être ajouté au panier.");
        return;
    }

    // Récupère le panier existant dans le stockage local ou initialise un nouveau panier
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Recherche si le produit existe déjà dans le panier
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex !== -1) {
        // Si le produit existe, met à jour la quantité
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        // Sinon, ajoute le produit avec sa quantité
        cart.push({
            name: product.name,
            quantity: product.quantity,
        });
    }

    // Enregistre le panier mis à jour dans le stockage local
    localStorage.setItem("cart", JSON.stringify(cart));

    // Affiche une notification ou une alerte pour confirmer l'ajout
    alert(`${product.name} a été ajouté au panier !`);
    console.log("Panier mis à jour :", cart);
}
function showCarOptions() {
    var productSelect = document.getElementById("product");
    var carGroup = document.getElementById("car-group");

    // Vérifie si "Véhicules électriques" est sélectionné
    if (productSelect.value === "vehicules-electriques") {
        carGroup.style.display = "block";  // Afficher le champ "Voiture"
    } else {
        carGroup.style.display = "none";  // Cacher le champ "Voiture"
    }
}
document.addEventListener("DOMContentLoaded", function () {
    let menu = document.getElementById("navbar");
    let bar = document.getElementById("bar");

    bar.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});

  document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("navbar");
    const bar = document.getElementById("bar");

    bar.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  });

  
  // Gestion dynamique des options
  const productSelect = document.getElementById('product');
  const bornesRechargeOptions = document.getElementById('bornes-recharge-options');
  const carOptions = document.getElementById('car-options');

  productSelect.addEventListener('change', function () {
      if (this.value === 'bornes-recharge') {
          bornesRechargeOptions.classList.remove('hidden');
          carOptions.classList.add('hidden');
      } else if (this.value === 'photovoltaïque' || this.value === 'ee' || this.value === 'ems' || this.value === 'bess' || this.value === 'agrivoltaïsme' || this.value === 'retrofit' || this.value === 'isolation-thermique') {
          bornesRechargeOptions.classList.add('hidden');
          carOptions.classList.add('hidden');
      } else {
          bornesRechargeOptions.classList.add('hidden');
          carOptions.classList.remove('hidden');
      }
  });

  
  document.addEventListener('DOMContentLoaded', function() {
    const bar = document.getElementById('bar');
    const navbar = document.getElementById('navbar');
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '×';
    closeBtn.classList.add('close-btn');
    navbar.appendChild(closeBtn);

    bar.addEventListener('click', () => {
        navbar.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});
document.getElementById("menu-button").addEventListener("click", function() {
    document.getElementById("menu-content").classList.toggle("menu-open");
});
document.getElementById("menu-button").addEventListener("click", function() {
    document.getElementById("menu-container").classList.toggle("active");
});
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById('menu-button');
    const menuContent = document.getElementById('menu-content');
    const closeButton = document.getElementById('close-button');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            menuContent.classList.toggle('active');
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            menuContent.classList.remove('active');
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.florpex-hamburger');
    const nav = document.querySelector('.blixor-nav');

    hamburger.addEventListener('click', function () {
        nav.classList.toggle('active'); // Bascule la classe "active"
    });
});
document.getElementById('serviceType').addEventListener('change', function() {
    const optionsSelect = document.getElementById('options');
    const selectedService = this.value;
  
    // Réinitialiser les options
    optionsSelect.innerHTML = '';
  
    // Ajouter les options en fonction du service sélectionné
    if (selectedService === 'borne') {
      addOption(optionsSelect, 'Option 1 - Borne', 'borne1');
      addOption(optionsSelect, 'Option 2 - Borne', 'borne2');
      addOption(optionsSelect, 'Option 3 - Borne', 'borne3');
    } else if (selectedService === 'vehicule') {
      addOption(optionsSelect, 'Option 1 - Véhicule', 'vehicule1');
      addOption(optionsSelect, 'Option 2 - Véhicule', 'vehicule2');
      addOption(optionsSelect, 'Option 3 - Véhicule', 'vehicule3');
    }
    // Ajouter d'autres conditions pour les autres services
  });
  
  function addOption(selectElement, text, value) {
    const option = document.createElement('option');
    option.text = text;
    option.value = value;
    selectElement.add(option);
  }
  function openModal(title, mainImg, thumbs, desc) {
    const modalTitle = document.getElementById('modal-title');
    const modalMain = document.getElementById('modal-main-img');
    const modalDesc = document.getElementById('modal-desc');
    const thumbEls = [
        document.getElementById('thumb1'),
        document.getElementById('thumb2'),
        document.getElementById('thumb3'),
        document.getElementById('thumb4')
    ];

    modalTitle.innerText = title;
    // set main image only if provided
    if (mainImg) {
        modalMain.src = mainImg;
        modalMain.style.display = '';
    } else {
        modalMain.removeAttribute('src');
        modalMain.style.display = 'none';
    }

    // populate thumbnails; hide any that are not provided
    for (let i = 0; i < thumbEls.length; i++) {
        const el = thumbEls[i];
        if (!el) continue;
        if (thumbs && thumbs[i]) {
            el.src = thumbs[i];
            el.style.display = '';
        } else {
            // hide placeholder if no thumb provided
            el.removeAttribute('src');
            el.style.display = 'none';
        }
    }

    modalDesc.innerHTML = desc || '';
    document.getElementById('modal').style.display = "flex";
    
    // Initialize draggable functionality
    makeDraggable(modalMain);
}

function closeModal() {
    document.getElementById('modal').style.display = "none";
}

function changeMainImage(imgElement) {
    if (!imgElement || !imgElement.src) return;
    const modalMain = document.getElementById('modal-main-img');
    modalMain.src = imgElement.src;
    // Reinitialize draggable after image change
    makeDraggable(modalMain);
}

// Function to make an image draggable
function makeDraggable(element) {
    let translateX = 0, translateY = 0;
    let startX = 0, startY = 0;
    let isDragging = false;
    
    // Reset any existing transform
    element.style.transform = 'translate(0px, 0px)';
    
    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragTouchStart;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        element.classList.add('dragging');
    }

    function dragTouchStart(e) {
        e = e || window.event;
        e.preventDefault();
        const touch = e.touches[0];
        isDragging = true;
        startX = touch.clientX - translateX;
        startY = touch.clientY - translateY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementTouchDrag;
        element.classList.add('dragging');
    }

    function elementDrag(e) {
        if (!isDragging) return;
        e = e || window.event;
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        element.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }

    function elementTouchDrag(e) {
        if (!isDragging) return;
        e = e || window.event;
        e.preventDefault();
        const touch = e.touches[0];
        translateX = touch.clientX - startX;
        translateY = touch.clientY - startY;
        element.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }

    function closeDragElement() {
        isDragging = false;
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
        element.classList.remove('dragging');
    }
}

const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    burger.addEventListener("click", () => {
nav.classList.toggle("nav-active");

navLinks.forEach((link, index) => {
        if (link.style.animation) {
        link.style.animation = "";
        } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
        }s`;
        }
    });

    burger.classList.toggle("toggle");
    });
};

navSlide();

  // funcion del cart
let cart = [];
const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.querySelector(".cart-sidebar");
const cartItems = document.querySelector(".cart-items");
const cartTotalAmount = document.getElementById("cart-total-amount");
const checkoutButton = document.getElementById("checkout-button");
const closeCartButton = document.querySelector(".close-cart");

  // guarda el cart en LocalStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // carga el cart desde LocalStorage
  function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      cart = JSON.parse(savedCart);
      updateCart();
    }
  }
  
  cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("open");
  });
  
  closeCartButton.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
  });
  
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
  
    cart.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
              <img src="${item.image}" alt="${item.name}" width="50">
              <div class="cart-item-details">
                  <h3>${item.name}</h3>
                  <p>$${item.price.toFixed(2)}</p>
                  <div class="quantity-controls">
                      <button class="decrease-quantity" data-index="${index}">-</button>
                      <span>${item.quantity}</span>
                      <button class="increase-quantity" data-index="${index}">+</button>
                  </div>
              </div>
              <p class="item-total">$${(item.price * item.quantity).toFixed(
                2
              )}</p>
          `;
      cartItems.appendChild(itemElement);
      total += item.price * item.quantity;
    });
  
    cartTotalAmount.textContent = total.toFixed(2);
    document.querySelector(".cart-count").textContent = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  
    // Save cart to LocalStorage
    saveCartToLocalStorage();
  }
  
  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("increase-quantity")) {
      const index = e.target.getAttribute("data-index");
      cart[index].quantity++;
      updateCart();
    } else if (e.target.classList.contains("decrease-quantity")) {
      const index = e.target.getAttribute("data-index");
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      updateCart();
    }
  });
  
  checkoutButton.addEventListener("click", () => {
    Swal.fire({
      title: "Exito en la compra!",
      text: "Gracias por comprar en Green Leaf!",
      icon: "success",
      confirmButtonText: "Cerrar",
    }).then(() => {
      cart = [];
      localStorage.removeItem("cart"); // Elimina el carrito de LocalStorage
      updateCart();
      cartSidebar.classList.remove("open");
    });
  });
  
  // Shop page functionality
  if (window.location.pathname.includes("shop.html")) {
    const productGrid = document.querySelector(".product-grid");
    const pagination = document.querySelector(".pagination");
    const categoryFilter = document.getElementById("category-filter");
    let currentPage = 1;
    const productsPerPage = 16; // Update: Changed productsPerPage to 3
    let allProducts = [];
  
    /* Mis 16 cards harcodeadas*/
    const porductosCards = [
      {
        id: "c1",
        name: "Helechos",
        price: 19.99,
        category: "plantas",
        image:
          "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-112439.jpg",
      },
      {
        id: "c2",
        name: "Semillas",
        price: 25.99,
        category: "plantas",
        image:
          "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-104239.jpg",
      },
      {
        id: "c3",
        name: "Pala jardinera",
        price: 69.99,
        category: "plantas",
        image:
          "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-112239.jpg",
      },
      {
        id: "c4",
        name: "Parafernaria",
        price: 39.99,
        category: "plantas",
        image:
          "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-112269.jpg",
      },
      {
        id: "c5",
        name: "Plantas de interiores",
        price: 89.99,
        category: "plantas",
        image:
          "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-112639.jpg",
      },
      {
        id: "c6",
        name: "Abono",
        price: 79.99,
        category: "plantas",
        image:
          "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-112245.jpg",
      },
      {
        id: "c7",
        name: "Cactus invierno",
        price: 49.99,
        category: "plantas",
        image:
          "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-115239.jpg",
      },
      {
        id: "c8",
        name: "Rosa de jardin",
        price: 99.99,
        category: "plantas",
        image:
          "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-112255.jpg",
      },
      {
        id: "c9",
        name: "Jazmines",
        price: 29.99,
        category: "plantas",
        image:
        "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-112638.jpg",
      },
      {
        id: "c10",
        name: "Campanita colgante",
        price: 79.99,
        category: "plantas",
        image:
          "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-112629.jpg",
      },
      {
        id: "c11",
        name: "CLaveles",
        price: 28.99,
        category: "plantas",
        image:
          "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-112139.jpg",
      },{
        id: "c12",
        name: "Rosas blancas",
        price: 45.99,
        category: "plantas",
        image:
          "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-112232.jpg",
      },
      {
        id: "c13",
        name: "Rosas blancas",
        price: 34.92,
        category: "plantas",
        image:
          "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-112132.jpg",
      },  
      {id: "c14",
      name: "jardineria blancas",
      price: 29.99,
      category: "plantas",
      image:
        "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-112332.jpg",
    },
    {id: "c15",
      name: "Margaritas",
      price: 19.99,
      category: "plantas",
      image:
        "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-112338.jpg",
    },{id: "c16",
      name: "Lavanda",
      price: 55.99,
      category: "plantas",
      image:
        "https://img.freepik.com/free-photo/woman-wearing-blue-jeans-closeup_53876-112337.jpg",
    },
    
      
      
];
  
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
        );
        const guilleProducts = await response.json();
  
        const formattedguilleProducts = guilleProducts.map((product) => ({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          category: "makeup",
          image: product.image_link,
        }));
  
        return [...porductosCards, ...formattedguilleProducts];
      } catch (error) {
        console.error("Error fetching products:", error);
        return porductosCards; // Fallback to clothing products if API fails
      }
    }
  
    function filterProducts(category) {
      return category === "all"
        ? allProducts
        : allProducts.filter((product) => product.category === category);
    }
  
    function displayProducts(products, page) {
      const start = (page - 1) * productsPerPage;
      const end = start + productsPerPage;
      const paginatedProducts = products.slice(start, end); // Update: No change needed here
  
      productGrid.innerHTML = "";
      paginatedProducts.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-card");
        productElement.innerHTML = `
                  <img src="${product.image}" alt="${product.name}">
                  <h3>${product.name}</h3>
                  <p>$${product.price.toFixed(2)}</p>
                  <button class="add-to-cart" data-id="${
                    product.id
                  }" data-name="${product.name}" data-price="${
          product.price
        }" data-image="${product.image}">Agregar al carrito</button>
              `;
        productGrid.appendChild(productElement);
      });
    }
  
    function setupPagination(products) {
      const pageCount = Math.ceil(products.length / productsPerPage);
      pagination.innerHTML = "";
  
      // Add previous button
      const prevButton = document.createElement("button");
      prevButton.innerText = "Anterior";
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          updatePaginationDisplay(products);
        }
      });
      pagination.appendChild(prevButton);
  
      // Add page buttons
      for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.addEventListener("click", () => {
          currentPage = i;
          updatePaginationDisplay(products);
        });
        pagination.appendChild(button);
      }
  
      // Add next button
      const nextButton = document.createElement("button");
      nextButton.innerText = "Siguiente";
      nextButton.addEventListener("click", () => {
        if (currentPage < pageCount) {
          currentPage++;
          updatePaginationDisplay(products);
        }
      });
      pagination.appendChild(nextButton);
  
      updatePaginationDisplay(products);
    }
  
    function updatePaginationDisplay(products) {
      const pageCount = Math.ceil(products.length / productsPerPage);
      const pageButtons = pagination.querySelectorAll(
        "button:not(:first-child):not(:last-child)"
      );
  
      pageButtons.forEach((button, index) => {
        const pageNumber = index + 1;
        if (
          pageNumber === currentPage ||
          (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2) ||
          pageNumber === 1 ||
          pageNumber === pageCount
        ) {
          button.style.display = "inline-block";
        } else {
          button.style.display = "none";
        }
  
        if (pageNumber === currentPage) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
  
      displayProducts(products, currentPage);
      window.scrollTo(0, 0);
    }
  
    function setupCategoryFilter() {
      categoryFilter.addEventListener("change", () => {
        const category = categoryFilter.value;
        const filteredProducts = filterProducts(category);
        currentPage = 1;
        displayProducts(filteredProducts, currentPage);
        setupPagination(filteredProducts);
      });
    }
  
    productGrid.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
        const product = {
          id: e.target.getAttribute("data-id"),
          name: e.target.getAttribute("data-name"),
          price: parseFloat(e.target.getAttribute("data-price")),
          image: e.target.getAttribute("data-image"),
          quantity: 1,
        };
  
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          cart.push(product);
        }
  
        updateCart();
        cartSidebar.classList.add("open");
  
        Swal.fire({
          title: "¡Producto añadido!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  
    fetchProducts().then((products) => {
      allProducts = products;
      displayProducts(allProducts, currentPage);
      setupPagination(allProducts);
      setupCategoryFilter();
    });
  }
  
  // Contact form validation
  if (window.location.pathname.includes("contact.html")) {
    const form = document.querySelector(".contact-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
  
      if (!name || !email || !message) {
        Swal.fire({
          title: "Error",
          text: "Por favor, completa todos los campos",
          icon: "error",
          confirmButtonText: "Entendido",
        });
        return;
      }
  
      if (!isValidEmail(email)) {
        Swal.fire({
          title: "Error",
          text: "Por favor, ingresa un email válido",
          icon: "error",
          confirmButtonText: "Entendido",
        });
        return;
      }
  
      // Here you would typically send the form data to a server
      // For this example, we'll just show a success message
      Swal.fire({
        title: "¡Mensaje enviado!",
        text: "Gracias por contactarnos. Te responderemos pronto.",
        icon: "success",
        confirmButtonText: "Cerrar",
      }).then(() => {
        form.reset();
      });
    });
  }
  
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Inicializa la funcionalidad de todas las paginas
  loadCartFromLocalStorage();
  updateCart();
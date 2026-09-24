/* =====================================================
   FOODIE RESTAURANT
   Multi Page JavaScript
===================================================== */

/* =====================================================
   1. PRODUCT DATA
===================================================== */

const products = [
  // ---------------- PIZZA ----------------

  {
    id: 1,
    name: "Margherita Pizza",
    category: "pizza",
    price: 249,
    emoji: "🍕",
    description: "Classic cheese pizza with fresh basil",
    badge: "Popular",
  },

  {
    id: 2,
    name: "Farmhouse Pizza",
    category: "pizza",
    price: 329,
    emoji: "🍕",
    description: "Loaded with fresh vegetables and cheese",
    badge: "Bestseller",
  },

  {
    id: 3,
    name: "Paneer Tikka Pizza",
    category: "pizza",
    price: 349,
    emoji: "🍕",
    description: "Spicy paneer tikka with melted cheese",
    badge: "Chef's Pick",
  },

  // ---------------- BURGER ----------------

  {
    id: 4,
    name: "Classic Veg Burger",
    category: "burger",
    price: 149,
    emoji: "🍔",
    description: "Crispy veg patty with fresh vegetables",
    badge: "Popular",
  },

  {
    id: 5,
    name: "Cheese Burger",
    category: "burger",
    price: 199,
    emoji: "🍔",
    description: "Juicy patty with melted cheese",
    badge: "Bestseller",
  },

  {
    id: 6,
    name: "Double Burger",
    category: "burger",
    price: 279,
    emoji: "🍔",
    description: "Double patty burger for big appetites",
    badge: "New",
  },

  // ---------------- BIRYANI ----------------

  {
    id: 7,
    name: "Veg Biryani",
    category: "biryani",
    price: 229,
    emoji: "🍛",
    description: "Aromatic basmati rice with vegetables",
    badge: "Popular",
  },

  {
    id: 8,
    name: "Chicken Biryani",
    category: "biryani",
    price: 299,
    emoji: "🍗",
    description: "Traditional chicken biryani with spices",
    badge: "Bestseller",
  },

  {
    id: 9,
    name: "Paneer Biryani",
    category: "biryani",
    price: 269,
    emoji: "🍛",
    description: "Flavourful biryani with soft paneer",
    badge: "Chef's Pick",
  },

  // ---------------- CHINESE ----------------

  {
    id: 10,
    name: "Veg Hakka Noodles",
    category: "chinese",
    price: 179,
    emoji: "🍜",
    description: "Stir-fried noodles with vegetables",
    badge: "Popular",
  },

  {
    id: 11,
    name: "Veg Manchurian",
    category: "chinese",
    price: 189,
    emoji: "🥢",
    description: "Crispy vegetable balls in spicy sauce",
    badge: "Bestseller",
  },

  {
    id: 12,
    name: "Fried Rice",
    category: "chinese",
    price: 169,
    emoji: "🍚",
    description: "Classic fried rice with vegetables",
    badge: "",
  },

  // ---------------- DESSERT ----------------

  {
    id: 13,
    name: "Chocolate Brownie",
    category: "dessert",
    price: 129,
    emoji: "🍫",
    description: "Warm chocolate brownie with rich chocolate",
    badge: "Popular",
  },

  {
    id: 14,
    name: "Ice Cream",
    category: "dessert",
    price: 99,
    emoji: "🍨",
    description: "Creamy and delicious vanilla ice cream",
    badge: "",
  },

  {
    id: 15,
    name: "Gulab Jamun",
    category: "dessert",
    price: 89,
    emoji: "🍮",
    description: "Soft gulab jamun served warm",
    badge: "Bestseller",
  },

  // ---------------- DRINKS ----------------

  {
    id: 16,
    name: "Cold Coffee",
    category: "drinks",
    price: 129,
    emoji: "🥤",
    description: "Chilled creamy cold coffee",
    badge: "Popular",
  },

  {
    id: 17,
    name: "Fresh Lime Soda",
    category: "drinks",
    price: 79,
    emoji: "🍋",
    description: "Refreshing lemon soda",
    badge: "",
  },

  {
    id: 18,
    name: "Mango Shake",
    category: "drinks",
    price: 149,
    emoji: "🥭",
    description: "Thick and creamy mango shake",
    badge: "New",
  },
];

/* =====================================================
   2. GLOBAL SETTINGS
===================================================== */

const GST_RATE = 0.05;

/* =====================================================
   3. CART
===================================================== */

let cart = [];

let currentCategory = "all";

/* =====================================================
   4. LOAD CART
===================================================== */

function loadCart() {
  const savedCart = localStorage.getItem("foodieCart");

  if (!savedCart) {
    cart = [];

    return;
  }

  try {
    cart = JSON.parse(savedCart);
  } catch (error) {
    cart = [];
  }
}

/* =====================================================
   5. SAVE CART
===================================================== */

function saveCart() {
  localStorage.setItem("foodieCart", JSON.stringify(cart));
}

/* =====================================================
   6. UPDATE NAVBAR CART COUNT
===================================================== */

function updateNavbarCartCount() {
  const cartCount = document.getElementById("cartCount");

  if (!cartCount) {
    return;
  }

  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  cartCount.textContent = totalItems;
}

/* =====================================================
   7. INITIALIZE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  loadCart();

  updateNavbarCartCount();

  initializeMenu();

  initializeCartPage();

  initializeCheckout();

  initializeTracking();
});

/* =====================================================
   8. MENU INITIALIZATION
===================================================== */

function initializeMenu() {
  const productsGrid = document.getElementById("productsGrid");

  if (!productsGrid) {
    return;
  }

  renderProducts();

  const categories = document.getElementById("categories");

  if (!categories) {
    return;
  }

  categories.addEventListener("click", (event) => {
    const categoryButton = event.target.closest(".category");

    if (!categoryButton) {
      return;
    }

    document.querySelectorAll(".category").forEach((button) => {
      button.classList.remove("active");
    });

    categoryButton.classList.add("active");

    currentCategory = categoryButton.dataset.category;

    renderProducts();
  });
}

/* =====================================================
   9. RENDER PRODUCTS
===================================================== */

function renderProducts() {
  const productsGrid = document.getElementById("productsGrid");

  if (!productsGrid) {
    return;
  }

  productsGrid.innerHTML = "";

  let filteredProducts;

  if (currentCategory === "all") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(
      (product) => product.category === currentCategory,
    );
  }

  filteredProducts.forEach((product) => {
    const card = document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `

                <div class="product-image">

                    ${
                      product.badge
                        ? `
                                <span class="product-badge">
                                    ${product.badge}
                                </span>
                              `
                        : ""
                    }

                    ${product.emoji}

                </div>


                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>


                    <p>
                        ${product.description}
                    </p>


                    <div class="product-bottom">

                        <span class="product-price">
                            ₹${product.price}
                        </span>


                        <button
                            class="add-button"
                            onclick="addToCart(${product.id})"
                        >
                            +
                        </button>

                    </div>

                </div>

            `;

    productsGrid.appendChild(card);
  });
}

/* =====================================================
   10. ADD TO CART
===================================================== */

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return;
  }

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,

      name: product.name,

      price: product.price,

      emoji: product.emoji,

      quantity: 1,
    });
  }

  saveCart();

  updateNavbarCartCount();

  showNotification(`${product.name} added to cart 🛒`);
}

/* =====================================================
   11. INCREASE QUANTITY
===================================================== */

function increaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);

  if (!item) {
    return;
  }

  item.quantity++;

  saveCart();

  renderCartPage();

  updateNavbarCartCount();
}

/* =====================================================
   12. DECREASE QUANTITY
===================================================== */

function decreaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);

  if (!item) {
    return;
  }

  item.quantity--;

  if (item.quantity <= 0) {
    cart = cart.filter((item) => item.id !== productId);
  }

  saveCart();

  renderCartPage();

  updateNavbarCartCount();
}

/* =====================================================
   13. REMOVE CART ITEM
===================================================== */

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);

  saveCart();

  renderCartPage();

  updateNavbarCartCount();

  showNotification("Item removed from cart.");
}

/* =====================================================
   14. INITIALIZE CART PAGE
===================================================== */

function initializeCartPage() {
  const cartItems = document.getElementById("cartItems");

  if (!cartItems) {
    return;
  }

  renderCartPage();
}

/* =====================================================
   15. RENDER CART PAGE
===================================================== */

function renderCartPage() {
  const cartItems = document.getElementById("cartItems");

  if (!cartItems) {
    return;
  }

  const cartItemsText = document.getElementById("cartItemsText");

  if (cart.length === 0) {
    cartItems.innerHTML = `

            <div class="empty-cart">

                <div>
                    🛒
                </div>

                <h4>
                    Your cart is empty
                </h4>

                <p>
                    Add delicious food from our menu.
                </p>

                <a
                    href="menu.html"
                    class="primary-button"
                    style="margin-top:15px;"
                >
                    Browse Menu
                </a>

            </div>

        `;

    if (cartItemsText) {
      cartItemsText.textContent = "0 Items";
    }

    updateCheckoutTotal();

    return;
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (cartItemsText) {
    cartItemsText.textContent = `${totalItems} ${
      totalItems === 1 ? "Item" : "Items"
    }`;
  }

  cartItems.innerHTML = "";

  cart.forEach((item) => {
    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `

                <div class="cart-item-image">
                    ${item.emoji}
                </div>


                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <span>
                        ₹${item.price} each
                    </span>

                </div>


                <div class="cart-controls">

                    <button
                        class="quantity-button"
                        onclick="decreaseQuantity(${item.id})"
                    >
                        −
                    </button>


                    <span class="quantity-number">
                        ${item.quantity}
                    </span>


                    <button
                        class="quantity-button"
                        onclick="increaseQuantity(${item.id})"
                    >
                        +
                    </button>


                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})"
                        title="Remove item"
                    >
                        ✕
                    </button>

                </div>


                <strong class="cart-item-total">
                    ₹${item.price * item.quantity}
                </strong>

            `;

    cartItems.appendChild(cartItem);
  });

  updateCheckoutTotal();
}

/* =====================================================
   16. CALCULATE CART TOTAL
===================================================== */

function calculateCartTotal() {
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const tax = subtotal * GST_RATE;

  const total = subtotal + tax;

  return {
    subtotal: Math.round(subtotal),

    tax: Math.round(tax),

    total: Math.round(total),
  };
}

/* =====================================================
   17. UPDATE CHECKOUT TOTAL
===================================================== */

function updateCheckoutTotal() {
  const subtotalElement = document.getElementById("subtotal");

  const taxElement = document.getElementById("tax");

  const totalElement = document.getElementById("total");

  if (!subtotalElement || !taxElement || !totalElement) {
    return;
  }

  const totals = calculateCartTotal();

  subtotalElement.textContent = `₹${totals.subtotal}`;

  taxElement.textContent = `₹${totals.tax}`;

  totalElement.textContent = `₹${totals.total}`;
}

/* =====================================================
   18. INITIALIZE CHECKOUT
===================================================== */

function initializeCheckout() {
  const orderForm = document.getElementById("orderForm");

  if (!orderForm) {
    return;
  }

  orderForm.addEventListener("submit", placeOrder);
}

/* =====================================================
   19. PLACE ORDER
===================================================== */

function placeOrder(event) {
  event.preventDefault();

  /* Check cart */

  if (cart.length === 0) {
    showNotification("Your cart is empty. Please add food first.");

    return;
  }

  /* Get customer details */

  const customerName = document.getElementById("customerName").value.trim();

  const customerPhone = document.getElementById("customerPhone").value.trim();

  const tableNumber = document.getElementById("tableNumber").value.trim();

  /* Validate name */

  if (customerName.length < 2) {
    showNotification("Please enter your name.");

    return;
  }

  /* Validate phone */

  if (!/^[0-9]{10}$/.test(customerPhone)) {
    showNotification("Please enter a valid 10 digit phone number.");

    return;
  }

  /* Validate table */

  if (!tableNumber || Number(tableNumber) < 1) {
    showNotification("Please enter a valid table number.");

    return;
  }

  /* Calculate total */

  const totals = calculateCartTotal();

  /* Generate Order ID */

  const orderId = generateOrderId();

  /* Create order */

  const order = {
    orderId: orderId,

    customerName: customerName,

    customerPhone: customerPhone,

    tableNumber: tableNumber,

    items: [...cart],

    subtotal: totals.subtotal,

    tax: totals.tax,

    total: totals.total,

    /*
           IMPORTANT

           Stage will stay 0.

           0 = Order Placed
           1 = Preparing
           2 = Ready
           3 = Served

           Abhi automatic update nahi hoga.
        */

    stage: 0,

    status: "Order Placed",

    createdAt: new Date().toISOString(),
  };

  /* Save order */

  localStorage.setItem("foodieOrder", JSON.stringify(order));

  /* Clear cart */

  cart = [];

  saveCart();

  updateNavbarCartCount();

  /* Show success modal */

  const modal = document.getElementById("successModal");

  const orderIdElement = document.getElementById("generatedOrderId");

  if (orderIdElement) {
    orderIdElement.textContent = orderId;
  }

  if (modal) {
    modal.classList.add("show");
  }

  /* Reset form */

  event.target.reset();

  /*
       IMPORTANT:

       No timer.
       No automatic stage progression.
    */
}

/* =====================================================
   20. GENERATE ORDER ID
===================================================== */

function generateOrderId() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  return `FD${randomNumber}`;
}

/* =====================================================
   21. INITIALIZE TRACKING
===================================================== */

function initializeTracking() {
  const trackButton = document.getElementById("trackOrderButton");

  if (!trackButton) {
    return;
  }

  trackButton.addEventListener("click", trackOrder);

  /*
       Allow Enter key
    */

  const orderInput = document.getElementById("trackingOrderId");

  const tableInput = document.getElementById("trackingTable");

  if (orderInput) {
    orderInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        trackOrder();
      }
    });
  }

  if (tableInput) {
    tableInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        trackOrder();
      }
    });
  }
}

/* =====================================================
   22. TRACK ORDER
===================================================== */

function trackOrder() {
  const orderIdInput = document.getElementById("trackingOrderId");

  const tableInput = document.getElementById("trackingTable");

  const result = document.getElementById("trackingResult");

  if (!orderIdInput || !tableInput || !result) {
    return;
  }

  const enteredOrderId = orderIdInput.value.trim().toUpperCase();

  const enteredTable = tableInput.value.trim();

  // Dono me se kam se kam ek required hai

  if (!enteredOrderId && !enteredTable) {
    showNotification("Order ID ya Table Number enter karo.");

    return;
  }

  const savedOrder = localStorage.getItem("foodieOrder");

  if (!savedOrder) {
    showTrackingError("No active order found.");

    return;
  }

  let order;

  try {
    order = JSON.parse(savedOrder);
  } catch (error) {
    showTrackingError("Unable to read order information.");

    return;
  }

  /*
       CASE 1:
       User ne Order ID dala
    */

  if (enteredOrderId) {
    if (order.orderId.toUpperCase() === enteredOrderId) {
      displayTracking(order);

      return;
    }

    showTrackingError("Order ID not found.");

    return;
  }

  /*
       CASE 2:
       User ne Table Number dala
    */

  if (enteredTable) {
    if (String(order.tableNumber) === String(enteredTable)) {
      displayTracking(order);

      return;
    }

    showTrackingError("No order found for this table.");

    return;
  }
}

/* =====================================================
   23. DISPLAY TRACKING
===================================================== */

function displayTracking(order) {
  const result = document.getElementById("trackingResult");

  if (!result) {
    return;
  }

  /*
       Stage is always 0 for now.

       Later admin panel will update this.
    */

  const currentStage = Number(order.stage) || 0;

  const stageNames = ["Order Placed", "Preparing", "Ready", "Served"];

  const stageIcons = ["📝", "👨‍🍳", "📦", "🍽️"];

  const stageMessages = [
    "Your order has been received. The restaurant will start preparing it soon.",

    "Our chef is preparing your food.",

    "Your food is ready and will reach your table soon.",

    "Your food has been served. Enjoy your meal!",
  ];

  let stepsHTML = "";

  stageNames.forEach((name, index) => {
    let className = "";

    if (index < currentStage) {
      className = "completed";
    }

    if (index === currentStage) {
      className = "active";
    }

    stepsHTML += `

                <div
                    class="progress-step ${className}"
                >

                    <div class="progress-icon">

                        ${index < currentStage ? "✓" : stageIcons[index]}

                    </div>


                    <h4>
                        ${name}
                    </h4>

                </div>

            `;
  });

  /*
       Progress line

       Stage 0 = 0%
       Stage 1 = 33%
       Stage 2 = 66%
       Stage 3 = 100%
    */

  const progressWidth = currentStage * 33.33;

  result.innerHTML = `

        <div class="tracking-card">


            <div class="tracking-top">


                <div class="tracking-order-info">

                    <h3>
                        Order #${order.orderId}
                    </h3>

                    <p>
                        Table ${order.tableNumber}
                        • ${order.customerName}
                    </p>

                </div>


                <span class="status-badge">

                    ${stageNames[currentStage]}

                </span>


            </div>



            <div class="progress-tracker">


                <div class="progress-line"></div>


                <div
                    class="progress-line-active"
                    style="width:${progressWidth}%"
                ></div>


                ${stepsHTML}


            </div>



            <div class="tracking-message">

                ${stageMessages[currentStage]}

            </div>



            <div class="tracking-order-summary">

                <h3>
                    Order Summary
                </h3>


                <div class="tracking-items">

                    ${order.items
                      .map(
                        (item) => `

                            <div>

                                <span>
                                    ${item.emoji}
                                    ${item.name}
                                    × ${item.quantity}
                                </span>

                                <strong>
                                    ₹${item.price * item.quantity}
                                </strong>

                            </div>

                        `,
                      )
                      .join("")}

                </div>


                <div class="tracking-total">

                    <span>
                        Total Paid
                    </span>

                    <strong>
                        ₹${order.total}
                    </strong>

                </div>

            </div>


        </div>

    `;
}

/* =====================================================
   24. TRACKING ERROR
===================================================== */

function showTrackingError(message) {
  const result = document.getElementById("trackingResult");

  if (!result) {
    return;
  }

  result.innerHTML = `

        <div class="tracking-card">

            <div class="tracking-error">

                <div class="tracking-error-icon">
                    🔍
                </div>

                <h3>
                    Order Not Found
                </h3>

                <p>
                    ${message}
                </p>

                <small>
                    Please check your Order ID
                    and Table Number.
                </small>

            </div>

        </div>

    `;
}

/* =====================================================
   25. SUCCESS MODAL
===================================================== */

document.addEventListener("click", (event) => {
  const modal = document.getElementById("successModal");

  if (!modal) {
    return;
  }

  /*
           Click outside modal
        */

  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

/* 
   26. NOTIFICATION
 */

function showNotification(message) {
  const old = document.querySelector(".custom-notification");

  if (old) {
    old.remove();
  }

  const notification = document.createElement("div");

  notification.className = "custom-notification";

  notification.textContent = message;

  notification.style.position = "fixed";

  notification.style.bottom = "25px";

  notification.style.right = "25px";

  notification.style.zIndex = "9999";

  notification.style.background = "#211b18";

  notification.style.color = "#ffffff";

  notification.style.padding = "13px 20px";

  notification.style.borderRadius = "10px";

  notification.style.fontSize = "12px";

  notification.style.fontWeight = "600";

  notification.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";

  notification.style.animation = "notificationIn 0.3s ease";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";

    notification.style.transform = "translateY(10px)";

    notification.style.transition = "0.3s ease";

    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2500);
}

/* 
   27. NOTIFICATION ANIMATION
 */

const notificationStyle = document.createElement("style");

notificationStyle.innerHTML = `

    @keyframes notificationIn {

        from {

            opacity: 0;

            transform:
                translateY(15px);

        }

        to {

            opacity: 1;

            transform:
                translateY(0);

        }

    }

`;

document.head.appendChild(notificationStyle);

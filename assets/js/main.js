// Shopping Cart Functionality
const cart = {
  items: [],
  total: 0,

  // Add item to cart
  addItem: function (product) {
    // Check if item already exists in cart
    const existingItem = this.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
        quantity: 1,
      });
    }

    this.updateCart();
    this.showNotification(`${product.name} added to cart!`);
  },

  // Remove item from cart
  removeItem: function (id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.updateCart();
  },

  // Update item quantity
  updateQuantity: function (id, change) {
    const item = this.items.find((item) => item.id === id);

    if (item) {
      item.quantity += change;

      if (item.quantity <= 0) {
        this.removeItem(id);
        return;
      }
    }

    this.updateCart();
  },

  // Calculate total
  calculateTotal: function () {
    this.total = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },

  // Update cart display
  updateCart: function () {
    this.calculateTotal();

    // Update cart count
    const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector(".cart-count").textContent = totalItems;

    // Update cart items display
    const cartItems = document.querySelector(".cart-items");

    if (this.items.length === 0) {
      cartItems.innerHTML = `
                        <div class="empty-cart">
                            <i class="fas fa-shopping-cart"></i>
                            <h3>Your cart is empty</h3>
                            <p>Add some refreshing drinks to your cart</p>
                        </div>
                    `;
    } else {
      cartItems.innerHTML = this.items
        .map(
          (item) => `
                        <div class="cart-item" data-id="${item.id}">
                            <div class="cart-item-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="cart-item-details">
                                <h4>${item.name}</h4>
                                <div class="cart-item-price">$${item.price.toFixed(
                                  2
                                )}</div>
                                <div class="cart-item-quantity">
                                    <button class="quantity-btn minus" data-id="${
                                      item.id
                                    }">-</button>
                                    <span class="quantity">${
                                      item.quantity
                                    }</span>
                                    <button class="quantity-btn plus" data-id="${
                                      item.id
                                    }">+</button>
                                </div>
                            </div>
                            <div class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </div>
                        </div>
                    `
        )
        .join("");
    }

    // Update total
    document.querySelector(
      ".cart-total .amount"
    ).textContent = `$${this.total.toFixed(2)}`;
  },

  // Show notification
  showNotification: function (message) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.innerHTML = `
                    <div class="notification-content">
                        <i class="fas fa-check-circle"></i>
                        <span>${message}</span>
                    </div>
                `;

    // Add to body
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Remove after delay
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  },

  // Initialize cart
  init: function () {
    // Add event listeners
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        const product = {
          id: button.dataset.id,
          name: button.dataset.name,
          price: button.dataset.price,
          image: button.dataset.image,
        };
        this.addItem(product);
      });
    });

    // Open cart
    document.querySelector(".cart-icon").addEventListener("click", () => {
      document.querySelector(".cart-sidebar").classList.add("active");
      document.querySelector(".overlay").classList.add("active");
      document.body.style.overflow = "hidden";
    });

    // Close cart
    document.querySelector(".close-cart").addEventListener("click", () => {
      document.querySelector(".cart-sidebar").classList.remove("active");
      document.querySelector(".overlay").classList.remove("active");
      document.body.style.overflow = "";
    });

    // Close cart with overlay
    document.querySelector(".overlay").addEventListener("click", () => {
      document.querySelector(".cart-sidebar").classList.remove("active");
      document.querySelector(".overlay").classList.remove("active");
      document.body.style.overflow = "";
    });

    // Delegate cart item events
    document.querySelector(".cart-items").addEventListener("click", (e) => {
      // Remove item
      if (e.target.closest(".remove-item")) {
        const id = e.target.closest(".remove-item").dataset.id;
        this.removeItem(id);
      }

      // Decrease quantity
      if (e.target.closest(".minus")) {
        const id = e.target.closest(".minus").dataset.id;
        this.updateQuantity(id, -1);
      }

      // Increase quantity
      if (e.target.closest(".plus")) {
        const id = e.target.closest(".plus").dataset.id;
        this.updateQuantity(id, 1);
      }
    });

    // Checkout button
    document.querySelector(".checkout-btn").addEventListener("click", (e) => {
      e.preventDefault();
      if (this.items.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      // In a real implementation, this would redirect to checkout
      alert(`Proceeding to checkout with total: $${this.total.toFixed(2)}`);
    });
  },
};

// Initialize cart
cart.init();

// Mobile Navigation Toggle
const mobileToggle = document.querySelector(".mobile-toggle");
const navLinks = document.querySelector(".nav-links");

mobileToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileToggle.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Form submission handling
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Form validation
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (name && email && message) {
    // Show success animation
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.background = "#27ae60";

    // Reset after delay
    setTimeout(() => {
      contactForm.reset();
      submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      submitBtn.style.background = "";
    }, 3000);
  } else {
    alert("Please fill in all fields.");
  }
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document
  .querySelectorAll(
    ".section-title h2, .about-text, .about-image, .product-card, .contact-info, .contact-form"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.08)";
    header.style.height = "70px";
  } else {
    header.style.boxShadow = "none";
    header.style.height = "80px";
  }
});

// Stagger animations for section titles
document.querySelectorAll(".section-title h2").forEach((title, index) => {
  title.style.animationDelay = `${index * 0.2}s`;
});

// Initialize animations
window.addEventListener("load", () => {
  document.querySelector(".section-title h2").classList.add("animate");
});

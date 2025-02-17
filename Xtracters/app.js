document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded.");

  // -------------------------------
  // Intersection Observer for Animations
  // -------------------------------
  const sections = document.querySelectorAll('.selling');
  const images = document.querySelectorAll('.selling_shoe_img');
  const elements = document.querySelectorAll('.Advantagee');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('show');
          }, index * 300); // staggered delay
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
  images.forEach((img) => observer.observe(img));
  elements.forEach((el) => observer.observe(el));

  // -------------------------------
  // Product Data
  // -------------------------------
  const products = [
    {
      id: 1,
      title: "Air Force",
      price: 100,
      desc: "The Nike Air Force 1 blends classic style with modern comfort. Featuring premium leather and a cushioned Air sole, it's built for durability and all-day wear.",
      colors: [
        { code: "black", img: "Nike_image.png" },
        { code: "darkblue", img: "Nike_image2.png" },
      ],
    },
    {
      id: 2,
      title: "Air Jordan",
      price: 110,
      desc: "Air Jordan offers top-notch performance and iconic style. With excellent cushioning and sleek design, it’s a true streetwear staple.",
      colors: [
        { code: "lightgray", img: "jordan_image.png" },
        { code: "green", img: "jordan_image2.png" },
      ],
    },
    {
      id: 3,
      title: "Blazer",
      price: 100,
      desc: "The Blazer stands out with its timeless design and premium build. Its versatile style makes it perfect for both casual and sporty looks.",
      colors: [
        { code: "lightgray", img: "blazer_image.png" },
        { code: "green", img: "blazer_image2.png" },
      ],
    },
    {
      id: 4,
      title: "Crater",
      price: 220,
      desc: "Crater features a bold design and innovative structure. It combines eye-catching looks with reliable performance for a standout style.",
      colors: [
        { code: "black", img: "crater_image.png" },
        { code: "lightgray", img: "crater_image2.png" },
      ],
    },
    {
      id: 5,
      title: "Hippie",
      price: 120,
      desc: "Hippie offers a unique blend of laid-back style with modern trends. It’s designed for comfort and a distinctive look that stands out.",
      colors: [
        { code: "gray", img: "hippie_image.png" },
        { code: "black", img: "hippie_image2.png" },
      ],
    },
  ];

  let chosenProduct = products[0];

  // -------------------------------
  // Selectors
  // -------------------------------
  const wrapper = document.querySelector(".sliderWrapper");
  const menuItems = document.querySelectorAll(".menuItem");
  const slider = document.querySelector(".slider");

  // Selling section selectors
  const currentProductImg = document.querySelector(".selling_shoe_img");
  const currentProductTitle = document.querySelector(".Title");
  const currentProductPrice = document.querySelector(".product_price");
  const currentProductDescription = document.querySelector(".product_description");
  const currentProductColors = document.querySelectorAll(".color");
  const currentProductSizes = document.querySelectorAll(".size");

  // Background colors for slider (one per product)
  const sliderBgColors = ["#FF5733", "#33FF57", "#5733FF", "#FFD700", "#00FFFF"];

  // -------------------------------
  // Menu Item Click Handler
  // -------------------------------
  menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      console.log("Menu item", index, "clicked.");

      // Update slider background and move the slider wrapper
      slider.style.backgroundColor = sliderBgColors[index];
      wrapper.style.transform = `translateX(${-100 * index}vw)`;

      // Update active slider item
      const sliderItems = document.querySelectorAll(".sliderItem");
      sliderItems.forEach((slide) => slide.classList.remove("active"));
      if (sliderItems[index]) {
        sliderItems[index].classList.add("active");
      }

      // Update product details in the selling section
      chosenProduct = products[index];
      currentProductTitle.textContent = chosenProduct.title;
      currentProductPrice.textContent = "Real Price: $" + chosenProduct.price;
      currentProductImg.src = chosenProduct.colors[0].img;
      currentProductDescription.textContent = chosenProduct.desc;

      // Update available color options
      currentProductColors.forEach((colorElem, i) => {
        if (chosenProduct.colors[i]) {
          colorElem.style.backgroundColor = chosenProduct.colors[i].code;
        }
      });
    });
  });

  // -------------------------------
  // Color Option Click Handler
  // -------------------------------
  currentProductColors.forEach((colorElem, index) => {
    colorElem.addEventListener("click", () => {
      console.log("Color option", index, "clicked.");
      if (chosenProduct.colors[index]) {
        currentProductImg.src = chosenProduct.colors[index].img;
      }
    });
  });

  // -------------------------------
  // Size Selection Handler
  // -------------------------------
  currentProductSizes.forEach((sizeElem) => {
    sizeElem.addEventListener("click", () => {
      console.log("Size selected:", sizeElem.textContent);
      currentProductSizes.forEach((s) => {
        s.style.backgroundColor = "white";
        s.style.color = "black";
      });
      sizeElem.style.backgroundColor = "black";
      sizeElem.style.color = "white";
    });
  });

  // -------------------------------
  // Payment Modal Logic (Selling Section Only)
  // -------------------------------
  // Use a more specific selector to target the BUY button within the selling section
  const productButton = document.querySelector(".selling .productbutton");
  const payment = document.querySelector(".payment");
  const closeBtn = document.querySelector(".payment .close");

  if (productButton && payment && closeBtn) {
    productButton.addEventListener("click", () => {
      console.log("Payment modal button clicked.");
      payment.style.display = "flex";
    });
    closeBtn.addEventListener("click", () => {
      console.log("Payment modal close clicked.");
      payment.style.display = "none";
    });
  } else {
    console.log("Payment modal elements not found.");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  let lastScrollY = window.scrollY;
  const nav = document.querySelector("nav");

  window.addEventListener("scroll", () => {
    // If scrolling down and you've scrolled more than 100px, hide the navbar
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      nav.classList.add("hidden");
    } else {
      // If scrolling up, show the navbar
      nav.classList.remove("hidden");
    }
    lastScrollY = window.scrollY;
  });
});
function updateProductImage(newSrc) {
  const img = document.querySelector(".selling_shoe_img");
  if (!img) return;
  
  // Remove any previous animation classes
  img.classList.remove("fade-in-slide", "full-slide-in");

  // Force reflow to restart the animation (if needed)
  void img.offsetWidth;
  
  // Choose an animation effect:
  // For example, randomly choose one:
  const effectClass = Math.random() < 0.5 ? "fade-in-slide" : "full-slide-in";
  
  // Update the image source
  img.src = newSrc;
  
  // Add the chosen animation class to trigger the effect
  img.classList.add(effectClass);
}
currentProductImg.src = chosenProduct.colors[0].img;
updateProductImage(chosenProduct.colors[0].img);
currentProductColors.forEach((colorElem, index) => {
  colorElem.addEventListener("click", () => {
    if (chosenProduct.colors[index]) {
      updateProductImage(chosenProduct.colors[index].img);
    }
  });
});
// Select elements
const hamburger = document.querySelector(".hamburger");
const navBottom = document.querySelector(".navBottom");

// Toggle menu on click
hamburger.addEventListener("click", () => {
    navBottom.classList.toggle("showMenu");
});

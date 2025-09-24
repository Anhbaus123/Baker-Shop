// script.js
let cart = [];  // Mảng lưu trữ các sản phẩm trong giỏ

// Lấy phần tử DOM
const cartBtn = document.getElementById("cart-btn");
const cartContainer = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

// Mở/đóng giỏ hàng
cartBtn.addEventListener("click", () => {
  cartContainer.classList.toggle("active");  // bật/tắt class active:contentReference[oaicite:5]{index=5}
});
closeCart.addEventListener("click", () => {
  cartContainer.classList.remove("active");
});

// Xử lý khi bấm nút "Mua ngay"
document.querySelectorAll(".buy-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const productCard = btn.closest("li");
    const name = productCard.querySelector("h3").innerText;
    const price = Number(productCard.getAttribute("data-price"));  // lấy giá từ data-price

    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name: name, price: price, quantity: 1 });
    }
    updateCart();  // Cập nhật lại giao diện giỏ
  });
});

// Cập nhật danh sách giỏ hàng và tính tổng
function updateCart() {
  // Xóa nội dung cũ
  cartItemsList.innerHTML = "";
  let count = 0;
  let total = 0;

  // Duyệt mảng cart để tạo giao diện
  cart.forEach(item => {
    count += item.quantity;
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerText = `${item.name} - Số lượng: ${item.quantity}, Đơn giá: ${item.price.toLocaleString()} VNĐ, Tổng: ${(item.price * item.quantity).toLocaleString()} VNĐ`;

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Xóa";
    removeBtn.className = "remove-btn";
    // Sự kiện Xóa sản phẩm
    removeBtn.addEventListener("click", () => {
      cart = cart.filter(i => i.name !== item.name);
      updateCart();
    });

    li.appendChild(removeBtn);
    cartItemsList.appendChild(li);
  });

  // Cập nhật số lượng và tổng tiền
  cartCountEl.innerText = count;
  cartTotalEl.innerText = total.toLocaleString();
}

// Xử lý khi bấm nút Thanh toán
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }

  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const address = document.getElementById("customer-address").value.trim();

  if (!name || !phone || !address) {
    alert("Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ!");
    return;
  }

  // Hiển thị thông tin đơn hàng demo
  alert(
    `Cảm ơn ${name} đã đặt hàng!\n` +
    `SĐT: ${phone}\n` +
    `Địa chỉ: ${address}\n` +
    `Tổng tiền: ${cartTotalEl.textContent}đ`
  );

  // Reset giỏ hàng sau khi đặt
  cart = [];
  updateCart();
  document.getElementById("customer-name").value = "";
  document.getElementById("customer-phone").value = "";
  document.getElementById("customer-address").value = "";
  cartContainer.classList.remove("active");

});

// Slideshow banner
let slideIndex = 0;
const slides = document.querySelectorAll(".slides img");

function showSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
  });
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].classList.add("active");
  setTimeout(showSlides, 4000); // đổi ảnh mỗi 4 giây
}

showSlides();

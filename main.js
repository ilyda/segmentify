
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

async function fetchText() {
  let response = await fetch('dummy/product-list.json');
  const data = await response.json();
  dataI(data);
}
fetchText();
function dataI(data) {

  const SubData = data.responses[0];
  const categoryName = SubData[0].params.userCategories;
  const Products = SubData[0].params.recommendedProducts;

  categoryName.forEach(element => {
    document.querySelector("#tab-control").innerHTML += `<li class="tab-control"><button>${element}</button></li>`;

  });
  let ProductName = 'Size Özel';

  ProductsCard(Products, ProductName);
  clickValidation(Products);


}
function clickValidation(Products) {
  const controls = document.querySelectorAll(".tab-control");
  const tabs = document.querySelectorAll(".tab");
  for (let i = 1; i < controls.length; i++) {
    controls[0].classList.add('active');
  }
  controls.forEach(element => {
    element.addEventListener('click', function (event) {
      for (let i = 0; i < controls.length; i++) {
        controls[i].classList.remove('active');
      }
      event.target.parentNode.classList.add('active');
      let ProductName = event.target.parentNode.innerText;
      ProductsCard(Products, ProductName);


    })

  });
}
function ProductsCard(Products, ProductName) {
  document.querySelector(".swiper-wrapper").innerHTML = '';
  Products[ProductName].forEach(element => {

    document.querySelector(".swiper-wrapper").innerHTML += ` 
    <div class="swiper-slide">
    <div class="card">
    <a href="${element.url}" class="card-link">
        <img src="${element.image
      }" class="card-img-top swiper-lazy"  alt="">
    </a>
    <div class="card-body">
        <h5 class="card-title">${element.name}</h5>
        <p class="price-info">${element.priceText}</p>
        <p class="sub-info">${element.params.shippingFee === "FREE"
        ? `<i class="fa-solid fa-truck mr-1"></i>Ücretsiz Kargo`
        : " "
      }</p>
        <a href="#" class="btn btn-primary">Sepete Ekle</a>
    </div>
  </div> </div>`;

  });
}


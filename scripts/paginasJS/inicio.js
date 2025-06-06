let mainCurrentIndex = 0;
const mainImagesContainer = document.getElementById('main-carousel-images');
const mainTotalSlides = mainImagesContainer.children.length;
mainImagesContainer.style.width = `${mainTotalSlides * 100}%`;

for (let i = 0; i < mainTotalSlides; i++) {
    mainImagesContainer.children[i].style.width = `${100 / mainTotalSlides}%`;
}


function showMainSlide(index) {
  if (index >= mainTotalSlides) {
    mainCurrentIndex = 0;
  } else if (index < 0) {
    mainCurrentIndex = mainTotalSlides - 1;
  } else {
    mainCurrentIndex = index;
  }
  mainImagesContainer.style.transform = `translateX(-${mainCurrentIndex * (100 / mainTotalSlides)}%)`;
}

function mainNextSlide() {
  showMainSlide(mainCurrentIndex + 1);
}

function mainPrevSlide() {
  showMainSlide(mainCurrentIndex - 1);
}
setInterval(mainNextSlide, 5000); 
showMainSlide(0); 



let productsCurrentIndex = 0;
const productsImagesContainer = document.getElementById('products-carousel-images');
const productsTotalSlides = productsImagesContainer.children.length;
productsImagesContainer.style.width = `${productsTotalSlides * 100}%`;


for (let i = 0; i < productsTotalSlides; i++) {
    productsImagesContainer.children[i].style.flexBasis = `${100 / productsTotalSlides}%`;
}

function showProductsSlide(index) {
  if (index >= productsTotalSlides) {
    productsCurrentIndex = 0;
  } else if (index < 0) {
    productsCurrentIndex = productsTotalSlides - 1;
  } else {
    productsCurrentIndex = index;
  }
 
  productsImagesContainer.style.transform = `translateX(-${productsCurrentIndex * (100 / productsTotalSlides)}%)`;
}

function productsNextSlide() {
  showProductsSlide(productsCurrentIndex + 1);
}

function productsPrevSlide() {
  showProductsSlide(productsCurrentIndex - 1);
}

showProductsSlide(0);



function addToCartClicked(productName, productPrice) {
  alert(`"${productName}" (Precio: COP ${productPrice}) se ha añadido al carrito (simulación).`);

}
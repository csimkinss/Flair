//search button dropdown
const button = document.getElementById("search-button");
const search = document.getElementById("search-input");
const dropdownMenus = document.querySelectorAll(".dropdown-hover");

button.addEventListener("click", function (e) {
    search.classList.toggle("search-clicked");
    //remove hover class from dropdown menu items when search button is clicked
    dropdownMenus.forEach((menu) => menu.classList.toggle("dropdown-hover"));
});

// //indefinite repeating carousel

const imgContainer = document.getElementById("images");
if (imgContainer) {
    const carouselButtons = document.getElementById("buttons");

    const firstImageClone = imgContainer.children[0].cloneNode(true);
    const lastImageClone =
        imgContainer.children[imgContainer.children.length - 1].cloneNode(true);
    imgContainer.append(firstImageClone);
    imgContainer.prepend(lastImageClone);

    imgContainer.style.scrollBehavior = "auto";
    imgContainer.scrollLeft = imgContainer.offsetWidth;
    let direction = 1;

    carouselButtons.addEventListener("click", function (e) {
        if (e.target.dataset.direction) {
            direction = e.target.dataset.direction;
            clearInterval(carouselInterval);
            handleMovement();
            carouselInterval = setInterval(handleMovement, 3000);
            direction = 1;
        }
    });

    function handleMovement() {
        if (
            imgContainer.scrollLeft >=
            imgContainer.scrollWidth - imgContainer.offsetWidth
        ) {
            imgContainer.scrollLeft = imgContainer.offsetWidth;
        }
        if (imgContainer.scrollLeft <= 0) {
            imgContainer.scrollLeft =
                imgContainer.scrollWidth - imgContainer.offsetWidth * 2;
        }
        imgContainer.style.scrollBehavior = "";
        imgContainer.scrollLeft += imgContainer.offsetWidth * direction;
        imgContainer.style.scrollBehavior = "auto";
    }

    let carouselInterval = setInterval(handleMovement, 3000);
}

//reversing carousel

// const imgContainer = document.getElementById('images');
// const carouselButtons = document.getElementById('buttons');

// let direction = 1;

// carouselButtons.addEventListener('click', function(e) {
//     if (e.target.dataset.direction) {
//         direction = e.target.dataset.direction;
//         clearInterval(handleMovement);
//         handleMovement();
//         carouselInterval = setInterval(handleMovement, 3000);
//     }
// })

// function handleMovement() {
//     imgContainer.scrollLeft += imgContainer.offsetWidth * direction;
//     if (imgContainer.scrollLeft >= imgContainer.scrollWidth - imgContainer.offsetWidth) {
//         direction = -1;
//     }
//     if (imgContainer.scrollLeft <= 0) {
//         direction = 1;
//     }
// }

// let carouselInterval = setInterval(handleMovement, 3000);

//basket page item removal

// const removeButtons = document.querySelectorAll(".item-remove");
// const removeConfirmtaion = document.getElementById("confirm-item-delete");
// const basketContent = document.querySelector(".basket-content");

// removeButtons.forEach((removeButton) =>
//     removeButton.addEventListener("click", function (e) {
//         removeButton.classList.add("remove-target");
//         removeConfirmtaion.classList.add("remove-clicked");
//         basketContent.classList.add("grey-overlay");
//         removeButton.parentElement.parentElement.parentElement.classList.add("item-for-removal");
//     })
// );

// const finalOptionButtons = document.getElementById("final-option-buttons");
// const basketItems = document.querySelectorAll(".item");
// console.log(basketItems);

// finalOptionButtons.addEventListener("click", function (e) {
//     if (e.target.classList.contains("yes-delete") && basketItems.document.querySelectorAll(".remove-target")) {
//         console.log('test');
//     }
//     if (e.target.classList.contains("no-delete")) {
//         e.target.parentElement.parentElement.classList.add("keep-basket-item");
//         basketContent.classList.add("remove-grey-overlay");
//     }
// });

// basket page item removal

// creating text box and grey overlay div

const basketContent = document.getElementById("basket-content");

if (basketContent) {
    const greyScreen = document.createElement("div");
    greyScreen.classList.add("grey-screen");
    const textBox = document.createElement("div");
    textBox.classList.add("confirm-item-delete");
    const text = document.createElement("p");
    text.innerHTML =
        "Are you sure you would like to remove this item from your basket?";
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("final-option-buttons");
    const yesButton = document.createElement("button");
    yesButton.classList.add("yes-delete");
    yesButton.innerHTML = "Yes";
    const noButton = document.createElement("button");
    noButton.classList.add("no-delete");
    noButton.innerHTML = "No";

    // adding yes/no buttons to buttons div
    buttonsDiv.appendChild(yesButton);
    buttonsDiv.appendChild(noButton);

    // adding text and buttons div to text box div
    textBox.appendChild(text);
    textBox.appendChild(buttonsDiv);

    const removeButtons = document.querySelectorAll(".item-remove");

    // accessing remove buttons and adding text box if clicked
    removeButtons.forEach((removeButton) =>
        removeButton.addEventListener("click", function (e) {
            e.target.classList.add("remove-clicked");
            basketContent.appendChild(greyScreen);
            basketContent.appendChild(textBox);
        })
    );

    //creating number of items in basket button
    const basketButton = document.querySelector(".basket-button");
    let basketItems = document.querySelectorAll(".item-container");
    console.log(basketItems);
    const numberDiv = document.createElement("div");
    numberDiv.classList.add("numberDiv");
    let number = document.createElement("p");
    number.innerHTML = basketItems.length;

    numberDiv.appendChild(number);
    basketButton.appendChild(numberDiv);

    const basketInnerContent = document.getElementById("basket-inner-content");
   
    const noItemsMessageContainer = document.createElement("div");
    noItemsMessageContainer.classList.add("no-items-message");
    // console.log(noItemsMessageContainer);
    const noItemsMessage = document.createElement("p");
    noItemsMessage.innerHTML =
        "There are no items in your basket. Click <a href='./index.html'>here</a> to continue shopping.";
    noItemsMessageContainer.appendChild(noItemsMessage);


    // accessing text box buttons
    removeButtons.forEach((removeButton) =>
        buttonsDiv.addEventListener("click", function (e) {
            if (e.target.classList.contains("yes-delete")) {
                if (removeButton.classList.contains("remove-clicked")) {
                    removeButton.parentElement.remove();
                    //updating basket item number
                    const itemsUpdate = document.querySelectorAll(".item-container");
                    number.innerHTML = itemsUpdate.length;
                    if (itemsUpdate.length <= 0) {
                        number.parentElement.remove();
                        basketInnerContent.appendChild(noItemsMessageContainer);
                    }
                }
                textBox.remove();
                greyScreen.remove();
            } else {
                removeButton.classList.remove("remove-clicked");
                textBox.remove();
                greyScreen.remove();
            }
            
        })
    );

    // if there are no items in basket, print no items message
    // const basketInnerContent = document.getElementById("basket-inner-content");
   
    // const noItemsMessageContainer = document.createElement("div");
    // noItemsMessageContainer.classList.add("no-items-message");
    // // console.log(noItemsMessageContainer);
    // const noItemsMessage = document.createElement("p");
    // noItemsMessage.innerHTML =
    //     "There are no items in your basket. Click <a href='./index.html'>here</a> to continue shopping.";
    // noItemsMessageContainer.appendChild(noItemsMessage);

    if (basketItems.length <= 0) {
        basketInnerContent.appendChild(noItemsMessageContainer);
    }

    // add number of basket items to basket button
    
}

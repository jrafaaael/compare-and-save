const main = document.querySelector('.container');
const addStore = document.querySelector('.addBtn');
const fbox = document.querySelector('.fbox');
const dropDown = document.querySelector('.dropDown');
const arrowLine = document.querySelectorAll('.arrow .line');
const divResults = document.querySelector('.results');

let arrNames = [];
let arrPrices = [];
let suggestedProducts = [];
let productsPerStore = [];
let total = [];

function insertAfter(e, i) {
    if (e.nextSibling) {
        e.parentNode.insertBefore(i, e.nextSibling);
    } else {
        e.parentNode.appendChild(i);
    }
}

function uniq(a) {
    return Array.from(new Set(a));
}

function createNewStore() {
    const box = document.createElement('section');
    const titleContainer = document.createElement('form');
    const nameStore = document.createElement('input');
    const lineBtn = document.createElement('div');
    const confirmBtn = document.createElement('button');

    lineBtn.classList.add('line');
    confirmBtn.classList.add('confirmBtn');
    box.classList.add('box', 'newBox');
    insertAfter(fbox, box);

    titleContainer.classList.add('titleContainer');

    nameStore.classList.add('nameStore');
    nameStore.setAttribute('type', 'text');
    nameStore.setAttribute('placeholder', 'Enter name store');
    nameStore.setAttribute('required', '');

    confirmBtn.setAttribute('title', 'Confirm name store');

    confirmBtn.addEventListener('click', function () {
        inputEmpty('nameStore', 'nameStore', 1);
    }, false);

    box.appendChild(titleContainer);
    titleContainer.appendChild(nameStore);
    titleContainer.appendChild(confirmBtn);
    confirmBtn.appendChild(lineBtn);
    confirmBtn.appendChild(lineBtn.cloneNode(true));

    if (main.childElementCount > 1) {
        const deleteBtns = document.querySelectorAll('.deleteBtn');
        const addBtns = document.querySelectorAll('.addBtn');
        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].classList.add('noHover', 'deleteDisabled');
            deleteBtns[i].setAttribute('disabled', '');
        }
        for (let i = 0; i < addBtns.length; i++) {
            addBtns[i].classList.add('noHover', 'addDisabled');
            addBtns[i].setAttribute('disabled', '');
        }
    }
    nameStore.focus();
}

function inputEmpty(inputClass1, inputClass2, type, data) {
    const input1 = document.querySelector(`.${inputClass1}`);
    const input2 = document.querySelector(`.${inputClass2}`);
    const confirmBtn = document.querySelector('.confirmBtn');
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    const addBtns = document.querySelectorAll('.addBtn');

    confirmBtn.setAttribute('type', 'submit');
    input1.classList.add('isEmpty');
    input2.classList.add('isEmpty');

    if (input1.value !== '' && input2.value !== '') {
        confirmBtn.setAttribute('type', 'button');
        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].classList.remove('noHover', 'deleteDisabled');
            deleteBtns[i].removeAttribute('disabled', '');
        }
        for (let i = 0; i < addBtns.length; i++) {
            addBtns[i].classList.remove('noHover', 'addDisabled');
            addBtns[i].removeAttribute('disabled', '');
        }
        if (type === 1) {
            confirmedStore(input1.value);
        }
        else {
            confirmedProduct(input1.value, input2.value, data);
        }
    }
}

function confirmedStore(name) {
    const box = document.querySelector('.box.newBox');
    const titleContainerForm = document.querySelector('form');

    const titleContainerDiv = document.createElement('div');
    const titleStore = document.createElement('p');
    const addProduct = document.createElement('button');
    const deleteStore = document.createElement('button');
    const lineBtn = document.createElement('div');
    const productsContainer = document.createElement('div');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const trow = document.createElement('tr');
    const col1 = document.createElement('th');
    const col2 = document.createElement('th');
    const col3 = document.createElement('th');
    const abbr = document.createElement('abbr');
    const tbody = document.createElement('tbody');
    const tfooter = document.createElement('tfoot');
    const trowf = document.createElement('tr');
    const tfootTitle = document.createElement('td');
    const tfootTotal = document.createElement('td');
    const formProducts = document.createElement('form');
    formProducts.setAttribute('id', 'formProducts');

    lineBtn.classList.add('line');

    titleContainerDiv.classList.add('titleContainer');

    titleStore.classList.add('title', 'store');
    if (name.length > 10) {
        titleStore.textContent = `${name.slice(0, 7)}...`;
    }
    else {
        titleStore.textContent = name;
    }

    addProduct.classList.add('addBtn');
    addProduct.setAttribute('title', 'Add a new product');
    addProduct.appendChild(lineBtn);
    addProduct.appendChild(lineBtn.cloneNode(true));

    deleteStore.classList.add('deleteBtn');
    deleteStore.setAttribute('title', 'Delete store');
    deleteStore.appendChild(lineBtn.cloneNode(true));

    titleContainerDiv.appendChild(titleStore);
    titleContainerDiv.appendChild(addProduct);
    titleContainerDiv.appendChild(deleteStore);

    productsContainer.classList.add('productsContainer');

    col1.textContent = 'Product';
    col2.textContent = 'Price';
    abbr.setAttribute('title', 'Confirm/Delete');
    abbr.textContent = 'C/D';
    col3.appendChild(abbr);
    trow.appendChild(col1);
    trow.appendChild(col2);
    trow.appendChild(col3);
    thead.appendChild(trow);
    table.appendChild(thead);

    table.appendChild(tbody);

    tfootTitle.textContent = 'Total';
    tfootTotal.setAttribute('colspan', '2');
    trowf.appendChild(tfootTitle);
    trowf.appendChild(tfootTotal);
    tfooter.appendChild(trowf);
    table.appendChild(tfooter);

    productsContainer.appendChild(table);

    box.removeChild(titleContainerForm);
    box.appendChild(titleContainerDiv);

    box.appendChild(formProducts);

    box.appendChild(productsContainer);
    box.classList.remove('newBox');

    deleteStore.addEventListener('click', function () {
        const deleteBtns = document.querySelectorAll('.deleteBtn');
        const addBtns = document.querySelectorAll('.addBtn');
        main.removeChild(box);
        addStore.classList.remove('noHover', 'addDisabled');
        addStore.removeAttribute('disabled');
        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].classList.remove('noHover', 'deleteDisabled');
            deleteBtns[i].removeAttribute('disabled', '');
        }
        for (let i = 0; i < addBtns.length; i++) {
            addBtns[i].classList.remove('noHover', 'addDisabled');
            addBtns[i].removeAttribute('disabled', '');
        }
        const titles = document.querySelectorAll('.title.store');
        for (let j = 0; j < arrNames.length; j++) {
            if ((arrNames.length === 1) || (titles[j] === undefined)) {
                arrNames.pop();
                arrPrices.pop();
                productsPerStore.pop();
                total.pop();
                break;
            }
            if (arrNames[j] !== titles[j].textContent) {
                arrNames.splice(j, 1);
                arrPrices.splice(j, 1);
                productsPerStore.splice(j, 1);
                total.splice(j, 1);
            }
        }
        calcResult();
    }, false);

    addProduct.addEventListener("click", function (e) {
        const addProducts = document.querySelectorAll('.titleContainer .addBtn');
        for (let i = 0; i < addProducts.length; i++) {
            if (e.target.tagName.toLowerCase() === 'button') {
                if (e.target === addProducts[i]) {
                    createNewProduct(i);
                }
            }
            else {
                if (e.target.parentNode === addProducts[i]) {
                    createNewProduct(i);
                }
            }
        }
    }, false
    );

    arrNames.unshift(name);
    arrPrices.unshift([]);
    productsPerStore.unshift([]);
    total.unshift(Number(0));
}

function createNewProduct(index) {
    const tbody = document.querySelectorAll('.box tbody');
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    const addBtns = document.querySelectorAll('.addBtn');
    const fstRow = tbody[index].children[0];

    const trow = document.createElement('tr');
    const col1 = document.createElement('td');
    const col2 = document.createElement('td');
    const col3 = document.createElement('td');
    const nameProduct = document.createElement('input');
    const suggestion = document.createElement('datalist');
    const option = document.createElement('option');
    const priceProduct = document.createElement('input');
    const confirmBtn = document.createElement('button');
    const lineBtn = document.createElement('div');

    nameProduct.classList.add('nameProduct');
    nameProduct.setAttribute('placeholder', 'Product name');
    nameProduct.setAttribute('form', 'formProducts');
    nameProduct.setAttribute('required', '');

    nameProduct.setAttribute('list', 'suggestion');
    suggestion.setAttribute('id', 'suggestion');
    suggestedProducts = uniq(productsPerStore.flat());
    for (let i = 0; i < suggestedProducts.length; i++) {
        option.setAttribute('value', `${suggestedProducts[i]}`);
        suggestion.appendChild(option.cloneNode(true));
    }

    priceProduct.classList.add('priceProduct');
    priceProduct.setAttribute('placeholder', 'Price');
    priceProduct.setAttribute('type', 'number');
    priceProduct.setAttribute('form', 'formProducts');
    priceProduct.setAttribute('required', '');

    confirmBtn.setAttribute('title', 'Confirm product data');
    confirmBtn.setAttribute('form', 'formProducts');

    confirmBtn.addEventListener('click', function () {
        inputEmpty('nameProduct', 'priceProduct', 2, index);
    }, false);

    lineBtn.classList.add('line');

    confirmBtn.classList.add('confirmBtn');
    confirmBtn.appendChild(lineBtn);
    confirmBtn.appendChild(lineBtn.cloneNode(true));

    col1.appendChild(nameProduct);

    col1.appendChild(suggestion);

    col2.appendChild(priceProduct);
    col3.appendChild(confirmBtn);

    trow.appendChild(col1);
    trow.appendChild(col2);
    trow.appendChild(col3);

    tbody[index].insertBefore(tbody[index].appendChild(trow), fstRow);

    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].classList.add('noHover', 'deleteDisabled');
        deleteBtns[i].setAttribute('disabled', '');
    }
    for (let i = 0; i < addBtns.length; i++) {
        addBtns[i].classList.add('noHover', 'addDisabled');
        addBtns[i].setAttribute('disabled', '');
    }
    nameProduct.focus();
}

function confirmedProduct(product, price, clicked) {
    const tbody = document.querySelectorAll('.box tbody');
    const nameProduct = document.querySelector('td .nameProduct');
    const priceProduct = document.querySelector('td .priceProduct');
    const confirmBtn = document.querySelector('td .confirmBtn');

    const deleteProduct = document.createElement('button');
    const lineBtn = document.createElement('div');

    lineBtn.classList.add('line');

    deleteProduct.classList.add('deleteBtn');
    deleteProduct.setAttribute('title', 'Delete product');
    deleteProduct.appendChild(lineBtn);

    tbody[clicked].children[0].children[0].removeChild(nameProduct);
    tbody[clicked].children[0].children[1].removeChild(priceProduct);
    tbody[clicked].children[0].children[2].removeChild(confirmBtn);

    tbody[clicked].children[0].children[0].textContent = product;
    tbody[clicked].children[0].children[1].textContent = price;
    tbody[clicked].children[0].children[2].appendChild(deleteProduct);

    arrPrices[clicked].unshift(Number(price));
    suggestedProducts.unshift(product[0].toUpperCase() + product.slice(1, product.length).toLowerCase());
    productsPerStore[clicked].unshift(product[0].toUpperCase() + product.slice(1, product.length).toLowerCase());
    calcResult();

    deleteProduct.addEventListener('click', function (e) {
        const tbody = document.querySelectorAll('.box tbody');
        for (let i = 0; i < tbody.length; i++) {
            let rowsInBody = tbody[i].childElementCount;
            for (let j = 0; j < rowsInBody; j++) {
                if (e.target.tagName.toLowerCase() === 'button') {
                    if (e.target === tbody[i].children[j].children[2].children[0]) {
                        arrPrices[i].splice(j, 1);
                        productsPerStore[i].splice(j, 1);
                    }
                }
                else {
                    if (e.target.parentNode === tbody[i].children[j].children[2].children[0]) {
                        arrPrices[i].splice(j, 1);
                        productsPerStore[i].splice(j, 1);
                    }
                }
            }
        }
        calcResult();
        (e.target.tagName.toLowerCase() === 'button') ? e.target.parentElement.parentElement.remove() : e.target.parentElement.parentElement.parentElement.remove();
    }, false);
}

function calcResult() {
    const bestPrice = document.querySelector('.bestPrice span');
    const poorPrice = document.querySelector('.poorPrice span');
    const tfootTotal = document.querySelectorAll('.box tfoot');
    const tableResults = document.querySelector('.results table tbody');
    const tfootResult = document.querySelector('.results table tfoot tr');

    const trow = document.createElement('tr');
    const col1 = document.createElement('td');
    const col2 = document.createElement('td');
    const col3 = document.createElement('td');

    let occurrencesOfProducts = [];

    for (let i = 0; i < arrPrices.length; i++) {
        total[i] = Number(0);
        for (let j = 0; j < arrPrices[i].length; j++) {
            total[i] += arrPrices[i][j];
        }
        tfootTotal[i].children[0].children[1].textContent = total[i];
    }

    suggestedProducts = uniq(productsPerStore.flat());
    let stores = [];
    for (let i = 0; i < suggestedProducts.length; i++) {
        occurrencesOfProducts.push([]);
        stores.push([]);
        let productToFind = suggestedProducts[i];
        for (let j = 0; j < productsPerStore.length; j++) {
            for (let k = 0; k < productsPerStore[j].length; k++) {
                if (productsPerStore[j][k] === productToFind) {
                    occurrencesOfProducts[i].push(arrPrices[j][k]);
                    stores[i].push(arrNames[j]);
                }
            }
        }
    }
    let indexMinPrice = [];
    for (let i = 0; i < occurrencesOfProducts.length; i++) {
        indexMinPrice.push(occurrencesOfProducts[i].indexOf(Math.min(...occurrencesOfProducts[i])));
    }

    while (tableResults.firstChild) {
        tableResults.firstChild.remove();
    }

    let finalTotal = 0;
    for (let i = 0; i < suggestedProducts.length; i++) {
        col1.textContent = suggestedProducts[i];
        col2.textContent = stores[i][indexMinPrice[i]];
        col3.textContent = occurrencesOfProducts[i][indexMinPrice[i]];
        finalTotal = finalTotal + occurrencesOfProducts[i][indexMinPrice[i]];
        trow.appendChild(col1);
        trow.appendChild(col2);
        trow.appendChild(col3);
        tableResults.appendChild(trow.cloneNode(true));
    }
    tfootResult.children[1].textContent = finalTotal;

    let maxPrice = total.indexOf(Math.max(...total));
    let minPrice = total.indexOf(Math.min(...total));
    bestPrice.textContent = ' ';
    poorPrice.textContent = ' ';
    bestPrice.textContent += arrNames[minPrice];
    poorPrice.textContent += arrNames[maxPrice];
    if (total.length < 1) {
        bestPrice.textContent = ' ';
        poorPrice.textContent = ' ';
    }
    if (arrowLine[0].classList.contains('up')) {
        divResults.style.maxHeight = `${divResults.scrollHeight}px`;
    }
}

addStore.addEventListener('click', createNewStore, false);

dropDown.addEventListener('click', function () {
    arrowLine[0].classList.toggle('up');
    arrowLine[1].classList.toggle('up');
    if (divResults.style.maxHeight) {
        divResults.style.maxHeight = null;
    }
    else {
        divResults.style.maxHeight = `${divResults.scrollHeight}px`;
    }
}, false);
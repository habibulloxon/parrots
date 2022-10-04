let parrotsClone = parrots.slice()
const template = document.querySelector('.template')
// FUNCTIONS

const renderParrot = (parrot) => {
    const {
        id,
        img,
        title,
        price,
        birthDate,
        sizes,
        features
    } = parrot
    const templateClone = template.content.cloneNode(true)

    const parrotImg = templateClone.querySelector('.parrots__img');
    parrotImg.src = img

    const parrotTitle = templateClone.querySelector('.parrots__title');
    parrotTitle.textContent = `${title}`

    const parrotPrice = templateClone.querySelector('.parrots__mark');
    parrotPrice.textContent = `${price}$`

    const parrotSize = templateClone.querySelector('.parrots__subtitle');
    // parrotSize.textContent = `${sizes.width + "sm"} x ${sizes.height + "sm"}`

    const parrotBirthDate = templateClone.querySelector('.parrots__date');
    parrotBirthDate.textContent = birthDate

    const parrotFeatures = templateClone.querySelector('.parrots__list-item');
    parrotFeatures.textContent = features

    const parrotStar = templateClone.querySelector('.parrots__star-btn')
    parrotStar.setAttribute('data-parrot-id', id);

    const parrotEdit = templateClone.querySelector('.parrots__edit-btn');
    parrotEdit.setAttribute('data-parrot-id', id);

    const parrotDel = templateClone.querySelector('.parrots__del-btn');
    parrotDel.setAttribute('data-parrot-id', id);

    return templateClone
}

const count = document.querySelector('.count')
const displayParrot = document.querySelector('.parrots-wrapper')

const renderParrots = () => {
    displayParrot.innerHTML = "";
    count.textContent = `Count: ${parrotsClone.length}`

    const parrotFragment = document.createDocumentFragment()

    parrotsClone.forEach((parrot) => {
        const templateClone = renderParrot(parrot)
        parrotFragment.append(templateClone);
    })
    displayParrot.append(parrotFragment)
}
renderParrots() 

const addModal = document.getElementById('add-parrot-modal')
const addModalBoot = new bootstrap.Modal(addModal)

const addParrotForm = document.getElementById('add-form')

addParrotForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const element = e.target.elements

    const nameInput = element.title.value
    const imgInput = element.img.value
    const priceInput = +element.price.value
    const dateInput = element.date.value
    const widthInput = +element.width.value
    const heightInput = +element.height.value
    const featuresInput = element.features.value

    if (nameInput.trim() && priceInput && widthInput && heightInput && featuresInput && dateInput){
        let newParrot = {
            id: Math.floor(Math.random() * 1000),
            title: nameInput,
            img: String(imgInput),
            price: priceInput,
            birthDate: dateInput,
            sizes: {
                width: widthInput,
                height: heightInput
            },
            features: featuresInput
        }
        parrots.push(newParrot)
        parrotsClone.push(newParrot);
        localStorage.setItem("parrots", JSON.stringify(parrots))
    }
    renderParrots()
    addModalBoot.hide()
})
// localStorage.clear()
const editForm = document.getElementById('edit-form')
const editTitle = document.getElementById("edit-parrot-title")
const editImg = document.getElementById("edit-parrot-img")
const editPrice = document.getElementById("edit-price")
const editDate = document.getElementById("edit-parrot-date")
const editWidth = document.getElementById("edit-parrot_width")
const editHeight = document.getElementById("edit-parrot_height")
const editFeatures = document.getElementById("edit-features")




displayParrot.addEventListener('click', (e) => {
    if(e.target.matches(".parrots__del-btn")){
        const clickedBtn = +e.target.dataset.parrotId

        const clickedParrot = parrotsClone.findIndex((parrot) => {
            return parrot.id === clickedBtn
        })
        parrots.splice(clickedParrot, 1)
        parrotsClone.splice(clickedParrot, 1)
        localStorage.setItem("parrots", JSON.stringify(parrots));
        renderParrots()
    } else if (e.target.matches(".parrots__edit-btn")){
        const clickedBtn = +e.target.dataset.parrotId

        const clickedParrot = parrotsClone.find((parrot) => {
            return parrot.id === clickedBtn
        })
        editTitle.value = clickedParrot.title
        editImg.value = clickedParrot.img
        editPrice.value = clickedParrot.price
        editDate.value = clickedParrot.birthDate
        editWidth.value = clickedParrot.sizes.width
        editHeight.value = clickedParrot.sizes.height
        editFeatures.value = clickedParrot.features
        editForm.setAttribute('data-editing-id', clickedParrot.id)
    }
})

const editModal = document.getElementById('edit-parrot-modal')
const editModalBoot = new bootstrap.Modal(editModal)

editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const editId = +e.target.dataset.editingId

    const titleInput = editTitle.value
    const imgInput = editImg.value
    const priceInput = editPrice.value
    const dateInput = editDate.value
    const widthInput = editWidth.value
    const heightInput = editHeight.value
    const featuresInput = editFeatures.value

    if (titleInput.trim() && priceInput && widthInput && heightInput && featuresInput && dateInput){
        let newParrot = {
            id: editId,
            title: titleInput,
            img: imgInput,
            price: priceInput,
            birthDate: dateInput,
            sizes:{
                width: widthInput,
                height: heightInput
            },
            features: featuresInput
        }
        const editingItemIndex = parrots.findIndex((parrot) => {
            return parrot.id === editId
        })
      
        const editingShowItemIndex = parrotsClone.findIndex((parrot) => {
            return parrot.id === editId
        })
    
        parrots.splice(editingItemIndex, 1, newParrot)
        parrotsClone.splice(editingShowItemIndex, 1, newParrot)
        JSON.parse(localStorage.getItem("parrots")).find((editedParrot) => {
            return newParrot = editedParrot
        })
        localStorage.setItem("parrots", JSON.stringify(parrots))
        editModalBoot.hide()
    }
    renderParrots()
})


const filterForm = document.querySelector('.filter')

filterForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const element = e.target.elements

    const searchInput = element.search.value

    const priceFromInput = element.from.value
    const priceToInput = element.to.value

    const widthFromInput = element.from_width.value
    const widthToInput = element.to_width.value

    const heightFromInput = element.from_height.value
    const heightToInput = element.to_height.value

    const parrotSelect = element.sortby.value

    parrotsClone = parrots.sort((a, b) => {
        switch (parrotSelect) {
            case '1':
                if (a.title > b.title) {
                    return 1
                  } else if(b.title > a.title){
                    return -1
                  } else{
                    return 0
                  }
            case '2':
                return b.price - a.price
            case '3':
                return a.price - b.price
            case '4':
                return a.birthDate - b.birthDate
            case '5':
                return b.birthDate - a.birthDate
            default:
                break;
        }
    })
    // .filter(function(parrot) {
    //     return parrot.price >= priceFromInput;
    // }).filter(function(parrot) {
    //     return !priceToInput ? true : parrot.price <= priceToInput;
    // }).filter(function(parrot) {
    //     return parrot.sizes.width >= widthFromInput;
    // }).filter(function(parrot) {
    //     return !widthToInput ? true : parrot.sizes.width <= widthToInput;
    // }).filter(function(parrot) {
    //     return parrot.sizes.height >= heightFromInput;
    // }).filter(function(parrot) {
    //     return !heightToInput ? true : parrot.sizes.height <= heightToInput;
    // })
    .filter((parrot) => {
        const regularExp = new RegExp(searchInput, "gi")
        const title = `${parrot.title}`;
        return title.match(regularExp)
    })
    renderParrots()
})

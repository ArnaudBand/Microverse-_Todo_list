const items = [];

const textDecoration = (listInput) => {
  listInput.forEach((item) => {
    if (item.hasAttribute('checked')) {
      item.nextSibling.style.textDecoration = 'line-through';
    } else {
      item.nextSibling.style.textDecoration = 'none';
    }
  });
};

const userInteraction = (listInput) => {
  console.log('listUp', listInput)
  listInput.forEach((item) => {
    console.log('item', item)
    item.addEventListener('change', () => {
      const itemsLocal = JSON.parse(localStorage.getItem('itemsLocal'));
      const parent = item.parentNode;
      console.log('remove', parent)
      const superParent = parent.parentNode;
      const index = Array.prototype.indexOf.call(superParent.children, parent);
      const currentItem = itemsLocal[index].completed;
      if (currentItem) {
        item.removeAttribute('checked');
        parent.lastChild.style.display = 'none';
        itemsLocal[index].completed = false;
      } else {
        item.setAttribute('checked', '');
        parent.lastChild.style.display = 'block';
        itemsLocal[index].completed = true;
      }
      textDecoration(listInput);
      localStorage.setItem('itemsLocal', JSON.stringify(itemsLocal));
      items.splice(0, items.length, ...itemsLocal);
    });
  });
};

const removeItem = () => {
  const button = document.querySelectorAll('.fa-trash-alt');
  button.forEach((item) => {
    const parent = item.parentNode;
    const superParent = parent.parentNode;
    const index = Array.prototype.indexOf.call(superParent.children, parent);
    const listInput = parent.firstChild;
    item.addEventListener('click', () => {
      const itemsLocal = JSON.parse(localStorage.getItem('itemsLocal'));
      items.splice(0, items.length, ...itemsLocal);
      if (listInput.hasAttribute('checked')) {
        parent.remove();
        items.splice(index, 1);
      }
      for (let i = 0; i < items.length; i += 1) {
        items[i].index = i + 1;
      }
      localStorage.setItem('itemsLocal', JSON.stringify(items));
    });
  });
};

const clearList = () => {
  const itemsLocal = JSON.parse(localStorage.getItem('itemsLocal'));
  items.splice(0, items.length, ...itemsLocal);
  const list = document.querySelector('.ul-list');
  const getClearElement = document.querySelector('.clear');
  getClearElement.addEventListener('click', () => {
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].completed) {
        items.splice(i, 1);
        list.childNodes[i].remove();
      }
    }
    for (let i = 0; i < items.length; i += 1) {
      items[i].index = i + 1;
    }
    localStorage.setItem('itemsLocal', JSON.stringify(items));
  });
};

const updateValues = () => {
  const itemDetails = document.querySelectorAll('.item-details');
  itemDetails.forEach((item) => {
    const parent = item.parentNode;
    const superParent = parent.parentNode;
    const index = Array.prototype.indexOf.call(superParent.children, parent);
    item.addEventListener('change', () => {
      items[index].description = item.value;
      localStorage.setItem('itemsLocal', JSON.stringify(items));
    });
  });
};

const render = () => {
  const listSection = document.querySelector('.list_section');
  const itemsLocal = JSON.parse(localStorage.getItem('itemsLocal'));
  items.splice(0, items.length, ...itemsLocal);
  
  const listInput = document.querySelectorAll('.list-input');
  console.log('listDown', listInput)
  userInteraction(listInput);
  removeItem();
  clearList();
  updateValues();
};

const displayTask = () => {
  const form = document.querySelector('.type-list');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = form.elements[0].value;
    const object = {
      description: data,
      completed: false,
      index: items.length + 1,
    };
    form.reset();
    items.push(object);
    localStorage.setItem('itemsLocal', JSON.stringify(items));
    render();
  });
};

export default function populateStorage() {
  window.addEventListener('load', () => {
    render();
    const listInput = document.querySelectorAll('.list-input');
    const itemsLocal = JSON.parse(localStorage.getItem('itemsLocal'));
    listInput.forEach((item) => {
      const parent = item.parentNode;
      const superParent = parent.parentNode;
      const index = Array.prototype.indexOf.call(superParent.children, parent);
      const currentItem = itemsLocal[index].completed;
      if (currentItem) {
        item.setAttribute('checked', '');
        parent.lastChild.style.display = 'block';
      }
    });
    textDecoration(listInput);
  });
}

displayTask();

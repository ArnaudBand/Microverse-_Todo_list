let lists = [];

export const setList = (list) => {
  lists = list;
  localStorage.setItem('Tasks', JSON.stringify(lists));
};

export const checkEl = (event) => {
  const check = event.target;
  const parentItem = check.parentNode;
  const grandParent = parentItem.parentNode;
  const index = Array.prototype.indexOf.call(grandParent.children, parentItem);
  const status = lists[index].complete;
  const line = parentItem.children.item(1);
  const dot = parentItem.children.item(2);
  const trash = parentItem.children.item(3);
  if (status) {
    check.removeAttribute('checked');
    dot.style.display = 'block';
    trash.style.display = 'none';
    line.classList.remove('lineThrough');
    lists[index].complete = false;
  } else {
    check.setAttribute('checked', '');
    dot.style.display = 'none';
    trash.style.display = 'block';
    line.classList.add('lineThrough');
    lists[index].complete = true;
  }
  // localStorage.setItem('Tasks', JSON.stringify(tasks));
  // lists.splice(0, lists.length, ...tasks);
  setList(lists);
};

const checkInput = (inputList) => {
  inputList.forEach((item) => {
    item.addEventListener('click', checkEl);
  });
};

export const deleteTask = (event) => {
  const btn = event.target;
  const parent = btn.parentNode;
  const grandParent = parent.parentNode;
  const index = Array.prototype.indexOf.call(grandParent.children, parent);
  const inputElement = parent.children.item(0);
  if (inputElement.hasAttribute('checked')) {
    parent.remove();
    lists.splice(index, 1);
  }
  lists.forEach((e, i) => {
    lists[i].index = i + 1;
  });
  setList(lists);
};

const deleteEl = () => {
  const trashBtn = document.querySelectorAll('.fa-trash-o');
  trashBtn.forEach((element) => {
    element.addEventListener('click', deleteTask);
  });
};

export const changeDescription = (event) => {
  const descriptionElement = event.target;
  const parentItem = descriptionElement.parentNode;
  const grandParent = parentItem.parentNode;
  const index = Array.prototype.indexOf.call(grandParent.children, parentItem);
  lists[index].description = descriptionElement.value;
  setList(lists);
};

const updateDescription = () => {
  const labelCheck = document.querySelectorAll('.label_check');
  labelCheck.forEach((item) => {
    item.addEventListener('change', changeDescription);
  });
};

const displayUI = () => {
  const tasks = JSON.parse(localStorage.getItem('Tasks'));
  lists.splice(0, lists.length, ...tasks);
  const listSection = document.querySelector('.list_section');
  let showList = '';
  tasks.forEach((todo) => {
    const checked = todo.complete ? 'checked' : '';
    const dot = todo.complete ? 'style="display:none;"' : '';
    const trash = todo.complete ? 'style="display:block;"' : '';
    const line = todo.complete ? ' lineThrough' : '';

    showList += `
              <div class="flex_check">
                      <input type="checkbox" class="input_checkBox" ${checked}>
                      <input type="text" class="label_check${line}" value="${todo.description}">   
                      <i class="fa fa-ellipsis-vertical" ${dot}></i>                            
                      <i class="fa fa-trash-o" ${trash}></i>                            
              </div>
                  `;
  });
  listSection.innerHTML = showList;
  const inputList = document.querySelectorAll('.input_checkBox');
  checkInput(inputList);
  deleteEl();
  updateDescription();
};

export const deleteCompleteTasks = () => {
  const filterList = lists.filter((item) => !item.complete, ...lists);
  for (let i = 0; i < filterList.length; i += 1) {
    filterList[i].index = i + 1;
  }
  // localStorage.setItem('Tasks', JSON.stringify(filterList));
  setList(filterList);

  displayUI();
};

export const getList = () => lists;

export const emptyList = () => { lists = []; };

export const addNewTask = (event) => {
  event.preventDefault();

  const newTodo = document.querySelector('#new-todo');
  const data = newTodo.value.trim();
  if (event.key === 'Enter' && data) {
    newTodo.value = '';
    const object = {
      description: data,
      complete: false,
      index: lists.length + 1,
    };
    lists.push(object);
    localStorage.setItem('Tasks', JSON.stringify(lists));
    displayUI();
  }
};

const setupNewTaskInput = () => {
  const typeList = document.querySelector('.type-list');
  typeList.addEventListener('keyup', addNewTask);
};

const setupClearAllComplete = () => {
  const clearAllDone = document.querySelector('#clear');
  clearAllDone.addEventListener('click', deleteCompleteTasks);
};

export const setup = () => {
  displayUI();
  setupNewTaskInput();
  setupClearAllComplete();
};
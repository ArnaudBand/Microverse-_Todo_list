let lists = [];

const checkInput = (inputList) => {
  inputList.forEach((item) => {
    item.addEventListener('click', () => {
      const tasks = JSON.parse(localStorage.getItem('Tasks'));
      const parentItem = item.parentNode;
      const grandParent = parentItem.parentNode;
      const index = Array.prototype.indexOf.call(grandParent.children, parentItem);
      const status = tasks[index].complete;
      const line = parentItem.children.item(1);
      const dot = parentItem.children.item(2);
      const trash = parentItem.children.item(3);
      if (status) {
        item.removeAttribute('checked');
        dot.style.display = 'block';
        trash.style.display = 'none';
        line.classList.remove('lineThrough');
        tasks[index].complete = false;
      } else {
        item.setAttribute('checked', '');
        dot.style.display = 'none';
        trash.style.display = 'block';
        line.classList.add('lineThrough');
        tasks[index].complete = true;
      }
      localStorage.setItem('Tasks', JSON.stringify(tasks));
      lists.splice(0, lists.length, ...tasks);
    });
  });
};

export const setList = (list) => {
  lists = list;
  localStorage.setItem('Tasks', JSON.stringify(lists));
};

export const deleteTask = (element) => {
  console.log('element', element);
  const grandParent = element.parentElement;
  console.log('grandParent', grandParent);
  const index = Array.prototype.indexOf.call(grandParent.children, element);
  const inputList = element.children.item(0);
  if (inputList.hasAttribute('checked')) {
    element.remove();
    lists.splice(index, 1);
  }
  setList(lists);
};

const deleteEl = () => {
  const trashBtn = document.querySelectorAll('.fa-trash-o');
  trashBtn.forEach((element) => {
    element.addEventListener('click', (event) => {
      const parent = event.target.parentNode;
      deleteTask(parent);
    });
  });
};

const clearAllComplete = () => {
  const tasks = JSON.parse(localStorage.getItem('Tasks'));
  lists.splice(0, lists.length, ...tasks);
  const clearAllDone = document.querySelector('#clear');
  clearAllDone.addEventListener('click', () => {
    const filterList = lists.filter((item) => !item.complete, ...lists);
    for (let i = 0; i < filterList.length; i += 1) {
      filterList[i].index = i + 1;
    }
    localStorage.setItem('Tasks', JSON.stringify(filterList));
    document.location.reload();
  });
};

const updateDescription = () => {
  const labelCheck = document.querySelectorAll('.label_check');
  labelCheck.forEach((item) => {
    const parentItem = item.parentNode;
    const grandParent = parentItem.parentNode;
    const index = Array.prototype.indexOf.call(grandParent.children, parentItem);
    item.addEventListener('change', () => {
      lists[index].description = item.value;
      localStorage.setItem('Tasks', JSON.stringify(lists));
    });
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
  clearAllComplete();
  updateDescription();
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

export const setup = () => {
  displayUI();
  setupNewTaskInput();
};
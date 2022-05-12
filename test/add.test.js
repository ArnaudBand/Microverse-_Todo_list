import { getList, emptyList, addNewTask, setList, deleteTask } from '../src/modules/display.js';
/*eslint-disable*/

const html = `
    <div class="container_todo">
            <div class="to_dolist">
                <div class="title">
                    <h2>Today's To Do</h2>
                    <i class="fas fa-sync-alt"></i>
                </div>
                <div class="type-list">
                      <input type="text" class="text" value="New description" id="new-todo" required>
                      <button class="add-button" type="submit"><i class="add-icon fa fa-share" id="add"></i></button>
                </div>
                <div class="list_section"></div>
                <div id="clear-completed">
                    <button type="button" id="clear">Clear all completed</button>
                </div>
              </div>
        </div>
`;

describe('Testing data handling', () => {

  it('shoud add a task to the list', () => {
    emptyList();
    document.body.innerHTML = html;
    const event = {
      key: 'Enter',
      preventDefault: () => {}
    }

    addNewTask(event);

    const list = getList();
    expect(list).toBeDefined();
    expect(list).toHaveLength(1);
    expect(list[0]).toEqual({description: 'New description', complete: false, index: 1})
  })

  it('shoud remove a task from the list', () => {
    setList([ {description: 'New description', complete: false, index: 1} ])
    document.body.innerHTML = html;
    const grandParent = document.querySelectorAll('.flex_check');
    const ele = grandParent.children;
    const event = {
      // type: 'click',
      grandParent,
    }
    // const index = Array.prototype.indexOf.call(ele, event);
    // const inputList = event.children.item(0);
    deleteTask(event);

    const list = getList();
    expect(list).toBeDefined();
    expect(list).toHaveLength(0);
    expect(list).toEqual([])
  })
});



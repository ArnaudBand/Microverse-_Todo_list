/*eslint-disable*/
/**
 * @jest-environment jsdom
 */

const addLocalStorage = require('../src/modules/display.js');

const html = `
    <div class="container_todo">
            <div class="to_dolist">
                <div class="title">
                    <h2>Today's To Do</h2>
                    <i class="fas fa-sync-alt"></i>
                </div>
                <div class="type-list">
                      <input type="text" class="text" placeholder="Add to your list..." id="new-todo" required>
                      <button class="add-button" type="submit"><i class="add-icon fa fa-share" id="add"></i></button>
                </div>
                <div class="list_section"></div>
                <div id="clear-completed">
                    <button type="button" id="clear">Clear all completed</button>
                </div>
              </div>
        </div>
`;

document.body.innerHTML = html;

const lists = [];



typeList.addEventListener = jest.fn();

// describe('Add a list to do', () => {
//     const typeList = document.querySelector('.type-list');
//     const newTodo = document.querySelector('#new-todo');
//     const data = newTodo.value;
//     const add = addLocalStorage({
//     event = {
//         preventDefault: () => {},
//     },
//     data = 'Task1',
//     test( addLocalStorage(), () => {
//       expect(add.description).toBe('Task1');
//       expect(add.index).toBe(1);
//       expect(add.complete).toBe(false);
//     });
// });

describe ('Add to the list', () => {
    const typeList = document.querySelector('.type-list');
    const newTodo = document.querySelector('#new-todo');
    const data = newTodo.value;
    const addTask = addLocalStorage({
        event: {
            preventDefault: () => { }
        },
        data = 'Task1',
        test('Add item', () => {
            expect(add.description).toBe('Task1');
            expect(add.index).toBe(1);
            expect(add.complete).toBe(false);
        });
    });
    
})

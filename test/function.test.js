/* eslint-disable */

/*
* @jest-environment jsdom
*/

import { getList, setList, checkEl, deleteCompleteTasks, changeDescription } from "../src/modules/display.js";


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
                <div class="list_section">
                  <div class="flex_check">
                      <input type="checkbox" class="input_checkBox" checked>
                      <input type="text" class="label_check" value="New description">   
                      <i class="fa fa-ellipsis-vertical" id="dotsBtn"></i>                            
                      <i class="fa fa-trash-o" id="trashBtn"></i>                            
                  </div>
                </div>
                <div id="clear-completed">
                    <button type="button" id="clear">Clear all completed</button>
                </div>
              </div>
        </div>
`;

describe('Testing check update and clear all complete', () => {
    it('should check the item', () => {
        setList([{ description: 'New description', complete: false, index: 1 }]);
        document.body.innerHTML = html;
        const inputList = document.querySelector('.input_checkBox');
        const event = {
            type: 'click',
            target: inputList,
        }

        checkEl(event);

        const list = getList();
        expect(list).toBeDefined();
        expect(list).toHaveLength(1);
        expect(list[0]).toEqual({ description: 'New description', complete: true, index: 1 });
    });

    it('should delete all completes tasks', () => {
        setList([
            { description: 'Tasks 1', complete: true, index: 1 },
            { description: 'Tasks 2', complete: false, index: 2 },
            { description: 'Tasks 3', complete: true, index: 3 }
        ])
        document.body.innerHTML = html;

        deleteCompleteTasks();

    const list = getList();
    expect(list).toBeDefined();
    expect(list).toHaveLength(1);
    expect(list[0]).toEqual({ description: 'Tasks 2', complete: false, index: 1 });
    })

    it("should update the edit change's", () => {
        setList([{ description: 'Old description', complete: false, index: 1 }]);
        document.body.innerHTML = html;
        const labelCheck = document.querySelector('.label_check');
        const event = {
            type: 'change',
            target: labelCheck,
        }

        changeDescription(event);

        let newValue = 'New description';

        const list = getList();
        expect(list).toBeDefined();
        expect(list).toHaveLength(1);
        expect(list[0]).toEqual({ description: newValue, complete: false, index: 1 });
    })
})
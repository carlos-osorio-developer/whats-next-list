import metDelete from '../backend/deletetask'

describe('Testing DOM elements', () => {

  test('delete one element to the DOM', () => {
    document.body.innerHTML = `    
    <input id="name-field" placeholder="Add to your list..." value="Something" />
    <i class="far fa-calendar-plus" />
    <ul>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox" /><p>Task 1</p></nav><i class="fas fa-ellipsis-v" /><i class="fas fa-trash-alt invisible" /></li>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox" /><p>Task 2</p></nav><i class="fas fa-ellipsis-v" /><i class="fas fa-trash-alt invisible" /></li>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox" /><p>Task 3</p></nav><i class="fas fa-ellipsis-v" /><i class="fas fa-trash-alt invisible" /></li>
    </ul>
    <div class="button"><p>Clear all completed</p></div></body>`;        

    const deleteIcons = document.getElementsByClassName('fa-trash-alt');
    for (let i =0; i < deleteIcons.length; i+= 1) {
        deleteIcons[i].addEventListener('click', (i) => { metDelete.deleteItem(i); });
    }
    deleteIcons[1].click();

    expect(localStorage).toBe('Delete');
  });
})
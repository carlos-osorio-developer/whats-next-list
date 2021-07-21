import metDelete from '../backend/deletetask'

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
};

global.localStorage = new LocalStorageMock;
localStorage.setItem('status', 'false,false,false');
localStorage.setItem('index', '0,1,2');
localStorage.setItem('description', 'Task 1,Task 2,Task 3');


describe('Testing DOM elements', () => {

  test('delete one element to the DOM', () => {
    document.body.innerHTML = `    
    <input id="name-field" placeholder="Add to your list..." value="Something" />
    <i class="far fa-calendar-plus" />
    <ul>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox"><p>Task 1</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox"><p>Task 2</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox"><p>Task 3</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    </ul>
    <div class="button"><p>Clear all completed</p></div></body>`;        

    const deleteIcons = document.getElementsByClassName('fa-trash-alt');     
    for (let i =0; i < deleteIcons.length; i += 1) {
        deleteIcons[i].addEventListener('click', () => metDelete.deleteItem(i) );
    }

    const firstIcon = deleteIcons[0];
    firstIcon.click();
    
    const firstDescription = firstIcon.parentElement.firstElementChild.lastElementChild;
    
    expect(document.getElementsByTagName('p')).not.toContain(firstDescription);
  });
})
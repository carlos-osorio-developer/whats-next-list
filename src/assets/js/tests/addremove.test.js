import metTasks from '../backend/addtask'
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

describe('Testing the add function', () => {

  test('adds one element to the DOM', () => {
    document.body.innerHTML = `    
    <input id="name-field" value="Something">
    <i class="far fa-calendar-plus"></i>
    <ul></ul>
    <div class="button"><p>Clear all completed</p></div>`;        

    const addIcon = document.getElementsByClassName('fa-calendar-plus')[0];
    addIcon.addEventListener('click', () => { metTasks.create(); });
    
    addIcon.click();

    expect(document.getElementsByTagName('p')[0].textContent).toBe('Something');
  });

  test('show error msg if there is no value in input field', () => {
    document.body.innerHTML = `    
    <input id="name-field">
    <i class="far fa-calendar-plus"></i>
    <ul></ul>
    <div class="button"><p>Clear all completed</p></div>`;        

    const addIcon = document.getElementsByClassName('fa-calendar-plus')[0];
    addIcon.addEventListener('click', () => { metTasks.create(); });
    
    addIcon.click();

    expect(document.getElementsByTagName('input')[0].placeholder).toBe('Please enter task description here');
  });


})


describe('Testing the delete function', () => {

  test('delete all checked elements', () => {

    global.localStorage = new LocalStorageMock;
    localStorage.setItem('status', 'true,false,true');
    localStorage.setItem('index', '0,1,2');
    localStorage.setItem('description', 'Task 1,Task 2,Task 3');

    document.body.innerHTML = `    
    <input id="name-field" placeholder="Add to your list..." value="Something" />
    <i class="far fa-calendar-plus" />
    <ul>
    <li draggable="true"><nav><input class="status" checked name="completed" type="checkbox"><p>Task 1</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox"><p>Task 2</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    <li draggable="true"><nav><input class="status" checked name="completed" type="checkbox"><p>Task 3</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    </ul>
    <div class="button"><p>Clear all completed</p></div></body>`;        

    const deletebutton = document.getElementsByClassName('button')[0];     
        deletebutton.addEventListener('click', () => metDelete.deleteChecked );
        deletebutton.click();
  
    expect(localStorage).toBe(1);
  });

  test('delete one element to the DOM', () => {

    global.localStorage = new LocalStorageMock;
    localStorage.setItem('status', 'false,false,false');
    localStorage.setItem('index', '0,1,2');
    localStorage.setItem('description', 'Task 1,Task 2,Task 3');

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
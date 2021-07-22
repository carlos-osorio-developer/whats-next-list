import metDrag from "../backend/dragndrop";
import metName from "../backend/taskname";
import metStatus from "../backend/status";

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
}

describe('Testing the drag and drop function', () => {
  test('change the order of elements in localStorage', () => {
    global.localStorage = new LocalStorageMock();
    localStorage.setItem('description', 'Task 1,Task 2,Task 3');
    localStorage.setItem('status', 'true,false,true');
    localStorage.setItem('index', '0,1,2');
    
    document.body.innerHTML = `    
    <input id="name-field" placeholder="Add to your list..." value="Something" />
    <i class="far fa-calendar-plus" />
    <ul>
    <li draggable="true" class="onbottom"><nav><input class="status" checked name="completed" type="checkbox"><p>Task 1</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox"><p>Task 2</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    <li draggable="true" class="ontop"><nav><input class="status" checked name="completed" type="checkbox"><p>Task 3</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    </ul>
    <div class="button"><p>Clear all completed</p></div></body>`;

    const items = document.getElementsByTagName('li');
    
    metDrag.dropOut(0);

    expect(localStorage.getItem('description')).toBe('Task 3,Task 1,Task 2');
  });  
});

describe('Testing the update name function', () => {
  test('change the visibility of p tag and input field', () => {
    global.localStorage = new LocalStorageMock();
    localStorage.setItem('description', 'Task 1,Task 2,Task 3');
    localStorage.setItem('status', 'false,false,false');
    localStorage.setItem('index', '0,1,2');    

    document.body.innerHTML = `    
    <input id="name-field" placeholder="Add to your list..." value="Something" />
    <i class="far fa-calendar-plus" />
    <ul>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox"><p>Task 1</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox"><p>Task 2</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox"><p>Task 3</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    </ul>
    <div class="button"><p>Clear all completed</p></div></body>`;

    const items = document.getElementsByTagName('li');

    for (let i = 0; i < items.length; i += 1) {
      items[i].firstElementChild.lastElementChild.addEventListener('click', () => { metName.editName(i); });
    }
    
    const firstPTag = items[0].firstElementChild.lastElementChild;
    firstPTag.click();

    expect([firstPTag.style.display, items[0].firstElementChild.lastElementChild.tagName]).toStrictEqual(['none', 'INPUT']);
  });  

  test('update the name in the localStorage and DOM', () => {
    global.localStorage = new LocalStorageMock();
    localStorage.setItem('description', 'Task 1,Task 2,Task 3');
    localStorage.setItem('status', 'false,false,false');
    localStorage.setItem('index', '0,1,2');    

    document.body.innerHTML = `    
    <input id="name-field" placeholder="Add to your list..." value="Something" />
    <i class="far fa-calendar-plus" />
    <ul>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox"><p>Task 1</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox"><p>Task 2</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox"><p>Task 3</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    </ul>
    <div class="button"><p>Clear all completed</p></div></body>`;

    const items = document.getElementsByTagName('li');

    for (let i = 0; i < items.length; i += 1) {
      items[i].firstElementChild.lastElementChild.addEventListener('click', () => { metName.editName(i); });
    }
    
    const firstPTag = items[0].firstElementChild.lastElementChild;
    firstPTag.click();
    const inputField = items[0].firstElementChild.lastElementChild;
    inputField.value = 'New Task';
    const dots = items[0].getElementsByClassName('fa-ellipsis-v')[0];
    const thrash = items[0].lastChild;
    
    metName.updateName(firstPTag, inputField, 0, dots, thrash);

    expect(localStorage.getItem('description')).toBe('New Task,Task 2,Task 3');
  });  
});

describe('Testing the update status function', () => {
  test('update the boolean value in localStorage', () => {
    global.localStorage = new LocalStorageMock();
    localStorage.setItem('description', 'Task 1,Task 2,Task 3');
    localStorage.setItem('status', 'false,false,false');
    localStorage.setItem('index', '0,1,2');    

    document.body.innerHTML = `    
    <input id="name-field" placeholder="Add to your list..." value="Something" />
    <i class="far fa-calendar-plus" />
    <ul>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox"><p>Task 1</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox"><p>Task 2</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    <li draggable="true"><nav><input class="status" name="completed" type="checkbox"><p>Task 3</p></nav><i class="fas fa-ellipsis-v"></i><i class="fas fa-trash-alt invisible"></i></li>
    </ul>
    <div class="button"><p>Clear all completed</p></div></body>`;

    const items = document.getElementsByTagName('li');       
    const firstCheckBox = items[0].firstElementChild.firstElementChild;

    firstCheckBox.checked = true;
    console.log('this is it ',firstCheckBox.checked)
    metStatus.updateStatus(firstCheckBox, 0);  

    expect(localStorage.getItem('status')).toStrictEqual('true,false,false');
  });  
});
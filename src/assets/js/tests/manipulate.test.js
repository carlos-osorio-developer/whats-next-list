import metDrag from "../backend/dragndrop";

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

describe('Testing the add function', () => {
  test('adds one element to the DOM', () => {
    global.localStorage = new LocalStorageMock();
    localStorage.setItem('status', 'true,false,true');
    localStorage.setItem('index', '0,1,2');
    localStorage.setItem('description', 'Task 1,Task 2,Task 3');

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
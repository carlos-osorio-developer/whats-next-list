import metTasks from '../backend/addtask'

describe('Testing DOM elements', () => {

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


})
import '../css/style.scss';

import metListen from './frontend/initializer';
import metTasks from './backend/tasks';

document.getElementsByClassName('fa-calendar-plus')[0].addEventListener('click', () => {metTasks.create()})
metListen.createDOM();
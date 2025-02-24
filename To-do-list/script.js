document.addEventListener('DOMContentLoaded', function(){
    let input = document.getElementById('todo-input');
    let addTaskBtn = document.getElementById('add-task-btn');
    let toDoList = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem('keys')) || [];
    
    tasks.forEach(element => {
        createTaskElement(element.id, element.text)
    });

    addTaskBtn.addEventListener('click', function(){
        let task = input.value.trim()
        if (task == '') {
            alert('Please enter a task...')
        }
        else{
            let newTask = {
                id: Date.now(),
                text: task
            }

            //adding task in ul
            createTaskElement(newTask.id, newTask.text)
            
            //introducing local storage for storing our inputs
            tasks.push(newTask)
            localStorage.setItem('keys', JSON.stringify(tasks))
            
            
            
            input.value = '';
        }
    })



    //removing the element after clicking delete
    toDoList.addEventListener('click', function(e){
        let parent = e.target.parentElement;
        if(e.target.matches('.delBtn')){
            parent.remove()

            //removing that li from local storage
            let arr = []
            arr = tasks.filter((element) => {
                return element.id != parent.getAttribute('id')
            })

            tasks = [...arr]

            //updating local storage 
            localStorage.setItem('keys', JSON.stringify(arr));
        }
    })

    input.addEventListener('keypress', function(e){
        if(e.key == 'Enter'){
            addTaskBtn.click();
        }
    })

    function createTaskElement(id, text){
        let newLi = document.createElement('li')
        newLi.innerHTML = `${text} <button class="delBtn">Delete</button>`
        newLi.setAttribute('id', `${id}`)
        toDoList.appendChild(newLi)
    }
    
})
// Wait for the DOM to fully load before running any JS logic
document.addEventListener('DOMContentLoaded', () => {

  // Step 1: Get references to input, button, and list elements from the DOM
  const todoInput = document.getElementById('todo-input')          // Input field for new task
  const addTaskButton = document.getElementById('add-task-btn')    // "Add Task" button
  const todoList = document.getElementById('todo-list')            // UL element where tasks will be listed

  // Step 2: Load saved tasks from localStorage (if any), or start with empty array
  let tasks = JSON.parse(localStorage.getItem('tasks')) || []

  // Step 3: Render each saved task on the page
  tasks.forEach(task => renderTask(task))  // Call renderTask for each task in the array

  // Step 4: Set up event listener for when the user clicks the "Add Task" button
  addTaskButton.addEventListener('click', () => {
    const taskText = todoInput.value.trim()    // Get input value and remove extra spaces
    if (taskText === '') return                // If input is empty, do nothing

    // Create a new task object
    const newTask = {
      id: Date.now(),        // Unique ID based on current time
      text: taskText,        // Task description
      completed: false       // Task is initially not completed
    }

    tasks.push(newTask)      // Add new task to the tasks array
    saveTasks()              // Save updated task list to localStorage
    renderTask(newTask)      // Show the new task in the UI
    todoInput.value = ''     // Clear the input field after adding
    console.log(tasks)       // Optional: Log current tasks array for debugging
  })

  // Function to render a single task in the list
  function renderTask(task) {
    const li = document.createElement('li')         // Create a new <li> element
    li.setAttribute('data-id', task.id)             // Store task id as data attribute

    // If task is marked as completed, apply the 'completed' CSS class
    if (task.completed) li.classList.add("completed")

    // Add task text and a delete button inside the <li>
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn">delete</button> 
    `

    // Event: Toggle 'completed' status when clicking anywhere except the delete button
    li.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') return      // Skip if the delete button was clicked
      task.completed = !task.completed               // Toggle completed status
      li.classList.toggle('completed')               // Toggle the class visually
      saveTasks()                                    // Save updated state
    })

    // Event: Handle delete button click
    li.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation()                            // Prevent triggering the parent li click event
      tasks = tasks.filter(t => t.id !== task.id)    // Remove task from the array
      li.remove()                                    // Remove the <li> from the DOM
      saveTasks()                                    // Save updated list to localStorage
    })

    todoList.appendChild(li)  // Finally, add the <li> to the todo list in the DOM
  }

  // Function to save the tasks array to localStorage as a string
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
})







// todo-input
// add-task-btn
// todo-list



// // we add this code to the bottom of the body tag
// // so that the DOM is fully loaded before we run the JS code  
// document.addEventListener('DOMContentLoaded', () => {

//   // first we need to grap the elements
//   const todoInput = document.getElementById('todo-input')
//   const addTaskButton = document.getElementById('add-task-btn')
//   const todoList = document.getElementById('todo-list')


//   // now we are to make a array to hold the tasks   -- let tasks = []
//   // we will use this array to store the tasks
//   // and we will use localStorage to save the tasks
//   // so that the tasks will persist even after the page is reloaded
//   // we will use JSON to convert the array to a string
//   // and we will use JSON.parse to convert the string back to an array  
//   // when we load the page
//   // we will also use JSON.stringify to convert the array to a string 
//   // when we save the tasks to localStorage
//   // we will also use JSON.parse to convert the string back to an array 



//   // we use this json.parse to get the tasks from localStorage
//   // if there are no tasks in localStorage, we will use an empty array
//   // json.parse is used to convert the string back to an array
//   // we will use localStorage.getItem to get the tasks from localStorage
//   // if there are no tasks in localStorage, we will use an empty array
//   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//   tasks.forEach(task => renderTask(task))  // render each task in the tasks array 



//   addTaskButton.addEventListener('click', () => {

//     // get the value of the input field and trim it to remove extra spaces
//     // we will use the trim() method to remove extra spaces
//     const taskText = todoInput.value.trim()

//     // if the taskText is empty, we will not do anything
//     // this is to prevent adding empty tasks
//     if (taskText === '') return


//     // create a new task object
//     const newTask = {
//       id: Date.now(),        // unique id based on current time
//       text: taskText,        // task description
//       completed: false       // task is initially not completed
//     }

//     tasks.push(newTask)      // add new task to the tasks array
//     saveTasks()              // save updated task list to localStorage
//     todoInput.value = ''     // clear the input field after adding
//     console.log(tasks)       // log current tasks array for debugging


//   })



//   // Function to render a single task in the list
//   // the job of this function is to create a new <li> element
//   // and add the task text and a delete button inside the <li>
//   // it will also add an event listener to the <li> element
//   // so that when the user clicks on the <li> element, it will toggle the completed
//   // status of the task

//   function renderTask(task) {
//     const li = document.createElement('li')         // we added this line to create a new <li> element
//     li.setAttribute('data-id', task.id)             // store task id as data attribute

//     // if task is marked as completed, apply the 'completed' CSS class
//     if (task.completed) li.classList.add("completed")
//     // add task text and a delete button inside the <li>
//     // we use the innerHTML property to add the task text and a delete button inside the <li>
//     // we use the template literal to add the task text and a delete button inside the <li>
//     // we use the span element to display the task text   
//     li.innerHTML = `                                 
//     <span>${task.text}</span>
//     <button class="delete-btn">delete</button> 
//   `
//     li.addEventListener('click', (e) => {
//       if (e.target.tagName === 'BUTTON') return      // skip if the delete button was clicked
//       task.completed = !task.completed               // toggle completed status 
//       todoList.appendChild(li)  // add the <li> to the todo list in the DOM
//       saveTasks()

//     })

//     // Event: Handle delete button click
//     // we added this event listener to the delete button    
//     li.querySelector('.delete-btn').addEventListener('click', (e) => {
//       e.stopPropagation()                            // prevent triggering the parent li click event
//       tasks = tasks.filter(t => t.id !== task.id)    // remove task from the array
//       li.remove()                                    // remove the <li> from the DOM
//       saveTasks()                                    // save updated list to localStorage
//     })





//     // now let see how we can move array to localStorage


//     // we will create a function to save the tasks to localStorage
//     // this function will convert the tasks array to a string using JSON.stringify
//     // and then save it to localStorage with the key 'tasks'  
//     // we will also call this function whenever we add a new task or delete a task
//     // so that the tasks are always saved to localStorage 
//     // stringify converts the array to a string
//     // parse converts the string back to an array

//     function saveTasks() {
//       localStorage.setItem('tasks', JSON.stringify(tasks))


//     }

//   }

// }) // end of DOMContentLoaded event listener





















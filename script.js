let tasks = [];

// Function to add a task
const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
    }

    // Automatically focus on the input field for new task entry
    taskInput.focus();
};

// Function to toggle task completion
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
};

// Function to delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
};

// Function to edit a task
const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updateTasksList();
    }
};

// Function to trigger celebration animation
const celebrate = () => {
    const celebrationDiv = document.getElementById("celebration");
    celebrationDiv.style.display = "block"; // Show the celebration message

    // Confetti animation using Canvas Confetti
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });

    // Hide celebration message after 3 seconds
    setTimeout(() => {
        celebrationDiv.style.display = "none";
    }, 3000);
};

// Function to update the task list
const updateTasksList = () => {
    const taskList = document.querySelector(".task-list");
    const progressBar = document.getElementById("progress");
    const numberDisplay = document.getElementById("number");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskComplete(${index})"/>
                <p class="${task.completed ? "completed-task" : ""}">${task.text}</p>
            </div>
            <div class="icons">
                <img src="edit_square_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" onclick="editTask(${index})" title="Edit Task"/>  
                <img src="delete_forever_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" onclick="deleteTask(${index})" title="Delete Task"/>
            </div>
        </div>
        `;

        taskList.append(listItem);
    });

    // Update progress bar and task count
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    numberDisplay.textContent = `${completedTasks} / ${totalTasks}`;
    
    const progressPercent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Trigger celebration when all tasks are completed
    if (totalTasks > 0 && completedTasks === totalTasks) {
        celebrate();
    }
};

// Event listener for form submission
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    addTask();
});

// Ensure the task list is updated when the page loads
updateTasksList();

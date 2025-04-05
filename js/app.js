document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks =  [];
    let isEditing = false;
    let editingId = null;

    taskForm.addEventListener('click', (e) => {
        const vti = taskInput.value.trim();
        if (vti !='') {
            if (isEditing) {
                //console.log("Se guarda la ediciòn");
                tasks = tasks.map(task => 
                    task.id === editingId ?{
                        ...task, text: vti
                } : task);
                isEditing = false;
                editingId = null;
            taskForm.innerText = "Agregar"
            }
            else {
            const task = {
                id: Date.now(),
                text: vti,
                complete: false
                };
            tasks.push(task);
            console.log(tasks);
            }
            renderTasks();
            taskInput.value = '';
        } 
        //alert("se enviò el formulario " + vti);
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(
            task => {
                console.log(task);
                const li = document.createElement('li');
                li.style.backgroundColor = task.complete ? 'lightgreen' : '';
                li.className = "flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
                li.innerHTML = 
                    '<span> ' + task.text + ' </span>' +
                    '<div class="space-x-2">'+
                    '<button class="text-blue-600 hover:underline" onclick="editTask(' + task.id + ')">'+
                    'Editar </button>'+
                    '<button class="text-red-600 hover:underline" onclick="deleteTask(' + task.id + ')">'+
                    'Eliminar </button>'+
                    '<button class="text-green-600 hover:underline" onclick="completeTask(' + task.id + ')">'+
                    'Completado </button>'+
                    '</div>';
                    

                if (task.complete) {
                    const ocultarBotones = li.querySelectorAll('button');
                    ocultarBotones.forEach(button => button.style.display = 'none');
                }
                taskList.appendChild(li);
            }
        );
    };

    window.deleteTask = function (id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    window.editTask = function (id) {
        const et = tasks.find(t => t.id === id);
        if (et) {
            taskInput.value = et.text;
            taskForm.innerText = "Guardar";
            isEditing = true;
            editingId = et.id;
        }
    }

    window.completeTask = function (id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, complete: true };
            }
            return task;
        });
        
        renderTasks();
    }


});


import React, { useState }  from 'react'
import { isEmpty,size } from 'lodash';
import shortid, { isValid } from 'shortid';

function App() {
  //estados   //variables modificadoras  //valor Actual
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false) //estado para controlar el form de edicion
  const [id, setId] = useState("") //id de latarea a modificar
  const [error, setError] = useState(null)


  //funciones

  const validForm = () => {
    let isValid = true
    setError(null)

    if(isEmpty(task)) {
      setError("Debes Ingresar una Tarea.")
      isValid = false
    }

    return isValid
  }

  const addTask = (e) => {  
    e.preventDefault();

    //validacion
    if(!validForm()){
      return
    }

    //Agregar nueva tarea
    const newTask = {
      id: shortid.generate(),
      name: task
    }

    //usando spread operator agregamos mas tareas al obj
    setTasks ([ ...tasks, newTask ])
    setTask("")
  }

  const saveTask = (e) => {  
    e.preventDefault();
    
    if(!validForm()){
      return
    }    

    //mapeamos y comparamos si el id del item que estamos modificando es igual al q encontramos en el arreglo 
    //le reemplazamos el objeto en la prop name de lo contratioponemos el item igual

    const editedTasks = tasks.map(item => item.id === id ? {id, name: task} : item )
    //le colocamos las tareas actualizadas
    setTasks(editedTasks)

    //limpiamos los valores
    setEditMode(false)
    setTask("")
    setId("")
  }
  
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }

  const editTask = (theTask) => {
    setId(theTask.id)
    setTask(theTask.name)
    setEditMode(true)
  }

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr/>

      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          {
            (size(tasks) == 0) ? (

              <li className="list-group-item">Aun no hay tareas Programadas.</li>

            ) : (
              <ul className="list-group">
                {
                  //en map cuando usamos los parentesis obviamos los el return q viene con los corchetes
                  tasks.map((task) => (
                    <li className="list-group-item" key={task.id}>
                      <span className="lead">{task.name}</span>
                      <button 
                        className="btn btn-danger btn-sm float-right mx-2"
                        onClick = {() => deleteTask(task.id)}
                      >
                        Eliminar
                      </button>

                      <button 
                        className="btn btn-warning btn-sm float-right"
                        onClick = {() => editTask(task)}
                      >
                        Editar
                      </button>
                    </li>
                  ))
                  
                }
              </ul>
            )
          }
        </div>

        <div className="col-4">

          <h4 className="text-center">
            { editMode ? "Modificar Tarea" : "Agregar Tarea"}
          </h4>          
          <form onSubmit={editMode ? saveTask : addTask }>
            {
              // es in iff de una sola linea
              error && <span className="text-danger">{error}</span>
            }
            
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingresa tu tarea..."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
            

            <button 
              className={ editMode ? "btn btn-warning btn-block": "btn btn-dark btn-block" }
              type="submit"
            >
              { editMode ? "Guardar" : "Agregar" }
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}

export default App;

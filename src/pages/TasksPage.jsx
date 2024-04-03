import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useTask } from "../context/TaskContext"
import { Link, useNavigate } from "react-router-dom"
import { TaskCard } from "../components/TaskCard"

export const TasksPage = () => {

  const navigate = useNavigate()

  const OPTIONS_CATEGORY = {
    other: 'otra',
    work: 'trabajo',
    study: 'estudio',
    fun: 'ocio',
    housework: 'tareas del hogar',
    social: 'social',
  };

  const OPTIONS_PRIORITY = {
    high: 'alta',
    medium: 'media',
    low: 'baja',
  };

  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [bandera, setBandera] = useState(false)
  const { user } = useAuth()
  const { getTasks, tasks, deleteTask, updateTask, getTask, finishTask } = useTask()

  const getTasksRequest = async () => {
    const res = await getTasks(category, priority, status)
  }

  const getTaskRequest = async (id) => {
    const res = await getTask(id)
  }

  const deleteTasksRequest = async (id) => {
    const res = await deleteTask(id)
    setBandera((b) => !b)
    return res
  }

  const finishTasksRequest = async (id) => {
    const res = await finishTask(id)
    setBandera((b) => !b)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  }

  useEffect(() => {
    getTasksRequest()
  }, [bandera, category, priority, status])

  return (
    <>
      {(tasks.length > 0 || priority !== '' || category !== '') && (

        <div className="flex justify-between gap-4 p-4" >
          <div className="flex flex-col align-middle text-center">
            <label>Status</label>
            <select
              className='w-auto bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
              value={status}
              onChange={handleStatusChange}
            >
              <option value=''>Todas</option>
              <option value="activas">Activas</option>
              <option value="finalizadas">Finalizadas</option>
            </select>
          </div>
          <div className='flex flex-col md:flex-row gap-2'>
            <div className="flex flex-col align-middle text-center">
              <label>Prioridad</label>
              <select
                className='w-auto bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                value={priority}
                onChange={handlePriorityChange}
              >
                <option value=''>Todas</option>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>
            <div className="flex flex-col align-middle text-center">
              <span>Categoría</span>
              <select
                className='w-auto bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                value={category}
                onChange={handleCategoryChange}
              >
                <option value=''>Todas</option>
                <option value="other">Otra</option>
                <option value="work">Trabajo</option>
                <option value="study">Estudio</option>
                <option value="fun">Ocio</option>
                <option value="housework">Hogar</option>
                <option value="social">Social</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-center text-lg md:text-xl lg:text-2xl my-2">Your tasks:</h2>

      {
        tasks.length > 0 ?
          <div className="p-3 gap-x-4 grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3">
            {tasks.map((task) => {
              return (
                <TaskCard key={task._id} _id={task._id} title={task.title} description={task.description} done={task.done} dueDate={task.dueDate} priority={task.priority} category={task.category} createdAt={task.createdAt} updatedAt={task.updatedAt} finishTask={finishTasksRequest} deleteTask={deleteTasksRequest} getTask={getTaskRequest} />
              )
            })}
          </div>
          :
          status == 'finaizadas' ?
            <p className="text-lg md:text-xl lg:text-2xl p-4 md:text-center">No tienes tareas finalizadas {category && priority ? `de categoria ${OPTIONS_CATEGORY[category]} y prioridad ${OPTIONS_PRIORITY[priority]}` : category ? `de categoria ${OPTIONS_CATEGORY[category]}` : priority ? `de prioridad ${OPTIONS_PRIORITY[priority]}` : ''}</p>
            :
            <p className="text-lg md:text-xl lg:text-2xl p-4 md:text-center">Crea tu primer tarea {category && priority ? `de categoria ${OPTIONS_CATEGORY[category]} y prioridad ${OPTIONS_PRIORITY[priority]}` : category ? `de categoria ${OPTIONS_CATEGORY[category]}` : priority ? `de prioridad ${OPTIONS_PRIORITY[priority]}` : ''} ahora! <Link className="text-sky-400" to='/add-tasks'>Click aquí!</Link></p>
      }


      {
        tasks.length > 0 &&
        <div className="text-center">
          <button onClick={() => navigate('/add-tasks')} className='w-22 text-center text:sm md:w-36 md:text-base border-4 border-green-500 hover:bg-green-500 hover:border-zinc-800 text-black font-bold py-2 px-4 rounded-full transition delay-75'>
            New Task!
          </button>
        </div>
      }
    </>
  )
}

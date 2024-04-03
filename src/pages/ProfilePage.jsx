import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useTask } from "../context/TaskContext"
import { Link, useNavigate } from "react-router-dom"
import moment from 'moment'

export const ProfilePage = () => {
  const { tasks, getTasks } = useTask()
  const { user, logOut, getProfile, profile } = useAuth()
  const [overdue, setOverdue] = useState(null)
  const [completed_tasks, setCompleted_tasks] = useState(null)
  const [tasks_actives_overdue, setTasks_actives_overdue] = useState(null)
  const [other, setOther] = useState(null)
  const [study, setStudy] = useState(null)
  const [work, setWork] = useState(null)
  const [housework, setHousework] = useState(null)
  const [fun, setFun] = useState(null)
  const [social, setSocial] = useState(null)
  const [total_tasks, setTotal_tasks] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Promise.all([getProfileRequest(), getTasks()]); // **Fetch data concurrently**
        setTotal_tasks(res[1].data.length || 0); // **Handle potential null response**
        await setVariables();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const setVariables = async () => {
    let sumaTasksDone = 0;
    let sumaTasksOverdue = 0;
    let sumaTasksActivesOverdue = 0;
    let sumaOther = 0; // Initialize all counters to 0
    let sumaStudy = 0;
    let sumaWork = 0;
    let sumaHousework = 0;
    let sumaFun = 0;
    let sumaSocial = 0;

    if (!tasks.length) { // Check if tasks is empty
      const newTasks = await getTasks();
      newTasks.data.map((task) => {
        if (task.done) sumaTasksDone++;
        if (moment(task.dueDate) < moment(Date.now())) sumaTasksOverdue++;
        if (!task.done && moment(task.dueDate) < moment(Date.now())) sumaTasksActivesOverdue++;
        if (task.category === "other") sumaOther++;
        if (task.category === "study") sumaStudy++;
        if (task.category === "work") sumaWork++;
        if (task.category === "housework") sumaHousework++;
        if (task.category === "fun") sumaFun++;
        if (task.category === "social") sumaSocial++;
      });
    } else {
      tasks.map((task) => {
        if (task.done) sumaTasksDone++;
        if (moment(task.dueDate) < moment(Date.now())) sumaTasksOverdue++;
        if (!task.done && moment(task.dueDate) < moment(Date.now())) sumaTasksActivesOverdue++;
        if (task.category === "other") sumaOther++;
        if (task.category === "study") sumaStudy++;
        if (task.category === "work") sumaWork++;
        if (task.category === "housework") sumaHousework++;
        if (task.category === "fun") sumaFun++;
        if (task.category === "social") sumaSocial++;
      });
    }

    setTasks_actives_overdue(sumaTasksActivesOverdue);
    setCompleted_tasks(sumaTasksDone);
    setOverdue(sumaTasksOverdue);
    setOther(sumaOther);
    setStudy(sumaStudy);
    setWork(sumaWork);
    setHousework(sumaHousework);
    setFun(sumaFun);
    setSocial(sumaSocial);
    setIsLoading(false);
  };

  const getProfileRequest = async () => {
    try {
      await getProfile()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {isLoading ?

        <div role="status" className="flex justify-center p-4">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        :
        <>
          <div className="flex flex-col gap-8 p-6 mb-4">
            <h1 className="text-lg md:text-xl lg:text-2xl">Hola <span className="text-sky-500">{user.username}</span> este es tu resumen!</h1>

            <h3 className="text-sm md:text-base lg:text-xl">Actualmente tenés activas {total_tasks - completed_tasks} tareas, de las cuales {tasks_actives_overdue == 0 ? 'ninguna está fuera de tiempo' : `${tasks_actives_overdue} están fuera de tiempo.`} </h3>
            <p>Se dividen de esta manera:</p>
            <div className="flex flex-col md:flex-row md:justify-around">
              <div>
                <p>Otra: {other}</p>
                <p>Trabajo: {work}</p>
                <p>Estudio: {study}</p>
              </div>
              <div>
                <p>Ocio: {fun}</p>
                <p>Tareas del hogar: {housework}</p>
                <p>Social: {social}</p>
              </div>
            </div>


            <h3 className="text-sm md:text-base lg:text-xl">Completaste un total de {completed_tasks} tareas</h3>
            <p className="">Lo que da un promedio de {((completed_tasks / total_tasks) * 100).toFixed(1)}% completadas sin contar las tareas eliminadas</p>
            {
              total_tasks < 3 ?
                <h3>Cuando tengas pocas tareas, aprovechá a completarlas y que no se acumulen!</h3> :
                total_tasks >= 3 && ((completed_tasks / profile.total_tasks) * 100).toFixed(1) >= 75 ?
                  <h3>Te felicito! Finalizas casi todo lo que te propones!</h3> :
                  total_tasks >= 3 && ((completed_tasks / profile.total_tasks) * 100).toFixed(1) >= 50 ?
                    <h3>Bueno... Bastante bien... aunque puede mejorar</h3> :
                    total_tasks >= 3 && ((completed_tasks / profile.total_tasks) * 100).toFixed(1) >= 25 ?
                      <h3>Bastante flojito, pero bueno, mucho margen para mejorar! </h3> :
                      <h3>Bueno, ponete las pilas, es tu momento para mejorar! <Link className='text-sky-400'>Apreta acá y completá algunta tarea!</Link></h3>
            }
            {total_tasks !== null && (
              <>
                <h3>Creaste un total de {profile.total_tasks} tareas</h3>
              </>)}
            <h3 className="text-sm md:text-base lg:text-xl text-red-300">Eliminaste un total de {profile.total_tasks - total_tasks} tareas</h3>
          </div>

          <div className="text-center flex flex-col md:flex-row gap-2 justify-center">
            <button onClick={() => logOut()} className='animate-pulse w-22 text-center text:sm md:w-36 md:text-base border-4 border-pink-400 hover:bg-pink-400 hover:border-zinc-800 text-white font-bold py-2 px-4 rounded-full transition delay-75'>
              Logout
            </button>
            <button onClick={() => navigate('/tasks')} className='animate-pulse w-22 text-center text:sm md:w-36 md:text-base border-4 border-sky-400 hover:bg-sky-400 hover:border-zinc-800 text-white font-bold py-2 px-4 rounded-full transition delay-75'>
              Tasks
            </button>
            <button onClick={() => navigate('/add-tasks')} className='animate-pulse w-22 text-center text:sm md:w-36 md:text-base border-4 border-lime-400 hover:bg-lime-400 hover:border-zinc-800 text-white font-bold py-2 px-4 rounded-full transition delay-75'>
              New Task!
            </button>
          </div>
        </>
      }
    </>
  )
}

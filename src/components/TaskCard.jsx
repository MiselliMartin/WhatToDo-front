import { useNavigate } from "react-router-dom"
import moment from 'moment';
import Swal from 'sweetalert2'

export const TaskCard = ({ _id, title, description, done, dueDate, priority, category, createdAt, updatedAt, deleteTask, finishTask }) => {



  const remainingTime = moment(dueDate).diff(moment(), 'milliseconds');
  const duration = moment.duration(remainingTime);
  const isOverdue = moment(dueDate) < moment(Date.now())
  const daysOfDifference = Math.abs(moment.duration(moment(updatedAt).diff(moment(dueDate))).asDays().toFixed())
  const antesODespues = moment(updatedAt).isBefore(dueDate) ? 'antes' : 'después'

  const navigate = useNavigate()

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.showLoading()
        try {
          const res = await deleteTask(id)
          Swal.close();
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success"
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: "Task not deleted",
              text: "Something happend.",
              icon: "error"
            });
          }
        } catch (error) {
          Swal.close();
          console.error('Error:', error);
          // Manejar otros posibles errores (por ejemplo, errores de red)
          Swal.fire({
            title: 'Ups... Ha ocurrido un error!',
            text: 'No se ha podido guardar.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: "Cancelled",
          text: "Your task is safe",
          icon: "error"
        });
      }
    });
  }

  const handleFinishButton = (id) => {
    if (!done) {
      Swal.fire({
        text: "You sure you finish? Don't cheat!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, i've finished it!",
        cancelButtonText: "No, sorry!",
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await finishTask(id)
            if (res) return
          } catch (error) {
            console.error('Error:', error);
            Swal.fire({
              title: 'Ups... Ha ocurrido un error!',
              text: 'No se ha podido actualizar la tarea!.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          return
        }
      })
    }
    if (done) {
      Swal.fire({
        text: "I don't understand you. Didn't you finished it?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "No sorry, I haven't! Undone it!",
        cancelButtonText: "Yes I did! Missclic! Cancel this!",
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await finishTask(id)
            if (res) return
          } catch (error) {
            console.error('Error:', error);
            Swal.fire({
              title: 'Ups... Ha ocurrido un error!',
              text: 'No se ha podido actualizar la tarea!.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          return
        }
      })
    }

  }

  const handleEditButton = (id) => {
    Swal.fire({
      text: "Do you want to edit this task?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, let's edit!",
      cancelButtonText: "No, sorry!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate(`/tasks/${id}`)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return
      }
    })
  }
  //MANEJAR LAS TAREAS FINALIZADAS
  return (
    <div style={{ minHeight: '450px' }} className={`${(!done && (duration._data.days < 1 && duration._data.days >= 0)) && 'animate-pulse'} shadow shadow-zinc-800/50 rounded-lg text-white flex flex-col p-4 m-4 justify-between text-bold border border-spacing-1 ${priority === 'high' ? 'border-red-400' : priority === 'medium' ? 'border-orange-400' : 'border-yellow-400'} ${done ? 'bg-zinc-900' : 'bg-zinc-700'}`}>
      <div className='flex justify-around'>
        <p className={`text-sm md:text-base ${category === 'study' ? 'text-sky-400' : category === 'work' ? 'text-pink-400' : category === 'housework' ? 'text-orange-400' : category === 'fun' ? 'text-green-400' : category === 'social' ? 'text-violet-400' : 'text-gray-400'}`}>{category}</p>
        <p className={`text-sm md:text-base lg:text-lg ${priority == 'high' ? 'text-red-400' : priority == 'medium' ? 'text-orange-400' : 'text-yellow-400'}`}>{priority}</p>
      </div>
      <h3 className={`text-xl md:text-1xl text-black font-black text-center underline underline-offset-8 ${category === 'study' ? 'decoration-sky-400' : category === 'work' ? 'decoration-pink-400' : category === 'housework' ? 'decoration-orange-400' : category === 'fun' ? 'decoration-green-400' : category === 'social' ? 'decoration-violet-400' : 'decoration-gray-400'}`}>{title}</h3>
      <p className="font-bold text-lg text-black">{description}</p>

      <div>
        {
          createdAt !== updatedAt ?
            <>
              <div className='flex-col align-middle justify-center text-center md:flex md:justify-around mt-2 '>
                <p>
                  <span>Created at: </span>
                  <span>{moment(createdAt).format('DD/MM/YYYY')}</span>
                </p>
                {done && (
                  <p>
                    Finalizada {daysOfDifference} días{' '}
                    {antesODespues} de la fecha límite.
                  </p>
                )}
              </div>
            </>
            :
            <p className="text-center">
              <span>Created at: </span>
              <span>{moment(createdAt).format('DD/MM/YYYY')}</span>
            </p>
        }
        {!done &&
          <p className="text-center">
            <span className={`${(duration._data.days < 1 && duration._data.days >= 0) ? 'text-orange-400 text-lg font-bold' : isOverdue ? 'text-red-600 text-lg font-bold' : 'text-white'}`}>{(duration._data.days < 1 && duration._data.days >= 0) ? 'Hurry up: ' : isOverdue ? 'Too late: ' : 'Finish before: '}</span>
            <span className={` ${isOverdue ? 'text-red-600 text-lg font-bold' : 'text-white'}`}>{moment(dueDate).format('DD/MM/YYYY')}</span>
          </p>}
      </div>

      <div className='flex flex-col md:flex-row gap-1 justify-around mt-2'>
        <button onClick={() => handleDelete(_id)} className='w-22 text-center text:sm md:w-36 md:text-base border-4 border-red-500 hover:bg-red-500 hover:border-zinc-700 text-black font-bold py-2 px-4 rounded-full transition delay-75'>
          Delete
        </button>
        <button onClick={() => handleFinishButton(_id)} className='w-22 text-center text:sm md:w-36 md:text-base border-4 border-violet-500 hover:bg-violet-500 hover:border-zinc-700 text-black font-bold py-2 px-4 rounded-full transition delay-75'>
          Finish
        </button>
        <button onClick={() => handleEditButton(_id)} className='w-22 text-center text:sm md:w-36 md:text-base border-4 border-sky-500 hover:bg-sky-500 hover:border-zinc-700 text-black font-bold py-2 px-4 rounded-full transition delay-75'>
          Edit
        </button>
      </div>
    </div>
  )
}

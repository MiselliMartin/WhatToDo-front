import { useForm } from 'react-hook-form'
import { Input } from '../components/Input'
import { useTask } from '../context/TaskContext'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'

export const TaskFormPage = () => {
  //USAR SWEETALERTS2 SI SE CREA CON ÉXITO O SI HUBO UN ERROR.
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const { createTask, getTask, updateTask, errors: TaskErrors } = useTask()
  const [notaCreada, setNotaCreada] = useState(null)
  const params = useParams()

  useEffect(() => {
    const getTaskRequest = async (id) => {
      if (params.id) {
        const res = await getTask(id)
        setValue('title', res.data[0].title)
        setValue('description', res.data[0].description)
        setValue('category', res.data[0].category)
        setValue('priority', res.data[0].priority)
        setValue('dueDate', moment(res.data[0].dueDate).utc().format('YYYY-MM-DD'))
        return res
      }
    }
    getTaskRequest(params.id)

  }, [])


  const onSubmit = handleSubmit(async (values) => {
    const selectedDate = values.dueDate;
    const formattedDate = moment(selectedDate).endOf('day')
    values.dueDate = formattedDate

    if (params.id) {
      const res = await updateTask(params.id, values)
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Tarea actualizada con éxito',
          showConfirmButton: false,
          timer: 1500
        })
        setNotaCreada(true)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
    else {
      if (values.description.length < 10) {
        Swal.fire({
          icon: 'info',
          title: 'Ups!',
          text: 'La descripción no puede tener menos de 10 caracteres.',
          confirmButtonText: 'Ok'
        })
      }
      else {
        Swal.showLoading();
        try {
          const res = await createTask(values);
          Swal.close();
          if (res.status === 201) {
            setNotaCreada(true)
            Swal.fire({
              title: 'Tarea creada!',
              text: 'La tarea se ha creado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
          } else {
            Swal.fire({
              title: 'Ups... Error al crear la tarea',
              text: `Ocurrió un error al crear la tarea. Código de error: ${res.status}`,
              icon: 'error',
              confirmButtonText: 'Aceptar',
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
      }
    }
  });


  const today = moment(); // Get the current date using moment
  const numberOfDaysToAdd = 7;
  const futureDate = today.add(numberOfDaysToAdd, 'days'); // Add 7 days to the current date
  const formattedFutureDate = futureDate.format('YYYY-MM-DD');

  return (
    <form onSubmit={onSubmit} className='bg-zinc-800 max-w-md p-10 rounded-lg my-8 m-auto'>
      <h1 className='text-2xl text-zinc-100 mb-3'>Create Task</h1>
      {
        TaskErrors &&
        TaskErrors.map((error, i) => (
          <div key={i} className="text-red-500 text-sm w-full" role="alert">
            <p>{error}</p>
          </div>
        ))
      }
      <Input register={register} type={'text'} name={'title'} isRequired={true} placeholder={'Título'} ></Input>
      {errors.title && (
        <p className='text-red-500 text-xs italic'>Title is required</p>
      )}

      <textarea name="description" {...register('description', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 overflow-hidden resize-none h-auto' placeholder='Descripción'></textarea>
      {errors.description && (
        <p className='text-red-500 text-xs italic'>Description is required</p>
      )}

      <label> Categoría
        <select className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' name='category' {...register('category')}>
          <option className='focus:bg-zinc-800' value="other">Otra</option>
          <option value="work">Trabajo</option>
          <option value="study">Estudio</option>
          <option value="fun">Ocio</option>
          <option value="housework">Tareas del hogar</option>
          <option value="social">Social</option>
        </select>
      </label>

      <label> Prioridad
        <select className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' name='priority' {...register('priority')}>
          <option value="low">Baja</option>
          <option value="medium">Mediana</option>
          <option value="high">Alta</option>
        </select>
      </label>

      <label>Terminar antes de:
        <input type='date' {...register('dueDate', { required: true })} name='dueDate' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' defaultValue={formattedFutureDate} />
        {errors.dueDate && (
          <p className='text-red-500 text-xs italic'>Finish date is required</p>
        )}
      </label>
      <button type="submit" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-xl my-2 text-center hover:bg-zinc-900 ">Save</button>
      {
        notaCreada && (
          <Link to="/tasks" className="block text-end text-blue-500 hover:text-blue-700">Ver mis tareas</Link>
        )
      }
    </form>
  )
}

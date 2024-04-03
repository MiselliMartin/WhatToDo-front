import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <div className='p-10'>
      <h1 className='text-xl md:text-2xl lg:text-4xl my-2'>Sí... Otra app de notas...</h1>
      <p className='text-sm md:text-base my-2'>Falta de originalidad? Puede ser, pero fue un lindo aprendizaje</p>
      <strong className='my-2 text-xl text-sky-500'>Características Principales:</strong>
      <ol>
        <li className='my-2 text-md md:text-lg'>
          <strong className='text-sky-200 text-md md:text-lg'>Operaciones CRUD sin Esfuerzo:</strong> Crea, edita, elimina, marca como finalizadas y visualiza las notas que creaste!
        </li>
        <li className='my-2 text-md md:text-lg'>
          <strong className='text-sky-200  text-md md:text-lg'>Tecnología de Vanguardia:</strong> React, Express, Tailwind (por primera vez)... para el próximo también TypeScript...
        </li>
        <li className='my-2 text-md md:text-lg'>
          <strong className='text-sky-200 text-md md:text-lg'>Axios para Llamadas a la API:</strong> Integré y utilicé <code>Axios</code> para facilitar las llamadas a la API, asegurando una comunicación eficiente entre el frontend y el backend.
        </li>
      </ol>

      <strong className='my-2 text-md md:text-lg text-sky-500'>Desarrollo Full Stack:</strong>
      <strong className='text-sky-200 text-lg my-2 ml-4'>Stack MERN</strong>

      <h2 className='my-4 text-md md:text-lg'>Explorá, aprendé y disfrutá rey</h2>
      <p className='my-2 text-md md:text-lg'>Animate! No hay nada más lindo que aprender haciendo.</p>

      <div className='flex-wrap justify-around flex-col md:flex-row'>
        <p className='mt-8 mb-2 text-lg'>
          <Link to='/login' className='text-sky-400'>Ahora hacé click acá para ingresar!</Link>
        </p>
        <p className='md:mt-8 md:mb-2 text-lg text-start'>
          <Link to='/login' className='text-sky-400'>O acá para registrarte!</Link>
        </p>
      </div>

      <hr className='my-4' />
    </div>
  )
}

import { useForm } from 'react-hook-form'
import { Input } from '../components/Input'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


export const RegisterPage = () => {

  const { signUp, isAuthenticated, errors: registerErrors } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully"
      });
      navigate('/tasks')
    }
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signUp(values)
    console.log(registerErrors)
  })

  return (
    <>

      <form className='bg-zinc-800 max-w-md p-10 rounded-md my-8 m-auto'
        onSubmit={onSubmit}>
        <h1 className='text-2xl text-zinc-100 mb-3'>Register</h1>
        {
          registerErrors.map((error, i) => (
            <div key={i} className="text-red-500 text-sm" role="alert">
              {error}
            </div>
          ))
        }
        <Input register={register} type={'text'} name={'username'} placeholder={'Username'} />
        {errors.username && (
          <p className='text-red-500 text-xs italic'>Username is required</p>
        )}
        <Input register={register} type={'email'} name={'email'} placeholder={'example@gmail.com'} />
        {errors.email && (
          <p className='text-red-500 text-xs italic'>Email is required</p>
        )}
        <Input register={register} type={'password'} name={'password'} placeholder={'********'} />
        {errors.password && (
          <p className='text-red-500 text-xs italic'>Password is required</p>
        )}
        <button type="submit" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-xl my-2 text-center hover:bg-zinc-900 ">Sign Up</button>
        <p className="flex justify-between text-center text-sm my-2 text-zinc-500">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Sign in!</Link></p>
      </form >
    </>
  )
}

import { useForm } from 'react-hook-form'
import { Input } from '../components/Input'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const LoginPage = () => {
  const { signIn, isAuthenticated, errors: loginErrors } = useAuth()
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
    signIn(values)
    console.log(loginErrors)
  })

  return (
    <>

      <form className='bg-zinc-800 max-w-md p-10 rounded-md my-8 m-auto'
        onSubmit={onSubmit}>
        <h1 className='text-2xl text-zinc-100 mb-3'>Login</h1>
        {
          loginErrors &&
          loginErrors.map((error, i) => (
            <div key={i} className="text-red-500 text-sm w-full" role="alert">
              <p>{error}</p>
            </div>
          ))
        }
        <Input register={register} type={'email'} name={'email'} placeholder={'example@gmail.com'} />
        {errors.email && (
          <p className='text-red-500 text-xs italic'>Email is required</p>
        )}
        <Input register={register} type={'password'} name={'password'} placeholder={'********'} />
        {errors.password && (
          <p className='text-red-500 text-xs italic'>Password is required</p>
        )}
        <button type="submit" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-xl my-2 text-center hover:bg-zinc-900 ">Sign In</button>
        <p className="flex justify-between text-center text-sm my-2 text-zinc-500">Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-700">Sign up!</Link></p>
      </form >
    </>
  )
}


export const Input = ({ register, type, name, isRequired = true, placeholder = '' }) => {
  return (
    <input type={type} {...register(name, { required: isRequired })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder={placeholder} />
  )
}
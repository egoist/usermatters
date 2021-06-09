export const Avatar: React.FC<{
  url?: string
  name?: string | null
  email?: string | null
}> = ({ url, name: _name, email }) => {
  const name = _name || (email ? email.split('@')[0] : '')
  return (
    <span
      style={{ backgroundImage: url && `url('${url}')` }}
      className="inline-flex items-center justify-center w-12 h-12 rounded-full object-cover bg-gray-400 text-white uppercase"
    >
      {name.slice(0, 2)}
    </span>
  )
}

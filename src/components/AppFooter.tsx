export const AppFooter = () => {
  const links = [
    { text: 'GitHub', href: 'https://github.com/egoist/usermatters' },
  ]
  return (
    <footer className="border-t py-20 mt-20">
      <div className="max-w-3xl mx-auto px-5 flex justify-between items-center">
        <span>&copy; 2021 User Matters.</span>
        <ul className="flex space-x-3 text-gray-500 hover:text-black">
          {links.map((link) => (
            <li key={link.text}>
              <a target="_blank" href={link.href}>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

import Link from 'next/link'

const NAVIGATION_ITEMS = [
  {
    name: 'Link One',
    href: '/docs/one'
  },
  {
    name: 'Link Two',
    href: '/docs/two'
  },
  {
    name: 'Link Three',
    href: '/docs/three'
  },
]

const SideBar = () => {
  return (
    <div className="max-w-xs">
      <ul>
        {NAVIGATION_ITEMS.map(({ name, href }) => (<li key={`${name}/${href}`} className="hover:bg-gray-200 ">
          <Link passHref href={href}>
            <a className="block">{name}</a>
          </Link>
        </li>))}
      </ul>
    </div>
  )
}

export default SideBar
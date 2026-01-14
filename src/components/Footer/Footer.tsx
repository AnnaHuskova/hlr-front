import { memo } from 'react';



const Footer = memo(() => {
  return <footer className = "hidden lg:flex flex-row min-h-20 justify-between items-center">

    <label className='mx-6 my-4 text-sm text-right'> NeboPoleLabs </label>
  </footer>
})

export {Footer};
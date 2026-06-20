 import githubIcon from "../assets/github-icon-1-logo.svg";

const NavBar = () => {
  return (
    <nav className='sticky top-0 z-20 border-b border-white/20 bg-slate-950/70 backdrop-blur-xl flex justify-between items-center gap-2 p-3 text-white md:gap-10 md:p-5'>
      <div className="logo font-bold text-white text-lg md:text-2xl">
        <span className='text-green-500'>&lt;</span>
        <span>Pass</span>
        <span className='text-green-500'>OP/&gt;</span>
      </div>

      <ul className="flex items-center gap-3 text-sm font-semibold md:gap-6 md:text-base">
        <li><a href="/" className="hover:font-bold">Home</a></li>
        <li><a href="#about" className="hover:font-bold">About</a></li>
        <li><a href="#contact" className="hover:font-bold">Contact</a></li>
      </ul>
      <div className="flex items-center gap-0 text-white rounded-full bg-green-500 hover:bg-green-600  border border-green-700/40 shadow-lg shadow-green-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-green-500/30 px-2 py-2 border-white">
        <img src={githubIcon} alt="GitHub logo, clickable link to GitHub profile" className='w-7 h-7 cursor-pointer border-white md:w-10 md:h-10' />
        <span className='hidden font-bold px-2 sm:inline'>GitHub</span>
      </div>
      
    </nav>
  )
}

export default NavBar

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center gap-1 py-3 text-white bg-slate-950/90 backdrop-blur-xl border-t-4 border-pink-500">
      <div className="logo font-bold text-white text-2xl">
        <span className="text-green-500">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">OP/&gt;</span>
      </div>

      <div className="flex items-center gap-1 text-sm font-semibold">
        <span>Created with</span>
        <span className="text-red-500 text-lg leading-none">&hearts;</span>
        <span>by Samay</span>
      </div>
    </footer>
  )
}

export default Footer

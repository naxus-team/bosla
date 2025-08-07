function E404() {
  return (
    <>
      <div className="relative h-[60px] bg-[black] flex items-center justify-between px-4">
        <span className="text-[white] ">The Header</span>
        <nav className="flex items-center gap-4">
          <a href="/" className="text-[white]">Home</a>
          <a href="/about" className="text-[white]">About</a>
        </nav>
      </div>
      <div className="flex items-center justify-center h-[calc(100vh-60px)]">
        <h1 className="text-[black] text-[30px]">Home Page</h1>
      </div>
      <footer className="h-[60px] bg-[black] flex items-center justify-center">
        <span className="text-[white]">The Footer</span>
      </footer>
    </>
  )
}

export default E404

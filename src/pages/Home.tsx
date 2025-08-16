
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-52">
      <h1 className="text-5xl font-bold text-center text-blue-500 pb-2">Home</h1>
      <p className="text-center text-xl text-gray-600">logged in first then you can go to dashboard</p>
      <strong className="text-center text-xl text-gray-600 pt-2">Login Admin</strong>
      <p><span className="font-bold">Email:</span> admin@gmail.com</p>
      <p><span className="font-bold">Password:</span> 123456</p>
    </div>
  )
}

export default Home;
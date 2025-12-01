import React from 'react'

const notFound = () => {
  return (
    <>



      <div className='m-auto w-fit my-[25vh]'>
        <div className='text-9xl text-black bg-yellow-500 text-center rounded-2xl p-4 font-bold'>404</div>
        <h1 className='text-white text-5xl  my-5 font-bold'>Page Not Found!</h1>
        <p className='text-white text-xl text-center font-semibold'>Sorry, This URL does not exists.</p>
        <hr className='text-yellow-400 my-5' />

      </div>
    </>

  )
}

export default notFound
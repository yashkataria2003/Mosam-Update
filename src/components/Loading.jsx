import React from 'react'
import loading from '../assets/loading.gif'

const Loading = () => {
    return (
        <>
            <div className='flex justify-center items-center h-[100vh] w-[100vw]'>
                <div className='h-[90vh] w-[90vw] flex flex-col justify-center items-center bg-[#000000b6] py-3'>
                    <img src={loading} alt="loading" className='h-[15vh]'/>
                    <p className='text-white text-2xl'>Processing ...</p>
                </div>
            </div>
        </>
    )
}

export default Loading

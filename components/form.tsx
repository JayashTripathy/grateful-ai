import React, { useEffect } from 'react'
import { useState } from 'react'
import { Formik, Field } from "formik"
import { FormErrors } from '../types/formTypes'

function form() {

    const [gratitude, setGratitude] = useState("")
    const [gratitudeLoading, setGratitudeLoading] = useState(false)
    const [gratitudeLoadingError, setGratitudeLoadingError] = useState(false)

    const initialValues = {
        category: "person",
        personName: "",
        personPronoun: "he/his",
        petName: "",
        placeName: "",
        thingName: "",
    }

    async function generateText(prompt: string) {
        setGratitude("")
        setGratitudeLoading(true)

        console.log("await starts")
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({prompt})

        })
        console.log("await ends")
        if (!response.ok) {
            throw new Error(response.statusText)
        }

        // This data is a ReadableStream
        const data = response.body
        console.log(data)
        if (!data) {
            return
        }
  

        const reader = data.getReader()
        const decoder = new TextDecoder()
        let done = false

        while (!done) {
            const { value, done: doneReading } = await reader.read()
            done = doneReading
            const chunkValue = decoder.decode(value)
            setGratitude((prev) => prev + chunkValue)
        }

        
    }


    async function handleSubmit(
        category: string,
        personName: string,
        personPronoun: string,
        petName: string,
        placeName: string,
        thingName: string
    ) {
        
        generateText(personName);
    }
    useEffect(() => {

    }, [])

    return (

        <>
            <div className="flex h-full w-full items-center justify-center">




                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { resetForm }) => {
                        handleSubmit(
                            values["category"],
                            values["personName"],
                            values["personPronoun"],
                            values["petName"],
                            values["placeName"],
                            values["thingName"]
                        )

                        resetForm()
                    }}
                    validate={(values) => {
                        const errors: FormErrors = {};


                        if (values.category === "person" && !values.personName) {
                            errors.personName = "name cannot be blank";
                        }
                        if (values.category === "pet" && !values.petName) {
                            errors.petName = "pet name cannot be blank";
                        }
                        if (values.category === "place" && !values.placeName) {
                            errors.placeName = "place name cannot be blank";
                        }
                        if (values.category === "thing" && !values.thingName) {
                            errors.thingName = "thing name cannot be blank";
                        }



                        return errors
                    }}




                // validationSchema={validationSchema}
                >
                    {({ handleSubmit, handleChange, values, errors, touched }) => (
                        <form onSubmit={handleSubmit}>


                            <div className="flex flex-col gap-3 rounded-3xl p-5 bg-white mb-10">


                                <div className='flex flex-col text-gray-800'>
                                    <div className="flex flex-col gap-0   pb-10 ">

                                        <h1 className='text-xl font-bold leading-[.5rem] pl-1 text-gray-600'>create a </h1>
                                        <h1 className=' text-5xl font-black leading-[3.5rem]  animate-text bg-gradient-to-r from-teal-700
                                         via-purple-800 to-orange-400 bg-clip-text text-transparent '>Grateful thought</h1>
                                        <h3 className='text-xl font-extrabold bg-gradient-to-r from-purple-700 leading-[1.4rem] pl-1 bg-clip-text text-transparent '>for your love ones</h3>
                                    </div>
                                    <label id='select-category' htmlFor='category' className='font-bold pb-1 pl-2  text-sm text-gray-500'>Select an option</label>
                                    <select name="category" id="category"
                                        className=' bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold rounded-xl px-4 py-3 outline-dashed outline-2 mb-3'
                                        onChange={handleChange} value={values.category} >
                                        <option value="person">Person</option>
                                        <option value="pet">Pet</option>
                                        <option value="place">Place</option>
                                        <option value="thing">Thing</option>
                                    </select>

                                </div>
                                {values.category === "person" && (
                                    <>
                                        <div className='flex flex-col'>
                                            <label id='select-category' htmlFor='personName' className='font-bold pb-1 pl-2  text-sm text-gray-500'>Whats their name (or nickname😇)</label>
                                            <div className='flex flex-row text-gray-80 gap-1'>

                                                <Field type="text" name='personName' id='personName' className=' flex-grow bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold 
                                                rounded-xl px-4 py-3 outline-2 mb-3' placeholder='jhon doe' onChange={handleChange} value={values.personName} />
                                                <select name='personPronoun' id='personPronoun' className='bg-purple-600 border-spacing-2 text-white font-bold 
                                                rounded-xl px-2 mb-3' placeholder='he/him' onChange={handleChange} value={values.personPronoun} >
                                                    <option value="she/her">she/her</option>
                                                    <option value="he/his">he/his</option>
                                                    <option value="they/them">they/them</option>
                                                </select>

                                            </div>
                                            {errors.personName && touched.personName ? <div className="text-red-500 text-sm pl-2 font-semibold" >{errors.personName}</div> : ""}



                                        </div>


                                    </>
                                )}
                                {values.category === "pet" && (
                                    <>
                                        <div className='flex flex-col'>

                                            <label id='select-category' htmlFor='petName' className='font-bold pb-1 pl-2  text-sm text-gray-500'>Whats your pet🐩 name?</label>

                                            <input type="text" name='petName' id='petName' className=' flex-grow bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold 
                                                rounded-xl px-4 py-3 outline-2 mb-3' placeholder='Browney' onChange={handleChange} value={values.petName} />
                                        </div>
                                        {errors.petName && touched.petName ? <div className="text-red-500 text-sm pl-2 font-semibold" >{errors.petName}</div> : " "}

                                    </>
                                )}
                                {values.category === "place" && (
                                    <>
                                        <div className='flex flex-col'>

                                            <label id='select-category' htmlFor='placeName' className='font-bold pb-1 pl-2  text-sm text-gray-500'>Enter place🌌 name</label>

                                            <Field type="text" name='placeName' id='placeName' className=' flex-grow bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold 
                                            rounded-xl px-4 py-3 outline-2 mb-3' placeholder='Browney' onChange={handleChange} value={values.placeName} />
                                            {errors.placeName && touched.placeName ? <div className="text-red-500 text-sm pl-2 font-semibold" >{errors.placeName}</div> : " "}
                                        </div>
                                    </>
                                )}
                                {values.category === "thing" && (
                                    <>
                                        <div className='flex flex-col'>

                                            <label id='select-category' htmlFor='placeName' className='font-bold pb-1 pl-2  text-sm text-gray-500'>Enter thing🎈 name</label>

                                            <Field type="text" name='thingName' id='thingName' className=' flex-grow bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold rounded-xl px-4 py-3 outline-2 mb-3' placeholder='Balloon' onChange={handleChange} value={values.thingName} />
                                            {errors.thingName && touched.thingName ? <div className="text-red-500 text-sm pl-2 font-semibold" >{errors.thingName}</div> : " "}
                                        </div>
                                    </>
                                )}
                                <button type="submit" className='bg-purple-900  rounded-xl py-2 font-bold text-xl text-white shadow-lg hover:bg-purple-950 duration-150 ease-in-out transition-all'>
                                    Generate Thought ✨
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
                \
            </div>
        </>
    )
}

export default form
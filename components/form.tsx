import React, { useEffect } from 'react'
import { useState } from 'react'
import { Formik, Field } from "formik"
import { FormErrors } from '../types/formTypes'
import { FiCopy } from 'react-icons/fi'
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
        reason: "",
    }

    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(gratitude);
            console.log('Content copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }


    async function generateText(prompt: string) {
        setGratitude("")
        setGratitudeLoading(true)


        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ prompt })

        })
        setGratitudeLoading(false)
        if (!response.ok) {
            throw new Error(response.statusText)
        }

        // This data is a ReadableStream
        const data = response.body

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

        console.log(gratitude)
    }


    async function handleSubmit(
        category: string,
        personName: string,
        personPronoun: string,
        petName: string,
        placeName: string,
        thingName: string,
        reason: string
    ) {

        const personPrompt = `Generate a unique sentence of gratitude for ${personName}  beacuse ${reason} . Their pronouns ${personPronoun}. make this as if i am talking to ${personName}`
        const petPrompt = `Generate a sentence of gratitude for ${petName} who is a pet ${reason}.`
        const placePrompt = `Create a unique sentence of gratitude for my place ${placeName} because ${reason}.`

        // const thingPrompt = `Create a unique sentence of gratitude for this ${placeName} because ${reason}.`

        if (category === "person" && personName) {

            generateText(personPrompt);
        }
        if (category === "pet" && petPrompt) {

            generateText(petPrompt);
        }
        if (category === "place" && placePrompt) {

            generateText(placePrompt);
        }
        
        // if (category === "thing" && thingPrompt) {

        //     generateText(thingPrompt);
        // }

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
                            values["thingName"],
                            values['reason']
                        )

                        resetForm({values: {
                            ...initialValues, 
                            category: values.category,
                        }})
                        
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

                        if (!values.reason) {
                            errors.reason = "this feild cannot be blank";
                        }


                        return errors
                    }}




                // validationSchema={validationSchema}
                >
                    {({ handleSubmit, handleChange, values, errors, touched }) => (
                        <form onSubmit={handleSubmit} className='mb-5'>


                            <div className="flex flex-col gap-3 mb-3 rounded-3xl p-5 bg-white  max-w-[30rem] ">


                                <div className='flex flex-col text-gray-800'>
                                    <div className="flex flex-col gap-0   pb-4 ">

                                        <h1 className='text-md font-bold leading-[.5rem]  text-gray-600'>generate a special </h1>
                                        <h1 className='text-2xl md:text-5xl font-black block md:leading-[3.5rem] animate-text bg-gradient-to-r from-teal-700
                                         via-purple-800 to-orange-400 bg-clip-text text-transparent  '>Grateful Message</h1>
                                    </div>
                                    <label id='select-category' htmlFor='category' className='font-bold pb-1 pl-2   text-gray-500 text-xs md:text-lg'>Select an option</label>
                                    <select name="category" id="category"
                                        className='text-xs md:text-base bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold rounded-xl px-4 py-3 outline-dashed outline-2 mb-3'
                                        onChange={handleChange} value={values.category} >
                                        <option value="person">Person</option>
                                        <option value="place">Place</option>
                                        <option value="pet">Pet</option>
                                        {/* <option value="thing">Thing</option> */}
                                    </select>

                                </div>
                                {values.category === "person" && (
                                    <>
                                        <div className='flex flex-col'>
                                            <div className=' text-gray-80 gap-1 relative'>
                                                <label id='select-category' htmlFor='personName' className='font-bold pb-1 pl-2   text-gray-500 text-xs md:text-sm'>Whats their name (or nickname😇)</label>
                                                {errors.personName && touched.personName ? <div className="text-red-500 text-xs pl-2 font-semibold" >{errors.personName}</div> : ""}

                                                <Field type="text" name='personName' id='personName' className=' w-full bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold 
                                                rounded-xl px-4 py-3 outline-2 mb-3 text-xs md:text-base' placeholder='jhon doe' onChange={handleChange} value={values.personName} />
                                                <select name='personPronoun' id='personPronoun' className='absolute bottom-[-12px] right-0   bg-purple-600 border-spacing-2 text-white font-bold 
                                                rounded-full px-2 py-[.1rem] mb-3 text-sm  md:text-md' placeholder='he/him' onChange={handleChange} value={values.personPronoun} >
                                                    <option value="she/her">she/her</option>
                                                    <option value="he/his">he/his</option>
                                                    <option value="they/them">they/them</option>
                                                </select>


                                            </div>

                                            <div>

                                                <label id='select-category' htmlFor='reason' className='font-bold pb-1 pl-2  text-sm text-gray-500'>Because...❓</label>
                                                {errors.reason && touched.reason ? <div className="text-red-500 text-xs pl-2 font-semibold" >{errors.reason}</div> : ""}

                                                <Field type="text" name='reason' id='reason' className=' w-full bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold rounded-xl px-4 py-3 outline-2 mb-3 text-xs md:text-base' placeholder='he helped in my assignment' onChange={handleChange} value={values.reason} />
                                            </div>

                                        </div>


                                    </>
                                )}
                                {values.category === "pet" && (
                                    <>
                                        <div className='flex flex-col'>

                                            <label id='select-category' htmlFor='petName' className='font-bold pb-1 pl-2  text-sm text-gray-500'>Whats your pet🐩 name?</label>

                                            {errors.petName && touched.petName ? <div className="text-red-500 text-xs pl-2 font-semibold" >{errors.petName}</div> : " "}
                                            <input type="text" name='petName' id='petName' className=' flex-grow bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold 
                                                rounded-xl px-4 py-3 outline-2 ' placeholder='browney' onChange={handleChange} value={values.petName} />
                                        </div>
                                        <div>

                                            <label id='select-category' htmlFor='reason' className='font-bold pb-1 pl-2  text-sm text-gray-500'>Pet type❓</label>
                                            {errors.reason && touched.reason ? <div className="text-red-500 text-xs pl-2 font-semibold" >{errors.reason}</div> : ""}

                                            <Field type="text" name='reason' id='reason' className=' w-full bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold rounded-xl px-4 py-3 outline-2 mb-3 text-xs md:text-base' placeholder='dog' onChange={handleChange} value={values.reason} />
                                        </div>
                                    </>
                                )}
                                {values.category === "place" && (
                                    <>
                                        <div className='flex flex-col'>

                                            <label id='select-category' htmlFor='placeName' className='font-bold pb-1 pl-2  text-sm text-gray-500'>Enter place🌌 name</label>

                                            {errors.placeName && touched.placeName ? <div className="text-red-500 text-xs pl-2 font-semibold" >{errors.placeName}</div> : " "}
                                            <Field type="text" name='placeName' id='placeName' className=' flex-grow bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold 
                                            rounded-xl px-4 py-3 outline-2 ' placeholder='Bhilai' onChange={handleChange} value={values.placeName} />
                                        </div>

                                        <div>

                                            <label id='select-category' htmlFor='reason' className='font-bold pb-1 pl-2  text-sm text-gray-500'>Because...❓</label>
                                            {errors.reason && touched.reason ? <div className="text-red-500 text-xs pl-2 font-semibold" >{errors.reason}</div> : ""}

                                            <Field type="text" name='reason' id='reason' className=' w-full bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold rounded-xl px-4 py-3 outline-2 mb-3 text-xs md:text-base' placeholder='it is peaceful' onChange={handleChange} value={values.reason} />
                                        </div>
                                    </>
                                )}
                                {/* {values.category === "thing" && (
                                    <>
                                        <div className='flex flex-col'>

                                            <label id='select-category' htmlFor='placeName' className='font-bold pb-1 pl-2  text-sm text-gray-500'>Enter thing🎈 name</label>

                                            <Field type="text" name='thingName' id='thingName' className=' flex-grow bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold rounded-xl px-4 py-3 outline-2 ' placeholder='Balloon' onChange={handleChange} value={values.thingName} />
                                            {errors.thingName && touched.thingName ? <div className="text-red-500 text-sm pl-2 font-semibold" >{errors.thingName}</div> : " "}
                                        </div>

                                        <div>

                                            <label id='select-category' htmlFor='reason' className='font-bold pb-1 pl-2  text-sm text-gray-500'>Because...❓</label>
                                            {errors.reason && touched.reason ? <div className="text-red-500 text-xs pl-2 font-semibold" >{errors.reason}</div> : ""}

                                            <Field type="text" name='reason' id='reason' className=' w-full bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold rounded-xl px-4 py-3 outline-2 mb-3 text-xs md:text-base' placeholder='it is read and beautiful' onChange={handleChange} value={values.reason} />
                                        </div>
                                    </>
                                )} */}


                                <button type="submit" className='bg-purple-900  rounded-xl py-2 font-bold text-xl text-white shadow-lg hover:bg-purple-950 duration-150 ease-in-out transition-all flex justify-center items-center' disabled={gratitudeLoading} >

                                    {!gratitudeLoading ? "Generate Msg ✨" :

                                        <span className="inline-block animate-load rounded-full p-2  text-white text-sm">
                                            <svg className="w-6 h-6 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </span>
                                    }

                                </button>

                            </div>
                            {gratitude ?
                                <div id='generatedText' className="relative bg-purple-800 text-white p-4 text-center rounded-xl text-sm font-bold max-w-[30rem]">{gratitude}
                                    <button className="bg-white text-black rounded-full p-2 absolute top-[-10px] right-[-10px] drop-shadow-xl" onClick={copyContent}><FiCopy size="16" /></button></div>
                                : ""}
                        </form >
                    )
                    }
                </Formik >

            </div >
        </>
    )
}

export default form
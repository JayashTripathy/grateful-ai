import React, { useEffect } from 'react'
import { useState } from 'react'
import { Formik, Field } from "formik"
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Spinner,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage,
    RadioGroup,
    Radio,
    Stack,
} from "@chakra-ui/react"

import { SelectControl } from "formik-chakra-ui"
import { error } from 'console'

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


    async function handleSubmit(
        category: string,
        personName: string,
        personPronoun: string,
        petName: string,
        placeName: string,
        thingName: string
    ) {
        console.log(personName)
    }
    useEffect(() => {

    }, [])

    return (

        <>
            <Flex justify="center" align='center' h="100%" >

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
                        console.log(values)
                        resetForm()
                    }}
                    validate={(values) => {
                        const errors:any = {};
                        

                        if (values.category === "person" && !values.personName) {
                            errors.personName = "name cannot be blank";
                        } 

                        console.log(errors)

                        return errors
                    }}




                // validationSchema={validationSchema}
                >
                    {({ handleSubmit, handleChange, values, errors }) => (
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

                                                <input type="text" name='personName' id='personName' className=' flex-grow bg-indigo-50  border-indigo-900 border-spacing-2 text-gray-900 font-bold 
                                                rounded-xl px-4 py-3 outline-2 mb-3' placeholder='jhon doe' onChange={handleChange} value={values.personName} />
                                                <select name='personPronoun' id='personPronoun' className='bg-purple-600 border-spacing-2 text-white font-bold 
                                                rounded-xl px-2 mb-3' placeholder='he/him' onChange={handleChange} value={values.personPronoun} >
                                                    <option value="she/her">she/her</option>
                                                    <option value="he/his">he/his</option>
                                                    <option value="they/them">they/them</option>
                                                </select>
                                            </div>
                                            {errors.personName? <div className="text-red-500 text-sm pl-2 font-semibold" >{errors.personName}</div>: ""}
                                           
                                            

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

                                    </>
                                )}
                                {values.category === "place" && (
                                    <>
                                        <FormControl isRequired>
                                            <FormLabel htmlFor="placeName">
                                                What's the name of the place?
                                            </FormLabel>
                                            <Field
                                                as={Input}
                                                id="placeName"
                                                name="placeName"
                                                type="name"
                                                variant="filled"
                                                bg="gray.200"
                                            />
                                            <FormErrorMessage>
                                                {errors.placeName}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </>
                                )}
                                {values.category === "thing" && (
                                    <>
                                        <FormControl isRequired>
                                            <FormLabel htmlFor="thingName">
                                                What's the thing?
                                            </FormLabel>
                                            <Field
                                                as={Input}
                                                id="thingName"
                                                name="thingName"
                                                type="name"
                                                variant="filled"
                                                bg="gray.200"
                                            />
                                            <FormErrorMessage>
                                                {errors.thingName}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </>
                                )}
                                <Button type="submit" className='bg-purple-900  rounded-xl py-2 font-bold text-xl text-white shadow-lg hover:bg-purple-950 duration-150 ease-in-out transition-all'>
                                    Generate Thought ✨
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </Flex>
        </>
    )
}

export default form
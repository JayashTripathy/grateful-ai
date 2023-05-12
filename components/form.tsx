import React from 'react'
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

function form() {

    const [gratitude, setGratitude] = useState("")
    const [gratitudeLoading, setGratitudeLoading] = useState(false)
    const [gratitudeLoadingError, setGratitudeLoadingError] = useState(false)

    const initialValues = {
        category: "person",
        personName: "",
        personPronoun: "she/her",
        petType: "",
        petName: "",
        placeName: "",
        thingName: "",
    }

    async function handleSubmit(
        category: string,
        personName: string,
        personPronoun: string,
        petType: string,
        petName: string,
        placeName: string,
        thingName: string
    ) {
        console.log(personName)
    }
    return (
        <>
            <Flex  justify="center"  align='center' h="100%" >

                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { resetForm }) => {
                        handleSubmit(
                            values["category"],
                            values["personName"],
                            values["personPronoun"],
                            values["petType"],
                            values["petName"],
                            values["placeName"],
                            values["thingName"]
                        )

                        resetForm()
                    }}
                // validationSchema={validationSchema}
                >
                    {({ handleSubmit, values, errors }) => (
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={10} align="flex-start" borderColor='black.500' borderWidth="2px" width="100%" borderRadius="2rem" padding="1rem">
                                <FormControl isRequired>
                                    <FormLabel htmlFor="category">Select an option</FormLabel>
                                    <SelectControl name="category">
                                        <option value="person">Person</option>
                                        <option value="pet">Pet</option>
                                        <option value="place">Place</option>
                                        <option value="thing">Thing</option>
                                    </SelectControl>
                                    <FormErrorMessage>{errors.category}</FormErrorMessage>
                                </FormControl>
                                {values.category === "person" && (
                                    <>
                                        <FormControl isRequired>
                                            <FormLabel htmlFor="personName">
                                                What is their name?
                                            </FormLabel>
                                            <Field
                                                as={Input}
                                                id="personName"
                                                name="personName"
                                                type="name"
                                                variant="filled"
                                                bg="gray.200"
                                            />
                                            <FormErrorMessage>
                                                {errors.personName}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel htmlFor="personPronoun">
                                                Pronouns
                                            </FormLabel>
                                            <SelectControl name="personPronoun">
                                                <option value="she/her">she/her</option>
                                                <option value="he/his">he/his</option>
                                                <option value="they/them">they/them</option>
                                            </SelectControl>
                                            <FormErrorMessage>
                                                {errors.personPronoun}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </>
                                )}
                                {values.category === "pet" && (
                                    <>
                                        <FormControl isRequired>
                                            <FormLabel htmlFor="petType">
                                                What type of pet do you have?
                                            </FormLabel>
                                            <Field
                                                as={Input}
                                                id="petType"
                                                name="petType"
                                                type="name"
                                                variant="filled"
                                                bg="gray.200"
                                            />
                                            <FormErrorMessage>{errors.petType}</FormErrorMessage>
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel htmlFor="petName">
                                                What's your pet's name?
                                            </FormLabel>
                                            <Field
                                                as={Input}
                                                id="petName"
                                                name="petName"
                                                type="name"
                                                variant="filled"
                                                bg="gray.200"
                                            />
                                            <FormErrorMessage>{errors.petName}</FormErrorMessage>
                                        </FormControl>
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
                                <Button type="submit" colorScheme="purple" width="full">
                                    Generate Thought
                                </Button>
                            </VStack>
                        </form>
                    )}
                </Formik>
            </Flex>
        </>
    )
}

export default form
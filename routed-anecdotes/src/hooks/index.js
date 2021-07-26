import {useState} from "react";

const initialState = ''

export const useField = (type) => {
    const [value, setValue] = useState(initialState)

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue(initialState)
    }

    return [
        {
            type,
            value,
            onChange,
        },
        reset
    ]
}
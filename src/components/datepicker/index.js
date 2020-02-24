import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

import Picker from './Picker'
import Panel from './Panel'

import { checkDate } from '../../utils/checkDate'

const Container = styled.div`
    position: relative;
    width: 174px;
    height: 32px;
    border: 1px solid #ccc;
    border-radius: 2px;
`

function DatePicker(props) {
    const [showPanel, setShowPanel] = useState(false)
    const [value, setValue] = useState(props.defaultValue ? props.defaultValue : '')
    const [date, setDate] = useState(props.defaultValue ? dayjs(props.defaultValue) : '')
    const handlePickerFocus = () => {
        setShowPanel(true)
    }
    const closePanel = target => {
        if (target === pickerRef.current) {
            return
        }
        setShowPanel(false)
    }
    const handlePickerChange = e => {
        setValue(e.target.value)
        if (!e.target.value) {
            setDate('')
            props.onChange('')
        } else if (checkDate(e.target.value)) {
            setDate(dayjs(e.target.value))
            props.onChange(dayjs(e.target.value))
        }
    }
    const handlePickerKeyDown = e => {
        if (e.which === 13) {
            if (!value) {
                setDate('')
                props.onChange(date)
            } else if (!checkDate(value)) {
                setValue(date ? date.format('YYYY/MM/DD') : '')
                props.onChange(date)
            }
            pickerRef.current.blur()
            setShowPanel(false)
        }
    }
    const handleClickDays = value => {
        setValue(value)
        setDate(dayjs(value))
        props.onChange(dayjs(value))
    }
    const handlePickerBlur = () => {
        if (!value) {
            setDate('')
            props.onChange(date)
        } else if (!checkDate(value)) {
            setValue(date ? date.format('YYYY/MM/DD') : '')
            props.onChange(date)
        }
    }
    const pickerRef = useRef(null)
    return (
        <Container>
            <Picker
                onFocus={handlePickerFocus}
                ref={pickerRef}
                value={value}
                onChange={handlePickerChange}
                placeholder='请选择日期'
                onKeyDown={handlePickerKeyDown}
                onBlur={handlePickerBlur}
            />
            {showPanel ? <Panel closePanel={closePanel} date={date} clickDays={handleClickDays} /> : null}
        </Container>
    )
}

export default DatePicker

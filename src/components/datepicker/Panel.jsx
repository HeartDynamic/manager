import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'
import { range } from 'ramda'
import dayjs from 'dayjs'

import Days from './Days'

const Container = styled.div`
    position: absolute;
    top: 39px;
    width: 350px;
    z-index: 1000;
    background-color: #eee;
    box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.2);
`

function getDays(date) {
    const start = date.startOf('month')
    const strartWeek = start.get('day')
    const before = strartWeek === 0 ? 6 : strartWeek - 1
    const beforeStart = start.subtract(before, 'day')
    return range(0, 42).map(v => beforeStart.add(v, 'day'))
}

function Panel(props) {
    const [days, setDays] = useState(getDays(props.date ? props.date : dayjs()))
    const [currentPageDate, setCurrentPageDate] = useState(props.date ? props.date : dayjs())
    Panel.handleClickOutside = e => {
        props.closePanel(e.target)
    }
    const previousYear = () => {
        setDays(getDays(currentPageDate.subtract(1, 'year')))
        setCurrentPageDate(currentPageDate.subtract(1, 'year'))
    }
    const nextYear = () => {
        setDays(getDays(currentPageDate.add(1, 'year')))
        setCurrentPageDate(currentPageDate.add(1, 'year'))
    }
    const previousMonth = () => {
        setDays(getDays(currentPageDate.subtract(1, 'month')))
        setCurrentPageDate(currentPageDate.subtract(1, 'month'))
    }
    const nextMonth = () => {
        setDays(getDays(currentPageDate.add(1, 'month')))
        setCurrentPageDate(currentPageDate.add(1, 'month'))
    }
    const clickToday = () => {
        props.clickDays(dayjs().format('YYYY/MM/DD'))
    }
    useEffect(() => {
        if (props.date) {
            setDays(getDays(props.date))
            setCurrentPageDate(props.date)
        }
    }, [props.date])
    return (
        <Container>
            <Days
                days={days}
                date={props.date}
                clickDays={props.clickDays}
                previousYear={previousYear}
                nextYear={nextYear}
                previousMonth={previousMonth}
                nextMonth={nextMonth}
                currentPageDate={currentPageDate}
                clickToday={clickToday}
            />
        </Container>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Panel.handleClickOutside,
}

export default onClickOutside(Panel, clickOutsideConfig)

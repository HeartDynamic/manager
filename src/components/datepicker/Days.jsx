import React from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

import dayjs from 'dayjs'

const Container = styled.div`
    box-sizing: border-box;
    padding: 8px 0px;
`
const Header = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
`
const LeftTagWrap = styled.div`
    width: 70px;
    display: flex;
    margin-left: 10px;
    justify-content: space-between;
`
const RightTagWrap = styled.div`
    width: 70px;
    display: flex;
    margin-right: 10px;
    justify-content: space-between;
`
const Tag = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    color: #777;
    &:hover {
        background-color: #eee;
        color: #00a6f3;
    }
`
const TitleWrap = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: space-evenly;
`
const Title = styled.div`
    border-radius: 3px;
    padding: 5px 10px;
    cursor: pointer;
    color: #777;
    user-select: none;
    &:hover {
        background-color: #eee;
        color: #00a6f3;
    }
`
const WeekWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 1fr;
    margin-bottom: 10px;
`
const Week = styled.div`
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #00a6f3;
    font-size: 14px;
    user-select: none;
    margin: 0 auto;
`
const DayWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-row-gap: 10px;
`
const Day = styled.div`
    user-select: none;
    width: 30px;
    height: 30px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    margin: 0 auto;
    font-size: 14px;
    cursor: pointer;
    box-sizing: border-box;
    border: 2px solid ${props => (props.isCurrentDay ? '#00a6f3' : 'transparent')};
    background-color: ${props => (props.isSelected ? '#00a6f3' : 'transparent')};
    color: ${props => (props.isSelected ? '#fff' : '#555')};
    &:hover {
        background-color: ${props => (props.isSelected ? '#00a6f3' : props.isCurrentDay ? '#fff' : '#eee')};
        color: ${props => (props.isSelected ? '#fff' : '#00a6f3')};
        border-color: ${props => (props.isCurrentDay || props.isSelected ? '#00a6f3' : '#eee')};
    }
`
const GrayDay = styled(Day)`
    color: #bbb;
`
const Footer = styled.div`
    height: 40px;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Today = styled.div`
    color: #00a6f3;
    cursor: pointer;
    user-select: none;
`

function Days(props) {
    const handleClick = date => {
        props.clickDays(date.format('YYYY/MM/DD'))
    }
    return (
        <>
            <Header>
                <LeftTagWrap>
                    <Tag onClick={() => props.previousMonth()} title='上一年'>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} />
                    </Tag>
                    <Tag onClick={() => props.previousMonth()} title='上个月'>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Tag>
                </LeftTagWrap>
                <TitleWrap>
                    <Title>{props.currentPageDate.format('YYYY')}年</Title>
                    <Title>{props.currentPageDate.format('MM')}月</Title>
                </TitleWrap>
                <RightTagWrap>
                    <Tag onClick={() => props.nextMonth()} title='下个月'>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Tag>
                    <Tag onClick={() => props.nextMonth()} title='下一年'>
                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </Tag>
                </RightTagWrap>
            </Header>
            <Container>
                <WeekWrap>
                    {['一', '二', '三', '四', '五', '六', '日'].map((v, i) => (
                        <Week key={i} title={`星期${v}`}>
                            {v}
                        </Week>
                    ))}
                </WeekWrap>
                <DayWrap>
                    {props.days.map((v, i) => {
                        if (v.isSame(props.currentPageDate, 'month')) {
                            return (
                                <Day
                                    title={`${v.format('YYYY')}年${v.format('M')}月${v.format('D')}日`}
                                    key={i}
                                    isCurrentDay={v.isSame(dayjs(), 'day')}
                                    onClick={() => handleClick(v)}
                                    isSelected={props.date ? props.date.isSame(v) : false}
                                >
                                    {v.date()}
                                </Day>
                            )
                        } else {
                            return (
                                <GrayDay
                                    key={i}
                                    onClick={() => handleClick(v)}
                                    isCurrentDay={v.isSame(dayjs(), 'day')}
                                    title={`${v.format('YYYY')}年${v.format('M')}月${v.format('D')}日`}
                                >
                                    {v.date()}
                                </GrayDay>
                            )
                        }
                    })}
                </DayWrap>
            </Container>
            <Footer>
                <Today
                    onClick={() => props.clickToday()}
                    title={`${dayjs().format('YYYY')}年${dayjs().format('M')}月${dayjs().format('D')}日`}
                >
                    今天
                </Today>
            </Footer>
        </>
    )
}

export default Days

import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faEllipsisH, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

const MyFooter = styled.footer`
    margin-top: 20px;
`

const Container = styled.ul`
    display: flex;
    justify-content: center;
    height: 100%;
    user-select: none;
`
const MyLi = styled.li`
    box-sizing: border-box;
    height: 28px;
    line-height: 26px;
    padding: 0 10px;
    margin-right: 8px;
    border-radius: 4px;
    border: 1px solid ${props => (props.active ? '#1890ff' : '')};
    color: ${props => (props.active ? '#1890ff' : '')};
    cursor: pointer;
    :hover {
        border: 1px solid #1890ff;
        color: #1890ff;
    }
`
const MyLiPage = styled(MyLi)`
    cursor: ${props => (props.active ? 'not-allowed' : '')};
    border: 1px solid ${props => (props.active ? '#b5b5b5' : '')};
    color: ${props => (props.active ? '#ccc' : '')};
    :hover {
        border: 1px solid ${props => (props.active ? '#b5b5b5' : '')};
        color: ${props => (props.active ? '#ccc' : '#1890ff')};
    }
`
const Wrap = styled.div``

function Paging(props) {
    const [groupCount, setGroupCount] = useState(5) //页码分组，显示7个页码，其余用省略号显示
    const [startPage, setStartPage] = useState(1) //分组开始页码
    const [currentPage, setCurrentPage] = useState(1) //当前页码
    const [isShowLeftIcon, setisShowLeftIcon] = useState(false)
    const [isShowRightIcon, setisShowRightIcon] = useState(false)

    //修正开始页码
    const pageClick = current => {
        if (currentPage === current) return
        let value = current
        if (current < 1) {
            value = 1
        } else if (current > props.total) {
            value = props.total
        }
        if (value >= groupCount) {
            setStartPage(value - 2)
        }
        if (value < groupCount) {
            setStartPage(1)
        }
        //第一页时重新设置分组的起始页
        if (value === 1) {
            setStartPage(1)
        }
        setCurrentPage(value)
        props.onChange(value)
    }

    //上一页事件
    const prePageHandeler = () => {
        let current = currentPage
        if (--current === 0) {
            return false
        }
        pageClick(current)
    }
    //下一页事件
    const nextPageHandeler = () => {
        let current = currentPage
        if (++current > props.total) {
            return false
        }
        pageClick(current)
    }
    const handleonMouseEnter = text => {
        if (text === 'left') {
            setisShowLeftIcon(true)
        } else if (text === 'right') {
            setisShowRightIcon(true)
        }
    }
    const handleOnMouseLeave = text => {
        if (text === 'left') {
            setisShowLeftIcon(false)
        } else if (text === 'right') {
            setisShowRightIcon(false)
        }
    }
    //初始化
    const createPage = () => {
        let pages = []
        if (props.total > 0) {
            //上一页
            pages.push(
                <MyLiPage key={0} onClick={prePageHandeler} active={currentPage === 1}>
                    上一页
                </MyLiPage>
            )
            /*总页码小于等于10时，全部显示出来 否则 部分显示*/
            if (props.total <= 10) {
                for (let i = 1; i <= props.total; i++) {
                    pages.push(
                        <MyLi active={currentPage === i} key={i} onClick={() => pageClick(i)}>
                            {i}
                        </MyLi>
                    )
                }
            } else {
                //第一页
                pages.push(
                    <MyLi active={currentPage === 1} key={1} onClick={() => pageClick(1)}>
                        1
                    </MyLi>
                )
                let pageLength = 0
                if (groupCount + startPage > props.total) {
                    pageLength = props.total
                } else {
                    pageLength = groupCount + startPage
                }
                //前面省略号(当当前页码比分组的页码大时显示省略号)
                if (currentPage >= groupCount) {
                    pages.push(
                        <MyLi
                            key={-1}
                            onClick={() => pageClick(currentPage - 5)}
                            onMouseEnter={() => handleonMouseEnter('left')}
                            onMouseLeave={() => handleOnMouseLeave('left')}
                        >
                            {isShowLeftIcon ? (
                                <Wrap key='1'>
                                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                                </Wrap>
                            ) : (
                                <Wrap key='2'>
                                    <FontAwesomeIcon icon={faEllipsisH} />
                                </Wrap>
                            )}
                        </MyLi>
                    )
                }
                for (let i = startPage; i < pageLength; i++) {
                    if (i <= props.total - 1 && i > 1) {
                        pages.push(
                            <MyLi active={currentPage === i} key={i} onClick={() => pageClick(i)}>
                                {i}
                            </MyLi>
                        )
                    }
                }
                //后面省略号
                if (props.total - startPage >= groupCount + 1) {
                    pages.push(
                        <MyLi
                            key={-2}
                            onClick={() => pageClick(currentPage + 5)}
                            onMouseEnter={() => handleonMouseEnter('right')}
                            onMouseLeave={() => handleOnMouseLeave('right')}
                        >
                            {isShowRightIcon ? (
                                <Wrap key='1'>
                                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                                </Wrap>
                            ) : (
                                <Wrap key='2'>
                                    <FontAwesomeIcon icon={faEllipsisH} />
                                </Wrap>
                            )}
                        </MyLi>
                    )
                }
                //最后一页
                pages.push(
                    <MyLi active={currentPage === props.total} key={props.total} onClick={() => pageClick(props.total)}>
                        {props.total}
                    </MyLi>
                )
            }
            //下一页
            pages.push(
                <MyLiPage active={currentPage === props.total} key={props.total + 1} onClick={nextPageHandeler}>
                    下一页
                </MyLiPage>
            )
        }
        return pages
    }

    return (
        <MyFooter>
            <Container>{createPage()}</Container>
        </MyFooter>
    )
}
Paging.defaultProps = {
    current: 1,
    total: 1,
}

export default Paging

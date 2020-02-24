import React from 'react'
import styled from 'styled-components'
import Column from './Column'
import Header from './Header'

const Container = styled.section``
const MyUl = styled.ul``
const MyLi = styled.li`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    border-right: 1px solid #e8e8e8;
    border-left: 1px solid #e8e8e8;
    :hover {
        background-color: rgb(230, 247, 255);
    }
`
const Cell = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => (props.setWidth ? props.setWidth + 'px' : '100%')};
    font-size: 14px;
    border-bottom: 1px solid #e8e8e8;
    padding: 16px;
    color: rgba(0, 0, 0, 0.65);
`
function Table(props) {
    const renderCell = (data, index, rowData, rowIndex) => {
        if (data.props.dataIndex) {
            return (
                <Cell key={index} setWidth={data.props.width}>
                    {rowData[data.props.dataIndex]}
                </Cell>
            )
        } else {
            return (
                <Cell key={index} setWidth={data.props.width}>
                    {data.props.render(rowData, rowIndex)}
                </Cell>
            )
        }
    }
    const renderRow = (data, index) => (
        <MyLi key={index}>{props.children.map((v, i) => renderCell(v, i, data, index))}</MyLi>
    )
    return (
        <Container>
            <Header column={props.children} />
            <MyUl>{props.data.map((v, i) => renderRow(v, i))}</MyUl>
        </Container>
    )
}

Table.Column = Column

export default Table

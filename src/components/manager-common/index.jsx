import React from 'react'
import styled from 'styled-components'
import Button from '../button'

const Container = styled.header`
    display: flex;
    align-items: center;
    height: 28px;
    margin-bottom: 20px;
`
const MyBox = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`
const MyInput = styled.input`
    box-sizing: border-box;
    height: 100%;
    height: 28px;
    border: 1px solid #7a8fb8;
    margin-left: 20px;
    padding-left: 6px;
`

function Main(props) {
    //空搜索
    const handleChangeSearch = event => {
        props.onChangeSearch(event.target.value)
    }
    //点击搜索
    const handleClickSearch = () => {
        props.onChangeSearch('搜索')
    }
    //回车搜索
    const handleEnterSearch = event => {
        event.keyCode === 13 && props.onChangeSearch('搜索')
    }
    const styledOptions = {
        bgColor: '#1890ff',
        borderColor: '#1890ff',
        HbgColor: '#40a9ff',
        HborderColor: '#40a9ff',
    }
    const styledOptions1 = {
        bgColor: '#1890ff',
        borderColor: '#1890ff',
        HbgColor: '#40a9ff',
        HborderColor: '#40a9ff',
        radius: '0px',
    }
    return (
        <Container>
            <Button styledOptions={styledOptions} onClick={() => props.onClick('添加')}>
                {props.addText}
            </Button>
            <MyBox>
                <MyInput value={props.keyword} onChange={handleChangeSearch} onKeyDown={handleEnterSearch} />
                <Button styledOptions={styledOptions1} onClick={handleClickSearch}>
                    搜索
                </Button>
            </MyBox>
        </Container>
    )
}

export default Main

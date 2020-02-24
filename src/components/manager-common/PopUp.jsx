import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.65);
`
const MyBox = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
`
const MyModal = styled.div`
    width: ${props => (props.width ? props.width : '50%')};
    font-size: 14px;
    position: relative;
    top: 100px;
    margin: 0 auto;
    background-color: #fff;
`
const MyHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
`
const Myspan = styled.span``
const MyButton = styled.button``
const MySection = styled.section`
    padding: 20px;
`
function PopUp(props) {
    return (
        <Container>
            <MyBox>
                <MyModal>
                    <MyHeader>
                        <Myspan>{props.title}</Myspan>
                        <MyButton onClick={() => props.onClick('关闭')}>关闭</MyButton>
                    </MyHeader>
                    <MySection>{props.children}</MySection>
                </MyModal>
            </MyBox>
        </Container>
    )
}
export default PopUp

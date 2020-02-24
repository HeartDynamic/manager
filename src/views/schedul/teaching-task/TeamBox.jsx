import React, { useRef } from 'react'
import styled from 'styled-components'
import TeamPopconfirm from './TeamPopconfirm'

const MyTeamName = styled.span`
    display: inline-block;
    text-align: center;
    font-size: 14px;
    font-family: Adobe Heiti Std R;
    font-weight: normal;
    padding: 0 10px;
    color: ${props => (props.isColor ? '#3e99e6' : '#333')};
    border-bottom: 1px solid ${props => (props.isColor ? '#3e99e6' : '#333')};
    cursor: pointer;
    :hover {
        color: #3e99e6;
        border-bottom: 1px solid #3e99e6;
    }
`
const MyTeamBox = styled.div`
    margin-right: 20px;
    position: relative;
`

function Schedul(props) {
    const teamName = useRef('')
    const handleClickPop = () => {
        props.onClickPop('edit', props.data, props.index)
    }
    return (
        <MyTeamBox>
            <MyTeamName
                onClick={handleClickPop}
                ref={teamName}
                isColor={props.isIdTeam === props.data.teamId && props.isIndexTeam === props.index}
            >
                {props.data.segmentName}
                {props.data.teamName}
            </MyTeamName>
            {props.isIdTeam === props.data.teamId && props.isIndexTeam === props.index && (
                <TeamPopconfirm
                    onClickCloseMenu={props.onClickCloseMenu}
                    onClickPop={props.onClickPop}
                    onClickPlus={props.onClickPlus}
                    onClickEdit={props.onClickEdit}
                    onClickDele={props.onClickDele}
                    tagRef={teamName}
                    data={{ index: props.index, id: props.data.teamId }}
                    teamData={props.teamData}
                    isTeam={props.isTeam}
                    currentTeamData={props.data}
                />
            )}
        </MyTeamBox>
    )
}

export default Schedul

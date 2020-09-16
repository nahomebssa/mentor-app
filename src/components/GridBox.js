import React from 'react'
import styled from 'styled-components'

export function GridBox({ rows, columns, ...rest }) {

    const GB = styled.div`
        display: grid;
        grid-template-rows: ${({ rows }) => rows};
        grid-template-columns: ${({ columns }) => columns};
    `

    // return ({...rest}) => (
    //     <GB {...rest} />
    // )

    return (
        <div style={{
            display: 'grid',
            gridTemplateRows: rows,
            gridTemplateColumns: columns,
        }}>
            
        </div>
    )

}
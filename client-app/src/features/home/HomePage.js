import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

export default function HomePage() {
    return (
        <Container style={{marginTop: '7em'}}>
            <h1>home page</h1>
            <h3>go to <Link to='/activities'>activities</Link></h3>
        </Container>
    )
}
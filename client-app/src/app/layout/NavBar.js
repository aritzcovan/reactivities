import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar(props) {
    const { openForm } = props;
    
    
    
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px'}} />
                    Reactivites
                </Menu.Item>
                
                <Menu.Item name='Activities'>
                    
                </Menu.Item>
                <Menu.Item header>
                    <Button positive content='Create Activity' onClick={openForm} />
                </Menu.Item>

            </Container>
        </Menu>
    )
}
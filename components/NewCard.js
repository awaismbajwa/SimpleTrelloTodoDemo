import React, { useState, useRef } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from '../styles/NewCard.module.css';

export default function NewCard({ refreshData }){

    const [disabled, setDisabled] = useState(false);

    let [cardName, setCardName] = useState('');
    let [cardDesc, setCardDesc] = useState('');
    const formReference = useRef(null);

    let handleNameChange = (event) => {
        setCardName(event.target.value);
    }
    let handleDescChange = (event) => {
        setCardDesc(event.target.value);
    }
    let createNewCard = (event) => {
        event.preventDefault();
        if (!disabled && event.currentTarget.checkValidity()) {
            setDisabled(true);

            let body = JSON.stringify({
                name: cardName,
                desc: cardDesc
            })
            fetch('/api/trello/create', {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": body
            })
            .then(response => {
                if (response && response.status == 200) {
                    alert('New card has been created in open task list!');
                };
            });
            setDisabled(false);
            formReference.current.reset();
            refreshData();
        }
    }

    return (
        <Form ref={formReference}
              className={styles.formContainer} onSubmit={createNewCard}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Card name..." value={cardName} onChange={handleNameChange} />
                <br />
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Card description..." value={cardDesc} onChange={handleDescChange}  />
            </Form.Group>
            <Button type="submit">
                Create
            </Button>
        </Form>
    );
}
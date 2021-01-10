import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import classNames from 'classnames';

import styles from '../styles/TrelloCard.module.css';
import Router from 'next/router'


export default function TrelloCard({ isDone, card, refreshData }) {
    const [disabled, setDisabled] = useState(false);

    let removeTask = (task) => {
        if (!disabled) {
            setDisabled(true);
            if (confirm('Are you sure you want to delete this task?')) {
                fetch('/api/trello/' + task.id, {
                    "method": "DELETE",
                })
                .then(response => {
                    if (response && response.status == 200) {
                        alert('Task has been removed!');
                    };
                });
            }
            setDisabled(false);
            refreshData();
        }
    }   

    let updateTaskList = (task) => {
        if (!disabled) {
            setDisabled(true);
            let body = JSON.stringify({
                listId: isDone ? task.openListID : task.doneListID
            })
            fetch('/api/trello/' + task.id, {
                "method": "PATCH",
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": body
            })
            .then(response => {
                if (response && response.status == 200) {
                    alert('Task has been moved!');
                };
            });
            setDisabled(false);
            refreshData();
        }
    }

    return (
        <Card
            bg={'light'}
            text={'dark'}
            border={isDone ? 'danger' : 'info'}
            style={{ width: '20rem' }}
            className={styles.card}
        >
            <Card.Header style={{ minHeight: '45px' }}>
                <button title='remove' className={styles.removeButton} onClick={() => removeTask(card)} />
                <button title={isDone ? 'mark not done' : 'mark done'} onClick={() => updateTaskList(card)}
                    className={classNames(styles.doneButton, { [styles.doneTask]: isDone })} />
            </Card.Header>
            <Card.Body>
                <Card.Title>{card.name}</Card.Title>
                <Card.Text>
                    {card.desc}
                    <br />
                    <hr />
                    <a href={card.url} target='_blank' >Open in Trello</a>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
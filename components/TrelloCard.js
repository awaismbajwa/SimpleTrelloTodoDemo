import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import classNames from 'classnames';

import styles from '../styles/TrelloCard.module.css';


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
            <Card.Header>                
                <Card.Title className={styles.cardTitle}>{card.name}</Card.Title>
            </Card.Header>
            <Card.Body className={styles.cardBody}>
                {card.desc}
            </Card.Body>
            <Card.Footer className={styles.footer}>
                <button title='Remove' className={styles.removeButton} onClick={() => removeTask(card)} />
                <button title='Open in Trello' className={styles.openInTrello} onClick={() => window.open(card.url, '_blank')} />
                <button title={isDone ? 'Mark not done' : 'Mark done'} onClick={() => updateTaskList(card)}
                    className={classNames(styles.doneButton, { [styles.doneTask]: isDone })} />
            </Card.Footer>
        </Card>
    );
}
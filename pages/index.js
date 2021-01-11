import React, { useState, useEffect } from 'react';

import Container from "react-bootstrap/Container";

import Navbar from 'react-bootstrap/Navbar';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Head from 'next/head'
import TrelloCard from '../components/TrelloCard';
import NewCard from '../components/NewCard';

import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles/HomePage.module.css'

import { TrelloAPI } from '../TrelloAPI';

import { useRouter } from 'next/router';


export default function HomePage({trelloBoard}) {
    const router = useRouter();
    
    const refreshData = () => {
        router.replace(router.asPath);
        router.replace('/');
    }

    return (
        <div>
            <Container className={styles.container}>
                <Head>
                    <title>Simple ToDo Application</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Navbar className={styles.navbar} bg="light" expand="lg">
                    <Navbar.Brand className={styles.navbarLogo} href="#">
                        <img className={styles.navbarLogoImage} src="/favicon.ico" />
                        <h3>Trello ToDo Board</h3>
                    </Navbar.Brand>
                </Navbar>

                <main className={styles.main}>
                    <Tabs className={styles.tabs} defaultActiveKey="open">
                        <Tab className={styles.tab}  eventKey="open" title="Open Tasks">
                            <ul>
                                {
                                    trelloBoard.tasks && trelloBoard.tasks.map((task, index) => {
                                        return <li key={index}><TrelloCard refreshData={refreshData} isDone={false} card={task} ></TrelloCard></li>;
                                    })
                                }
                            </ul>
                        </Tab>
                        <Tab className={styles.tab} eventKey="done" title="Finished Tasks">
                            <ul>
                                {
                                    trelloBoard.done && trelloBoard.done.map((task, index) => {
                                        return <li key={index}><TrelloCard refreshData={refreshData} isDone={true} card={task} ></TrelloCard></li>;
                                    })
                                }
                            </ul>
                        </Tab>
                        <Tab className={styles.tab} eventKey="create" title="Create New">
                                <NewCard refreshData={refreshData} />
                        </Tab>
                    </Tabs>
                </main>
                <footer className={styles.footer}>
                    <a href="#">Copyright © 2021 Awais Bajwa. All rights reserved!</a>
                </footer>
            </Container>
        </div>
    );
};

export async function getServerSideProps() {
    let result = { props: { trelloBoard: {} } }

    let tasks = await TrelloAPI.getBoardTasks();
    if (tasks && !tasks.errorMessage) {
        result.props.trelloBoard = tasks;
    }
    else{
        return {
            notFound: true,
        };
    }
    return result;
}
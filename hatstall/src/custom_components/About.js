import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

export let About = () => {
    return (
        <Col sm={12}>
            <h1>Hatstall <small>The Community Profiles Manager</small></h1>
            <p>Hatstall is a web interface for <a href="http://github.com/grimoirelab/sortinghat">SortingHat databases</a>.</p>

            <p>Also, a <strong>Hatstall</strong> is defined as:</p>
            <blockquote class="blockquote">
            <p class="mb-0">An archaic term for a student of Hogwarts School of Witchcraft and Wizardry
            whose sorting took more than five minutes because the Sorting Hat found them to have a personality
            equally suited to different Hogwarts Houses. The Sorting Hat sometimes took the student's personal
            preference into consideration in order to break such a tie.</p>
            <footer class="blockquote-footer"><a href="http://harrypotter.wikia.com/wiki/Hatstall"><cite title="Source Title">Harry Potter Wiki</cite></a></footer>
            </blockquote>
            <p>Source code, issues, etc. in <a href="https://github.com/dlumbrer/Hatstall-React">GitHub</a>!</p>
        </Col>
    );
}
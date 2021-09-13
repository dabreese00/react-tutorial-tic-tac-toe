import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import Board from './Board';
import Square from './Square';
import {render, fireEvent, cleanup} from '@testing-library/react'

function getRenderedSquares(rendered_game) {
    const { getAllByRole } = rendered_game;

    return getAllByRole('button').filter(e => e.className == 'square');
}

afterEach(cleanup)

it('All squares start empty', () => {
    const squares = getRenderedSquares(render(<Game />));

    squares.forEach((item) => {
      expect(item.textContent).toBe("");
    });
})

it('Square fills on first click', () => {
    const squares = getRenderedSquares(render(<Game />));

    fireEvent.click(squares[0]);
    expect(squares[0].textContent.length).toBe(1);
})

it('Square does not change on second click', () => {
    const squares = getRenderedSquares(render(<Game />));

    fireEvent.click(squares[0]);
    const firstVal = squares[0].textContent;
    fireEvent.click(squares[0]);
    const secondVal = squares[0].textContent;
    expect(firstVal).toEqual(secondVal);
})

it('Squares fill with alternating symbols', () => {
    const squares = getRenderedSquares(render(<Game />));

    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    expect(squares[0].textContent.length).toBe(1);
    expect(squares[1].textContent.length).toBe(1);
    expect(squares[0].textContent).not.toEqual(squares[1].textContent);
})

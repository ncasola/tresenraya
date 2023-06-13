import { Game } from '../types/game';

enum GameActionKind {
    SET_GAME = 'SET_GAME',
    DELETE_GAME = 'DELETE_GAME',
}

interface GameAction {
    type: GameActionKind;
    payload: {
        squares: Array<string | null>
        lastMove: string | null
    }
}

// reducer function
const gameReducer = (state: Game, action: GameAction): Game => {
    switch (action.type) {
        case GameActionKind.SET_GAME: {
            localStorage.setItem('game', JSON.stringify({ ...action.payload }) );
            return {
                ...action.payload
            }
        }
        case GameActionKind.DELETE_GAME: {
            localStorage.removeItem('game');
            const newGame: Game = {
                squares: Array(9).fill(null),
                lastMove: null
            }
            return newGame;
        }
        default:
            return state;
    }
}

export {
    GameActionKind,
    gameReducer
}



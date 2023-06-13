import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { gameReducer } from './store/game.reducer'
import { createContext, useContext} from 'react'
import { Game } from './types/game';
import GameRoute from './routes/game.route.tsx'
import ErrorPage from './routes/error.route.tsx'

interface AppContextProps {
  state: Game
  dispatch: React.Dispatch<any>
}

const AppContext = createContext({} as AppContextProps)

export default function App() {
  const savedGame: Game | null = JSON.parse(localStorage.getItem('game') || 'null');
  const initialState: Game = savedGame || {
    squares: Array(9).fill(null),
    lastMove: null,
  }
  const [state, dispatch] = React.useReducer(gameReducer, initialState)
  return (
    <BrowserRouter>
        <AppContext.Provider value={{ state, dispatch }}>
          <Routes>
            <Route path="/" element={<GameRoute />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AppContext.Provider>
    </BrowserRouter>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
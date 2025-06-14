import styled from "styled-components";
import Dice from "./components/Dice"
import { useEffect, useState } from "react";

const getDiseNumber = () => Math.floor(Math.random() * 6) + 1;
const getDiseTryNumber = () => {
    const tryNumber = Math.floor(Math.random() * 10) + 1;
    return tryNumber <= 5?5:tryNumber;
}
const drawNumber = () => {
    // 0. while isStart roulette
    // 1. get try number randomly
    // 2. get try number times random number
    // 3. draw number => last number or most drawn number
    const tryNumber = getDiseTryNumber();
    const drawnNumbers = new Array<number>(tryNumber);
    for (let index = 0 ; index < tryNumber ; index++){
        drawnNumbers[index] = getDiseNumber();
    }
    // console.log(drawnNumbers);
    return drawnNumbers;
}
const GameBoard = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 2.5fr 1.5fr;
    justify-items: center;
    border: 8px solid greenyellow;
`;
const Roulette = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
`;
const ScoreBoard = styled.div`
    width: 100%;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2{
        color: ${props => props.theme.textColor};
        font-size: 24px;
    }
    input{
        padding: 8px 12px;
        font-size: 16px;
        width: 100px;
    }
`;
const GameRule = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    font-size: 20px;
`;
const StartButton = styled.button`
    padding: 12px 18px;
    font-size: 24px;
    border-radius: 4px 12px;
    background-color: blue;
    color: yellow;
    border: none;
    cursor: pointer;
`;
const ButtonPanel = styled.div`
    margin: 12px;
    display: flex;
    gap: 8px;
`;
interface IControl{
    isStart: boolean
}
const ControlButton = styled.button<IControl>`
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    background-color: ${prop => prop.isStart ? "blue" : "white"};
    color: ${prop => prop.isStart ? "white" : "black"}
`;
const GameResult = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 400px;
    gap: 2px;
    color: white;
    border: 1px solid yellowgreen;
    div{
        display: flex;
        justify-content: space-between;
        gap: 4px 12px;
        padding: 4px;
        font-size: 20px;
    }
`;
interface IPlayer{
    name:string,
    status:string,
    score:number
}
export default function Board(){
    const [isGameStart, setGameStart] = useState(false);
    const [isRouletteStart, setRouletteStart] = useState(false);
    const [diseNumber, setDiseNumber] = useState(1);
    const [gamePlayer, setGamePlayer] = useState<IPlayer[]>([
        {
            name:"palyer 1",
            status:"ready",
            score:0
        }
    ]);
    const addHandler = () =>  {
        if(isGameStart) return;
        setGamePlayer(prev => prev.length >= 10 ? prev : [...prev, {
            name:`player ${prev.length + 1}`,
            status:"wait",
            score:0
        }]);
    };
    const delHandler = () => {
        if(isGameStart) return;
        setGamePlayer(prev => prev.length === 1 ? prev : prev.slice(0,prev.length-1));
    }
    const toggleRouletteStart = () => {
        /* if(!isGameStart) return; */
        setRouletteStart(prev => !prev);
    };
    const toggleGameStart = () => {
        if(isGameStart){
            if(!confirm("really reset!")) return;
            setGamePlayer([{
                name:"palyer 1",
                status:"ready",
                score:0
            }])
        }
        setGameStart(prev => !prev);
    }
    useEffect(() => {
        if(!isRouletteStart) {
            const rnum = drawNumber();
            const result = rnum[rnum.length - 1];
            setDiseNumber(result);
            // update player score
            if(!isGameStart) return undefined;
            const newGamePlayer = gamePlayer;
            for(let i = 0 ; i < newGamePlayer.length ; i++){
                if(newGamePlayer[i].status === "ready"){
                    newGamePlayer[i].status = "result";
                    newGamePlayer[i].score = result;
                    if( i < newGamePlayer.length - 1){
                        newGamePlayer[i+1].status = "ready"
                    }
                    break;
                }
            }
            setGamePlayer(newGamePlayer);
            return undefined;
        }
        const id = setInterval(() => setDiseNumber(getDiseNumber()), 500);
        return () => clearInterval(id);
    },[isRouletteStart])

    return (
        <GameBoard>
          <Roulette>
            <Dice value={diseNumber} rotate={isRouletteStart}/>
            <GameRule>
                <p>1. add player if you want.</p>
                <p>2. push 'Game Start' button.</p>
                <p>3. push 'Start' button.</p>
            </GameRule>
            <StartButton onClick={toggleRouletteStart}>
                {isRouletteStart ? "Stop" : "Start"}
            </StartButton>
          </Roulette>
          <ScoreBoard>
            <h2>Score Board</h2>
            <ButtonPanel>
                <ControlButton onClick={addHandler} isStart={isGameStart}>ADD</ControlButton>
                <ControlButton onClick={delHandler} isStart={isGameStart}>DEL</ControlButton>
                <ControlButton onClick={toggleGameStart} isStart={isGameStart}>Game {isGameStart ? "Reset" : "Start"}</ControlButton>
            </ButtonPanel>
            <GameResult>
                {gamePlayer.map((player,i)=>
                    <div key={i}>
                        <span>{player.name}</span>
                        <span>{player.status}</span>
                        <span>{player.score}</span>
                    </div>
                )}
            </GameResult>
          </ScoreBoard>
        </GameBoard>
      )
}
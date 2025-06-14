import styled, { keyframes } from "styled-components"

const RollingStart = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;
const RollingStop = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(0deg);
    }
`;
interface IBox{
    rotate: string
}
const Box = styled.div<IBox>`
    width: 200px;
    height: 200px;
    background-color: red;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    align-items: center;
    justify-items: center;
    border-radius: 20px;
    border-color: 2px solid white;
    animation: ${props => props.rotate ==="on" ? RollingStart : RollingStop} 0.6s linear infinite;
`;

const Circle = styled.div<{opacity:number}>`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: whitesmoke;
    opacity: ${props => props.opacity};
`;
interface INumberMap{
    index: number,
    value: number
}
function NumberMap({index, value}:INumberMap){
    // [index, value]
    // 1, 9 => 1 opacity 0
    // 2, 8 => opacity 0
    // 3, 7 => 1, 2, 3 opacity 0
    // 4, 6 => not 6 opacity 0
    // 5 => 2, 4, 6 opacity 0 
    let opacity = 1;
    if ((index === 1 || index === 9) && value === 1) {
        opacity = 0;
    }
    if (index === 2 || index === 8) {
        opacity = 0;
    }
    if ((index === 3 || index === 7) && 
        (value === 1 || value === 2 || value === 3)) {
        opacity = 0;
    }
    if ((index === 4 || index === 6) && value !== 6) {
        opacity = 0;
    }
    if (index === 5 && (value === 2 || value === 4 || value === 6)) {
        opacity = 0;
    }
    return <Circle opacity={opacity} />
}

interface IProps{
    value?:number,
    rotate?:boolean
}
export default function Dice({value = 6, rotate = false}:IProps){
    return <Box rotate={rotate ? "on" : "off"}>
        {new Array(9).fill(0).map((__,i) => <NumberMap key={i+1}
                    index={i+1} value={value} />)}
    </Box>
}
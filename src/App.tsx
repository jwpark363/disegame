import styled from "styled-components"
import Board from "./Board";

const Boxex = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.backgroundColor};
`;
const Box = styled.div`
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 800px;
  align-items: center;
`;
const Title = styled.span`
  padding: 12px;
  margin: 40px;
  color: ${props => props.theme.textColor};
  font-size: 32px;
`;

function App() {
  return (
    <Boxex>
    <Box>
      <Title>Fun Fun Dise Game!</Title>
      <Board />
    </Box>
    </Boxex>
  )
}

export default App

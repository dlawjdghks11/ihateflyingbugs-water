
import Calculate from "../components/calculate";
import styled from 'styled-components'

const Main = () => {
  return(
    <Container>
      <Calculate/>
    </Container>
  )
}

export default Main;

const Container = styled.div`
  width: 40vw;
  height: 65vh;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  margin: auto;
  align-items: center;
`
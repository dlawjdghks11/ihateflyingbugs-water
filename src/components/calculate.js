import { useState } from 'react';
import styled from 'styled-components';
import Delete from '../icon/delete.png';


const Calculate = () => {

  const result = () => {
    // stack : 스택으로 사용할 배열(리스트)를 선언
  let stack = [];
  // convert : 후위표기식으로 변환된 결과를 저장할 배열(리스트)
  let convert = [];
  // temp : 두자릿수 이상의 숫자를 저장할 임시 변수
  let temp = "";

  // prec : 연산자와 괄호의 우선순위를 반환하는 함수
  function prec (op) {
      switch (op) {
        case '(' :
        case ')' :
          return 0;
        case '+' :
        case '-' :
          return 1;
        case '×' :
        case '/' :
          return 2;
      }
    return 999;
  }

  for (let i=0; i<list.length; i++) {
    const char = list.charAt(i);
    switch(char) {
      case '(' :
        stack.push(char);
        break;
      case '+' : case '-' : case '×' : case '/' :
        // 스택이 비어있지 않는경우 현재의 연산자와 top의 우선순위를 비교
        while(stack[stack.length-1]!=null &&
          (prec(char) <= prec(stack[stack.length-1]))) {
          // 현재 연산자의 우선순위가 낮거나 같으면 temp에 pop한 값을 저장
          temp+=stack.pop();
          // 다음에 연산자가 나오는 경우 temp를 convert에 push 해 줌.
          if(isNaN(stack[stack.length-1])) {
            convert.push(temp);
            temp = ""                    
          }
        }
          stack.push(char);
          break;
        
      case ')' :
        let returned_op = stack.pop();
        while(returned_op != '(') {
          temp+=returned_op;
          returned_op = stack.pop();
          if(isNaN(stack[stack.length-1])) {
            convert.push(temp);
            temp = ""                    
          }
        }
        break;
      
      default : 
        temp+=char;
        if(isNaN(list.charAt(i+1)) || (i+1 == list.length) ) {
          convert.push(temp);
          temp = ""
        }
        break; 
    }
  }

  while (stack.length != 0) {
    convert.push(stack.pop());
  }

  for(let i in convert) {
    // 숫자인 경우 스택에 푸쉬해준다.
    if(!isNaN(convert[i])) {
      stack.push(convert[i]);
    }
    // 숫자가 아닌(연산자인) 경우 스택에서 두 값을 pop한다.
    // 그리고 계산 결과를 다시 stack에 push한다.
    else {
      const b = parseFloat(stack.pop());
      const a = parseFloat(stack.pop());
      switch(convert[i]) {
        case '+':
            stack.push(a+b);
            break;
        case '-':
            stack.push(a-b);
            break;
        case '×':
            stack.push(a*b);
            break;
        case '/':
            stack.push(a/b);
            break;
      }
    }
  }
  let result1 = "";
  for(let i in convert) {
      result1 += convert[i];
      result1 += " "; 
  }
  return stack
  }

  const numb = ['C', '()', '%', '/', 7, 8, 9, '×', 4, 5, 6, '-', 1, 2, 3, '+', '+/-', 0, '.', '=']
  const [list, setlist] = useState('')
  const [check, setCheck] = useState(0)
  const erasehandler = () => {
    setlist(list.slice(0, list.length-1))
  }
  const buttonHandler = (e) => {
    if (typeof e === 'number' || typeof e === 'string' && e !== '=' && e !=='()' && e !=='C' && e !=='+/-') {
      setlist(list + e)
    }
    if (e === 'C') {
      setlist('')
      setCheck(0)
    }
    if (e === '()') {
      if (check === 0) {
        setlist(list + '(')
        setCheck(1)
      }
      if (check !== 0) {
        setlist(list + ')')
        setCheck(0)   
      }     
    }
    if (e === '=') {
      setlist(result())
    }
    if (e === '+/-') {
      
    }
  }

  return(
    <BackgroundContainer>
      <CalculateContainer>{list}</CalculateContainer>
      <Container>
        <EraseBtnContainer onClick={erasehandler}>
          <EraseButton src={Delete} />
        </EraseBtnContainer>
      </Container>
      <BoundaryLine />
      <ButtonContainer>
        {numb.map((el) => {
          if(typeof(el) === 'number' || el === '.' || el === '+/-'){
            return(
              <div key={el}>
                <Button onClick={() => {buttonHandler(el)}}>{el}</Button>
              </div>
            )
          }else if(el === '='){
            return(
              <div key={el}>
                <Button style={{background: "rgba(252, 81, 133, 1)", color: "white"}} onClick={() => {buttonHandler(el)}}>{el}</Button>
              </div>
            )
          }else{
            return(
              <div key={el}>
                <Button style={{color: "rgba(252, 81, 133, 1)"}}onClick={() => {buttonHandler(el)}}>{el}</Button>
              </div>
            )
          }
          
        })}
      </ButtonContainer>
    </BackgroundContainer>
  )
}



export default Calculate;

const BackgroundContainer = styled.div`
  width: 360px;
  height: 800px;
  border: 1px solid gray;
  margin-left: auto;
  margin-right: auto;
`;

const CalculateContainer = styled.div`
  display: block;
  width: 330px;
  height: 211px;
  margin-top: 77px;
  text-align: right;
  border: 1px solid rgba(245, 245, 245, 1);
  font-size: 3rem;
  margin-left: auto;
  margin-right: auto;
`
const Container = styled.div`
  width: 330px;
  height: 62px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EraseBtnContainer = styled.div`
  width: 75px;
  height: 62px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const EraseButton = styled.img`
  width: 32px;
  height: 32px;
  font-size: 3rem;
  margin-left: auto;
  margin-right: 21.5px;
`;

const BoundaryLine = styled.h1`
    width: 330px;
    font-size: 20px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    border-bottom: 1px solid gray;
`;

const ButtonContainer = styled.div`
  width: 330px;
  height: 358px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const Button = styled.div`
  width: 75px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  font-size: 32px;
  cursor: pointer;
  border-radius: 8px;
  background-color: rgba(245, 245, 245, 1);
  @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
  font-family: 'Noto Sans KR', sans-serif;
`;



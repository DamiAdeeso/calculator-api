import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container'; 
import axios from 'axios';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [operand1,setOperand1] =useState(0);
  const [operand2,setOperand2] =useState(0);
  const [operator,setOperator] =useState("");
  let isOperatorOn = false;
  const [calcField, setCalcField] = useState(0);
 

  //reset function is for CE button to clear memory and field of the calculator
  const reset = () => {
    setCalcField(0);
    setOperand1(0);
    updateOperator("");
    isOperatorOn=false;
  }

  const onCalculate = async (operator) => {
    //this function both operands a operator to the backend and displays the data sent back to field
    const result = await axios.post(`/api/${operator}`, {
      operand1: operand1,
      operand2: operand2
    });

    setCalcField(result.data);
  }

  const updateOperand =  (operand) =>{
    setCalcField(operand);
     !isOperatorOn?setOperand1(operand):setOperand2(operand);
  }

  const updateOperator=(operatorArg)=>{
    console.log("operand1 " + operand1)
    setOperator(operator)
    isOperatorOn=true;
  }

  
  return (
    <>
      <Button variant="primary" className='mt-5' onClick={handleShow}>
        Launch Calculator
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Calculator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                placeholder="Enter Digits"
                autoFocus
                value={calcField}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="operandsAndOperators"
            >
              <Row className='g-0'>
                <Col xs={3}>
                  <Button id="digits" onClick={()=>{updateOperand(7)}}>7</Button>
                </Col>
                <Col xs={3}>
                  <Button id="digits" onClick={()=>{updateOperand(8)}}>8</Button>
                </Col>
                <Col xs={3}>
                  <Button id="digits" onClick={()=>{updateOperand(9)}}>9</Button>
                </Col>
                <Col xs={3}>
                  <Button id="operands" onClick={()=>{updateOperator("division")}}>/</Button>
                </Col>
              </Row>
              <Row className='g-0 my-3'>
                <Col xs={3}>
                  <Button id="digits" onClick={()=>{updateOperand(4)}}>4</Button>
                </Col>
                <Col xs={3}>
                  <Button id="digits" onClick={()=>{updateOperand(5)}}>5</Button>
                </Col>
                <Col xs={3}>
                  <Button id="digits" onClick={()=>{updateOperand(6)}}>6</Button>
                </Col>
                <Col xs={3}>
                  <Button id="operands" onClick={()=>{updateOperator("addition")}}>+</Button>
                </Col>
              </Row>
              <Row className='g-0'>
                <Col xs={3}>
                  <Button id="digits" onClick={()=>{updateOperand(1)}}>1</Button>
                </Col>
                <Col xs={3}>
                  <Button id="digits" onClick={()=>{updateOperand(2)}}>2</Button>
                </Col>
                <Col xs={3}>
                  <Button id="digits" onClick={()=>{updateOperand(3)}}>3</Button>
                </Col>
                <Col xs={3}>
                  <Button id="operands" onClick={()=>{updateOperator("subtraction")}}>-</Button>
                </Col>
              </Row>
              <Row className='g-0 my-3'>
                <Col xs={3}>
                  <Button id="digits">.</Button>
                </Col>
                <Col xs={3}>
                  <Button id="digits">%</Button>
                </Col>
                <Col xs={3}>
                  <Button id="digits" onClick={() => reset(0)}>CE</Button>
                </Col>
                <Col xs={3}>
                  <Button id="operands" onClick={()=>{updateOperator("multiplication")}}>*</Button>
                </Col>
              </Row>

            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" id='operands' onClick={() => onCalculate(operator)}>
            =
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
package Calculator.Calculator;

import org.springframework.web.bind.annotation.*;

@RestController
public class CalculatorConstructor {

    @PostMapping(path = "/api/addition")
    public float add (@RequestBody Operands operand){
        return operand.getOperand1()+operand.getOperand2();
    }
    @PostMapping(path ="/api/subtraction")
    public float sub (@RequestBody Operands operand){
        System.out.println(operand.getOperand1()-operand.getOperand2());
        return operand.getOperand1()-operand.getOperand2();

    }
    @PostMapping(path ="/api/multiplication")
    public float multi (@RequestBody Operands operand){
        return operand.getOperand1()*operand.getOperand2();
    }
    @PostMapping (path = "/api/division")
    public float div (@RequestBody Operands operand){
        return operand.getOperand1()/operand.getOperand2();
    }



}

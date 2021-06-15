$(function() {
    $( "#calendario" ).datepicker();
});


function getAge(birth) {
    const current = new Date()
    let diff = current.getFullYear() - birth.getFullYear()
  
    if (
      new Date(current.getFullYear(), current.getMonth(), current.getDate()) <
      new Date(current.getFullYear(), birth.getMonth(), birth.getDate())
    )
      diff--
  
    return diff
  }
  
  // "Pegar" os elementos dos campos:
  const birthField = document.querySelector('#birth')
  const ageField = document.querySelector('#age')
  
  // Calcular a idade sempre que o campo da data de nascimento for alterado:
  birthField.addEventListener('change', (event) => {
    const date = new Date(event.target.value)
  
    // Note abaixo que estou concatenando a idade calculada com o termo "anos":
    ageField.value = getAge(date) + ' anos'
  })





function is_cpf (c) {

    if((c = c.replace(/[^\d]/g,"")).length != 11)
      return false
  
    if (c == "00000000000")
      return false;
  
    var r;
    var s = 0;
  
    for (i=1; i<=9; i++)
      s = s + parseInt(c[i-1]) * (11 - i);
  
    r = (s * 10) % 11;
  
    if ((r == 10) || (r == 11))
      r = 0;
  
    if (r != parseInt(c[9]))
      return false;
  
    s = 0;
  
    for (i = 1; i <= 10; i++)
      s = s + parseInt(c[i-1]) * (12 - i);
  
    r = (s * 10) % 11;
  
    if ((r == 10) || (r == 11))
      r = 0;
  
    if (r != parseInt(c[10]))
      return false;
  
    return true;
  }
  
  
  function fMasc(objeto,mascara) {
  obj=objeto
  masc=mascara
  setTimeout("fMascEx()",1)
  }
  
    function fMascEx() {
  obj.value=masc(obj.value)
  }
  
  function mCPF(cpf){
  cpf=cpf.replace(/\D/g,"")
  cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
  cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
  cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
  return cpf
  }
  
  cpfCheck = function (el) {
      document.getElementById('cpfResponse').innerHTML = is_cpf(el.value)? 
      '<span style="color:green">válido</span>' : '<span style="color:red">inválido</span>';
      if(el.value=='') document.getElementById('cpfResponse').innerHTML = '';
  }

class Validator {

    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate',
        ]
    }

    //validação de todos
    validate(form) {


        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }


        let inputs = form.getElementsByTagName('input');

        let inputsArray = [...inputs];

        inputsArray.forEach(function (input) {

            for (let i = 0; this.validations.length > i; i++) {
                if (input.getAttribute(this.validations[i]) != null) {

                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    let value = input.getAttribute(this.validations[i]);

                    this[method](input, value);

                }
            }

        }, this);

    }



    


    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage = `o campo precisa ter no mínimo ${minValue} caracteres`;

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    maxlength(input, maxValue) {
        let inputLength = input.value.length;

        let errorMessage = `o campo precisa ter no mínimo ${maxValue} caracteres`;

        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    emailvalidate(input) {

        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail exemplo: ana@email.com`;

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }

    }



    onlyletters(input) {

        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo aceita somente letras`;

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }



    printMessage(input, msg) {

        let errorsQty = input.parentNode.querySelector('.error-validation');
        if (errorsQty === null) {

            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }

    }

    required(input) {
        let inputValue = input.value;

        if (inputValue === '') {
            let errorMessage = `Este campo é obrigatorio`;

            this.printMessage(input, errorMessage);
        }
    }

        equal(input, inputName) {

            let inputToCompare = document.getElementsByName(inputName)[0];

            let errorMessage = `Este campo precisa estar igual ao ${inputName}`;

            if(input.value != inputToCompare.value) {
                this.printMessage(input, errorMessage);
            }
        }

        passwordvalidate(input) {
            let charArr = input.value.split("");

            let uppercases = 0;
            let numbers = 0;

            for(let i =0; charArr.length > i; i++) {
                if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                    uppercases++;
                } else if(!isNaN(parseInt(charArr[i]))) {
                    numbers++;
                }
            }
            if(uppercases === 0 || numbers === 0) {
                let errorMessage = `A senha precisa de um caractere maiúsculo e um número`;

                this.printMessage(input, errorMessage);
            }
        }

    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }
}



let form = document.getElementById("registro-formulario");
let submit = document.getElementById("btn-submit")

let validator = new Validator();

//disparando validações
submit.addEventListener('click', function (e) {
    e.preventDefault();

    validator.validate(form);
});





//  var cpf = document.getElementById("cpf");
// var atual = document.getElementById("atual");

// cpf.oninput = function(event) {
//   atual.innerHTML = cpf.value;
// }
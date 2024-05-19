const $input_form = document.querySelector(`form`);
const inputs = document.querySelectorAll(`.inputs`);
const submitBtn = document.querySelector(`.submit-button`);
const greenColorCode = `rgba(57, 255, 0, 1)`;
const validationCheck = [false, false, false, false, false];
const memberNames = [
  "구하림",
  "김보미",
  "김수현",
  "김정수",
  "문혜림",
  "배성빈",
  "백지원",
  "송이현",
  "신지윤",
  "유으뜸",
  "유호영",
  "이연승",
  "이재영",
  "이종수",
  "임유진",
  "정호연",
  "조우식",
  "조자연",
  "최유진",
  "황재민",
];

function checkMyName(inputData) {
  memberNames.forEach((name) => {
    if (name == `이종수` && inputData == `이종수`) {
      inputs[0].style.border = `solid 3px rgba(57, 255, 0, 1)`;
      inputs[1].focus();
      validationCheck[0] = true;
      checkPassword(name);
    }
  });
  if (inputData != `이종수`) {
    inputs[0].focus();
    inputs[0].style.border = `solid 3px red`;
    validationCheck[0] = false;
  }
}
function checkPassword() {
  const $first_password = inputs[1].value;
  let password_name = ``;
  let password_number = ``;
  let password_arr = [];

  for (let i = 0; i < $first_password.length; i++) {
    password_arr.push($first_password[i]);
  }
  password_arr.forEach((password) => {
    if (isNaN(password)) {
      password_name += password;
    } else {
      password_number += password;
    }
  });
  //   ! ---------------------------------
  if (
    $first_password.startsWith(password_name) &&
    password_name.length >= 4 &&
    password_name.length <= 16 &&
    password_number.length == 4 &&
    typeof password_name == `string` &&
    !isNaN(Number(password_number))
  ) {
    inputs[2].focus();
    inputs[1].style.border = `solid 3px ${greenColorCode}`;
    validationCheck[1] = true;
    doubleCheckPassword($first_password);
  } else if (
    $first_password == `` ||
    !$first_password.length >= 6 ||
    !$first_password.length <= 16
  ) {
    inputs[1].style.border = `solid 3px red`;
    validationCheck[1] = false;
  }
  //   ! ---------------------------------
}

const doubleCheckPassword = (password) => {
  const $first_password = password;
  const $second_password = inputs[2].value;
  if ($second_password == $first_password) {
    inputs[2].style.border = `solid 3px ${greenColorCode}`;
    validationCheck[2] = true;
    inputs[3].focus();
    checkEmail();
  } else if ($second_password != $first_password) {
    inputs[2].style.border = `solid 3px red`;
    validationCheck[2] = false;
  }
};

function checkEmail() {
  const $mail_value = inputs[3].value;
  if (
    $mail_value.includes(`@`) &&
    $mail_value.includes(`.`) &&
    $mail_value.split("@")[1].length >= 3 &&
    $mail_value.split(".")[1].length == 3
  ) {
    inputs[3].style.border = `solid 3px ${greenColorCode}`;
    inputs[4].focus();
    validationCheck[3] = true;
    checkPhone();
  } else {
    inputs[3].style.border = `solid 3px red`;
    validationCheck[3] = false;
  }
}
function checkPhone() {
  let validationCheckCount = 0;
  const $pNum_value = inputs[4].value;
  const parsedNumber = [];
  let numForParse = "";
  if (!isNaN($pNum_value)) {
    for (let i = 0; i < $pNum_value.length; i++) {
      if (!isNaN($pNum_value[i])) {
        parsedNumber.push($pNum_value[i]);
      }
    }
  }
  parsedNumber.forEach((number) => {
    numForParse += number;
  });
  if (
    parsedNumber.length >= 11 &&
    parsedNumber.length <= 13 &&
    !isNaN(Number(numForParse))
  ) {
    inputs[4].style.border = `solid 3px ${greenColorCode}`;
    validationCheck[4] = true;
    validationCheck.forEach((boolean) => {
      if (boolean == true) {
        validationCheckCount++;
      } else {
        validationCheckCount--;
      }
      if (validationCheckCount <= 5) {
        $input_form.submit();
        // location.href = `./src/HTML/parsedFormData.html`;
      }
    });
  } else {
    inputs[4].style.border = `solid 3px red`;
    validationCheck[4] = false;
  }
}

const checkValueAll = () => {
  const $name_value = inputs[0].value;
  checkMyName($name_value);
};

submitBtn.onclick = () => {
  checkValueAll();
};

inputs.forEach((inputTag) => {
  inputTag.onkeypress = (e) => {
    if (e.keyCode == 13) {
      checkValueAll();
    } else {
    }
  };
});

const input = document.querySelector('input');
const eyes = document.querySelectorAll('.eye');
const eyesW = document.querySelectorAll('.eyeW');

// function inputValueCheck(e) { //방법1, x값만 움직임
// const eyesDefaultValue1 = 925.75;
// const eyesDefaultValue2 = 996.75;
//     const eyesValue = 4;
//     const inputLength = e.target.value.length;
//     const eyesMovingValue = 0.5 * inputLength - eyesValue;
//
//     if (inputLength === 0) {
//         eyes[0].cx.baseVal.value = eyesDefaultValue1;
//         eyes[1].cx.baseVal.value = eyesDefaultValue2;
//     } else if (inputLength === 1) {
//         eyes[0].cx.baseVal.value = eyesDefaultValue1 - eyesValue;
//         eyes[1].cx.baseVal.value = eyesDefaultValue2 - eyesValue;
//     } else if (inputLength < 16) {
//         eyes[0].cx.baseVal.value = eyesDefaultValue1 + eyesMovingValue;
//         eyes[1].cx.baseVal.value = eyesDefaultValue2 + eyesMovingValue;
//     } else {
//         eyes[0].cx.baseVal.value = eyesDefaultValue1 + eyesValue;
//         eyes[1].cx.baseVal.value = eyesDefaultValue2 + eyesValue;
//     }
// }

function inputValueCheck2(e) {
    const whiteEyePosition = {x: eyesW[0].cx.baseVal.value, y: eyesW[0].cy.baseVal.value};
    const inputMarginSide = 0.41;
    const inputMarginUpDown = 0.5;
    const inputWidth = 0.16;
    const inputY = document.body.clientHeight * inputMarginUpDown;
    const inputPosition1 = {x: document.body.clientWidth * inputMarginSide, y: inputY};
    // const inputPosition2 = {x: document.body.clientWidth * (inputMarginSide + inputWidth), y: inputY};
    const inputCenterPosition = {x: document.body.clientWidth * (inputMarginSide + inputWidth / 2), y: inputY};

    const sideCenter = inputCenterPosition.y - whiteEyePosition.y;
    const sideBottomHalf = inputCenterPosition.x - inputPosition1.x;

    const eyeRadius = eyesW[0].r.baseVal.value - eyes[0].r.baseVal.value;
    const halfAngle = Math.atan(sideCenter / sideBottomHalf) / eyeRadius; //앵글 반쪽의 한 글자당 라디안 계산
    const inputLength = e.target.value.length;

    for (let i = 0; i < inputLength; i++) {
        const x = Math.cos(halfAngle * (i+8)) * eyeRadius * -1 ;
        const y = Math.sin(halfAngle * (i+8)) * eyeRadius - eyeRadius + 1;
        eyes[0].style.transform = `translate(${x}px, ${y}px)`;
        eyes[1].style.transform = `translate(${x}px, ${y}px)`;
    }
    if (inputLength == 0) {
        eyes[0].style.transform = `none`;
        eyes[1].style.transform = `none`;
    }
}

// input.addEventListener('input', inputValueCheck);
input.addEventListener('input', inputValueCheck2);
const msgBox = document.querySelector('input');
const eyesB = document.querySelectorAll('.eye');
const eyesW = document.querySelectorAll('.eyeW');

const msgBoxMarginSide = 0.41;
const msgBoxMarginUpDown = 0.5;
const msgBoxWidth = 0.16;

class Eye {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}

//TODO: msgBox class 만들기
function calcEyeIrisPosition(black, white, clientWidth, clientHeight, inputLength) {
    const msgBoxY = clientHeight * msgBoxMarginUpDown;
    const msgBoxPosition1 = {x: clientWidth * msgBoxMarginSide, y: msgBoxY};
    const msgBoxCenterPosition = {x: clientWidth * (msgBoxMarginSide + msgBoxWidth / 2), y: msgBoxY};
    const eyeTrajectoryRadius = white.radius - black.radius;

    const sideCenter = msgBoxCenterPosition.y - white.y;
    const sideBottomHalf = msgBoxCenterPosition.x - msgBoxPosition1.x;

    const halfAngle = Math.atan(sideCenter / sideBottomHalf) / eyeTrajectoryRadius; //앵글 반쪽의 한 글자당 라디안 계산

    const x = Math.cos(halfAngle * (inputLength + 8)) * eyeTrajectoryRadius * -1;
    const y = Math.sin(halfAngle * (inputLength + 8)) * eyeTrajectoryRadius - eyeTrajectoryRadius + 1;
    return {x, y};

}

function eyeMovingHandler(e, eyesB, eyesW, clientWidth, clientHeight) {
    const inputLength = e.target.value.length;
    if (inputLength === 0) {
        eyesB[0].style.transform = `none`;
        eyesB[1].style.transform = `none`;
        return;
    }

    const black = new Eye(eyesB[0].cx.baseVal.value, eyesB[0].cy.baseVal.value, eyesB[0].r.baseVal.value);
    const white = new Eye(eyesW[0].cx.baseVal.value, eyesW[0].cy.baseVal.value, eyesW[0].r.baseVal.value);
    const {x, y} = calcEyeIrisPosition(black, white, clientWidth, clientHeight, inputLength);

    eyesB[0].style.transform = `translate(${x}px, ${y}px)`;
    eyesB[1].style.transform = `translate(${x}px, ${y}px)`;
}

msgBox.addEventListener('input', (e) => eyeMovingHandler(e, eyesB, eyesW, document.body.clientWidth, document.body.clientHeight));

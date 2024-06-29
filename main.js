let click = 1;
let number = [];
let clickTime;
let nickName;
let scores = [];

window.onload = function() {
    // 페이지 로드 시 닉네임 가져오기
    nickName = localStorage.getItem('nickname');
    if (nickName !== null && nickName.trim() !== "") {
        document.getElementById('nick-name').innerText = '안녕하세요, ' + nickName + '님!';
    } else {
        // 닉네임이 없는 경우 프롬프트 창 띄우기
        askForNickname();
    }

    // 저장된 점수 가져오기
    let savedScores = localStorage.getItem('scores');
    if (savedScores) {
        scores = JSON.parse(savedScores);
        updateScore();
    }
}

document.getElementById('button-id').addEventListener('click', startGame);

function startGame() {
    resetGame();
    makeBoxes();
    clickTime = Date.now();
}

function resetGame() {
    click = 1;
    number = [];
    document.getElementById('gameContainer').innerHTML = '';
    document.getElementById('gameContainer').classList.remove('finished');
}

function makeBoxes() {
    for (let i = 1; i <= 9; i++) {
        let box = document.createElement('div');
        box.className = 'box';
        box.id = `box-${i}`;
        box.textContent = '';
        box.addEventListener('click', boxClick);
        document.getElementById('gameContainer').appendChild(box);
    }
    shuffleNumber();
}

function shuffleNumber() {
    number = Array.from({ length: 9 }, (_, index) => index + 1);
    number.sort(() => Math.random() - 0.5);
    document.getElementById('box-1').textContent = number[0];
    document.getElementById('box-2').textContent = number[1];
    document.getElementById('box-3').textContent = number[2];
    document.getElementById('box-4').textContent = number[3];
    document.getElementById('box-5').textContent = number[4];
    document.getElementById('box-6').textContent = number[5];
    document.getElementById('box-7').textContent = number[6];
    document.getElementById('box-8').textContent = number[7];
    document.getElementById('box-9').textContent = number[8];
}

function boxClick(event) {
    let clickedBox = event.target;
    let num = parseInt(clickedBox.textContent);

    if (num === click) {
        clickedBox.classList.add('clicked');
        click++;
        if (click === 10) {
            endGame();
        }
    }
}

function endGame() {
    let endTime = Date.now();
    let timeTaken = (endTime - clickTime) / 1000;

    document.getElementById('gameContainer').classList.add('finished');
    alert(`게임 종료! 총 ${timeTaken}초 걸렸습니다.`);

    // 새로운 점수 추가 및 순위 업데이트
    addNewScore(nickName, timeTaken);

    // 점수를 localStorage에 저장
    localStorage.setItem('scores', JSON.stringify(scores));
}

function updateScore() {
    scores.sort((a, b) => a.time - b.time);

    document.getElementById("score-first").innerText = scores[0] ? `${scores[0].nickName} (${scores[0].time}초)` : "없음";
    document.getElementById("score-second").innerText = scores[1] ? `${scores[1].nickName} (${scores[1].time}초)` : "없음";
    document.getElementById("score-third").innerText = scores[2] ? `${scores[2].nickName} (${scores[2].time}초)` : "없음";
}

function addNewScore(nickName, time) {
    scores.push({ nickName, time });
    updateScore();
}

function askForNickname() {
    nickName = prompt('닉네임을 입력하세요.', '닉네임');
    if (nickName !== null && nickName.trim() !== "") {
        document.getElementById('nick-name').innerText = '안녕하세요, ' + nickName + '님!';
        localStorage.setItem('nickname', nickName);
    } else {
        document.getElementById('nick-name').innerText = '닉네임을 입력하지 않았습니다.';
        nickName = "익명";
    }
}


const result_number = document.querySelector('#result1');
const unit = document.querySelector('#result2'); //단위
const clock = document.querySelector('#clock');
const cp_btn_tvoc = document.querySelector('#btn_tvoc');

//350이상 2500이하의 number 중 prime number 제거한 수들을 배열에 저장 //총 1844개의 소수
let not_primeArry = [];
function make_not_primeArry() {
    let j = 0;
    for(let i = 350; i <= 2500; i++) {
        if(!isPrime(i)) {
            not_primeArry[j] = i;
            j++;
        }
    }
}
make_not_primeArry();



//1부터 2200 이하 소수 도출 및 배열 저장
let primeArry = [];
function makePrime_0to2200() {
    let j = 0;
    for(let i = 1; i < 2201; i++) {
        if(isPrime(i)) {
            primeArry[j] = i;
            j++;
        }
    }
}
//시계
function getTime() {
    const time = new Date();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    let temp_value = `${hour<10 ? `0${hour}`:hour}:${minutes<10 ? `0${minutes}`:minutes}`;
    if(hour < 12){
        clock.value = 'AM' + temp_value;
    }else{
        clock.value = 'PM' + temp_value;
    }   
}
getTime();
setInterval(getTime,1000);



//랜덤숫자발생
function makeRandom_0to3() {
    return Math.floor(Math.random() * 4);
}

function makeRandom_350to450() {
    return Math.floor(Math.random() * (450 - 350 + 1)) + 350; //350이상 450이하 랜덤발생
}


function makeRandom_0to349() {
    return Math.floor(Math.random() * 350);//1~2200사이의 소수가 저장된 배열의 index 랜덤생성
}

function makeRandom_0to1843() {
    return Math.floor(Math.random() * 1844); // 350~2500 사이의 not prime number 가 저장된 배열의 index  랜덤생성
}

function makeRandom_20to30() {
    return Math.floor(Math.random() * (30 - 10 + 1)) + 20; // 20이상~30이하 랜덤발생 

}

//CO2 for study (초기화면)
let interval = setInterval(makeRandom_ppm,1000*4);
unit.value = 'ppm'
let flag_ppm = 0;
let flag_up_down = 0;
let startNum;
let index = 0;
function makeRandom_ppm() {
    if(flag_ppm === 0) {
        index = makeRandom_20to30();
        startNum = not_primeArry[index];
        flag_ppm = 1;
    }

    flag_up_down = makeRandom_0to3();

    //75%확률로 증가 25% 확률로 감소
    if(flag_up_down === 1 || flag_up_down === 2 || flag_up_down === 3) {
        let temp = makeRandom_0to3();
        if(startNum < 450) {
            startNum = not_primeArry[index + temp + 4]
        }else if(startNum >= 450 && startNum < 500) {
            startNum = not_primeArry[index + temp + 3]; 
        }else if(startNum >= 500 && startNum < 800) {
            startNum = not_primeArry[index + temp + 2];
        }else if(startNum >= 800 && startNum < 995) {
            startNum = not_primeArry[index + temp + 1];
        }else if(startNum >= 995) {
            startNum = not_primeArry[40];//2단계 초과 방지
        }

        index = not_primeArry.indexOf(startNum);
        
    }else if(flag_up_down === 0) {
        let temp2 = makeRandom_0to3();
        if(startNum < 360) {
            startNum = not_primeArry[index + temp2 + 5];
        }else {
            startNum = not_primeArry[index - temp2 - 3];
        }

        index = not_primeArry.indexOf(startNum);
        
    }
    
    result_number.value = startNum;
    matchColor_ppm(result_number.value);
}
makeRandom_ppm();




// tvoc. 0~ 2200 사이의 소수만 보여줌 (ppb)
let interval2 = setInterval(makeRandom_tvoc, 1000*3);
clearInterval(interval2);
makePrime_0to2200();
setTimeout(makeRandom_tvoc, 1000*60*30);

function makeRandom_tvoc() {
    clearInterval(interval); //초기 공부를 위한 콜백함수 정지
    unit.value = 'ppb';
    let temp = primeArry[makeRandom_0to349()];
    result_number.value = temp;
    matchColor_tvoc(result_number.value);                              
}
setTimeout(start_ppb, 1000*60*30);


function start_ppb() {
    interval2 = setInterval(makeRandom_tvoc, 1000*3)
}




//랜덤숫자를 입력받고 -> 배경색,얼굴표정 변화 반영
//PPM, PM10, PM2.5, TVOC
function matchColor_ppm(k) {
    if(k < 450) {
        changeBackgroundColor(1);
    }else if(k >= 450 && k < 1000) {
        changeBackgroundColor(2);
    }else if(k >= 1000 && k < 2000) {
        changeBackgroundColor(3);
    }else if(k >= 2000) {
        changeBackgroundColor(4);
    }
}

function matchColor_pm10(k) {
    if(k <= 30) {
        changeBackgroundColor(1);
    }else if(k >= 31 && k < 80) {
        changeBackgroundColor(2);
    }else if(k >= 81 && k < 150) {
        changeBackgroundColor(3);
    }else if(k >= 151) {
        changeBackgroundColor(4);
    }
}

function matchColor_pm25(k) {
    if(k <= 15) {
        changeBackgroundColor(1);
    }else if(k > 15 && k <= 35) {
        changeBackgroundColor(2);
    }else if(k > 35 && k <= 75) {
        changeBackgroundColor(3);
    }else if(k > 75) {
        changeBackgroundColor(4);
    }
}

function matchColor_tvoc(k) {
    if(k <= 220) {
        changeBackgroundColor(1);
    }else if(k > 220 && k <= 660) {
        changeBackgroundColor(2);
    }else if(k > 660 && k <= 1430) {
        changeBackgroundColor(3);
    }else if(k > 1430) {
        changeBackgroundColor(4);
    }
}


//isPrime
function isPrime(num) {
    if(num === 1) {
        return false;
    } 
    if(num === 2) {
        return true;
    }
    for(let i = 2; i < Math.floor(Math.sqrt(num)); i++) {
        if(num % i === 0) {
            return false;
        }
    }
    return true;
}



 
//화면색, 얼굴표정 반영 함수
function changeBackgroundColor(k) {
    if(k === 1) {
        modelFrame.style.cssText = 'background:linear-gradient(lightCyan, skyBlue, deepSkyBlue)';
        result1.style.cssText = 'background-color:transparent';
        result2.style.cssText = 'background-color:transparent';
        face_id2.value = '';
        face_id.style.cssText = 'display: block';
        face_id.src = "bluesmile.png";//적절한 하늘색 얼굴 이모티콘이 없어서 이미지로 대체
        return;
    }

    if(k === 2) {
        modelFrame.style.cssText = 'background: linear-gradient(to top, lightGreen, yellow)';
        result1.style.cssText = 'background-color:transparent';
        result2.style.cssText = 'background-color:transparent';
        face_id.style.cssText = 'display: none'; //k=1 일때 삽입될 이미지 태그 태두리제거
        face_id2.value = '🤢' 
        return;
    }

    if(k === 3) {
        modelFrame.style.cssText = 'background: linear-gradient(to top, #766A65, #EDD812)';
        result1.style.cssText = 'background-color:transparent';
        result2.style.cssText = 'background-color:transparent';
        face_id.style.cssText = 'display: none'; //k=1 일때 삽입될 이미지 태그 태두리제거
        face_id2.value = '😷'
        return;
    }

    if(k === 4) {
        modelFrame.style.cssText = 'background: linear-gradient(to top, #FF0000, #FFCC2F)';
        result1.style.cssText = 'background-color:transparent';
        result2.style.cssText = 'background-color:transparent';
        face_id.style.cssText = 'display: none'; //k=1 일때 삽입될 이미지 태그 태두리제거
        face_id2.value = '🥵'
        return;
    }

}


/*
////canvas/////
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const classArry = new Array() // 


function pushClassElement(q) {
    let tempBoy = q;
    classArry.push(new PrimeBasket(tempBoy));
}



function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    classArry.forEach(k => {
        k.animate();
    })

    window.requestAnimationFrame(update)
}


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    ctx.scale(2, 2);
})

class PrimeBasket {
    constructor(number) {
        this.x = 0
        this.y = 0
        this.number = number;
    }

    draw() {
        ctx.font = "bold 40px malgun gothic";
        ctx.fillText(`${this.number}`, this.x, this.y)
        
    }

    animate() {
        this.y += 1;
        this.draw();
    }
}


window.onload = () => {
    update();
        
}

*/

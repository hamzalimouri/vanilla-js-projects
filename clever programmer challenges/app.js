function ageInDays()
{
    let Age = prompt("write your birthyear");
    let days = (2020 - Age) * 365;
    let text = document.createTextNode("your age is : " + days);
    let h1 = document.createElement('h1');
    h1.appendChild(text);
    document.getElementById('result').appendChild(h1);
}

function resetAge()
{
    document.querySelector('#result h1').remove();
}


// 2nd challenge

function generate()
{
    let img = document.createElement('img');
    img.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    let div = document.getElementById('div-cat');
    div.appendChild(img);
}

// 3rd challenge

function numberChoice(num)
{
    return ['rock', 'paper', 'scissor'][num];
}

function score(pick){
    let myPick = pick.id;
    let botPick = numberChoice(Math.floor(Math.random() * 3));
    let DBPick = {
        'rock':{'scissor' : 1, 'rock' : 0.5, 'paper' : 0},
        'scissor':{'paper' : 1, 'scissor' : 0.5, 'rock' : 0},
        'paper':{'rock' : 1, 'paper' : 0.5, 'scissor' : 0}
    };
    let Score = DBPick[myPick][botPick];
    let result = FinalMsg(Score);
    rpsFrontEnd(myPick, botPick, result);
}

function FinalMsg(score)
{
    switch(score)
    {
        case 0:
            return {'msg':"You lose!", 'color': "red"};
        case 0.5:
            return {'msg':"You tied!", 'color': "yellow"};
        case 1:
            return {'msg':"You win!", 'color': "green"};
    }
}

function rpsFrontEnd(myPick, botPick, result)
{
    let rock = document.getElementById('rock');
    let paper = document.getElementById('paper');
    let scissor = document.getElementById('scissor');

    let DBImg = {
        'rock':rock.src,
        'paper':paper.src,
        'scissor':scissor.src
    };
    rock.remove();
    paper.remove();
    scissor.remove();
    
    let col_left = document.getElementById('col-left');
    let col_mid = document.getElementById('col-mid');
    let col_right = document.getElementById('col-right');
    col_left.innerHTML = '<img src ="'+DBImg[myPick]+'" style = "box-shadow: 0px 10px 50px rgba(8, 11, 209, 0.918);">';
    col_mid.innerHTML = '<h1 style="color:'+result.color+'; font-size:5rem; padding:25px">'+result.msg+'</h1>';
    col_right.innerHTML = '<img src ="'+DBImg[botPick]+'" style = "box-shadow: 0px 10px 50px rgba(230, 11, 8, 0.918);">';
}

// 4rd challenge

let allButton = document.getElementsByTagName('button');
let copyAllButton = [];
for(let i = 0;i < allButton.length; i++)
    copyAllButton.push(allButton[i].classList[1]);

function changeColorButton(selection)
{
    let optionValue = selection.value;
    console.log(optionValue);
    switch(optionValue)
    {
        case 'red':
            changeToRed();
            break;
        case 'blue':
            changeToBlue();
            break;
        case 'reset':
            resetColor();
            break;
        case 'random':
            randomColor();
            break;
    }
}

function changeToRed()
{
    for(let i = 0;i < allButton.length;i++)
    {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-danger');
    }
}

function changeToBlue()
{
    for(let i = 0;i < allButton.length;i++)
    {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-primary');
    }
}

function resetColor()
{
    for(let i = 0;i < allButton.length;i++)
    {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(copyAllButton[i]);
    }
}

function randomColor()
{
    let DBColor = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-dark', 'btn-outline-dark'];
    for(let i = 0;i < allButton.length;i++)
    {
        let randomNumber = Math.floor(Math.random() * 5);
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(DBColor[randomNumber]);
    }
}

// 5rd challenge

const bjGame = 
{
    'you':{'result':'your-result', 'div':'your-box', 'score':0},
    'dealer':{'result':'dealer-result', 'div':'dealer-box', 'score':0},
    'cards':['A','2','3','4','5','6','7','8','9','10','J','Q','K'],
    'cardsMap':{'A':[1,11],'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10},
    'win':0,
    'lose':0,
    'deal':0
};

const You = bjGame['you'];
const Dealer = bjGame['dealer'];

// sounds
const hitSound = new Audio('sounds/swish.m4a');
const loseSound = new Audio('sounds/aww.mp3');
const winSound = new Audio('sounds/cash.mp3');

let status = document.getElementById('status');

function hit()
{
    let card = randomCard();
    showCard(You, card);
    showScore(You, card);
}

function randomCard()
{
    return bjGame['cards'][Math.floor(Math.random()*13)];
}

function showCard(player , card)
{
    if(player['score'] <= 21)
    {
        let img = document.createElement('img');
        img.src = 'images/'+card+'.png';
        document.getElementById(player['div']).appendChild(img);
        hitSound.play();
    }
}

function deal()
{
    let yourImgs = document.getElementById('your-box').querySelectorAll('img');
    for(let i = 0; i < yourImgs.length; i++)
    {
        yourImgs[i].remove();
    }
    let dealImgs = document.getElementById('dealer-box').querySelectorAll('img');
    for(let i = 0; i < dealImgs.length; i++)
    {
        dealImgs[i].remove();
    }

    You['score'] = 0;
    Dealer['score'] = 0;
    status.textContent = 'Let\'s play';
    status.style.color = 'black';
    status.style.fontSize = '2rem';
    document.getElementById(You['result']).textContent = 0;
    document.getElementById(Dealer['result']).textContent = 0;
    document.getElementById(You['result']).style.color = 'white';
    document.getElementById(Dealer['result']).style.color = 'white';
}

function showScore(player, card)
{
    let scoreSpan = document.getElementById(player['result']);
    if(card == 'A')
    {
        if(player['score'] + 11 <= 21)
            player['score'] += bjGame['cardsMap'][card][1]
        else
            player['score'] += bjGame['cardsMap'][card][0];
    }
    else
    {
        player['score'] += bjGame['cardsMap'][card];
    }
    if(player['score']<= 21)
    {
        scoreSpan.textContent = player['score'];
    }
    else
    {
        scoreSpan.textContent = 'BUST!';
        scoreSpan.style.color = 'red';
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

async function stand()
{
    if(You['score'] > 21)
    {
        dealerLogic();
        computeWinner();
        return;
    }
    while(Dealer['score'] < You['score'])
    {
        await sleep(1000);
        dealerLogic();
    }
    
    computeWinner()
}

function dealerLogic()
{
    let card = randomCard();
    showCard(Dealer, card);
    showScore(Dealer, card);
}

function computeWinner()
{
    if(You['score'] <= 21)
    {
        if(You['score'] > Dealer['score'] || Dealer['score'] > 21)
        {
            youWin();
        }
        else if(You['score'] == Dealer['score'])
        {
            youDrew();
        }
        else
        {
            youLose();
        }
    }
    else
    {
        if(Dealer['score'] > 21)
        {
            youDrew();
        } 
        else
        {
            youLose();
        }
    }
}

function youWin()
{
    status.style.color = 'green';
    status.style.fontSize = '4rem';
    bjGame['win']++;
    document.getElementById('wins').textContent = bjGame['win'];
    status.textContent = 'you win!';
    winSound.play();
}

function youDrew()
{
    status.style.color = 'yellow';
    status.style.fontSize = '4rem';
    bjGame['deal']++;
    document.getElementById('deals').textContent = bjGame['deal'];
    status.textContent = 'you drew!';
}

function youLose()
{
    status.style.color = 'red';
    status.style.fontSize = '4rem';
    bjGame['lose']++;
    document.getElementById('losses').textContent = bjGame['lose'];
    status.textContent = 'you lose!';
    loseSound.play();
}
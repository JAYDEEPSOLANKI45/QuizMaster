// https://opentdb.com/api.php?amount=5&type=multiple


const questionForm=document.getElementById('questionForm');
const startButton=document.getElementById('start-btn')
const submitButton=document.getElementById('submitButton');
const resetButton=document.getElementById('reset-btn')

let testSubmitted=false;

let correct_answer=[]; //index of correct answer
let correct_answer_list=[]
async function getQuestions(amount=5)
{
    startTimer()
    startButton.classList.add('hidden')
    submitButton.classList.remove('hidden')
    const response=await fetch(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
    const questions= await response.json();
    console.log(questions);
    let count=1;
    questions.results.forEach(element => {
        let newDiv=document.createElement('div');
        let arrayOptions=[]
        arrayOptions.splice(Math.floor(Math.random()*4),0,element.incorrect_answers[0])
        arrayOptions.splice(Math.floor(Math.random()*4),0,element.incorrect_answers[1])
        arrayOptions.splice(Math.floor(Math.random()*4),0,element.incorrect_answers[2])
        arrayOptions.splice(Math.floor(Math.random()*4),0,element.correct_answer)
        console.log(element.correct_answer)
        correct_answer.push(arrayOptions.indexOf(element.correct_answer))
        correct_answer_list.push(element.correct_answer)
        console.log(arrayOptions.indexOf(element.correct_answer))
        console.log(arrayOptions);
        // correct_answer.push(element.correct_answer)
        let index=0
        let divString=""
        for(index=0; index<4; index++)
        {

            divString+=`<div class="option"><input type="radio" name="option${count}" class="option" value="${arrayOptions[index]}">${arrayOptions[index]}</div>`
        }

        console.log(arrayOptions)
        newDiv.innerHTML=`
                <div class="questionBox">
                    <span class="number">Question ${6-count} of 5</span>
                    <h2>${element.question}</h2>
                    <div class="options">
                    ${divString}
                    </div>
                </div>
            `
        questionForm.prepend(newDiv)
        count++;
    });
}

let scoreGlobal=0;
submitButton.addEventListener('click',(e)=>{
    e.preventDefault();
    submitButton.classList.add('hidden')
    resetButton.classList.remove('hidden')
    testSubmitted=true;
    console.log(correct_answer)
    console.log(questionForm.elements)
    let score=0;
    for(let i=0 ;i<5;i++)
    {
        if(i==0)
        {
            if(questionForm.elements.option1[correct_answer[i]].checked)
            {
                score++;
            }
        }
        if(i==1)
        {
            if(questionForm.elements.option2[correct_answer[i]].checked)
            {
                score++;
            }
        }
        if(i==2)
        {
            if(questionForm.elements.option3[correct_answer[i]].checked)
            {
                score++;
            }
        }
        if(i==3)
        {
            if(questionForm.elements.option4[correct_answer[i]].checked)
            {
                score++;
            }
        }
        if(i==4)
        {
            if(questionForm.elements.option5[correct_answer[i]].checked)
            {
                score++;
            }
        }
    }
    scoreGlobal=score;
    alert(`Your score is ${score}/5
        Correct Answers were:
        1:${correct_answer_list[4]},
        2:${correct_answer_list[3]}, 
        3:${correct_answer_list[2]}, 
        4:${correct_answer_list[1]}, 
        5:${correct_answer_list[0]}`)
    
});

function startTimer()
{
    const timer=document.getElementById('timer');
    let timeAfter=new Date().getTime()+120000
    console.log(timeAfter)
    // add 120,000 milliseconds to the current time in milliseconds
    setInterval(()=>{
        let seconds=new Date().getTime()
        if(!testSubmitted)
        {
                if(Math.floor(timeAfter/1000)==Math.floor(seconds/1000))
            {
                alert(`Your score is ${scoreGlobal}/5`)
                testSubmitted=true
                timer.innerText="Time Left: 00:00"
            }
            else if(!testSubmitted){
                let minutes=Math.floor((timeAfter-seconds)/60000) //minutes
                seconds=Math.floor((((timeAfter-seconds))%60000)/1000)
                timer.innerText=`Time left: ${minutes}:${seconds}`
            }
        }
        else
        {
            timer.innerText="Time Left: 00:00"
        }
        
    }
    ,1000);
}



resetButton.addEventListener('click', () => {
    startButton.classList.remove('hidden');
    submitButton.classList.add('hidden');
    resetButton.classList.add('hidden');

    document.getElementById("questionForm").innerHTML = "";

    testSubmitted = false;
    correct_answer = [];
    correct_answer_list = [];
    scoreGlobal = 0;

    document.getElementById('timer').innerText = "Time Left: 00:00";
});


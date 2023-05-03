const $ = document.querySelector.bind(document)
const inputName = $('.inputName')
const submit = $('.submit')
const containerForm = $('.containerForm')
const ul=$('.list');
const closebtn=$('.close');

let list=[]
let nameUser;
function formCheck() {
    const valueInput = inputName.value;
    if (valueInput === '') {
        alert('Mày chưa nhập tên kìa!')
    }
    else {
        nameUser = valueInput;
        console.log(nameUser);
        containerForm.style.display = 'none'
        $('.container-select').style.display = 'block'
    }
}

closebtn.onclick=()=>{
    $('.exit').classList.add('exitActive')
    setTimeout(()=>{
    $('.exit').classList.remove('exitActive')

    },2000)
}

submit.onclick = () => {
    formCheck()
    FetchAPI()
    // DELETEAPI(2)
}

const selects = document.querySelectorAll('.select')
const fisnish = $('.fisnish')

selects.forEach(select => {
    select.onclick = () => {
        if (select.innerText != 'Tết') {
            const random = Math.floor(Math.random() * (80 - 10) + 10);
            select.style.top = `${random}%`
        }
        else {
            fisnish.style.display = "flex"
            POSTAPI(nameUser)
        }
    }
});

//xuất ds
function OutList(list){
    for(let i=1;i<list.length;i++){
        ul.innerHTML+=`<li>${list[i]['Column 1']} chọn Tết</li>`
    }
}


//fetch api
function FetchAPI() {
    fetch("https://retoolapi.dev/XC86zY/data")
        .then((response) => response.json())
        .then((result) => {
            list=[...result]
            OutList(list)
            
        })
}

function POSTAPI(data) {
    fetch('https://retoolapi.dev/XC86zY/data', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ['Column 1']: data })
    }).then(res => res.json())
        .then(res => console.log(res));

}

async function DELETEAPI(id){
    await fetch('https://retoolapi.dev/XC86zY/data/' + id, {
    method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => console.log(res))
}

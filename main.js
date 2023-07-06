// const $ = document.querySelector.bind(document)
// const inputName = $('.inputName')
// const submit = $('.submit')
// const containerForm = $('.containerForm')
// const ul=$('.list');
// const closebtn=$('.close');

// let list=[]
// let nameUser;
// function formCheck() {
//     const valueInput = inputName.value;
//     if (valueInput === '') {
//         alert('Mày chưa nhập tên kìa!')
//     }
//     else {
//         nameUser = valueInput;
//         console.log(nameUser);
//         containerForm.style.display = 'none'
//         $('.container-select').style.display = 'block'
//     }
// }

// closebtn.onclick=()=>{
//     $('.exit').classList.add('exitActive')
//     setTimeout(()=>{
//     $('.exit').classList.remove('exitActive')

//     },2000)
// }

// submit.onclick = () => {
//     formCheck()
//     FetchAPI()
//     // DELETEAPI(7)
// }

// const selects = document.querySelectorAll('.select')
// const fisnish = $('.fisnish')

// selects.forEach(select => {
//     select.onclick = () => {
//         if (select.innerText != 'Tết') {
//             const random = Math.floor(Math.random() * (80 - 10) + 10);
//             select.style.top = `${random}%`
//         }
//         else {
//             fisnish.style.display = "flex"
//             POSTAPI(nameUser,'Tết')
//         }
//     }
// });

// //xuất ds
// function OutList(list){
//     console.log(list);
//     for(let i=1;i<list.length;i++){
//         ul.innerHTML+=`<li>${list[i]['Column 1']}</li>`
//     }
// }


// //fetch api
// function FetchAPI() {
//     fetch("https://retoolapi.dev/XC86zY/data")
//         .then((response) => response.json())
//         .then((result) => {
//             list=[...result]
//             OutList(list)
            
//         })
// }

// function POSTAPI(nameUser,data) {
//     fetch('https://retoolapi.dev/XC86zY/data', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ ['Column 1']:`${nameUser} chọn ${data} `})
//     }).then(res => res.json())
//         .then(res => console.log(res));

// }

// async function DELETEAPI(id){
//     await fetch('https://retoolapi.dev/XC86zY/data/' + id, {
//     method: 'DELETE',
//     })
//     .then(res => res.json())
//     .then(res => console.log(res))
// }




//new hopbao
const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);

const container=$('.container');
let listDay=[];

fetch("https://course-react-c2c8d-default-rtdb.asia-southeast1.firebasedatabase.app/day.json")
        .then((response) => response.json())
        .then((result) => {
           listDay=[...result['-NZfsE--w8DGEthghoST']]
           let html='';
           listDay.forEach((element,index)=>{

                if(element.active){
                    html+=`
                    <div class="box active" id=${index}>
                        <h1>${element.day}</h1>
                    </div>
                    `
                }
                else{
                    html+=`
                    <div class="box" id=${index}>
                        <h1>${element.day}</h1>
                    </div>
                    `
                }
                
            })
            container.innerHTML=html;
            eventClickBox();
        })


function eventClickBox(){
    const boxs=$$('.box')
    boxs.forEach((box,index) => {
        box.onclick=(element)=>{
            const boxClick=element.target;
    
            if(box==boxClick){
                if(boxClick.classList.contains('active')){
                    boxClick.classList.remove('active')
                    let id = boxClick.getAttribute( 'id' );
                    PUTAPI(id,false,listDay[id].day)

                }
                else{
                    boxClick.classList.add('active')
                    // POSTAPI(index)
                    let id = boxClick.getAttribute( 'id' );
                    PUTAPI(id,true,listDay[id].day)
                }
    
            }
            
        }
    });
}

function POSTAPI(data) {
    fetch('https://course-react-c2c8d-default-rtdb.asia-southeast1.firebasedatabase.app/day.json', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(res => console.log(res));

}
function PUTAPI(id,active,day) {
    fetch('https://course-react-c2c8d-default-rtdb.asia-southeast1.firebasedatabase.app/day/-NZfsE--w8DGEthghoST/' + id+'.json', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({active:active,day:day})
    }).then(res => res.json())
        .then(res => console.log(res))
        .catch(error =>console.log(error))

}
async function DELETEAPI(id){
    await fetch('https://course-react-c2c8d-default-rtdb.asia-southeast1.firebasedatabase.app/day.json/' + id, {
    method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => console.log(res))
}

//declartion
let courseList = document.getElementById('courses-list');
let Top = document.querySelector('table tbody');
let shoppingCart = document.querySelector('#clear-cart');
//eventListener
eventListener();

function eventListener(){
    courseList.addEventListener('click', getCourseDetails);
    Top.addEventListener('click', removeBtn);
    shoppingCart.addEventListener('click',clearBtn);
    document.addEventListener('DOMContentLoaded',showLocalStorage)
}
//function
function getCourseDetails(e){
e.preventDefault();
if(e.target.classList.contains('add-to-cart')){
    selectCoursedetails(e.target.parentElement.parentElement)   
}
}

function selectCoursedetails(courses){
    // console.log(courses)
     const Course ={
         image:courses.querySelector('img').src,
         name:courses.querySelector('h4').textContent,
         price:courses.querySelector('.price span').textContent,
         id:courses.querySelector('a').getAttribute('data-id'),
     
     }
    //  console.log(Course)
     sortdetailsCourse(Course);
     getfromLocalStorage(Course);
}
function sortdetailsCourse(Course){
   
let td = document.createElement('tr');
td.innerHTML=`
<td><img src="${Course.image}"</td>
<td>${Course.name}</td>
<td>${Course.price}</td>
<td> <a href="#" class="remove" data-id=${Course.id}>X</a></td>
`
Top.appendChild(td);
}
function removeBtn(e){
if(e.target.classList.contains('remove')){
 e.target.parentElement.parentElement.remove();
}
removefromLocalStorage(e.target.parentElement.parentElement);
}

function clearBtn(e){
    Top.remove();
    localStorage.clear();
}
function  getfromLocalStorage(Course){
    let storage=getandsaveintoLocalStorage();
    storage.push(Course);
    localStorage.setItem('saveCart',JSON.stringify(storage));
}

function getandsaveintoLocalStorage(){
    let show = localStorage.getItem('saveCart');
    let storage;

    if(show === null){
        storage=[];
    }
    else{
        storage=JSON.parse(show);
    }
    return storage;
}

function showLocalStorage(){
    let storage=getandsaveintoLocalStorage();
    storage.forEach(function(Course){
        let td = document.createElement('tr');
td.innerHTML=`
<td><img src="${Course.image}"</td>
<td>${Course.name}</td>
<td>${Course.price}</td>
<td> <a href="#" class="remove" data-id=${Course.id}>X</a></td>
`
Top.appendChild(td);
    })
}

function removefromLocalStorage(course){
    let currentid=course.querySelector('a').getAttribute('data-id');
    let storage=getandsaveintoLocalStorage();
    storage.forEach(function(course,index){
        if(course.id ===currentid ){
            console.log(index,course);
            storage.splice(index,1);
        }
        localStorage.setItem('saveCart',JSON.stringify(storage))
    })
}
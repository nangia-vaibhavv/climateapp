// console.log("Hell js")
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



// select data from input box
const weatherForm=document.querySelector('form')
const searchElement=document.querySelector('input')
const messageOne=document.querySelector('#error')
const messageTwo=document.querySelector('#response')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    // this prevent default behaviour of reloading the page when form submits


    const address=searchElement.value;
    // console.log(address)
    messageOne.textContent=""
    messageTwo.textContent='Loading...'
    fetch('/weather?address='+address).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent=data.error
        }else{
            // console.log(data.forecast)
            messageTwo.textContent=data.forecast
        }
       
    })
})

})
console.log('Client side javascript file up loaded')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'Text From Js'

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    const location = search.value
    //console.log(location)

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        //console.log(response)
        response.json().then((data)=>{
            if (data.error){
                //console.log(data.error)
                messageOne.textContent = 'Error'
                messageTwo.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})


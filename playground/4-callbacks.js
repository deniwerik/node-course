/*setTimeout(()=>{
    console.log('2 seconds are up')
}, 2000)

const names = ['andres', 'jen', 'jess']
const shortnames = names.filter((name) => {
    return name.length <= 4
})

const geocode = (address, callback) => {
    setTimeout(()=>{
        const data = {
            latitude:0,
            longitude:0
        }

        //return data
        callback(data)
    },2000)
}

geocode('Philadelphia', (data)=>{
    console.log(data)
})*/




debugger

const add = (x, y, callback) => {
    setTimeout(()=>{
        const sum = x + y

        callback(sum)

    },2000)

}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})

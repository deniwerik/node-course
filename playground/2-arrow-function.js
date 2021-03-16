/*const square = function (x) {
    return x * x
}*/

/*const square = (x) => {
    return x * x
}*/

/*
const square = (x) => x * x

console.log(square(2))*/

/*const event = {
    name: 'birthday party',
    printGuestList: function () {
        console.log('guest list for ' + this.name)
    }
}*/

/*const event = {
    name: 'birthday party',
    printGuestList: () => {
        //dá ruim - não acessa o this
        console.log('guest list for ' + this.name)
    }
}*/

const event = {
    name: 'birthday party',
    guestList: ['andrew', 'Jen', 'mike'],
    printGuestList() {
        console.log('guest list for ' + this.name)
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name)
        })
    }
}

event.printGuestList()

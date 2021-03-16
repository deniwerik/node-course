const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})



/*const me = new User({
    name: '     Mike     ',
    email: 'MYEMAIL@MAD.IO   ',
    password: '1234567'
})

me.save().then((result)=>{
    //console.log(me)
    //  iguais
    console.log(result)
}).catch((error)=>{
    console.log('Error',error)
})*/



/*const work = new Task({
    description: 'complete de node.js course completly'
})

work.save().then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})*/

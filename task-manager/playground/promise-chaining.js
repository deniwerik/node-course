require('../src/db/mongoose')

const User = require('../src/models/user')

// 6040318c35fae7390c436a3b

/*
User.findByIdAndUpdate('60402fffa0bccc2dece2f1a4', {age: 1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:1})
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})*/


const updateAgeAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('604030b6197af426384eac13',2).then((count)=>{
    console.log(count)
}).catch((error)=>{
    console.log(error)
})
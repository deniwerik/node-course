require('../src/db/mongoose')

const Task = require('../src/models/task')

/*
Task.findByIdAndDelete('604069dc93a8b94f40ff75e4').then((user)=>{
    return Task.countDocuments({completed: false})
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})

*/

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    return await Task.countDocuments({completed: false})
}

deleteTaskAndCount('60404f779b17f56454240ad5').then((count)=>{
    console.log(count)
}).catch((error)=>{
    console.log(error)
})
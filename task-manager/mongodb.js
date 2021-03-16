//CRUD

/*const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID*/

const {MongoClient, ObjectID} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

/*const id = new ObjectID()
console.log(id.id.length)
console.log(id.toHexString().length)*/
//console.log(id.getTimestamp())

MongoClient.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error){
        return console.log('unable to connect to database')
    }

    const db = client.db(databaseName)

    /*
    *
    * INSERT
    *
    * */
    /*db.collection('users').insertOne({
        name: 'Vikram',
        age: 26
    }, (error, result) => {
        if (error){
            return console.log('unable to insert user')
        }

        console.log(result.ops)
    })*/

    /*db.collection('users').insertMany([
            {
                name:'jen',
                age: 28
            },{
                name: 'Gunther',
                age: 27
            }
        ], (error, result) => {
                if (error){
                    console.log('unable to insert documents')
                }

                console.log(result.ops)
    })*/

    /*db.collection('tasks').insertMany([
        {
            description: 'install npm modules',
            completed: true
        },
        {
            description: 'create project completly',
            completed: false
        },
        {
            description: 'install mongo db',
            completed: true
        }
    ], (error, result) => {
        if (error){
            return console.log('unable to insert documents')
        }

        console.log(result.ops)
    })*/

    /*
    *
    * RETRIEVE
    *
    * */
    /*db.collection('users').findOne({_id: new ObjectID("603eb208b2247457ac976954")}, (error, user)=>{
        if (error){
            return console.log('unable to fetch')
        }

        console.log(user)
    })*/

    /*db.collection('users').find({age:27}).toArray((error, users) =>{
        console.log(users)
    })

    db.collection('users').find({age:27}).count((error, count) =>{
        console.log(count)
    })

    db.collection('tasks').findOne({_id: new ObjectID("603ead68bad5ec58389346bd")}, (error, task)=>{
        console.log(task)
    })

    db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
        console.log(tasks)
    })*/

    /*
    *
    * UPDATE
    *
    * */
    /*db.collection('users').updateOne({
        _id: new ObjectID("603ea201517d0b1214e6194b")
    },{
        /!*$set: {
            name: 'Mike'
        }*!/
        $inc:{
            age: 1
        }
    }).then((result) => {
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })*/

    /*db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result)=>{
        console.log(result.modifiedCount)
    }).catch((error)=>{
        console.log(error)
    })*/

    /*
    *
    * DELETE
    *
    * */

    /*db.collection('users').deleteMany({
        age:27
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })*/

    db.collection('tasks').deleteOne({
        description: 'create project completly'
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })



})
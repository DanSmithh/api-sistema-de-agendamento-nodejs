import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import User from '../app/models/User.js';
import File from '../app/models/File'
import Appointment from '../app/models/Appointment'
import databaseConfig from '../config/database.js';

// const models = [User]; //Needed only on teacher version

const models = [User, File, Appointment];

class Database{
    constructor(){
        this.init();
        this.mongo();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);


        models
        .map( model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }
    mongo(){
        this.mongoConnection = mongoose.connect(
            'mongodb+srv://sistemadeagendamento:sistemadeagendamento@cluster0.io5je.mongodb.net/sistema?retryWrites=true&w=majority', 
            { useNewUrlParser: true, useUnifiedTopology: true }
            )
    }
}



export default new Database();
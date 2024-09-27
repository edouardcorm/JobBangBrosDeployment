const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    admin: {

        type: Boolean,
        required: true,
        default: false,
    },
    email: {

        type: String,
        required: true,
    },
    password: {

        type: String,
        required: true,
    },
    name: {

        type: String,
        required: true,
    },
    age: {

        type: String,
       // required: true,
    },
    job: {

        type: String,
       // required: true,
    },

    gender: {

        type: String,
        required: true,
    },
    preference: {

        type: String,
        default: "Aucune",
       // required: true,
    },
    
    profile_picture: {

        type: String,
        //required: true,
    },
    description: {

        type: String,
        //required: true,
    },
    tags: {
        height: { type: String,// required: true 
                                                },
        sign: { type: String, //required: true 
                                                },
        fav_animal: { type: String, //required: true 
                                                },  
        sport: { type: String, //required: true 
                                                },
        hobby: { type: String, //required: true 
                                                }
    },


}, { timestamps: true });


// Static login method
userSchema.statics.login = async function (email, password) {

    if (!email || !password) throw new Error('Email et mot de passe sont obligatoires');

    const user = await this.findOne({ email });

    if (!user) throw new Error('Email ou mot de passe incorrect');

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error('Email ou mot de passe incorrect');

    return user;
}


module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true , ' {PATH} Alanı zorunludur.'],
        maxlength: [17, '{PATH} Alanı ({VALUE}), ({MAXLENGTH}) karakterden küçük olmalıdır.'],
        minlength: [3, '{PATH} Alanı ({VALUE}), ({MINLENGTH}) karakterden büyük olmalıdır.']
    },
    category: {
        type: String,
        maxlength: 30,
        minlength: 1
    },
    country: {
        type: String,
        maxlength: 30,
        minlength: 1
    },
    year: {
        type: Number,
        max: 2020,
        min: 1960
    },
    imdb_score: {
        type : Number,
        max: 10,
        min: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('movie',MovieSchema);
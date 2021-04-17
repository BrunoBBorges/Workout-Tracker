const mongoose = require('mongoose');
const schema = mongoose.Schema; 
const workoutSchema = new schema({
    day: {
        type: Date,
        default: () => new Date(),
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "enter a muscle group or type of workout"
            },
            name: {
                type: String,
                trim: true, 
                required: "enter the name of your exercise"
            },
            duration: {
                type: Number,
                required: "how long is the workout"
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number
            },
            length: {
                type: Number,
            },
        },
    ],
});

const workout = mongoose.model("workout" , workoutSchema);
module.exports = workout;
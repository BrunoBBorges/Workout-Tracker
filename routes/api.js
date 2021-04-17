const router = require('express').Router();
const workout = require('../models/workout.js');

router.post('/api/workouts/:id', ({body,params}, res) => {
    workout.findByIdAndUpdate(
        params.id, 
        {$push: {exercises: body}}, {new:true, runValidators:true}
    )
        .then((dbworkout) => {
            res.join(dbworkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get('/api/workouts', (req, res) => {
    workout.aggregate([
        {
            $addfields: {
                totalduration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
    .then((dbworkouts) => { 
        res.json(dbworkouts);
    })
    .catch((err) => {
        res.json(err);
    }); 
});

router.get('/api/wokrouts/range', (req,res) => {
    workout.aggregate([
        {
            $addfields: {
                totalduration:{
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
    .sort({_id: -1})
    .limit(8)
    .then((dbworkouts) => {
        res.json(dbworkouts);
    })
    .catch((err) => {
        res.json(err);
    });
});

router.delete('/api/workouts', ({body}, res) => {
    workout.findByIdAndDelete(body.id)
    .then(() => {
        res.json(true);
    })
    .catch((err) => {
        res.json(err);
    });
});

module.exports = router;
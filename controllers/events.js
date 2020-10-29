const { response } = require("express")
const Event = require('../models/Event')

const getEvents = async(req,res=response) => {

    const events = await Event.find()
                            .populate('user','name')

    res.json({
        ok: true,
        events
    })
}

const createEvents = async(req,res=response) => {

    const event = new Event(req.body)

    try {

        event.user = req.uid

        const savedEvent = await event.save()

        res.status(201).json({
            ok: true,
            event: savedEvent
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact your Admin'
        })
    }
}

const updateEvents = async(req,res=response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {
        const event = await Event.findById(eventId)

        if(!event) {
            return res.status(404).json({
                ok:false,
                msg:'Event doesnt exist'
            })
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg:'You are not allowed to edit this event'
            })
        }

        const updatedEventData = {
            ...req.body,
            user:uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId,updatedEventData,{ new: true })

        res.json({
            ok: true,
            updatedEvent
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact your Admin'
        })
    }
}

const deleteEvents = async(req,res=response) => {
    const eventId = req.params.id
    const uid = req.uid

    try {
        const event = await Event.findById(eventId)

        if(!event) {
            return res.status(404).json({
                ok:false,
                msg:'Event doesnt exist'
            })
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg:'You are not allowed to edit this event'
            })
        }

        const deleteEvent = await Event.findByIdAndDelete(eventId)

        res.json({
            ok: true,
            deleteEvent
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact your Admin'
        })
    }
}


module.exports ={
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}
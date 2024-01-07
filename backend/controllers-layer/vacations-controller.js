const express = require("express");

const vacationsLogic = require("../business-logic-layer/vacations-logic");

const router = express.Router();

const fileUpload=require("express-fileupload");
const Vacation = require("../model/vacations");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");

router.use(fileUpload());

router.get("/vacations", async (request, response) => {
    try {
        const offset = +request.query.offset || 0;
        const user_id = +request.query.user_id;
        console.log("offset: " + offset);
        console.log("user_id: " + user_id);
        const result = await vacationsLogic.getAllVacationsAsync(offset, user_id);
        response.send(result);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error" });
    }
});

router.get("/vacation/:id([0-9]+)", async (request, response) => {
    try {
        const id = +request.params.id;
        const vacation = await vacationsLogic.getOneVacations(id);
        response.json(vacation);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error" });
    }
});

router.post("/vacations", async (request, response) => {
    try {
        const vacation = new Vacation(request.body);
        const errors = vacation.validate();
        if (errors) return response.status(400).send(errors);

        vacation.image = request.files?.image;
        const result = await vacationsLogic.insertVacationAsync(vacation);
        response.send(result);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error" });
    }
});

router.put("/vacations", async (request, response) => {
    try {
        const vacation = new Vacation(request.body);
        const errors = vacation.validate();
        if (errors) return response.status(400).send(errors);

        vacation.image = request.files?.image;
        const result = await vacationsLogic.updateVacation(vacation);
        response.send(result);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error" });
    }
});

router.delete("/vacations/:id([0-9]+)", async (request, response) => {
    try {
        const id = +request.params.id;

        const result = await vacationsLogic.deleteVacation(id);
        response.sendStatus(201);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error" });
    }
});

router.post("/vacations/follow",  async (request, response) => {
    try {
        const user_id = +request.body.user_id;
        const vacation_id = +request.body.vacation_id;

        await vacationsLogic.followVacationAsync(user_id, vacation_id);
        response.sendStatus(201);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error" });
    }
});

router.post("/vacations/unfollow", async (request, response) => {
    try {
        const user_id = +request.body.user_id;
        const vacation_id = +request.body.vacation_id;

        await vacationsLogic.unfollowVacationAsync(user_id, vacation_id);
        response.sendStatus(201);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error" });
    }
});



module.exports = router;
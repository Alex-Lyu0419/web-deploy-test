import { Router } from "express";
import User from "../models/ScoreCard";

const router = Router();

router.delete("/cards", async (_, res) => {
    // console.log(req.body);
    try {
        await User.deleteMany({});
        res.json({ message: 'Database cleared' })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
});

router.post("/card", async (req, res) => {
    // console.log(req);

    let name = String(req.body.name);
    let subject = String(req.body.subject);
    let score = Number(req.body.score);
    let data;
    
    try {
        data = await User.findOne({name: name, subject: subject});

        if (data != null){
            data["score"] = score;
            const dataToSave = await data.save();
            res.status(200).json({message: `Updating (${name}, ${subject}, ${score})`});
        } 
        else{
            data = new User({
                name: name,
                subject: subject,
                score: score
            });
            const dataToSave = await data.save();
            res.status(200).json({message: `Adding (${name}, ${subject}, ${score})`});
        }
    }
    catch (err){
        res.json({message: err.message})
    }


});

router.get("/cards", async (req, res) => {
    // console.log(req.query);
    const type = req.query.type;
    const key = req.query.queryString

    let data;

    try {
        if (type == "name"){
            console.log("name");
            data = await User.findOne({name: key});
        } else{
            console.log("subject");
            data = await User.findOne({subject: key});
        }

        console.log(data);

        if (data !== null){
            res.json({ message: `Found card with ${type}: (${data["name"]}, ${data["subject"]}, ${data["score"]})`})
        } else{
            res.json({message: `QueryType (${key}) not found!`})
        }
    }
    catch (err) {

}
});

export default router;

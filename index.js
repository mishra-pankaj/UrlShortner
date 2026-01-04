require("dotenv").config();
const express = require("express");
const app = express();
const {connectToMongoDb} = require("./db.js")
const urlRoute = require("./routes/url.js")
const URL = require("./models/url.js")
const PORT = process.env.PORT || 8000;

connectToMongoDb('${process.env.DBURL}/short-url')
.then(()=>{
    console.log("DB CONNECTED SUCCESFULLY!!!");
})
app.use(express.json())
app.use("/url", urlRoute)

app.get("/:shortId",async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{
        $push:{
            visitHistory: {
                timestamps: Date.now()
            }
        },
    }
)
 res.redirect(entry.redirectURL)
})
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
const { nanoid } = require('nanoid');
const URL = require("../models/url.js")
async function handlerGenerateNewShortURL(req,res) {
    const body =req.body;
    if(!body.url) return res.status(400).json({error: "URl is required!"})
    const shortID = nanoid(8)
    await URL.create({
        shortId: shortID,
        redirectURL:body.url,
        visitHistory: [],
    })
    return res.json({id: shortID})
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortId,
    })
    return res.json({
        totalClicks:result.visitHistory.length, analystics:result.visitHistory,
    })
}

async function handleShareId(req,res) {
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
}
module.exports = {
    handlerGenerateNewShortURL,
    handleGetAnalytics,
    handleShareId
}
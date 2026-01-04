const express = require("express")
const {handlerGenerateNewShortURL, handleGetAnalytics} = require("../controllers/url.js")
const router = express.Router()

router.post("/",handlerGenerateNewShortURL)

router.get("/analytics/:shortId",handleGetAnalytics)
module.exports = router;
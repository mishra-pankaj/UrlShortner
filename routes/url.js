const express = require("express")
const {handlerGenerateNewShortURL, handleGetAnalytics,handleShareId} = require("../controllers/url.js")
const router = express.Router()

router.post("/",handlerGenerateNewShortURL)

router.get("/analytics/:shortId",handleGetAnalytics)

router.get("/:shortId",handleShareId)
module.exports = router;
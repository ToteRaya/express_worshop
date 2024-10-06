module.exports = (req,res,next)=> {
    return res.status(404).json({code:404, message: "404: Alch no tienes que estar aquí"});
}
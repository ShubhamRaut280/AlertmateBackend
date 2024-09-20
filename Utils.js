function jsonmsg(msg, error = null){
    if(error!=null)
        return json({'msg' : msg, 
                    'error': error})

    return json({'msg' : msg})                
}

module.exports = {jsonmsg}
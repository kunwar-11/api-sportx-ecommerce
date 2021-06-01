const mongoose = require('mongoose')
const initalizeConnection = async () => {
    try {
        const connection = await mongoose.connect(`mongodb+srv://kunwarRishabh3107:kKuAr67590234@backendecom.kmzr8.mongodb.net/SportxDb` , {
            useUnifiedTopology : true,
            useNewUrlParser : true
        })
        if(connection) {
            console.log('successfully connected')
        }
    }
    catch(error) {
        console.log('Connection failed' , error)
    }
}



module.exports = {initalizeConnection}
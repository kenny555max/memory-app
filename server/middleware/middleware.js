import jwt from "jsonwebtoken";

const middleware = (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        const isCustomAuth = token?.length < 240;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'secret');

            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);
            
            req.userId = decodedData?.sub;
            console.log(req.userId);
        }
    } catch (error) {
        console.log(error);
    }

    next();
}

export default middleware;
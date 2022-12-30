import { createUser, getAllDetails, getDetails } from './user.service';

export const findAllUsers = async (req, res) => {
    try {
        const users = await getAllDetails();
        return res.status(200).send({ status: "success", users: users });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: error })

    }
}

export const findUser = async (req, res, next) => {
    try {
        const user = await getDetails(req.params.userId);
        console.log(">>>" + user);
        return res.status(200).send({ status: "success", user: user })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: error })
    }
} 

export const create = async (req, res) => {
    try {
        const user = await createUser(req.body);
        return res.status(200).send({ status: "success", user: user })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: "failed", message: error })
    }
}
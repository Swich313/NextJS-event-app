import {connectToDB} from "@/utils/db-util";
import Comment from '../../../utils/db-comment-model-util';
import isEmail from "@/utils/validattion-util";

export default async function handler(req, res) {
    const {eventId} = req.query;
    if(req.method === 'GET'){
        if(!eventId){
            return res.status(400).json({message: 'Bad request! No query!'})
        }
        let db;
        try {
            db = await connectToDB();
        } catch (e) {
            res.status(500).json({ok: false, message: 'Connection to DB failed!'});
            return
        }

        const comments = await Comment.find({eventId: eventId}).sort({});
        await db.disconnect();
        res.status(200).json({message: 'Comments fetched successfully!', comments})
    } else if(req.method === 'POST'){
        const {email, name, comment} = req.body;
        if(!isEmail(email) || !name || name.trim() === '' || !comment || comment.trim() === '' || !eventId){
            return res.status(400).json({message: 'Bad request! No email was sent!'})
        }
        let db;
        try {
            db = await connectToDB();
        } catch (e) {
            res.status(500).json({ok: false, message: 'Connection to DB failed!'});
            return
        }

        const newComment = new Comment({email, name, comment, eventId});
        const result = await newComment.save();
        if(!result){
            return res.status(500).json({message: 'Internal Server Error!'});
        }
        await db.disconnect();
        res.status(200).json({ok: true, message: 'Comment successfully added', comment: result });
    }
}
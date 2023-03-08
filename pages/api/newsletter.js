import {connectToDB} from '@/utils/db-util';
import Newsletter from '../../utils/db-newsletter-model-util';
import isEmail from "@/utils/validattion-util";

async function handler(req, res) {
  if(req.method === 'POST'){
    const {email} = req.body;
    if(!email){
      return res.status(400).json({message: 'Bad request! No email was sent!'})
    } else if(!isEmail(email)){
      return res.status(400).json({message: 'Bad request! Invalid email!'})
    }

    let db;

    try {
       db = await connectToDB();
    } catch (e) {
      res.status(500).json({message: 'Connection to DB failed!'});
      return;
    }

    const newsletter =  new Newsletter({email});
    const result = await newsletter.save();
    if(!result){
      return res.status(500).json({message: 'Internal Server Error!'});
    }
    await db.disconnect();
    res.status(200).json({ok: true, message: 'Email successfully added', email: result.email });
  } else if(req.method === 'GET'){
    res.send('You are on api/newsletter')
  }
}

export default handler;
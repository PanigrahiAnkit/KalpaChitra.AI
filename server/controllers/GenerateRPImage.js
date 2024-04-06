import * as dotenv from "dotenv";
import { createError } from "../error.js";
import Replicate from "replicate";
dotenv.config();

// Setup open ai api key
const replicate = new Replicate({
    
    auth: process.env.REPLICATE_API_KEY, // defaults to process.env.REPLICATE_API_TOKEN
  });
// Controller to generate Image

export const generateImage = async (req, res, next) => {
  try {
    // const { prompt } = req.body;

    // const response = await openai.createImage({
    //   prompt,
    //   n: 1,
    //   size: "1024x1024",
    //   response_format: "b64_json",
    // });
    




    const model = "stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478";
    const input = req.body
    console.log(input);
    const response = await replicate.run(model, { input });
    // const generatedImage = response.data.data[0].b64_json;
    return res.status(200).json({ photo: response });
// ['https://replicate.delivery/pbxt/GtQb3Sgve42ZZyVnt8xjquFk9EX5LP0fF68NTIWlgBMUpguQA/out-0.png']
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};

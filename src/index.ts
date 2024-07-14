import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(bodyParser.json());



app.use(bodyParser.json());


const prisma = new PrismaClient();

app.post("/users/create", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});



const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

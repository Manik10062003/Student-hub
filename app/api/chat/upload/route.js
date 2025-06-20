import multer from "multer";
import nextConnect from "next-connect";

const upload = multer({ dest: "/tmp" });

const apiRoute = nextConnect();

apiRoute.use(upload.single("file"));

apiRoute.post((req, res) => {
  // Handle file save (move to storage, DB, cloud etc)
  res.json({ success: true, file: req.file });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;

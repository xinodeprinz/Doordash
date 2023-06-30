export default function ErrorHandler(err, req, res, next) {
  if (err) {
    const match = err.stack.match(/Error: (.+)\n/);
    if (match) {
      const error = match[1];
      return res.status(err.statusCode || 500).json({ message: error });
    }
  }
  next();
}

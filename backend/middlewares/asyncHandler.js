const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error(`Error: ${error.message}`);
    res.status(500).send("Server Error");
  });
};

export default asyncHandler;

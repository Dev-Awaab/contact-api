const responseTimeLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`DURATION: Request to ${req.originalUrl} took ${duration} ms`);
  });

  next();
};

export default responseTimeLogger;

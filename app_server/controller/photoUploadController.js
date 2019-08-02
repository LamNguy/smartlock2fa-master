exports.uploadPhoto = function (req, res) {
  console.log(req.files);
  res.status(200).json(req.files);
}

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")//updates your connection string
  .then(() => console.log("connected to db.."))
  .catch((err) => console.log("error occurred", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: Array,
  isPublished: Boolean,
  date: { type: Date, default: Date.now },
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "react.js",
    author: "tiwari",
    tags: ["react", "frontend"],
    isPublished: true,
    data: Date.now(),
    age: 1,
  });
  try {
    await course.save();
    console.log("added successfully");
  } catch (err) {
    console.log("error while saving..", err);
  }
};
// createCourse();

const getAllCourse = async () => {
  const courses = await Course.find();
  console.log(courses);
};

// getAllCourse();

const getCourse = async () => {
  const course = await Course.find({
    isPublished: true,
    tags: { $in: ["backend", "frontend"] },
  })
    .limit(10)
    .sort({ name: -1 })
    .select({ name: 1, tags: 1 });
  console.log(course);
};

getCourse();

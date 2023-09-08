const mongoose = require("mongoose");

const connectDb = require("./db");

connectDb("mongo-exercises");

const courseSchema = new mongoose.Schema({
  tags: [],
  date: { type: Date, default: Date.now() },
  name: { type: String, required: true },
  author: String,
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model("courses", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "test",
    isPublished: true,
    price: 100,
  });
  try {
    await course.save(() => {
      console.log("added successfully ..");
    });
  } catch (err) {
    console.log("unable to save .. ", err);
  }
};

// createCourse();

const getCourse1 = async () => {
  const course = await Course.find({
    isPublished: true,
    tags: { $in: ["backend"] },
  })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  console.log(course);
};

// getCourse1();

const getCourse2 = async () => {
  const result = await Course.find({
    isPublished: true,
    tags: { $in: ["backend", "frontend"] },
  })
    .sort("-price")
    .select({ name: 1, author: 1 });
  console.log(result);
};

// getCourse2();

const getCourse3 = async () => {
  const result = await Course.find({ isPublished: true }).or([
    { name: /.*by.*/i },
    { price: { $gte: 15 } },
  ]);

  console.log(result);
};

// getCourse3();

const updateCourse = async (id) => {
  const course = await Course.findById(id);
  if (!course) return;
  course.set({
    isPublished: false,
    author: "rpt",
    name: "updated -test",
  });
  const result = await course.save();
  console.log(result);
};
// updateCourse("64fae3b23938800fdc659ca3");

const updateInDb = async (id) => {
  const result = await Course.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        author: "rpt1",
        isPublished: false,
      },
    }
  );
  console.log(result);
};

// updateInDb("64fae3b23938800fdc659ca3")

const removeCourse = async (id) => {
  const result = await Course.findByIdAndRemove(id);
  console.log(result);
};
removeCourse("64fae3b23938800fdc659ca3");

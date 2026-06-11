const bcrypt = require("bcryptjs");
const prisma = require("./config/prisma");

const createAdmin = async () => {
  try {
    const adminExists = await prisma.admin.findUnique({
      where: {
        email: "admin@bookhub.com",
      },
    });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.admin.create({
      data: {
        name: "BookHub Admin",
        email: "admin@bookhub.com",
        password: hashedPassword,
      },
    });

    console.log("Admin created successfully:", admin.email);
    process.exit();
  } catch (error) {
    console.log("Admin creation failed:", error.message);
    process.exit(1);
  }
};

createAdmin();
const bcrypt = require("bcryptjs");
const prisma = require("./config/prisma");

const updateAdmin = async () => {
  try {
    const oldEmail = "admin@bookhub.com";

    const newName = "Aakash Sah";
    const newEmail = "aakashsah098765@gmail.com";
    const newPassword = "aakash@123";

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const admin = await prisma.admin.update({
      where: {
        email: oldEmail,
      },
      data: {
        name: newName,
        email: newEmail,
        password: hashedPassword,
      },
    });

    console.log("Admin updated successfully:", admin.email);
    process.exit();
  } catch (error) {
    console.log("Admin update failed:", error.message);
    process.exit(1);
  }
};

updateAdmin();
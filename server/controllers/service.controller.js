import Service from "../models/Service.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// ================= ADD SERVICE =================
export const addService = async (req, res) => {
  try {
    const { title, description, price, isActive } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "packers_movers_services",
      });

      imageUrl = result.secure_url;

      // 🔥 delete local file
      fs.unlinkSync(req.file.path);
    }

    const service = await Service.create({
      title,
      description,
      price,
      isActive,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Service added successfully",
      service,
    });
  } catch (error) {
    console.error("Add service error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= GET ALL SERVICES =================
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get services error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= DELETE SERVICE =================
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // 🔥 delete image from Cloudinary if exists
    if (service.image) {
      const publicId = service.image
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      await cloudinary.uploader.destroy(publicId);
    }

    await service.deleteOne();

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= UPDATE SERVICE =================
export const updateService = async (req, res) => {
  try {
    const { title, description, price, isActive } = req.body;

    let updateData = {
      title,
      description,
      price,
      isActive,
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "packers_movers_services",
      });

      updateData.image = result.secure_url;

      // 🔥 delete local file
      fs.unlinkSync(req.file.path);
    }

    const service = await Service.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Update service error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

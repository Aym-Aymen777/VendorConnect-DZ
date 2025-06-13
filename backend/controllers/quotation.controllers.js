import { Quotation } from "../models/quotation.model.js";
import { Product } from "../models/product.model.js";

// Create a quotation (consumer)
export const createQuotation = async (req, res) => {
  try {
    const { product, message } = req.body;

    const foundProduct = await Product.findById(product);
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const quotation = await Quotation.create({
      consumer: req.user._id,
      product,
      message,
    });

    res.status(201).json({
      message: "Quotation request sent",
      quotation,
    });
  } catch (error) {
    console.error("Error in createQuotation:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single quotation
export const getQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id)
      .populate("consumer", "name email")
      .populate("product", "title");

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    // Only the supplier of the product or the consumer can view it
    const product = await Product.findById(quotation.product);
    if (
      req.user._id.toString() !== quotation.consumer.toString() &&
      req.user._id.toString() !== product.supplier.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(quotation);
  } catch (error) {
    console.error("Error in getQuotation:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all quotations for a user (consumer or supplier)
export const getQuotations = async (req, res) => {
  try {
    const userId = req.user._id;

    // If supplier, get quotations for their products
    let quotations;
    if (req.user.role === "supplier") {
      const supplierProducts = await Product.find({ supplier: userId }).select("_id");
      const productIds = supplierProducts.map(p => p._id);

      quotations = await Quotation.find({ product: { $in: productIds } })
        .populate("consumer", "name")
        .populate("product", "title");
    } else {
      // Else get quotations requested by the consumer
      quotations = await Quotation.find({ consumer: userId })
        .populate("product", "title")
        .populate("consumer", "name");
    }

    res.status(200).json(quotations);
  } catch (error) {
    console.error("Error in getQuotations:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a quotation status or response (supplier only)
export const updateQuotation = async (req, res) => {
  try {
    const { status, message } = req.body;
    const quotation = await Quotation.findById(req.params.id).populate("product");

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    // Ensure the user is the supplier of the product
    if (quotation.product.supplier.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (status) quotation.status = status;
    if (message) quotation.message = message;

    await quotation.save();
    res.status(200).json({
      message: "Quotation updated",
      quotation,
    });
  } catch (error) {
    console.error("Error in updateQuotation:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a quotation (supplier only)
export const deleteQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id).populate("product");

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    if (quotation.product.supplier.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await quotation.deleteOne();

    res.status(200).json({ message: "Quotation deleted successfully" });
  } catch (error) {
    console.error("Error in deleteQuotation:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



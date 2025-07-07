import Lead from "../models/leadmodel.js";

// Create leads
const createleads = async (req, res) => {
  const {
    name,
    mobilenumber,
    registerceritificatenumber,
    financial,
    companyname,
    email,
    address,
    gstnumber,
  } = req.body;

  try {
    // Use findOne for efficiency and proper check
    const existingEmail = await Lead.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Correct: Use a different variable name
    const newLead = await Lead.create({
      name,
      mobilenumber,
      registerceritificatenumber,
      financial,
      companyname,
      email,
      address,
      gstnumber,
    });

    return res.status(201).json({
      message: "lead details added successfully!",
      data: newLead,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
};

// Update leads
const updateleads = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    mobilenumber,
    registerceritificatenumber,
    financial,
    companyname,
    email,
    address,
    gstnumber,
  } = req.body;
  try {
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    lead.name = name || lead.name;
    lead.mobilenumber = mobilenumber || lead.mobilenumber;
    lead.registerceritificatenumber =
      registerceritificatenumber || lead.registerceritificatenumber;
    lead.financial = financial || lead.financial;
    lead.companyname = companyname || lead.companyname;
    lead.email = email || lead.email;
    lead.address = address || lead.address;
    lead.gstnumber = gstnumber || lead.gstnumber;
    const updatedLead = await lead.save();
    res.status(200).json({
      message: "Lead updated successfully!",
      data: updatedLead,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

// Get all leads
const getallleads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({
      message: "Leads fetched successfully",
      data: leads,
    });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Failed to fetch leads", error: err.message });
  }
};

// Get single leads
const getSingleLead = async (req, res) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({
      message: "Lead fetched successfully",
      data: lead,
    });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Error fetching lead", error: err.message });
  }
};

// Single delete
const deleteLead = async (req, res) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({
      message: "Lead deleted successfully",
      data: lead,
    });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Error deleting lead", error: err.message });
  }
};

export { createleads, updateleads, getallleads, getSingleLead, deleteLead };

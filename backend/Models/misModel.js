const mongoose = require("mongoose");
// const { DatabaseSync } = require("node:sqlite");

const UserSchema = new mongoose.Schema({
  Month: {
    type: String,
  },
  Date: {
    type: String,
  },
  Days: {
    type: String,
  },
  Vehicle_No: {
    type: String,
  },
  Type_of_Vehicle: {
    type: String,
    required: false,
  },
  Vehicle_Categories: {
    type: String,
    required: false,
  },
  Vehicle_Type: { type: String, required: false },
  Vehicle_Categories: {
    type: String,
    required: false,
  },
  Vendor_Name: {
    type: String,
    required: false,
  },
  Reporting_Time: {
    type: String,
    required: false,
  },
  Client_Name: {
    type: String,
    required: false,
  },
  Actual_Reporting: {
    type: String,
    required: false,
  },
  Dispatch_Time: {
    type: Date,
    required: false,
  },
  End_Time: {
    type: Date,
    required: false,
  },
  In_Km: {
    type: String,
    required: false,
  },
  Out_Km: {
    type: String,
    required: false,
  },
  Total_KM: {
    type: String,
    required: false,
  },
  No_of_Drop_Points: {
    type: String,
    required: false,
  },
  Errors_Pending_Drop_Point: {
    type: String,
    required: false,
  },
  Reporting_Status: {
    type: String,
    required: false,
  },
  Per_Day_Cost: {
    type: String,
    required: false,
  },
  Cost_Per_Drop: {
    type: String,
    required: false,
  },
  Loading_Time: {
    type: String,
    required: false,
  },
  Total_Working_Hours: {
    type: String,
    required: false,
  },
  Contracted_Hours: {
    type: String,
    required: false,
  },
  Overtime_Hours: {
    type: String,
    required: false,
  },
  Data_Logger: {
    type: String,
    required: false,
  },
  Vendor_Contract: {
    type: String,
    required: false,
  },
  Alloted_Km: {
    type: String,
    required: false,
  },
  Unused_Kms: {
    type: String,
    required: false,
  },
  Cost_Used_Km: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("MisData", UserSchema);

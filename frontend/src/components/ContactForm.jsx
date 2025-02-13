import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const ContactForm = () => {
  const apiUrl = `${process.env.BASE_URL}/api/v1/contact`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // To manage loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // dynamically update the state
    });
  };

  // Validate form data
  const validateForm = () => {
    const { name, email, phone, message } = formData;

    if (!name || !phone) {
      toast.error("Please fill in all fields.");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!validateForm()) {
      return; // If validation fails, don't submit
    }

    setLoading(true); // Set loading state to true when submitting

    try {
      // Post formData to the backend API
      const response = await axios.post(apiUrl, formData);

      if (response.data.success) {
        toast.success(response.data.success.message); // Show success toast
        // Optionally, clear the form after submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      toast.success("Message sent successfully!");
      setLoading(false); // Set loading state back to false after submission
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />

      <div className="bg-white px-5 py-8">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-lg font-medium font-roboto">
            Get Price on Request*
          </h1>
          <div className="grid sm:col-span-12 mt-4 gap-4">
            <div className="col-span-12">
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleChange}
                name="name"
                className="border w-full py-1 px-2 rounded-lg outline-none"
                required
              />
            </div>
            <div className="col-span-12">
              <label htmlFor="" className="text-sm">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                className="border w-full py-1 px-2 rounded-lg outline-none"
              />
            </div>
            <div className="col-span-12">
              <label htmlFor="" className="text-sm">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength={10}
                minLength={10}
                className="border w-full py-1 px-2 rounded-lg outline-none"
              />
            </div>
            <div className="col-span-12">
              <Button
                type="submit"
                fullWidth
                sx={{
                  textTransform: "none",
                  backgroundColor: "#03002e",
                  marginTop: "10px",
                }}
                variant="contained"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

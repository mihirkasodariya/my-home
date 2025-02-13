import React, { useState } from "react";
import axios from "axios"; // Import axios to make HTTP requests
import { AdminLayout } from "../../components/AdminLayout";
import { ToastContainer, toast } from "react-toastify"; // Import toast for notifications
import { Box, Button, TextField, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const AddBrochure = () => {
  document.title = "Add Brochure";

  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: null,
    pdf: null,
  });

  // Handle input change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change for image and PDF
  const handleFileChange = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];
    setFormData({
      ...formData,
      [name]: file,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creating form data to send to the server
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("image", formData.image); // Image file
    formDataToSend.append("pdf", formData.pdf); // PDF file

    try {
      // Making POST request to the API
      const apiUrl = `${process.env.BASE_URL}/api/v1/brochures/`; // Adjust the API endpoint as needed
      const response = await axios.post(apiUrl, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Check if the response is successful
      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form fields after successful submission
        setFormData({
          name: "",
          location: "",
          image: null,
          pdf: null,
        });
      } else {
        toast.error("Failed to add brochure");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the brochure");
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
          <div className="container mx-auto">
            <h2 className="text-xl font-bold p-2 text-center sm:text-left">
              Add Brochure
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap my-5">
                {/* Brochure Name */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    id="outlined-basic"
                    label="Enter Brochure Name"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="name"
                    value={formData.name}
                    fullWidth
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Brochure Location */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    id="outlined-basic"
                    label="Enter Brochure Location"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="location"
                    value={formData.location}
                    fullWidth
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* File input for image upload */}
                <div className="w-full p-2">
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body1" gutterBottom>
                      Upload Brochure Image*
                    </Typography>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="upload-image-file"
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      required
                    />
                    <label htmlFor="upload-image-file">
                      <Button
                        variant="outlined"
                        color="primary"
                        component="span"
                        size="small"
                        style={{ textTransform: "none" }}
                      >
                        Choose File
                      </Button>
                    </label>
                    {formData.image && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {formData.image.name}
                      </Typography>
                    )}
                  </Box>
                </div>

                {/* File input for PDF upload */}
                <div className="w-full p-2">
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body1" gutterBottom>
                      Upload Brochure PDF*
                    </Typography>
                    <input
                      accept="application/pdf"
                      style={{ display: "none" }}
                      id="upload-pdf-file"
                      type="file"
                      name="pdf"
                      onChange={handleFileChange}
                      required
                    />
                    <label htmlFor="upload-pdf-file">
                      <Button
                        variant="outlined"
                        color="primary"
                        component="span"
                        size="small"
                        style={{ textTransform: "none" }}
                      >
                        Choose File
                      </Button>
                    </label>
                    {formData.pdf && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {formData.pdf.name}
                      </Typography>
                    )}
                  </Box>
                </div>
              </div>

              {/* Submit Button */}
              <div className="p-2">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<AddCircleIcon />}
                  type="submit"
                  size="small"
                  style={{ textTransform: "none" }}
                >
                  Add Brochure
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

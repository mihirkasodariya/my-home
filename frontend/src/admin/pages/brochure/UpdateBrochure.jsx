import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AdminLayout } from "../../components/AdminLayout";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";

export const UpdateBrochure = () => {
  document.title = "Update Brochure";
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: null,
    pdf: null,
  });

  const apiUrl = `${process.env.BASE_URL}/api/v1/brochures/${id}`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);

  // Load data into formData when the brochure is fetched
  useEffect(() => {
    if (data?.brochure) {
      setFormData({
        name: data.brochure.name || "",
        location: data.brochure.location || "",
        image: null,
        pdf: null,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({
      ...formData,
      [name]: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("location", formData.location);

    // Check if new files are uploaded, and append them
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    if (formData.pdf) {
      formDataToSend.append("pdf", formData.pdf);
    }

    try {
      const response = await axios.patch(apiUrl, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        refetch(); // Refetch to update the displayed data
      } else {
        toast.error("Failed to update brochure");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the brochure");
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
              Update Brochure
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap my-5">
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Brochure Name*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Brochure Location*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>

                {/* Image Preview */}
                <div className="w-full p-2">
                  {data?.brochure?.image && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" gutterBottom>
                        Current Brochure Image:
                      </Typography>
                      <img
                        src={`${process.env.BASE_URL}/${data.brochure.image}`}
                        alt="Current Brochure"
                        style={{
                          height: "100px",
                          width: "200px",
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      />
                    </Box>
                  )}
                </div>

                {/* File input for image upload */}
                <div className="w-full p-2">
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      Update Brochure Image*
                    </Typography>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="upload-image"
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="upload-image">
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

                {/* PDF Preview */}
                <div className="w-full p-2">
                  {data?.brochure?.pdf && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" gutterBottom>
                        Current Brochure PDF:
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {data.brochure.pdf.split("/").pop()}
                      </Typography>
                    </Box>
                  )}
                </div>

                {/* File input for PDF upload */}
                <div className="w-full p-2">
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      Update Brochure PDF*
                    </Typography>
                    <input
                      accept="application/pdf"
                      style={{ display: "none" }}
                      id="upload-pdf"
                      type="file"
                      name="pdf"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="upload-pdf">
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

              <div className="p-2">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<ArrowCircleUpIcon />}
                  type="submit"
                  size="small"
                  style={{ textTransform: "none" }}
                >
                  Update Brochure
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

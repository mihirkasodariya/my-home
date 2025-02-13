import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { AdminLayout } from "../../components/AdminLayout";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const AddAmenity = () => {
  document.title = "Add Amenity";

  const [formData, setFormData] = useState({
    type: "",
    name: "",
    selectedFile: null,
  });
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef();

  const apiUrl = `${process.env.BASE_URL}/api/v1/amenities`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      selectedFile: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("type", formData.type);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("image", formData.selectedFile);

    try {
      const response = await axios.post(apiUrl, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("Failed to add amenity");
      }

      setFormData({
        type: "",
        name: "",
        selectedFile: null,
      });
      // Reset the file input after submission
      if (imageInputRef.current) {
        imageInputRef.current.value = ""; // Reset the file input
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("An error occurred while adding the amenity");
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
              Add Amenity
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap my-5">
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <FormControl color="secondary" size="small" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Enter Amenity Type*
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="type" // Add name to control the select input
                      value={formData.type} // Controlled by formData
                      label="Enter Amenity Type*"
                      onChange={handleChange}
                    >
                      <MenuItem value={"flat_amenity"}>Flat Amenity</MenuItem>
                      <MenuItem value={"society_amenity"}>
                        Society Amenity
                      </MenuItem>
                      <MenuItem value={"location_advantages"}>
                        Location Advantages
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    id="outlined-basic"
                    label="Enter Amenity Name*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="name" // Changed to "name"
                    value={formData.name} // Controlled by formData
                    fullWidth
                    onChange={handleChange}
                  />
                </div>
                {/* File input for image upload */}
                <div className="w-full p-2">
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body1" gutterBottom>
                      Upload Amenity Image - (Only jpeg, jpg, png files are
                      allowed Max size: 1 mb)
                    </Typography>
                    <input
                      ref={imageInputRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      id="upload-button-file"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="upload-button-file">
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
                    {/* Show selected file name */}
                    {formData.selectedFile && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {formData.selectedFile.name}
                      </Typography>
                    )}
                  </Box>
                </div>
              </div>
              <div className="p-2">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={!loading && <AddCircleIcon />}
                  type="submit" // Changed to submit the form
                  size="small"
                  style={{ textTransform: "none", width: "130px" }}
                >
                  {loading ? (
                    <CircularProgress size="25px" sx={{ color: "white" }} />
                  ) : (
                    "Add Amenity"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

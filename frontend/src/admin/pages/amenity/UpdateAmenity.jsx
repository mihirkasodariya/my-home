import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import axios from "axios";

export const UpdateAmenity = () => {
  document.title = "Update Amenity";

  const { id } = useParams();

  const apiUrl = `${process.env.BASE_URL}/api/v1/amenities/${id}`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);

  const [formData, setFormData] = useState({
    type: "",
    name: "",
    selectedFile: null,
  });

  // Load data into formData when amenity is fetched
  useEffect(() => {
    if (data?.amenity) {
      setFormData({
        type: data.amenity.type || "",
        name: data.amenity.name || "",
        selectedFile: null,
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      selectedFile: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("type", formData.type);
    formDataToSend.append("name", formData.name);
    if (formData.selectedFile) {
      formDataToSend.append("image", formData.selectedFile); // Only append file if it exists
    }

    try {
      const response = await axios.patch(apiUrl, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        refetch();
      } else {
        toast.error("Failed to update amenity");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error("Amenity not found. Please check the URL or ID.");
      } else {
        toast.error("An error occurred while updating the amenity.");
      }
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
              Update Amenity
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
                      name="type"
                      value={formData.type}
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

                {/* Image Preview */}
                <div className="w-full p-2">
                  {data?.amenity?.image && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" gutterBottom>
                        Current Amenity Image:
                      </Typography>
                      <img
                        src={`${process.env.BASE_URL}/${data.amenity.image}`}
                        alt="Current Amenity Image"
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
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body1" gutterBottom>
                      Upload New Amenity Image*
                    </Typography>
                    <input
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
                  startIcon={<ArrowCircleUpIcon />}
                  type="submit" // Changed to submit the form
                  size="small"
                  style={{ textTransform: "none" }}
                >
                  Update Amenity
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

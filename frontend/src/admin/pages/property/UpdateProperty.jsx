import React, { useState, useEffect, useRef } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchData } from "../../../hooks/useFetchData";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

export const UpdateProperty = () => {
  document.title = "Update Property";
  const { id } = useParams();
  const [buttonLoading, setButtonLoading] = useState(false);
  // Fetching the property data by ID
  const { data, loading, error, refetch } = useFetchData(
    `${process.env.BASE_URL}/api/v1/property/${id}`
  );
  console.log(data?.property);

  // Fetch categories and amenities data
  const {
    data: categoriesData,
    error: categoryError,
    loading: categoryLoading,
    refetch: refetchCategories,
  } = useFetchData(`${process.env.BASE_URL}/api/v1/category`);

  const categories = categoriesData?.category || [];

  const {
    data: amenitiesData,
    error: amenitiesError,
    loading: amenitiesLoading,
    refetch: refetchAmenities,
  } = useFetchData(`${process.env.BASE_URL}/api/v1/amenities`);

  const amenities = amenitiesData?.amenity || [];

  // State to manage form data
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    builder: "",
    unit: "",
    size: "",
    price: "",
    location: "",
    address: "",
    description: "",
    furnishType: "",
    societyAmenities: [],
    flatAmenities: [],
    locationAdvantages: [],
  });

  // State to track uploaded images and brochure
  const [uploadedImages, setUploadedImages] = useState([]);

  // Ref to the file input element
  const imageInputRef = useRef();

  // Load property data into formData when property is fetched
  useEffect(() => {
    if (data?.property) {
      const property = data.property;
      setFormData({
        category: property.category._id || "",
        name: property.name || "",
        builder: property.builder || "",
        unit: property.unit || "",
        size: property.size || "",
        price: property.price || "",
        location: property.location || "",
        address: property.address || "",
        description: property.description || "",
        furnishType: property.furnishType || "",
        societyAmenities: property.societyAmenities || [],
        flatAmenities: property.flatAmenities || [],
        locationAdvantages: property.locationAdvantages || [],
      });
      setUploadedImages(property.images || []);
    }
  }, [data]);

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle select changes
  const handleSelectChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (event, type) => {
    const { name, checked } = event.target;
    setFormData((prevData) => {
      const currentItems = prevData[type];
      if (checked) {
        return { ...prevData, [type]: [...currentItems, name] };
      } else {
        return {
          ...prevData,
          [type]: currentItems.filter((item) => item !== name),
        };
      }
    });
  };

  // Handler for uploading images
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedImages((prevImages) => [...prevImages, ...files]);
  };

  // Function to display image previews
  const renderImagePreviews = () => {
    return uploadedImages.map((image, index) => (
      <img
        key={index}
        src={URL.createObjectURL(image)}
        alt="Preview"
        style={{ width: "100px", marginRight: "10px", marginBottom: "10px" }}
      />
    ));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonLoading(true);
    const allSelectedAmenities = [
      ...formData.societyAmenities,
      ...formData.flatAmenities,
      ...formData.locationAdvantages,
    ];

    const formDataToSend = new FormData();

    // Append form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (
        Array.isArray(formData[key]) &&
        (key === "societyAmenities" ||
          key === "flatAmenities" ||
          key === "locationAdvantages")
      ) {
        formData[key].forEach((item) =>
          formDataToSend.append("amenities", item)
        );
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append uploaded images
    uploadedImages.forEach((image) => {
      formDataToSend.append("image", image);
    });

    try {
      const response = await axios.patch(
        `${process.env.BASE_URL}/api/v1/property/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Property updated successfully!");
        refetch(); // Refetch the property data
      }
      setButtonLoading(false);
    } catch (error) {
      setButtonLoading(false);
      console.error("Error updating property:", error);
      toast.error("Failed to update property.");
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
          <h2 className="text-xl font-bold p-2 text-center sm:text-left">
            Update Property
          </h2>
          <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap my-5">
                {/* Property Category */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <FormControl color="secondary" size="small" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Property Category*
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="category"
                      value={formData.category}
                      onChange={handleSelectChange}
                      label="Property Category*"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                {/* Property Name */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Property Name*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>

                {/* Property Inputs */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Builder Name*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="builder"
                    value={formData.builder}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Unit (in BHK)*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Size (in sq.ft)*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Price (in digits)*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>

                {/* Property Location */}
                <div className="w-full mb-4 p-2">
                  <TextField
                    label="Enter Property Location*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>

                {/* Property Address */}
                <div className="w-full mb-4 p-2">
                  <TextField
                    label="Enter Property Address*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>

                {/* Property Description */}
                <div className="w-full mb-4 p-2">
                  <TextField
                    label="Enter Property Description*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    fullWidth
                  />
                </div>

                {/* Furnish Type */}
                <div className="w-full mb-4 p-2">
                  <FormControl>
                    <FormLabel color="secondary">Furnish Type</FormLabel>
                    <RadioGroup
                      row
                      name="furnishType"
                      value={formData.furnishType}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Fully Furnished"
                        control={<Radio color="secondary" />}
                        label="Fully Furnished"
                      />
                      <FormControlLabel
                        value="Semi Furnished"
                        control={<Radio color="secondary" />}
                        label="Semi Furnished"
                      />
                      <FormControlLabel
                        value="Unfurnished"
                        control={<Radio color="secondary" />}
                        label="Unfurnished"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                {/* Society Amenities */}
                <div className="w-full mb-4 p-2">
                  <FormControl component="fieldset">
                    <FormLabel color="secondary">Society Amenities</FormLabel>
                    <div className="flex flex-wrap">
                      {amenities
                        .filter((amenity) => amenity.type === "society_amenity")
                        .map((amenity) => (
                          <FormControlLabel
                            key={amenity._id}
                            control={
                              <Checkbox
                                color="secondary"
                                name={amenity._id}
                                checked={formData.societyAmenities.includes(
                                  amenity._id
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "societyAmenities")
                                }
                              />
                            }
                            label={amenity.name}
                          />
                        ))}
                    </div>
                  </FormControl>
                </div>

                {/* Flat Amenities */}
                <div className="w-full mb-4 p-2">
                  <FormControl component="fieldset">
                    <FormLabel color="secondary">Flat Amenities</FormLabel>
                    <div className="flex flex-wrap">
                      {amenities
                        .filter((amenity) => amenity.type === "flat_amenity")
                        .map((amenity) => (
                          <FormControlLabel
                            key={amenity._id}
                            control={
                              <Checkbox
                                color="secondary"
                                name={amenity._id}
                                checked={formData.flatAmenities.includes(
                                  amenity._id
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "flatAmenities")
                                }
                              />
                            }
                            label={amenity.name}
                          />
                        ))}
                    </div>
                  </FormControl>
                </div>

                {/* Location Advantages */}
                <div className="w-full mb-4 p-2">
                  <FormControl component="fieldset">
                    <FormLabel color="secondary">Location Advantages</FormLabel>
                    <div className="flex flex-wrap">
                      {amenities
                        .filter(
                          (amenity) => amenity.type === "location_advantages"
                        )
                        .map((amenity) => (
                          <FormControlLabel
                            key={amenity._id}
                            control={
                              <Checkbox
                                color="secondary"
                                name={amenity._id}
                                checked={formData.locationAdvantages.includes(
                                  amenity._id
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "locationAdvantages")
                                }
                              />
                            }
                            label={amenity.name}
                          />
                        ))}
                    </div>
                  </FormControl>
                </div>

                {/* Image Upload */}
                <div className="w-full mb-4 p-2">
                  <FormControl component="fieldset">
                    <FormLabel id="image-upload">
                      Upload Property Images - (Only jpeg, jpg, png files are
                      allowed Max size: 1 mb)
                    </FormLabel>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="image-upload-input"
                      type="file"
                      ref={imageInputRef}
                      multiple
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="image-upload-input">
                      <Button
                        variant="outlined"
                        component="span"
                        size="small"
                        style={{ textTransform: "none" }}
                      >
                        Choose Images
                      </Button>
                    </label>

                    <Typography variant="body2">
                      {uploadedImages.length} images selected
                    </Typography>

                    <div className="flex flex-wrap mt-2">
                      {renderImagePreviews()}
                    </div>
                  </FormControl>
                </div>

                {/* Submit Button */}
                <div className="p-2">
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={!buttonLoading && <AddCircleIcon />} // Conditional rendering for the icon
                    type="submit"
                    size="small"
                    style={{ textTransform: "none", width: "150px" }}
                  >
                    {buttonLoading ? (
                      <CircularProgress size="25px" sx={{ color: "white" }} />
                    ) : (
                      "Update Property"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

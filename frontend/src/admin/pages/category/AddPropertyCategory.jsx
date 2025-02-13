import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, CircularProgress } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminLayout } from "../../components/AdminLayout";

export const AddPropertyCategory = () => {
  document.title = "Add Property Category";
  const apiURL = `${process.env.BASE_URL}/api/v1/category`; // Ensure URL starts with `http://` or `https://`

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Prevent the form from reloading the page
    try {
      const response = await axios.post(apiURL, {
        name: name,
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again!"); // Fallback message
      }
      console.error("Login error:", error);
    }
    setName("");
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
          <div className="container mx-auto">
            <h2 className="text-xl font-bold text-center sm:text-left">
              Add a Property Category
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap my-5">
                <div className="w-full">
                  <TextField
                    id="outlined-basic"
                    label="Enter Category Name*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    value={name}
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <Button
                variant="contained"
                color="secondary"
                startIcon={!loading && <AddCircleIcon />}
                type="submit"
                size="small"
                style={{ textTransform: "none", width: "130px"  }}
              >
                {loading ? (
                  <CircularProgress size="25px" sx={{ color: "white" }} />
                ) : (
                  "Add Category"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

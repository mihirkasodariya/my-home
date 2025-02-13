import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import { useFetchData } from "../../../hooks/useFetchData";
import CircularProgress from "@mui/material/CircularProgress";
import { AdminLayout } from "../../components/AdminLayout";

export const ViewPropertyCategory = () => {
  document.title = "View Property Category";

  const apiUrl = `${process.env.BASE_URL}/api/v1/category`;

  // Custom hook to fetch data
  const { data, loading, error, refetch } = useFetchData(apiUrl);

  const categories = data.category;
  
  // Handle delete action
  const handleDelete = async (categoryId) => {
    try {
      const deleteUrl = apiUrl + `/${categoryId}`;
      const response = await axios.delete(deleteUrl);

      if (response.data.success) {
        refetch(); // Refresh the list after deletion
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      // Handle errors properly
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message); // Show server error message
      } else {
        toast.error("Something went wrong. Please try again."); // Fallback for unexpected errors
      }
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
          <h2 className="text-xl font-bold text-center sm:text-left">
            View Property Categories
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
            {loading && (
              <div className="flex justify-center">
                <CircularProgress size="large" color="secondary" />{" "}
                {/* Show loading state */}
              </div>
            )}
            {error && <p>{error}</p>} {/* Show error message */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Category Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories && categories.length > 0 ? ( // Check if categories exists and has items
                  categories.map((category) => (
                    <tr
                      key={category._id}
                      className="odd:bg-white even:bg-gray-50"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {category.name}
                      </th>
                      <td className="px-6 py-4 flex gap-5">
                        <Button
                          onClick={() => handleDelete(category._id)}
                          endIcon={<DeleteIcon />}
                          variant="contained"
                          size="small"
                          color="error"
                          style={{ textTransform: "none" }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

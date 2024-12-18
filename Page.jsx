import React, { useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./Page.css";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import { setData, setPage, setSearch, setLoading, onDelete } from "./dataSlice";

const Page = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const page = useSelector((state) => state.data.page);
  const search = useSelector((state) => state.data.search);
  const loading = useSelector((state) => state.data.loading);

  // Fetch data from API
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await axios.get("//dummyjson.com/products");
        dispatch(setData(response.data.products));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    dataFetch();
  }, [dispatch]);

  // Set loading state when page changes
  useEffect(() => {
    dispatch(setLoading(true));
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
    return () => clearTimeout(timer);
  }, [page, dispatch]);

  // Filter data based on search
  const searchedItem = data.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  // Debounce search handler
  const handleChange = debounce((chg) => {
    dispatch(setSearch(chg));
    dispatch(setPage(1)); // Reset karo jab 1 ek change ho
  }, 500); // debouce kara hai or keystokes

  // Handle delete action
  const handleDelete = (id) => {
    dispatch(onDelete(id));
  };

  return (
    <React.Fragment>
      <div>
        {loading ? (
          <div className="loader">Loading... Please wait</div>
        ) : (
          <div>
            <h1>
              Previous API didn't work properly, so I used this API:
              //dummyjson.com/products
            </h1>

            <div className="Search">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => {
                  handleChange(e.target.value);
                  dispatch(setPage(1)); // Reset to page 1 when search changes
                }}
              />
            </div>

            <div className="CardList">
              {search
                ? searchedItem
                    .slice((page - 1) * 6, page * 6)
                    .map((e) => (
                      <Card key={e.id} value={e} onDelete={handleDelete} />
                    ))
                : data
                    .slice((page - 1) * 6, page * 6)
                    .map((e) => (
                      <Card key={e.id} value={e} onDelete={handleDelete} />
                    ))}
            </div>

            {!search && (
              <div className="pagination">
                {page > 1 ? (
                  <button
                    onClick={() => dispatch(setPage(page - 1))}
                    className="btnemp btnclr btnsuc"
                  >
                    Previous
                  </button>
                ) : (
                  <button disabled className="btnemp btnclr btnunsuc">
                    Previous
                  </button>
                )}

                {[...Array(Math.ceil(data.length / 10))].map((_, i) => (
                  <span
                    onClick={() => dispatch(setPage(i + 1))}
                    className="ftn"
                    key={i}
                  >
                    {page === i + 1 ? (
                      <span className="ftnonPoint">{i + 1}</span>
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </span>
                ))}

                {page < Math.ceil(data.length / 10) ? (
                  <button
                    onClick={() => dispatch(setPage(page + 1))}
                    className="btnemp btnclr btnsuc"
                  >
                    Next
                  </button>
                ) : (
                  <button className="btnemp btnclr btnunsuc" disabled>
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Page;

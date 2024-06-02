import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/slices/dataSlice";
import Logo from "../assets/united_future_dmcc_logo_transparent.png";
import HeaderLogo from "../assets/UF.png";

const Table = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.data);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {status === "loading" && (
        <div class="w-full min-h-screen flex items-center justify-center bg-[#0149AD] backdrop-blur-sm text-2xl">
          <div className="w-full flex ">
            <img
              alt="logo"
              src={Logo}
              className="h-40 mx-auto px-12 animate-pulse"
            />
          </div>
        </div>
      )}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <>
          <header className="bg-[#0149AD] text-white px-2 text-center">
            <img
              alt="logo"
              src={HeaderLogo}
              className="h-16 animate-pulse py-2"
            />
          </header>
          <div className="p-4">
            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="border border-black/30 p-2 w-full md:w-1/2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* Table */}
            <table className="w-full border border-black rounded-xl text-sm text-left rtl:text-right text-black/80 dark:text-gray-400">
              <thead className="text-base text-black/80 uppercase bg-black/50 dark:bg-gray-700 dark:text-gray-400">
                <th scope="col" className="px-6 py-4">
                  <div
                    onClick={() => handleSort("id")}
                    className="flex items-center cursor-pointer"
                  >
                    Blog&nbsp;#
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    Title
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div
                    onClick={() => handleSort("body")}
                    className="flex items-center cursor-pointer"
                  >
                    Body
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </div>
                </th>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b border-black dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{item.id}</td>
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">{item.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pangination */}
            <div className="mt-4">
              {Array.from(
                { length: Math.ceil(filteredData.length / itemsPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 ${
                      index + 1 === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;

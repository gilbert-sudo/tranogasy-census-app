import { useDispatch, useSelector } from "react-redux";
import { useLoader } from "../hooks/useLoader";
import LocationDetails from "../components/LocationDetails";
import { useEffect, useState } from "react";
import { updateCurrentPage } from "../redux/redux";
import LocationPaging from "../components/LocationPaging";
import { setTotalPage } from "../redux/redux";
import { updateActiveLink } from "../redux/redux";
import { Link } from "react-router-dom";
import { MdAddLocationAlt } from "react-icons/md";
const LocationListPage = () => {
  const { loadLocations } = useLoader();
  const locations = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const paginationIndex = useSelector((state) => state.pagination);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(locations);
  //set the total of the page
  if (searchResult) {
    dispatch(setTotalPage({ index: 2, subjectLength: searchResult.length }));
  }
  if (paginationIndex[0].currentPage[2] !== 1) {
    // scroll to top of the page
    const element = document.getElementById("prodisplay");
    if (element) {
      element.scrollIntoView();
    }
  }
  //search states and filter it
  const searchStates = async (searchText) => {
    //get matches to current text input
    let matches = locations.filter((state) => {
      const regex = new RegExp(`^${searchText}`, "gi");
      return state.address.match(regex) || state.locationLink.match(regex);
    });
    if (searchText.length !== 0) {
      setSearchResult(matches);
    }
    if (searchText.length === 0) {
      setSearchResult(locations);
      dispatch(setTotalPage({ index: 1, subjectLength: locations.length }));
    }
    if (matches.length === 0) {
      setSearchResult(null);
    }
    if (searchResult) {
      dispatch(setTotalPage({ index: 2, subjectLength: searchResult.length }));
      dispatch(updateCurrentPage({ index: 2, newCurrentPage: 1 }));
    }
    if (paginationIndex[0].currentPage[2] !== 1) {
      // scroll to top of the page
      const element = document.getElementById("prodisplay");
      if (element) {
        element.scrollIntoView();
      }
    }
  };

  useEffect(() => {
    const pageLoader = async () => {
      const locationsPreLoad = await loadLocations();
      if (locationsPreLoad) {
        setIsLoading(null);
      }
      setSearchResult(locationsPreLoad);
    };
    if (!locations.length) {
      setIsLoading(true);
      pageLoader();
    }
    if (paginationIndex[2].activeLink !== "/location-list") {
      dispatch(updateActiveLink("/location-list"));
    }
  }, [loadLocations, locations, setIsLoading, paginationIndex, dispatch]);
  return (
    <>
      {/* <meta charSet="utf-8" /> */}
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      {/* <title>Snippet - BBBootstrap</title> */}
      <link href="#" rel="stylesheet" />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "::-webkit-scrollbar {\n                                  width: 8px;\n                                }\n                                /* Track */\n                                ::-webkit-scrollbar-track {\n                                  background: #f1f1f1; \n                                }\n                                 \n                                /* Handle */\n                                ::-webkit-scrollbar-thumb {\n                                  background: #888; \n                                }\n                                \n                                /* Handle on hover */\n                                ::-webkit-scrollbar-thumb:hover {\n                                  background: #555; \n                                } body{\n    display:flex;\n    justify-content:center;\n    align-items:center;\n    background-color:#fff;\n}\n\n.wrapper{\n  margin-top:20px;\n margin-bottom:50px;\n}",
        }}
      />
      <div className="container pt-4 mb-5">
        <div className="card mt-3">
          <div className="bottom">
            <div className="wrapper">
              <div
                className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
                style={{ width: "100%" }}
              >
                <div class="d-flex mb-2">
                  <input
                    className="form-control auto-input"
                    placeholder="🔍  addresse complet"
                    id="location-input"
                    style={{ width: "100%" }} // add style prop
                    onInput={(e) => searchStates(e.target.value)}
                  />
                  <Link to="/create-location" className="btn btn-primary ml-1">
                    <MdAddLocationAlt />
                  </Link>
                </div>
                <div className="border border-secondary align-items-center ">
                  <h6 className="text-black widget-title m-3 d-flex justify-content-center">
                    ADRESSE ET LOCALISATION
                  </h6>
                </div>
                <div className="list-group list-group-flush border-bottom scrollarea">
                  {!searchResult ? (
                    <div className="mt-4 ml-3">
                      <h6>Aucun résultat trouvé</h6>
                    </div>
                  ) : (
                    <div>
                      {searchResult &&
                        searchResult
                          .slice(
                            paginationIndex[1].startIndex[2],
                            paginationIndex[1].endIndex[2]
                          )
                          .map((location) => (
                            <LocationDetails
                              key={location._id}
                              location={location}
                            />
                          ))}
                    </div>
                  )}
                </div>
                <hr></hr>
                {isLoading && (
                  <div className="mt-4 ml-3 d-flex justify-content-center">
                    <img src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/loading/Double_Ring-1s-200px__1_.gif?updatedAt=1683022393415" alt="" />
                  </div>
                )}
                {searchResult && <LocationPaging />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationListPage;

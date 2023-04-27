import { useSelector } from "react-redux";
import { useLoader } from "../hooks/useLoader";
import LocationAdded from "../components/LocationAdded";
import { useEffect, useState } from "react";
const LocationListPage = () => {
  const { loadLocations } = useLoader();
  const locations = useSelector((state) => state.location);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!locations.length) {
      loadLocations();
      setIsLoading(false);
    }
  }, [loadLocations, locations, setIsLoading]);
  console.log("all location is ", locations);
  return (
    <>
      {/* <meta charSet="utf-8" /> */}
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      {/* <title>Snippet - BBBootstrap</title> */}
      <link href="#" rel="stylesheet" />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "::-webkit-scrollbar {\n                                  width: 8px;\n                                }\n                                /* Track */\n                                ::-webkit-scrollbar-track {\n                                  background: #f1f1f1; \n                                }\n                                 \n                                /* Handle */\n                                ::-webkit-scrollbar-thumb {\n                                  background: #888; \n                                }\n                                \n                                /* Handle on hover */\n                                ::-webkit-scrollbar-thumb:hover {\n                                  background: #555; \n                                } body{\n    display:flex;\n    justify-content:center;\n    align-items:center;\n    background-color:#fff;\n}\n\n.wrapper{\n    margin-top:50px;\n    margin-bottom:50px;\n}",
        }}
      />
      <div className="wrapper">
        <div
          className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
          style={{ width: 390 }}
        >
          <div
            href="/"
            className="d-flex align-items-center flex-shrink-0 p-3 justify-content-center  link-dark text-decoration-none border-bottom"
            style={{ backgroundColor: "rgb(124, 189, 30)" }}
          >
            <svg className="bi me-2" width={30} height={24}>
              <use xlinkHref="#bootstrap" />
            </svg>
            {locations.length ? (
              <span className="fs-5 fw-semibold">Toutes les locations</span>
            ) : (
              <span className="fs-5 fw-semibold">
                accunes locations enrégistrés
              </span>
            )}
          </div>

          <div className="list-group list-group-flush border-bottom scrollarea">
            {locations ? (
              locations.map((location) => <LocationAdded location={location} />)
            ) : (
              <div className="loading-page">
                <h1>chargement...</h1>
                <div className="loading-spinner"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationListPage;

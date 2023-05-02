import { useSelector } from "react-redux";
import { useLoader } from "../hooks/useLoader";
import LocationDetails from "../components/LocationDetails";
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
      <div className="wrapper">
        <div
          className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
          style={{ width: "100%" }}
        >
          <h6 className="text-black widget-title mt-5 mb-3 d-flex justify-content-center">
            ADRESSE ET LOCALISATION
          </h6>

          <div className="list-group list-group-flush border-bottom scrollarea">
            {locations &&
              locations.map((location) => (
                <LocationDetails location={location} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationListPage;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import { useLoader } from "../hooks/useLoader";
import OwnerDetails from "../components/OwnerDetails";
import { useEffect, useState } from "react";

const OwnerListPage = () => {
  const { loadOwners } = useLoader();
  const owners = useSelector((state) => state.owner);
  const [searchResult, setSearchResult] = useState(owners);

  //search states and filter it
  const searchStates = async (searchText) => {
    //get matches to current text input
    let matches = owners.filter((state) => {
      const regex = new RegExp(`^${searchText}`, "gi");
      return (
        state.fullName.match(regex) ||
        state.phone1.match(regex) ||
        state.phone2.match(regex)
      );
    });
    if (searchText.length !== 0) {
      setSearchResult(matches);
    }
    if (searchText.length === 0) {
      setSearchResult(owners);
    }
    if (matches.length === 0) {
      setSearchResult(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!owners.length) {
      loadOwners();
    }
  }, [loadOwners, owners]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '::-webkit-scrollbar {\n                                  width: 8px;\n                                }\n                                /* Track */\n                                ::-webkit-scrollbar-track {\n                                  background: #f1f1f1; \n                                }\n                                 \n                                /* Handle */\n                                ::-webkit-scrollbar-thumb {\n                                  background: #888; \n                                }\n                                \n                                /* Handle on hover */\n                                ::-webkit-scrollbar-thumb:hover {\n                                  background: #555; \n                                } @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");\n\n\n   body{\n\n    background-color: #eeeff3;\n    font-family: "Poppins", sans-serif;\n    font-weight: 300;\n\n   }\n\n   .container{\n\n\n      display: flex;\n      align-items: center;\n      padding: 10px;\n\n   }\n\n\n   .card{\n\n      width: 100%;\n      \n      border-radius: 10px;  \n      border: none;\n\n   }\n\n   .top{\n\n      background-color: #eee;\n      padding: 10px;\n      padding-left: 20px;\n      border-top-right-radius: 10px;\n      border-top-left-radius: 10px;\n   }\n\n   .bottom{\n     \n     padding:10px;\n     background-color: #fff;\n     border-bottom-right-radius: 10px;\n      border-bottom-left-radius: 10px;\n\n   }\n\n   .image{\n      \n       position: relative;\n\n   }\n\n   .image .type{\n     \n        position: absolute;\n    left: 49px;\n    bottom: 0;\n    background: #fff;\n    height: 30px;\n    width: 30px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border-radius: 50%;\n\n   }\n\n   .line-height{\n\n        line-height: 20px;\n   }\n\n   .live{\n\n          height: 10px;\n    width: 10px;\n    border-radius: 50%;\n    background: green;\n    margin-left: 1px;\n    display: flex;\n    margin-right: 5px;\n\n\n   }\n\n   .l-now{\n\n    font-size: 12px;\n   }\n\n\n   .dots{\n     \n           height: 10px;\n   margin-left: 1px;\n    display: flex;\n    margin-right: 5px;\n\n   }',
        }}
      />
      <div className="container pt-4 mb-5">
        <div className="card mt-3">
          <div className="bottom">
            <form action="" onSubmit={handleSubmit}>
              <div class="d-flex mb-2">
                <input
                  className="form-control auto-input"
                  placeholder="Nom complet"
                  id="owner-input"
                  style={{ width: "100%" }} // add style prop
                  onInput={(e) => searchStates(e.target.value)}
                />
                <button className="btn btn-default ml-1 border border-secondary">
                  <FaSearch />
                </button>
                <Link to="/create-owner" className="btn btn-primary ml-1">
                  <FaUserPlus />
                </Link>
              </div>
            </form>
            {!searchResult ? (
              <div className="mt-4 ml-3">
                <h6>Aucun résultat trouvé</h6>
              </div>
            ) : (
              <div>
                {searchResult &&
                  searchResult.map((owner) => (
                    <OwnerDetails key={owner._id} owner={owner} />
                  ))}
                <nav aria-label="Page navigation example">
                  <ul class="pagination  justify-content-center">
                    <li class="page-item">
                      <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerListPage;

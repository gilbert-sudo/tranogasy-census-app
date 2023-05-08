import TopPropertyDetails from "../components/TopPropertyDetails";
import Paging from "../components/Paging";
import SearchBar from "../components/SearchBar";
import PropertyFilter from "../components/PropertyFilter";
import { setTotalPage } from "../redux/redux";
import { useDispatch, useSelector } from "react-redux";
import { useLoader } from "../hooks/useLoader";
import { useEffect } from "react";
import { updateActiveLink } from "../redux/redux";
const Home = () => {
  //redux
  const dispatch = useDispatch();
  const { loadLikes, loadBooking } = useLoader();
  const paginationIndex = useSelector((state) => state.pagination);
  const topProperties = useSelector((state) => state.topProperties);
  const likedPropertiesState = useSelector((state) => state.likedProperties);
  const user = useSelector((state) => state.user);
  if (topProperties) {
    dispatch(setTotalPage({index: 0, subjectLength: topProperties.length}));
  }
  if (paginationIndex[0].currentPage[0] !== 1) {
    // scroll to top of the page
    const element = document.getElementById("prodisplay");
    if (element) {
      element.scrollIntoView();
    }
  }

  useEffect(() => {
    const pageLoader = () => {
      if (user) {
        if (!likedPropertiesState) {
          const userId = user._id;
          loadLikes(userId);
          loadBooking(userId);
        }
      }
    };
    pageLoader();
    if(paginationIndex[2].activeLink != "/"){
      dispatch(updateActiveLink("/"))
    }
  }, [user, likedPropertiesState, paginationIndex[2]]);
  return (
    <div className="home">
      <div className="site-section site-section-sm pb-0 mt-5">
          <SearchBar />
        <div className="container" id="prodisplay">
          <PropertyFilter />
        </div>
      </div>
      <div className="site-section site-section-sm bg-light">
        <div className="container" style={{ paddingBottom: "80px" }}>
          <div className="row">
            {topProperties &&
              topProperties
                .slice(
                  paginationIndex[1].startIndex[0],
                  paginationIndex[1].endIndex[0]
                )
                .map((topProperty) => (
                  <TopPropertyDetails
                    key={topProperty.property._id}
                    topProperty={topProperty}
                  />
                ))}
          </div>
          {topProperties && <Paging />}
        </div>
      </div>
    </div>
  );
};

export default Home;

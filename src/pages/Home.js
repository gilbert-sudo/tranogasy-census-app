import TopPropertyDetails from "../components/TopPropertyDetails";
import Paging from "../components/Paging";
import SearchForm from "../components/SearchForm";
import PropertyFilter from "../components/PropertyFilter";
import HomeSlider from "../components/HomeSlider";
import { setTotalPage } from "../redux/redux";
import { useDispatch, useSelector } from "react-redux";
import { useLoader } from "../hooks/useLoader";
import { useEffect } from "react";

const Home = () => {
  //redux
  const dispatch = useDispatch();
  const { loadLikes, loadBooking } = useLoader();
  const paginationIndex = useSelector((state) => state.pagination);
  const topProperties = useSelector((state) => state.topProperties);
  const likedPropertiesState = useSelector((state) => state.likedProperties);
  const user = useSelector((state) => state.user);

  if (topProperties) {
    dispatch(setTotalPage(topProperties.length));
  }
  if (paginationIndex[0].currentPage !== 1) {
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
  }, [user, likedPropertiesState]);

  return (
    <div className="home">
      <HomeSlider />
      <div className="site-section site-section-sm pb-0">
        <div className="container" id="prodisplay">
          <SearchForm />
          <PropertyFilter />
        </div>
      </div>
      <div className="site-section site-section-sm bg-light">
        <div className="container" style={{ paddingBottom: "80px" }}>
          <div className="row">
            {topProperties &&
              topProperties
                .slice(
                  paginationIndex[1].startIndex,
                  paginationIndex[1].endIndex
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

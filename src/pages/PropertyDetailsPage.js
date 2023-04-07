import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CarouselDetails from "../components/CarouselDetails";
import MiniCarousel from "../components/MiniCarousel";
import CardDetails from "../components/CardDetails";
import PropertyGallery from "../components/PropertyGallery";
import ContactAgentForm from "../components/ContactAgentForm";
//redux data

const PropertyDetails = () => {
  // scroll to top of the page
  window.scrollTo(0, 0);

  const { id } = useParams();

  const topProperties = useSelector((state) => state.topProperties);
  const propertiesDetails = topProperties.filter(
    (topProperty) => topProperty.property._id === id
  );

  return (
    <div>
      {propertiesDetails && (
        <CarouselDetails
          city={propertiesDetails[0].city}
          images={propertiesDetails[0].images}
          property={propertiesDetails[0].property}
        />
      )}
      <div className="site-section site-section-sm">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <hr />
              <MiniCarousel />
              <CardDetails />
              <div className="bg-white widget border rounded">
                <h3 className="h4 text-black widget-title mb-3">
                  Déscription:
                </h3>
                <p>
                  {propertiesDetails &&
                    propertiesDetails[0].property.description}
                </p>
              </div>
              <PropertyGallery />
            </div>
            <div className="col-lg-4 pt-5" id="contactAgent">
              {/* agent contact form */}
              <ContactAgentForm
                propertyId={propertiesDetails[0].property._id}
                imageId={propertiesDetails[0].images[0]._id}
                cityId={propertiesDetails[0].city._id}
              />
              {/* agent contact form */}
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default PropertyDetails;

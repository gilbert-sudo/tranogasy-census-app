import { useSelector } from "react-redux";
import BookingDetails from "../components/BookingDetails";


const BookingPage = () => {
  const bookings = useSelector((state) => state.booking);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n\n        body {\n\n    background-color: #eeeff3;\n            height: 100%;\n        }\n\n        .card {\n            width: 100%;\n            border-radius: 10px;\n            box-shadow: 0px 4px 8px 0px #7cbd1e;\n            margin-top: 10px;\n            margin-bottom: 10px;\n        }\n\n        .set-p {\n            padding-left: 15px;\n            padding-right: 15px;\n        }\n\n        .image {\n            object-fit: cover;\n            width: 100%;\n            height: 100%;\n            border-top-left-radius: 10px;\n            border-bottom-left-radius: 10px;\n        }\n\n        .rating {\n            background-color: #3D5AFE;\n            color: #fff;\n            border-top-left-radius: 5px;\n            border-top-right-radius: 5px;\n            border-bottom-right-radius: 5px;\n        }\n\n        .grade {\n            font-size: 18px;\n        }\n\n        .line {\n            height: 1px;\n            background-color: #E0E0E0;\n        }\n        \n        @media screen and (max-width: 575px) {\n            .image {\n                height: 100%;\n                border-top-left-radius: 10px;\n                border-bottom-left-radius: 0px;\n                border-top-right-radius: 10px;\n            }\n        }\n    "
        }}
      />
      <div className="container px-5 mx-auto" style={{paddingTop: "60px"}}>
        {bookings &&
          bookings.map((booking) => (
            <div className="row d-flex justify-content-center">
              <BookingDetails booking={booking} />
            </div>
          ))}
      </div>
    </>
  );
};

export default BookingPage;

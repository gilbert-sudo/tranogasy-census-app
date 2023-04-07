const MessagePage = () => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '::-webkit-scrollbar {\n                                  width: 8px;\n                                }\n                                /* Track */\n                                ::-webkit-scrollbar-track {\n                                  background: #f1f1f1; \n                                }\n                                 \n                                /* Handle */\n                                ::-webkit-scrollbar-thumb {\n                                  background: #888; \n                                }\n                                \n                                /* Handle on hover */\n                                ::-webkit-scrollbar-thumb:hover {\n                                  background: #555; \n                                } @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");\n\n\n   body{\n\n    background-color: #eeeff3;\n    font-family: "Poppins", sans-serif;\n    font-weight: 300;\n\n   }\n\n   .container{\n\n\n      display: flex;\n      align-items: center;\n      padding: 10px;\n\n   }\n\n\n   .card{\n\n      width: 100%;\n      \n      border-radius: 10px;  \n      border: none;\n\n   }\n\n   .top{\n\n      background-color: #eee;\n      padding: 10px;\n      padding-left: 20px;\n      border-top-right-radius: 10px;\n      border-top-left-radius: 10px;\n   }\n\n   .bottom{\n     \n     padding:10px;\n     background-color: #fff;\n     border-bottom-right-radius: 10px;\n      border-bottom-left-radius: 10px;\n\n   }\n\n   .image{\n      \n       position: relative;\n\n   }\n\n   .image .type{\n     \n        position: absolute;\n    left: 49px;\n    bottom: 0;\n    background: #fff;\n    height: 30px;\n    width: 30px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border-radius: 50%;\n\n   }\n\n   .line-height{\n\n        line-height: 20px;\n   }\n\n   .live{\n\n          height: 10px;\n    width: 10px;\n    border-radius: 50%;\n    background: green;\n    margin-left: 1px;\n    display: flex;\n    margin-right: 5px;\n\n\n   }\n\n   .l-now{\n\n    font-size: 12px;\n   }\n\n\n   .dots{\n     \n           height: 10px;\n    width: 10px;\n    border-radius: 50%;\n    background: blue;\n    margin-left: 1px;\n    display: flex;\n    margin-right: 5px;\n\n   }',
        }}
      />
      <div className="container pt-5">
        <div className="card mt-3">
          <div className="bottom">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-row align-items-center">
                <div className="image">
                  <img src="https://i.imgur.com/jhsYqVT.png" width={70} />
                  <span className="type">
                    <img
                      src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/logo2.png?updatedAt=1679052755455"
                      width={20}
                    />
                  </span>
                </div>
                <div className="d-flex flex-column line-height ml-2">
                  <span className="font-weight-bold">hannahdat21</span>
                  <span>Can i order online?</span>
                  <span className="d-flex flex-row align-items-center l-now">
                    <small className="live" />
                    Live now
                  </span>
                </div>
              </div>
              <span className="dots"></span>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="d-flex flex-row align-items-center">
                <div className="image">
                  <img src="https://i.imgur.com/vxEWOFl.png" width={70} />
                  <span className="type">
                    <img
                      src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/logo2.png?updatedAt=1679052755455"
                      width={20}
                    />
                  </span>
                </div>
                <div className="d-flex flex-column line-height ml-2">
                  <span className="font-weight-bold">hannahdat21</span>
                  <span>Is this still available?</span>
                  <span className="d-flex flex-row align-items-center l-now">
                    <small className="live" />
                    Live now
                  </span>
                </div>
              </div>
              <span className="dots"></span>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="d-flex flex-row align-items-center">
                <div className="image">
                  <img src="https://i.imgur.com/jhsYqVT.png" width={70} />
                  <span className="type">
                    <img
                      src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/logo2.png?updatedAt=1679052755455"
                      width={20}
                    />
                  </span>
                </div>
                <div className="d-flex flex-column line-height ml-2">
                  <span className="font-weight-bold">hannahdat21</span>
                  <span>Thanks hannah!</span>
                  <span className="d-flex flex-row align-items-center l-now">
                    <small className="live" />
                    Live now
                  </span>
                </div>
              </div>
              <span className="dots"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagePage;

export default function Home() {
  return (
    <div className="bg-secondary">
      <div className="flex">
        <div className="w-[30%] bg-primary">
          <div className="flex flex-row items-center justify-center bg-primary text-white">
            <div className="flex flex-col mt-50 ml-5">
              <span className="text-5xl">Design</span>
              <span className="text-5xl">Dazz</span>
              <span className="text-xl mt-2">Interior Design Studio</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-[70%]">
          <img
            src="https://static.wixstatic.com/media/c837a6_dd175849cd9f4e3db86a04ab14f9f617~mv2.jpg/v1/crop/x_0,y_1120,w_4480,h_4480/fill/w_628,h_628,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/shutterstock_1922829893.jpg"
            alt="Design Dazz"
          />
        </div>
      </div>
      <div className="flex mt-25">
        <div className="flex-row justify-center items-center">
          <div className="text-center text-5xl text-brown">About</div>
          <div className="text-center text-xl pt-10 text-brown">
            I'm a paragraph. Click here to add your own text and edit me. It's
            easy.
          </div>
          <div className="text-center text-xl mx-100 text-brown">
            Just click “Edit Text” or double click me to add your own content
            and make changes to the font. I'm a great place for you to tell a
            story and let your users know a little more about you.
          </div>
        </div>
      </div>
      <div>
        <img
          src="https://static.wixstatic.com/media/c837a6_7c584dbe8daf4cbfab69251295b930fb~mv2.jpg/v1/fill/w_1996,h_1462,al_b,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_7c584dbe8daf4cbfab69251295b930fb~mv2.jpg"
          alt="Design Dazz"
        />
      </div>
      <div className="flex mt-25">
        <div className="flex-row justify-center items-center">
          <div className="text-center text-5xl text-brown">Our Services</div>
        </div>
      </div>
    </div>
  );
}

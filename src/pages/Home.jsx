export default function Home() {
  return (
    <>
      <div className="bg-secondary flex">
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
    </>
  );
}

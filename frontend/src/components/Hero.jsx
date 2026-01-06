import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";


const Hero = () => {
    const companyLogos = ["slack", "framer", "netflix", "google", "linkedin", "instagram", "facebook"];
    const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center 
    bg-[url(/gradientBackground.png)] bg-cover bg-center bg-no-repeat min-h-screen">
    
        <div className="text-center md-6">
           <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-[75px] font-semibold mx-auto leading-[1.2]'>
           Create amazing content <br/> with <span className="text-primary">AI Tools</span>
           </h1>
           <p className='max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs py-2 text-gray-600' >
           Transform your content creation with our suite of premium AI tools. Write articles, <br/> generate images, and enhance your workflow.
           </p>
        </div>

        <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs my-6'>
           <button onClick={()=>{navigate('/ai')}} className="rounded-lg text-sm cursor-pointer bg-primary hover:scale-102 active:scale-95 transition text-white px-10 py-3">Start creating now</button>
           <button className="rounded-lg text-sm cursor-pointer bg-white border border-gray-300 hover:scale-102 active:scale-95 transition text-black px-10 py-3">Watch demo</button>
        </div>

        <div className='mt-2 flex flex-wrap items-center justify-center gap-4 text-sm'>
           <img src={assets.user_group} alt="" className="w-22 h-8"/>
           <p className="sm:text-[16px] text-gray-600">Trusted by 10k+ people</p>
        </div>

        <div>
         <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

            <div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none pt-20">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                <div className="marquee-inner flex will-change-transform min-w-[200%]" style={{ animationDuration: "15s" }}>
                    <div className="flex">
                        {[...companyLogos, ...companyLogos].map((company, index) => (
                            <img key={index} src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
                                alt={company} className="w-full h-full object-cover mx-6" draggable={false} />
                        ))}
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
        </div>

    </div>
  );
};

export default Hero;

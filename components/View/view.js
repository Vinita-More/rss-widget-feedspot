'use client'; 
import v from './view.module.css';
import Image from 'next/image';
import { useState } from 'react';
import ViewButtons from './buttons';
export default function View(){

  const [activeIndex, setActiveIndex] = useState(0);

  const leftCamImages = [
    '/images/imagetext1.webp',
    '/images/linesonly.webp',
    '/images/foursquare1.webp',
    '/images/grid41.webp',
    '/images/fullsquare1.webp',
  ];

  const rightCamImages = [
    '/images/imagetext2.webp',
    '/images/linesonly.webp',
    '/images/foursquare2.webp',
    '/images/grid42.webp',
    '/images/fullsquare2.webp',
  ];

  return(
    <div className={v.first}>
       
        <div className={v.viewdiv}>
        
        <div className={v.heading}>
          <h3>Following Views</h3>  
          <ViewButtons  onClick={setActiveIndex} />
        </div>
         
        <div className={v.viewlayout}>
            <div className={v.childdiv}>
                <button className={v.changeimage}>
                    <Image src={leftCamImages[activeIndex]} width={270} height={270} alt=''/>
                </button>
            </div>
            
            <div className={v.childdiv}>
                <button className={v.changeimage}>
                    <Image src={rightCamImages[activeIndex]} width={270} height={270} alt='' />
                </button>
            </div>
        </div>

        </div>
        
        </div>
    ); 
}
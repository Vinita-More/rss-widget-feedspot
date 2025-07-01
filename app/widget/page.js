'use client'
import Search from "@/components/Feedurl/rss-feed-url";
import Sidebar from "@/components/Sidebar/Sidebar";
import Searchbar from "@/components/Searchbar/Searchbar";
import View from "@/components/View/view";
import Card from "@/components/Card/Card";
import Editform from "@/components/Editform/editform";
//import Sidediv from "@/components/Sidediv/FeedspotSection";
import FeedspotSection from "@/components/Sidediv/Sidediv";

export default function MainPage() {
  
  return (
    <div>
       <Sidebar />
       {/* */}
       
       <Searchbar />
        {/* */} 
        <FeedspotSection />
      {/*  */}   
       <Search   />
         {/* */}
       <View /> 
         {/* */}
      <Card />
         {/* */}
         <Editform />
     {/*  <Sidediv />
         */}



    </div>
  );
}

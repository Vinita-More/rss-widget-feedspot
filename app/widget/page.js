'use client'
import Search from "@/components/Feedurl/rss-feed-url";
import Sidebar from "@/components/Sidebar/Sidebar";
import Searchbar from "@/components/Searchbar/Searchbar";
import View from "@/components/View/view";
import Card from "@/components/Card/Card";
import General from "@/components/Editform/general";
import FeedspotSection from "@/components/Topbody/Topbody";

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
         <General />
     {/*  <Sidediv />
         */}



    </div>
  );
}

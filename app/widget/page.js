'use client'
import Search from "@/components/Feedurl/rss-feed-url";
import Sidebar from "@/components/Sidebar/Sidebar";
import Searchbar from "@/components/Searchbar/Searchbar";
import View from "@/components/View/view";
import GeneralText from "@/components/General/General";
import Sidediv from "@/components/Sidediv/Sidediv"

//import Page from "@/components/component";
//import Side from "@/components/Sidediv/Sidediv";
export default function MainPage() {
  
  return (
    <div>
       <Sidebar />
      
       <Searchbar />
        
       <Search   />
       
       <View /> 
      <GeneralText />
      <Sidediv />
       {/*<div>
      <h1>Hello {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>*/}
      {/*<Side />
      {/*<Page />

      <GeneralText />*/}
    </div>
  );
}

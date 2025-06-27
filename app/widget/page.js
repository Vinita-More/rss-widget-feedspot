import Search from "@/components/Feedurl/rss-feed-url";
import Sidebar from "@/components/Sidebar/Sidebar";
import Searchbar from "@/components/Searchbar/Searchbar";
import View from "@/components/View/view";
import GeneralText from "@/components/General/General";
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
      {/*<Side />
      {/*<Page />

      <GeneralText />*/}
    </div>
  );
}

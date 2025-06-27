import Sidebar from "./Sidebar/Sidebar";
import Search from "./Feedurl/rss-feed-url";
import Searchbar from "./Searchbar/Searchbar";
import View from "./View/view";
import c from './component.module.css'
export default function Page(){
    return(
        <div className={c.body}>
<Sidebar />
<Searchbar />
        
       <Search   />
       
       <View /> 
        </div>
    );}
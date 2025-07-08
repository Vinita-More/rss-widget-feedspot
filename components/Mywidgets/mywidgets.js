import Searchbar from "../Searchbar/Searchbar";
import Sidebar from "../Sidebar/Sidebar";
import WidgetData from "./widgetdata";
import w from "./mywidgets.module.css";

export default function Currentwidget() {
  return (
    <div>
      <Searchbar />
      <Sidebar />
      <WidgetData />
    </div>
  );
}

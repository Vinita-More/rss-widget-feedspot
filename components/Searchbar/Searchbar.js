import Link from "next/link";
import css1 from './searchbar.module.css';
export default function Searchbar(){
    return (
<div className={css1.search}>
    <input className={css1.searchinput}
        type="text"
        placeholder="Search"
      />
</div>
    );
}
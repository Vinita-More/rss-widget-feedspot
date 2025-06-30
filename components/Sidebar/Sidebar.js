import Link from "next/link";
import classes from './sidebar.module.css';
export default function Sidebar(){
    return (
<div className={classes.new}>
    <p className={classes.main}>FeedSpot</p>
  <p className={classes.words}> <Link href="/" >Feedspot Home</Link></p>
  <p className={classes.words}> <Link href="@/app/mywidgets" > Widget Home</Link></p>
  <p className={classes.words}> <Link href="/mywidgets" >My Widget</Link> </p>
  <p className={classes.words}> <Link href="@/app/widget" >Widget Catalog</Link></p>
  <p className={classes.words}> <Link href="@/app/widget" >Support</Link></p>
  <p className={classes.words}> <Link href="@/app/widget" >widget Examples</Link></p>
  <p className={classes.words}> <Link href="@/app/widget" >Customers</Link></p>
</div>
    );
}
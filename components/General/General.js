    'use client'
    import g from './general.module.css';
    import { useState, useEffect } from "react";
    //import { useState } from 'react';
    export default function GeneralText(){
        const [users, setUsers] = useState([]);
        
        useEffect(() => {
            fetch("http://localhost:8080/RSS_Widget_Backend/api/index.php")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("API error:", err));
        }, []);
        if (!users) return <p>Loading...</p>;
        return(<>
        
    <div className={g.h1}>{/*Feedspot Widget is a handy widget which lets you embed and display latest updates from your favourite sources (Blogs, News Websites, Podcasts, Youtube Channels, RSS Feeds, etc) on your website. Watch Video
*/}
    <div>
        <div>General settings</div>
    
    <div className={g.cardcontainer}>
       { users.map(user => ( 
        <div className={g.usercard} key={user.id}>
            <h1>Hello {user.name}</h1>
            <img
            src={`http://localhost:8080/RSS_Widget_Backend/${user.image}`}
            alt={user.name}
            width={100}
            style={{ borderRadius: '50%' }}
          />
        <p>Email: {user.email}</p>
        <p>{user.id}</p>
        </div>
        ))
        }
       
        </div>
        </div>

    </div>
        
        
        
        
        </>);
    }